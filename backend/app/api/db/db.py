from sqlmodel import create_engine, SQLModel, Session
import os
from typing import Optional

DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///./botchbase.db')

_engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith('sqlite') else {}, echo=False)

def get_engine():
    return _engine

def create_db_and_tables():
    SQLModel.metadata.create_all(_engine)

def get_session():
    with Session(_engine) as session:
        yield session