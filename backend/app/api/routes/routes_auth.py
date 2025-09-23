import sys
sys.path.append('..')

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from .. import schemas, models
from ..db.db import get_session
from ..auth.auth import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post('/register', response_model=schemas.UserRead)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_session)):
    existing = db.exec(select(models.User).where(models.User.email == user_in.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    user = models.User(email=user_in.email, full_name=user_in.full_name, hashed_password=hash_password(user_in.password), role=user_in.role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post('/login', response_model=schemas.Token)
def login(form_data: dict, db: Session = Depends(get_session)):
    email = form_data.get('email') or form_data.get('username')
    password = form_data.get('password')
    if not email or not password:
        raise HTTPException(status_code=400, detail='Email and password required')
    user = db.exec(select(models.User).where(models.User.email == email)).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    token = create_access_token({'sub': str(user.id), 'role': user.role})
    return {'access_token': token, 'token_type': 'bearer'}

@router.get('/me', response_model=schemas.UserRead)
def me(current_user: models.User = Depends(lambda: None)):
    return current_user