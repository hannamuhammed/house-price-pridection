from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    location: str = Field(..., description="Property location")
    carpet_area_sqft: float = Field(..., gt=0, description="Carpet area in square feet")
    floor_num: int = Field(..., ge=0, description="Floor number")
    bathroom: int = Field(..., ge=1, description="Number of bathrooms")
    balcony: int = Field(..., ge=0, description="Number of balconies")
    furnishing: str = Field(..., description="Furnishing status")
    transaction: str = Field(..., description="Transaction type")

    class Config:
        json_schema_extra = {
            "example": {
                "location": "Andheri East",
                "carpet_area_sqft": 1000.0,
                "floor_num": 5,
                "bathroom": 2,
                "balcony": 1,
                "furnishing": "Furnished",
                "transaction": "New Property"
            }
        }

class PredictionResponse(BaseModel):
    predicted_price: float = Field(..., description="Predicted price in INR")
    formatted_price: str = Field(..., description="Formatted price string")