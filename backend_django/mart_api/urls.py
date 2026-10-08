from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    CategoryViewSet,
    ProductViewSet,
    SupplierViewSet,
    PurchaseViewSet,
    SaleViewSet,
    dashboard_stats,
    register_user,
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'purchase-orders', PurchaseViewSet)
router.register(r'sales', SaleViewSet)

urlpatterns = [
    # Auth Endpoints
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Analytics
    path('dashboard/stats/', dashboard_stats, name='dashboard_stats'),
    path('register/', register_user, name='register_user'),
    
    # Management ViewSets
    path('', include(router.urls)),
]