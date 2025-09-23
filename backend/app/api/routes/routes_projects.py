from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from .. import models, schemas
from ..db.db import get_session
from ..deps import require_role

router = APIRouter()

@router.post('/', response_model=schemas.ProjectRead)
def create_project(project_in: schemas.ProjectCreate, db: Session = Depends(get_session), user: models.User = Depends(require_role(['manager']))):
    project = models.Project(name=project_in.name, description=project_in.description)
    db.add(project)
    db.commit()