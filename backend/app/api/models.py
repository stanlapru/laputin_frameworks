from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from enum import Enum
from datetime import datetime

class Role(str, Enum):
    manager = "manager"
    engineer = "engineer"
    observer = "observer"

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    full_name: Optional[str] = None
    hashed_password: str
    role: Role = Role.engineer
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None

class DefectStatus(str, Enum):
    new = "new"
    in_work = "in_work"
    under_review = "under_review"
    closed = "closed"
    cancelled = "cancelled"

class Defect(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    priority: int = 2
    project_id: Optional[int] = Field(default=None, foreign_key="project.id")
    assigned_to_id: Optional[int] = Field(default=None, foreign_key="user.id")
    status: DefectStatus = DefectStatus.new
    due_date: Optional[datetime] = None
    created_by_id: Optional[int] = Field(default=None, foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class DefectHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    defect_id: int = Field(foreign_key="defect.id")
    changed_by_id: Optional[int] = Field(foreign_key="user.id")
    from_status: Optional[DefectStatus] = None
    to_status: Optional[DefectStatus] = None
    comment: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Comment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    defect_id: int = Field(foreign_key="defect.id")
    author_id: int = Field(foreign_key="user.id")
    text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Attachment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    defect_id: Optional[int] = Field(default=None, foreign_key="defect.id")
    filename: str
    url: str
    uploaded_by_id: Optional[int] = Field(default=None, foreign_key="user.id")
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)