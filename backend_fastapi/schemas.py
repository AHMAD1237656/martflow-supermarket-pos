from pydantic import BaseModel, Field
from typing import List, Optional
from decimal import Decimal

# 1. Product Barcode Response
class ProductBarcodeResponse(BaseModel):
    id: int
    name: str
    barcode: str
    sku: str
    sale_price: Decimal
    quantity: int
    is_active: bool

    class Config:
        from_attributes = True

# 2. Cart Item (Frontend se aane wala single item)
class CartItem(BaseModel):
    product_id: int
    quantity: int = Field(gt=0, description="Quantity must be at least 1")
    unit_price: Decimal

# 3. Checkout Request Payload
class CheckoutRequest(BaseModel):
    cashier_id: int
    customer_id: Optional[int] = None
    subtotal: Decimal
    discount: Decimal = Decimal("0.00")
    total_amount: Decimal
    payment_method: str = Field(default="CASH", pattern="^(CASH|CARD|DIGITAL)$")
    items: List[CartItem]

# 4. Checkout Success Response
class CheckoutResponse(BaseModel):
    invoice_number: str
    total_amount: Decimal
    payment_status: str
    message: str