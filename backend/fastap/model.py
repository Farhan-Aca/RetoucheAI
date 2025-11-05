import os
from PIL import Image 
from rembg import remove
from fastapi import FastAPI,UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://visionia.pro",   # ton site en HTTP
        "https://visionia.pro",  # ajoute-le aussi si/ quand tu passes en HTTPS
        "http://www.visionia.pro",
        "https://www.visionia.pro",
    ],                  # En dev tu peux mettre ["*"] pour simplifier
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,  # mets True seulement si tu utilises des cookies/credentials
)

print("test deploy")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    data = await file.read()          # lit les octets de l'image envoyée
    out = remove(data)                # supprime l’arrière-plan (bytes -> bytes PNG)
    return Response(content=out, media_type="image/png")