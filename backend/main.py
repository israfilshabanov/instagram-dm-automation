from fastapi import FastAPI
from dotenv import load_dotenv
import os

# Çevresel değişkenleri yükle
load_dotenv()

app = FastAPI(
    title="Instagram DM Automation API",
    description="ManyChat + OpenAI GPT-4 Entegrasyon Backend'i",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Instagram DM Otomasyonu API Çalışıyor (Python/FastAPI)"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
