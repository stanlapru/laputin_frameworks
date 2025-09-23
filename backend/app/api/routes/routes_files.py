from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil, uuid, os
from fastapi import Depends
from ..deps import get_current_user

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), user=Depends(get_current_user)):
    filename = f"{uuid.uuid4().hex}_{os.path.basename(file.filename)}"
    dest = os.path.join("uploads", filename)
    with open(dest, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    url = f"/uploads/{filename}"
    return {"filename": filename, "url": url}
