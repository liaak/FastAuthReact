from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.database.base import engine, Base
from backend.app.core.config import settings
from backend.app.routers import auth



Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Professional FastAPI + React Authentication System"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": "Welcome to FastAuthReact",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }

@app.get("/healthcheck")
async def health_check():
    return {"status": "healthy"}


