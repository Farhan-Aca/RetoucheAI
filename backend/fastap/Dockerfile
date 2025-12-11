FROM python:3.11-slim

# Évite les fichiers pyc et met le log en direct
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Installer dépendances système nécessaires à rembg / Pillow
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 libsm6 libxext6 libxrender1 curl \
 && rm -rf /var/lib/apt/lists/*

# Installer les paquets Python
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copier ton code
COPY model.py .


# Exposer le port FastAPI
EXPOSE 8000

# Commande de démarrage
CMD ["uvicorn", "model:app", "--host", "0.0.0.0", "--port", "8000"]

