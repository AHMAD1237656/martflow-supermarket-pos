from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Category, Product, Customer, Supplier, Purchase, PurchaseItem, Sale, SaleItem

# 1. Custom User Admin
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'role', 'phone', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        ('Mart Custom Fields', {'fields': ('role', 'phone')}),
    )

# 2. Product Admin
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'sku', 'barcode', 'category', 'sale_price', 'quantity', 'min_stock_limit', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['name', 'sku', 'barcode']

# 3. Customer Admin
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'loyalty_points', 'created_at']
    search_fields = ['name', 'phone']

# 4. Supplier Admin
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'contact_person', 'phone']
    search_fields = ['name', 'phone']

# 5. Purchase Order Inlines
class PurchaseItemInline(admin.TabularInline):
    model = PurchaseItem
    extra = 1

class PurchaseAdmin(admin.ModelAdmin):
    list_display = ['po_number', 'supplier', 'total_amount', 'payment_status', 'created_at']
    list_filter = ['payment_status']
    inlines = [PurchaseItemInline]

# 6. Sale / POS Inlines
class SaleItemInline(admin.TabularInline):
    model = SaleItem
    extra = 0

class SaleAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'cashier', 'customer', 'total_amount', 'payment_method', 'created_at']
    list_filter = ['payment_method']
    inlines = [SaleItemInline]

# Register models
admin.site.register(User, CustomUserAdmin)
admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Supplier, SupplierAdmin)
admin.site.register(Purchase, PurchaseAdmin)
admin.site.register(Sale, SaleAdmin)