from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class SummaryBase(BaseModel):
    title: str
    content: str
    key_issues: Optional[str] = None
    severity: Optional[str] = None


class SummaryCreate(SummaryBase):
    organization_id: int
    upload_id: int


class SummaryUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    key_issues: Optional[str] = None
    severity: Optional[str] = None


class Summary(SummaryBase):
    id: int
    organization_id: int
    upload_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True