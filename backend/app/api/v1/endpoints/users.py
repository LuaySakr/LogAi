from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas import user as user_schemas
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=user_schemas.User)
def create_user(
    user: user_schemas.UserCreate,
    db: Session = Depends(get_db)
):
    """Create a new user"""
    # TODO: Hash password
    user_data = user.dict()
    user_data["hashed_password"] = user_data.pop("password")  # Simplified for now
    
    db_user = User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/", response_model=List[user_schemas.User])
def get_users(
    skip: int = 0,
    limit: int = 100,
    organization_id: int = None,
    db: Session = Depends(get_db)
):
    """Get all users"""
    query = db.query(User)
    if organization_id:
        query = query.filter(User.organization_id == organization_id)
    users = query.offset(skip).limit(limit).all()
    return users

@router.get("/{user_id}", response_model=user_schemas.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get a specific user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user