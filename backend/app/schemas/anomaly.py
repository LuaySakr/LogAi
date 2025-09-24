from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class AnomalyBase(BaseModel):
    type: str
    description: str
    confidence_score: Optional[float] = None
    severity: Optional[str] = None
    context: Optional[str] = None
    status: str = "open"


class AnomalyCreate(AnomalyBase):
    organization_id: int
    upload_id: int


class AnomalyUpdate(BaseModel):
    description: Optional[str] = None
    severity: Optional[str] = None
    context: Optional[str] = None
    status: Optional[str] = None


class Anomaly(AnomalyBase):
    id: int
    organization_id: int
    upload_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True