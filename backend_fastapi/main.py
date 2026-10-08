from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from datetime import datetime
import uuid

from database import get_db
from schemas import ProductBarcodeResponse, CheckoutRequest, CheckoutResponse

app = FastAPI(
    title="MartFlow POS Real-Time Engine",
    description="High-Speed Async POS Service for Barcode Scanning & Instant Checkout",
    version="1.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health"])
async def root():
    return {"status": "online", "message": "MartFlow POS Engine is running smoothly"}


# 1. High-Speed Barcode Lookup API
@app.get("/api/pos/scan/{barcode}", response_model=ProductBarcodeResponse, tags=["POS Terminal"])
async def scan_barcode(barcode: str, db: AsyncSession = Depends(get_db)):
    query = text("""
        SELECT id, name, barcode, sku, sale_price, quantity, is_active 
        FROM mart_api_product 
        WHERE barcode = :barcode AND is_active = true
        LIMIT 1
    """)
    result = await db.execute(query, {"barcode": barcode})
    product = result.mappings().first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with barcode '{barcode}' not found or inactive."
        )

    return product


# 2. Instant Checkout & Atomic Stock Deduction API
@app.post("/api/pos/checkout", response_model=CheckoutResponse, tags=["POS Terminal"])
async def checkout(payload: CheckoutRequest, db: AsyncSession = Depends(get_db)):
    if not payload.items:
        raise HTTPException(status_code=400, detail="Cart cannot be empty.")

    # Unique Invoice Number generate karein
    invoice_number = f"INV-{datetime.now().strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:4].upper()}"

    try:
        # Step A: Saare items ka stock verify karein aur lock karein
        for item in payload.items:
            stock_query = text("""
                SELECT id, name, quantity 
                FROM mart_api_product 
                WHERE id = :product_id 
                FOR UPDATE
            """)
            result = await db.execute(stock_query, {"product_id": item.product_id})
            product = result.mappings().first()

            if not product:
                raise HTTPException(
                    status_code=404, 
                    detail=f"Product ID {item.product_id} does not exist."
                )

            if product["quantity"] < item.quantity:
                raise HTTPException(
                    status_code=400,
                    detail=f"Insufficient stock for '{product['name']}'. Available: {product['quantity']}, Requested: {item.quantity}"
                )

        # Step B: Sale Table me entry insert karein
        sale_insert_query = text("""
            INSERT INTO mart_api_sale (
                invoice_number, cashier_id, customer_id, subtotal, 
                discount, total_amount, payment_method, created_at
            ) VALUES (
                :invoice, :cashier, :customer, :subtotal, 
                :discount, :total, :method, NOW()
            ) RETURNING id
        """)
        sale_result = await db.execute(sale_insert_query, {
            "invoice": invoice_number,
            "cashier": payload.cashier_id,
            "customer": payload.customer_id,
            "subtotal": payload.subtotal,
            "discount": payload.discount,
            "total": payload.total_amount,
            "method": payload.payment_method
        })
        sale_id = sale_result.scalar()

        # Step C: Sale Items insert karein aur Product Quantity deduct karein
        for item in payload.items:
            # 1. Sale Item record
            item_insert_query = text("""
                INSERT INTO mart_api_saleitem (
                    sale_id, product_id, quantity, unit_price, total_price
                ) VALUES (
                    :sale_id, :product_id, :qty, :unit_price, :total_price
                )
            """)
            await db.execute(item_insert_query, {
                "sale_id": sale_id,
                "product_id": item.product_id,
                "qty": item.quantity,
                "unit_price": item.unit_price,
                "total_price": item.unit_price * item.quantity
            })

            # 2. Stock inventory auto-deduction
            deduct_stock_query = text("""
                UPDATE mart_api_product 
                SET quantity = quantity - :qty 
                WHERE id = :product_id
            """)
            await db.execute(deduct_stock_query, {
                "qty": item.quantity,
                "product_id": item.product_id
            })

        # Step D: Agar customer attach hai to loyalty points add karein (1 point per 100 spent)
        if payload.customer_id:
            earned_points = int(payload.total_amount // 100)
            if earned_points > 0:
                loyalty_query = text("""
                    UPDATE mart_api_customer 
                    SET loyalty_points = loyalty_points + :points 
                    WHERE id = :cust_id
                """)
                await db.execute(loyalty_query, {
                    "points": earned_points,
                    "cust_id": payload.customer_id
                })

        # Saari changes PostgreSQL me commit karein
        await db.commit()

        return {
            "invoice_number": invoice_number,
            "total_amount": payload.total_amount,
            "payment_status": "COMPLETED",
            "message": "Sale completed successfully and stock deducted."
        }

    except HTTPException:
        await db.rollback()
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Transaction failed: {str(e)}")