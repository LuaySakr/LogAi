from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas import organization as org_schemas
from app.models.organization import Organization

router = APIRouter()

@router.post("/", response_model=org_schemas.Organization)
def create_organization(
    organization: org_schemas.OrganizationCreate,
    db: Session = Depends(get_db)
):
    """Create a new organization"""
    db_org = Organization(**organization.dict())
    db.add(db_org)
    db.commit()
    db.refresh(db_org)
    return db_org

@router.get("/", response_model=List[org_schemas.Organization])
def get_organizations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all organizations"""
    organizations = db.query(Organization).offset(skip).limit(limit).all()
    return organizations

@router.get("/{org_id}", response_model=org_schemas.Organization)
def get_organization(org_id: int, db: Session = Depends(get_db)):
    """Get a specific organization"""
    organization = db.query(Organization).filter(Organization.id == org_id).first()
    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")
    return organization

@router.put("/{org_id}", response_model=org_schemas.Organization)
def update_organization(
    org_id: int,
    organization: org_schemas.OrganizationUpdate,
    db: Session = Depends(get_db)
):
    """Update an organization"""
    db_org = db.query(Organization).filter(Organization.id == org_id).first()
    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    update_data = organization.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_org, field, value)
    
    db.commit()
    db.refresh(db_org)
    return db_org