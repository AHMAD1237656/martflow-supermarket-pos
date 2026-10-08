from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Category, Product, Customer, Supplier, Purchase, PurchaseItem, Sale, SaleItem

# 1. Custom JWT Token Serializer (Login par User Role aur Name payload me bhejne ke liye)
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Custom claims (Token ke andar embedded data)
        token['username'] = user.username
        token['role'] = user.role
        token['name'] = f"{user.first_name} {user.last_name}".strip() or user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Login API response me seedha role aur details bhejna
        data['username'] = self.user.username
        data['role'] = self.user.role
        data['id'] = self.user.id
        return data


# 2. User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'phone', 'is_active']


# 3. Category Serializer (With total products count)
class CategorySerializer(serializers.ModelSerializer):
    total_products = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'total_products', 'created_at']


# 4. Product Serializer (With Category Details & Stock Status)
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    is_low_stock = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'sku', 'barcode', 'category', 'category_name',
            'cost_price', 'sale_price', 'quantity', 'min_stock_limit',
            'expiry_date', 'image', 'is_active', 'is_low_stock', 'created_at'
        ]

    def get_is_low_stock(self, obj):
        return obj.quantity <= obj.min_stock_limit


# 5. Customer Serializer
class CustomerSerializer(serializers.ModelSerializer):
    total_orders = serializers.IntegerField(source='orders.count', read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'name', 'phone', 'address', 'loyalty_points', 'total_orders', 'created_at']


# 6. Supplier Serializer
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name', 'contact_person', 'phone', 'address', 'created_at']


# 7. Purchase Order Serializers
class PurchaseItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = PurchaseItem
        fields = ['id', 'product', 'product_name', 'quantity', 'unit_cost']


class PurchaseSerializer(serializers.ModelSerializer):
    items = PurchaseItemSerializer(many=True, read_only=True)
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)

    class Meta:
        model = Purchase
        fields = ['id', 'po_number', 'supplier', 'supplier_name', 'total_amount', 'payment_status', 'items', 'created_at']


# 8. Sales & POS Billing Serializers
class SaleItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = SaleItem
        fields = ['id', 'product', 'product_name', 'quantity', 'unit_price', 'total_price']


class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True, read_only=True)
    cashier_name = serializers.CharField(source='cashier.username', read_only=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
        model = Sale
        fields = [
            'id', 'invoice_number', 'cashier', 'cashier_name',
            'customer', 'customer_name', 'subtotal', 'discount',
            'total_amount', 'payment_method', 'items', 'created_at'
        ]


