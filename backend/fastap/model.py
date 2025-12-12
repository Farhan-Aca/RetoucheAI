import os
from PIL import Image 
from rembg import remove
from fastapi import FastAPI,UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],                  # En dev tu peux mettre ["*"] pour simplifier
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,  # mets True seulement si tu utilises des cookies/credentials
)

print("test deploy")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # 1. lire l'image
    data = await file.read()

    # 2. traitement
    out = remove(data)

    # 3. créer un chemin unique dans S3
    filename = file.filename.replace(" ", "_")
    s3_path = f"images/processed/{filename}"

    # 4. upload dans S3
    s3_url = upload_bytes_to_s3(out, s3_path)

    # 5. retourner l’URL S3 au frontend
    return {
        "status": "success",
        "s3_url": s3_url
    }