from django.urls import path
from . import views

urlpatterns = [
    path('',views.HomeView.as_view(),name='home'),
    path('api/image/',views.analyze_image,name='analyze'),
    path('api/mode/',views.analyze_mode,name='mode'),
    path('api/mode1',views.AnalyzeModeView.as_view(),name='mode1')
]
