from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class UploadBase(BaseModel):
    filename: str
    s3_key: str
    file_size: Optional[int] = None
    content_type: Optional[str] = None
    status: str = "pending"
    metadata: Optional[str] = None


class UploadCreate(UploadBase):
    organization_id: int


class UploadUpdate(BaseModel):
    status: Optional[str] = None
    metadata: Optional[str] = None


class Upload(UploadBase):
    id: int
    organization_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True