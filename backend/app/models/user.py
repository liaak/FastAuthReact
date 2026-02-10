from backend.app.database.base import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable = False)
    username = Column(String(255), unique=True, nullable = False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, username={self.username})>"
