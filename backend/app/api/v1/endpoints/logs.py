from typing import List
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas import upload as upload_schemas
from app.models.upload import Upload
from app.services.log_processor import LogProcessor

router = APIRouter()

@router.post("/ingest", response_model=upload_schemas.Upload)
async def ingest_log_file(
    file: UploadFile = File(...),
    organization_id: int = 1,  # TODO: Get from auth
    db: Session = Depends(get_db)
):
    """Ingest a log file for processing"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # TODO: Upload to S3 and create upload record
    upload_data = upload_schemas.UploadCreate(
        organization_id=organization_id,
        filename=file.filename,
        s3_key=f"logs/{organization_id}/{file.filename}",
        file_size=0,  # TODO: Get actual file size
        content_type=file.content_type
    )
    
    db_upload = Upload(**upload_data.dict())
    db.add(db_upload)
    db.commit()
    db.refresh(db_upload)
    
    # TODO: Queue for async processing
    
    return db_upload

@router.get("/", response_model=List[upload_schemas.Upload])
def get_logs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all log uploads"""
    uploads = db.query(Upload).offset(skip).limit(limit).all()
    return uploads

@router.get("/{upload_id}", response_model=upload_schemas.Upload)
def get_log(upload_id: int, db: Session = Depends(get_db)):
    """Get a specific log upload"""
    upload = db.query(Upload).filter(Upload.id == upload_id).first()
    if not upload:
        raise HTTPException(status_code=404, detail="Upload not found")
    return upload