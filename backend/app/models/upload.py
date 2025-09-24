from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, BigInteger
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Upload(Base):
    __tablename__ = "uploads"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    filename = Column(String, nullable=False)
    s3_key = Column(String, nullable=False)
    file_size = Column(BigInteger)
    content_type = Column(String)
    status = Column(String, default="pending")  # pending, processing, completed, failed
    metadata = Column(Text)  # JSON metadata about the log file
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    organization = relationship("Organization", back_populates="uploads")
    summaries = relationship("Summary", back_populates="upload")
    anomalies = relationship("Anomaly", back_populates="upload")