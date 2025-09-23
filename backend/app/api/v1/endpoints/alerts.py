from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas import alert_rule as alert_schemas, anomaly as anomaly_schemas
from app.models.alert_rule import AlertRule
from app.models.anomaly import Anomaly

router = APIRouter()

@router.post("/rules", response_model=alert_schemas.AlertRule)
def create_alert_rule(
    alert_rule: alert_schemas.AlertRuleCreate,
    db: Session = Depends(get_db)
):
    """Create a new alert rule"""
    db_alert_rule = AlertRule(**alert_rule.dict())
    db.add(db_alert_rule)
    db.commit()
    db.refresh(db_alert_rule)
    return db_alert_rule

@router.get("/rules", response_model=List[alert_schemas.AlertRule])
def get_alert_rules(
    skip: int = 0,
    limit: int = 100,
    organization_id: int = None,
    db: Session = Depends(get_db)
):
    """Get all alert rules"""
    query = db.query(AlertRule)
    if organization_id:
        query = query.filter(AlertRule.organization_id == organization_id)
    alert_rules = query.offset(skip).limit(limit).all()
    return alert_rules

@router.get("/rules/{rule_id}", response_model=alert_schemas.AlertRule)
def get_alert_rule(rule_id: int, db: Session = Depends(get_db)):
    """Get a specific alert rule"""
    alert_rule = db.query(AlertRule).filter(AlertRule.id == rule_id).first()
    if not alert_rule:
        raise HTTPException(status_code=404, detail="Alert rule not found")
    return alert_rule

@router.get("/anomalies", response_model=List[anomaly_schemas.Anomaly])
def get_anomalies(
    skip: int = 0,
    limit: int = 100,
    organization_id: int = None,
    status: str = None,
    db: Session = Depends(get_db)
):
    """Get all anomalies"""
    query = db.query(Anomaly)
    if organization_id:
        query = query.filter(Anomaly.organization_id == organization_id)
    if status:
        query = query.filter(Anomaly.status == status)
    anomalies = query.offset(skip).limit(limit).all()
    return anomalies

@router.get("/anomalies/{anomaly_id}", response_model=anomaly_schemas.Anomaly)
def get_anomaly(anomaly_id: int, db: Session = Depends(get_db)):
    """Get a specific anomaly"""
    anomaly = db.query(Anomaly).filter(Anomaly.id == anomaly_id).first()
    if not anomaly:
        raise HTTPException(status_code=404, detail="Anomaly not found")
    return anomaly

@router.put("/anomalies/{anomaly_id}/status")
def update_anomaly_status(
    anomaly_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    """Update anomaly status (acknowledge, resolve, etc.)"""
    anomaly = db.query(Anomaly).filter(Anomaly.id == anomaly_id).first()
    if not anomaly:
        raise HTTPException(status_code=404, detail="Anomaly not found")
    
    anomaly.status = status
    db.commit()
    return {"message": "Status updated successfully"}