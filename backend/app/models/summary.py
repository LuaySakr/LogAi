from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Summary(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    upload_id = Column(Integer, ForeignKey("uploads.id"))
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    key_issues = Column(Text)  # JSON array of key issues
    severity = Column(String)  # low, medium, high, critical
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    organization = relationship("Organization", back_populates="summaries")
    upload = relationship("Upload", back_populates="summaries")