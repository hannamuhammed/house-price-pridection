from fastapi import APIRouter, HTTPException
from app.schemas.prediction import PredictionRequest, PredictionResponse
import pandas as pd
import app.main as main

router = APIRouter(prefix="/api", tags=["prediction"])

def format_price(price: float) -> str:
    """Format price in Indian currency format"""
    crores = price / 10000000
    lacs = price / 100000
    
    if crores >= 1:
        return f"₹ {crores:.2f} Cr"
    return f"₹ {lacs:.2f} Lac"

@router.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "model_loaded": model is not None
    }

@router.post("/predict", response_model=PredictionResponse)
def predict_price(request: PredictionRequest):
    """Predict house price based on input features"""
    try:
        # Create DataFrame with exact column names used in training
        input_data = pd.DataFrame([{
            "carpet_area_sqft": request.carpet_area_sqft,
            "floor_num": request.floor_num,
            "bathroom": request.bathroom,
            "balcony": request.balcony,
            "location_grouped": request.location,
            "Furnishing": request.furnishing,
            "Transaction": request.transaction
        }])
        
        # Make prediction
        prediction = float(main.model.predict(input_data)[0])
        
        return PredictionResponse(
            predicted_price=prediction,
            formatted_price=format_price(prediction)
        )
    
    except Exception as e:
        import traceback
        print("PREDICTION ERROR:", repr(e))
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

@router.get("/locations")
def get_locations():
    """Get list of available locations"""
    import json
    import os
    
    locations_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "locations.json")
    
    try:
        with open(locations_path, 'r') as f:
            locations = json.load(f)
        return {"locations": locations}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Locations file not found")