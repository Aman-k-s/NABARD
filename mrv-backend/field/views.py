# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    FieldDataRequestSerializer,
    FieldDataResponseSerializer,
)
import ee

# Initialize Google Earth Engine
ee.Initialize(project="nabard-field-data")


class FieldDataView(APIView):
    def post(self, request):
        # ✅ Step 1: Validate incoming request (must have coordinates)
        req_serializer = FieldDataRequestSerializer(data=request.data)
        if not req_serializer.is_valid():
            return Response(req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        coords = req_serializer.validated_data["coordinates"]
        aoi = ee.Geometry.Polygon(coords)

        try:
            # --- Vegetation Indices ---
            sentinel = (
                ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                .filterBounds(aoi)
                .filterDate("2024-06-01", "2024-06-30")
                .median()
            )

            ndvi = sentinel.normalizedDifference(["B8", "B4"]).rename("NDVI")
            evi = sentinel.expression(
                "2.5 * ((NIR - RED) / (NIR + 6*RED - 7.5*BLUE + 1))",
                {
                    "NIR": sentinel.select("B8"),
                    "RED": sentinel.select("B4"),
                    "BLUE": sentinel.select("B2"),
                },
            ).rename("EVI")
            savi = sentinel.expression(
                "((NIR - RED) / (NIR + RED + 0.5)) * (1.5)",
                {"NIR": sentinel.select("B8"), "RED": sentinel.select("B4")},
            ).rename("SAVI")

            veg_stats = (
                ee.Image.cat([ndvi, evi, savi])
                .reduceRegion(
                    reducer=ee.Reducer.mean(),
                    geometry=aoi,
                    scale=10,
                    bestEffort=True,
                )
                .getInfo()
                or {}
            )

            # --- Crop Type ---
            worldcover = ee.Image("ESA/WorldCover/v100/2020")
            crop_class = (
                worldcover.reduceRegion(
                    reducer=ee.Reducer.mode(),
                    geometry=aoi,
                    scale=10,
                    bestEffort=True,
                ).getInfo()
                or {}
            )
            crop_type = crop_class.get("Map")

            # --- Rainfall ---
            rainfall = (
                ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
                .filterBounds(aoi)
                .filterDate("2024-06-01", "2024-06-30")
                .mean()
                .reduceRegion(ee.Reducer.mean(), aoi, 5000)
                .getInfo()
                or {}
            )
            rainfall_val = rainfall.get("precipitation")

            # --- Temperature ---
            lst = (
                ee.ImageCollection("MODIS/061/MOD11A2")
                .filterBounds(aoi)
                .filterDate("2024-06-01", "2024-06-30")
                .mean()
                .select("LST_Day_1km")
                .multiply(0.02)
                .reduceRegion(ee.Reducer.mean(), aoi, 1000)
                .getInfo()
                or {}
            )
            temp_val = lst.get("LST_Day_1km")

            # --- Soil Moisture ---
            soil = (
                ee.ImageCollection("ECMWF/ERA5_LAND/DAILY_RAW")
                .filterDate("2024-06-01", "2024-06-30")
                .mean()
                .select("volumetric_soil_water_layer_1")
                .reduceRegion(ee.Reducer.mean(), aoi, 10000)
                .getInfo()
                or {}
            )
            soil_val = soil.get("volumetric_soil_water_layer_1")

            # --- NDVI Time Series ---
            ndvi_ts = (
                ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                .filterBounds(aoi)
                .filterDate("2024-06-01", "2024-06-30")
                .map(
                    lambda img: img.normalizedDifference(["B8", "B4"])
                    .rename("NDVI")
                    .set("date", img.date().format("YYYY-MM-dd"))
                )
                .select("NDVI")
            )

            ndvi_series = ndvi_ts.map(
                lambda img: ee.Feature(
                    None,
                    {
                        "date": img.get("date"),
                        "NDVI": img.reduceRegion(
                            ee.Reducer.mean(), aoi, 10
                        ).get("NDVI"),
                    },
                )
            )

            ndvi_list = ndvi_series.aggregate_array("NDVI").getInfo()
            date_list = ndvi_series.aggregate_array("date").getInfo()
            time_series = []
            if ndvi_list and date_list:
                for d, v in zip(date_list, ndvi_list):
                    if v is not None:
                        time_series.append({"date": d, "NDVI": v})

            # ✅ Step 2: Prepare response
            response_data = {
                "NDVI": veg_stats.get("NDVI"),
                "EVI": veg_stats.get("EVI"),
                "SAVI": veg_stats.get("SAVI"),
                "crop_type_class": crop_type,
                "rainfall_mm": rainfall_val,
                "temperature_K": temp_val,
                "soil_moisture": soil_val,
                "ndvi_time_series": time_series,
            }
            print(response_data)
            # ✅ Step 3: Validate outgoing response
            resp_serializer = FieldDataResponseSerializer(data=response_data)
            resp_serializer.is_valid(raise_exception=True)

            return Response(resp_serializer.validated_data)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
