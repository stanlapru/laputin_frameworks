from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class Role(str, Enum):
    manager = "manager"
    engineer = "engineer"
    observer = "observer"

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: Optional[str]
    role: Optional[Role] = Role.engineer

class UserRead(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str]
    role: Role
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str]

class ProjectRead(BaseModel):
    id: int
    name: str
    description: Optional[str]

class DefectCreate(BaseModel):
    title: str
    description: Optional[str]
    priority: Optional[int] = 2
    project_id: Optional[int]
    assigned_to_id: Optional[int]
    due_date: Optional[datetime]

class DefectRead(BaseModel):
    id: int
    title: str
    description: Optional[str]
    priority: int
    project_id: Optional[int]
    assigned_to_id: Optional[int]
    status: str
    due_date: Optional[datetime]
    created_by_id: Optional[int]
    created_at: datetime

class CommentCreate(BaseModel):
    text: str

class StatusChange(BaseModel):
    to_status: str
    comment: Optional[str]