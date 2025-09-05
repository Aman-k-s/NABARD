from django.urls import path
from field.views import FieldDataView

urlpatterns = [
    path('field-data/', FieldDataView.as_view(), name='field_data'),
]