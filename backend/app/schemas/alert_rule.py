from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class AlertRuleBase(BaseModel):
    name: str
    description: Optional[str] = None
    conditions: str
    actions: str
    is_active: bool = True


class AlertRuleCreate(AlertRuleBase):
    organization_id: int


class AlertRuleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    conditions: Optional[str] = None
    actions: Optional[str] = None
    is_active: Optional[bool] = None


class AlertRule(AlertRuleBase):
    id: int
    organization_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True