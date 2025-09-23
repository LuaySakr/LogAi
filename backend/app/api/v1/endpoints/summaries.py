from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas import summary as summary_schemas
from app.models.summary import Summary

router = APIRouter()

@router.post("/", response_model=summary_schemas.Summary)
def create_summary(
    summary: summary_schemas.SummaryCreate,
    db: Session = Depends(get_db)
):
    """Create a new summary"""
    db_summary = Summary(**summary.dict())
    db.add(db_summary)
    db.commit()
    db.refresh(db_summary)
    return db_summary

@router.get("/", response_model=List[summary_schemas.Summary])
def get_summaries(
    skip: int = 0,
    limit: int = 100,
    organization_id: int = None,
    db: Session = Depends(get_db)
):
    """Get all summaries"""
    query = db.query(Summary)
    if organization_id:
        query = query.filter(Summary.organization_id == organization_id)
    summaries = query.offset(skip).limit(limit).all()
    return summaries

@router.get("/{summary_id}", response_model=summary_schemas.Summary)
def get_summary(summary_id: int, db: Session = Depends(get_db)):
    """Get a specific summary"""
    summary = db.query(Summary).filter(Summary.id == summary_id).first()
    if not summary:
        raise HTTPException(status_code=404, detail="Summary not found")
    return summary

@router.get("/upload/{upload_id}", response_model=List[summary_schemas.Summary])
def get_summaries_by_upload(upload_id: int, db: Session = Depends(get_db)):
    """Get summaries for a specific upload"""
    summaries = db.query(Summary).filter(Summary.upload_id == upload_id).all()
    return summaries