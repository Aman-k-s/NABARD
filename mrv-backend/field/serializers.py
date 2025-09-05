from rest_framework import serializers

class FieldDataRequestSerializer(serializers.Serializer):
    coordinates = serializers.ListField(
        child=serializers.ListField(
            child=serializers.ListField(
                child=serializers.FloatField()
            )
        )
    )

class VegetationIndicesSerializer(serializers.Serializer):
    NDVI = serializers.FloatField()
    EVI = serializers.FloatField()
    SAVI = serializers.FloatField()

class RainfallSerializer(serializers.Serializer):
    precipitation = serializers.FloatField()

class TemperatureSerializer(serializers.Serializer):
    LST_Day_1km = serializers.FloatField()

class SoilMoistureSerializer(serializers.Serializer):
    volumetric_soil_water_layer_1 = serializers.FloatField()

class NDVITimeSeriesEntrySerializer(serializers.Serializer):
    date = serializers.DateField()
    NDVI = serializers.FloatField()

class FieldDataResponseSerializer(serializers.Serializer):
    vegetation_indices = VegetationIndicesSerializer()
    crop_type_class = serializers.IntegerField()
    rainfall_mm = RainfallSerializer()
    temperature_K = TemperatureSerializer()
    soil_moisture = SoilMoistureSerializer()
    ndvi_time_series = NDVITimeSeriesEntrySerializer(many=True)
