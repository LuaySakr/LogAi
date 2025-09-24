from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Anomaly(Base):
    __tablename__ = "anomalies"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    upload_id = Column(Integer, ForeignKey("uploads.id"))
    type = Column(String, nullable=False)  # error_spike, unusual_pattern, etc.
    description = Column(Text, nullable=False)
    confidence_score = Column(Float)  # 0.0 to 1.0
    severity = Column(String)  # low, medium, high, critical
    context = Column(Text)  # JSON context data
    status = Column(String, default="open")  # open, acknowledged, resolved
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    organization = relationship("Organization", back_populates="anomalies")
    upload = relationship("Upload", back_populates="anomalies")