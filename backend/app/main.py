from fastapi import FastAPI, Depends, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from contextlib import asynccontextmanager

from api.db.db import create_db_and_tables
from api.routes.routes_auth import router as auth_router
from api.routes.routes_projects import router as defects_router
from api.routes.routes_files import router as files_router
from api.deps import get_current_user

from dotenv import load_dotenv
load_dotenv()

UPLOAD_DIR = os.environ.get("UPLOAD_DIR", "uploads")
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # start
    create_db_and_tables()
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    yield
    # stop

app = FastAPI(title="BotchBase API", lifespan=lifespan)

# cors
origins = [o.strip() for o in ALLOWED_ORIGINS.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(auth_router, prefix="/api/auth")
# app.include_router(projects_router, prefix="/api/projects")
app.include_router(defects_router, prefix="/api/defects")
app.include_router(files_router, prefix="/api/attachments")

app.include_router(auth_router, prefix="/api/auth")
app.include_router(defects_router, prefix="/api/defects")
app.include_router(files_router, prefix="/api/attachments")

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

me_router = APIRouter()

@me_router.get("/me")
def me(current_user = Depends(get_current_user)):
    return current_user

app.include_router(me_router, prefix="/api")