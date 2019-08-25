from django.urls import path
from . import views

urlpatterns = [
    path('home', views.HomeView.as_view(), name='home'),
    path('', views.LoginView.as_view(), name='login'),
    path('api/image/', views.analyze_image, name='analyze'),
    path('api/mode/', views.analyze_mode, name='mode'),
    path('api/mode1', views.AnalyzeModeView.as_view(), name='mode1')
]
