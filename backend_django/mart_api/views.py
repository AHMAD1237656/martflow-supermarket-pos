from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Sum, F, Count
from django.utils import timezone

from .models import User, Category, Product, Customer, Supplier, Purchase, Sale
from .serializers import (
    CustomTokenObtainPairSerializer, UserSerializer, CategorySerializer,
    ProductSerializer, CustomerSerializer, SupplierSerializer,
    PurchaseSerializer, SaleSerializer
)

# 1. Custom Login View (Returns Token + Role + Username)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# 2. Logged-in User Profile Endpoint
class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


# 3. Category ViewSet (Full CRUD)
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


# 4. Product ViewSet (Full CRUD + Low Stock Filter)
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-id')
        low_stock = self.request.query_params.get('low_stock', None)
        if low_stock is not None:
            queryset = queryset.filter(quantity__lte=F('min_stock_limit'))
        return queryset


# 5. Customer ViewSet
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('-id')
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]


# 6. Supplier ViewSet
class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all().order_by('-id')
    serializer_class = SupplierSerializer
    permission_classes = [permissions.IsAuthenticated]


# 7. Purchase ViewSet
class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all().order_by('-created_at')
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]


# 8. Sale / Reports ViewSet
class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all().order_by('-created_at')
    serializer_class = SaleSerializer
    permission_classes = [permissions.IsAuthenticated]


# 9. Main Dashboard Analytics KPI Endpoint (Phase 3)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    today = timezone.now().date()

    # Sales Calculations
    today_sales = Sale.objects.filter(created_at__date=today).aggregate(
        total=Sum('total_amount'), count=Count('id')
    )
    total_sales = Sale.objects.aggregate(total=Sum('total_amount'), count=Count('id'))

    # Inventory Metrics
    total_products = Product.objects.count()
    low_stock_count = Product.objects.filter(quantity__lte=F('min_stock_limit')).count()

    # Customers & Suppliers
    total_customers = Customer.objects.count()
    total_suppliers = Supplier.objects.count()

    # Recent 5 Transactions
    recent_sales = SaleSerializer(Sale.objects.order_by('-created_at')[:5], many=True).data

    return Response({
        "today_revenue": today_sales['total'] or 0.00,
        "today_bills_count": today_sales['count'],
        "lifetime_revenue": total_sales['total'] or 0.00,
        "total_products": total_products,
        "low_stock_products": low_stock_count,
        "total_customers": total_customers,
        "total_suppliers": total_suppliers,
        "recent_sales": recent_sales
    })


# 10. Stock Inward (Wholesale Purchase Receiving Logic) (Phase 3)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def receive_purchase_order(request, purchase_id):
    try:
        purchase = Purchase.objects.get(id=purchase_id)
        if purchase.payment_status == 'PAID':
            for item in purchase.items.all():
                Product.objects.filter(id=item.product.id).update(
                    quantity=F('quantity') + item.quantity
                )
            return Response({"message": f"PO #{purchase.po_number} received & stock updated successfully."})
        return Response({"error": "Purchase order is not marked as PAID."}, status=status.HTTP_400_BAD_REQUEST)
    except Purchase.DoesNotExist:
        return Response({"error": "Purchase order not found."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username', '').strip()
    email = request.data.get('email', '').strip()
    password = request.data.get('password', '').strip()

    if not username or not password:
        return Response(
            {"detail": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"detail": "A user with this username already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    user.save()

    return Response(
        {"message": "Account created successfully! You can now log in.", "username": user.username},
        status=status.HTTP_201_CREATED
    )