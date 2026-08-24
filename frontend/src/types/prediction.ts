export interface PredictionRequest {
  location: string;
  carpet_area_sqft: number;
  floor_num: number;
  bathroom: number;
  balcony: number;
  furnishing: string;
  transaction: string;
}

export interface PredictionResponse {
  predicted_price: number;
  formatted_price: string;
}