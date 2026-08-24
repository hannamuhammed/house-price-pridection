from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import joblib
import os

model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model_path = os.path.join(os.path.dirname(__file__), "..", "models", "house_price.pkl")
    model = joblib.load(model_path)
    print("✅ Model loaded successfully!")
    yield
    print("👋 Shutting down...")

app = FastAPI(title="House Price Prediction API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api.routes import prediction
app.include_router(prediction.router)

@app.get("/")
def root():
    return {"message": "House Price Prediction API", "status": "running"}