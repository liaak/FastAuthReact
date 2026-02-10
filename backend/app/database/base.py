from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from backend.app.core.config import settings

#Create db engine
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    echo=False
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()