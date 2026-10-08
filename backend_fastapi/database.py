from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# PostgreSQL connection string (asyncpg driver use ho raha hai)
# Note: apna postgres password yahan zaroor update karein
DATABASE_URL = "postgresql+asyncpg://postgres:Ahmad1237656@localhost:5432/martflow_db"

engine = create_async_engine(DATABASE_URL, echo=False, pool_size=10, max_overflow=20)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

Base = declarative_base()

# Dependency: Har request ke liye independent async DB session provide karta hai
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()