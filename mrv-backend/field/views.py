from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    FieldDataRequestSerializer,
    FieldDataResponseSerializer
)

class FieldDataView(APIView):
    def post(self, request):
        # Validate request data
        request_serializer = FieldDataRequestSerializer(data=request.data)
        if not request_serializer.is_valid():
            return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        # Mock response data (replace with actual API calls later)
        response_data = {
            "vegetation_indices": {
                "NDVI": 0.42,
                "EVI": 0.35,
                "SAVI": 0.41
            },
            "crop_type_class": 40,
            "rainfall_mm": {"precipitation": 4.2},
            "temperature_K": {"LST_Day_1km": 302.4},
            "soil_moisture": {"volumetric_soil_water_layer_1": 0.18},
            "ndvi_time_series": [
                {"date": "2024-06-05", "NDVI": 0.39},
                {"date": "2024-06-15", "NDVI": 0.45},
                {"date": "2024-06-25", "NDVI": 0.41}
            ]
        }
        
        # Validate response data
        response_serializer = FieldDataResponseSerializer(data=response_data)
        if not response_serializer.is_valid():
            return Response(
                {"error": "Internal server error", "details": response_serializer.errors}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        return Response(response_serializer.validated_data)
