import { type PredictionRequest } from '../types/prediction';

const API_BASE_URL = "http://127.0.0.1:8001";
export async function predictPrice(data: PredictionRequest): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to get prediction');
  }

  return response.json();
}

export async function getLocations(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/locations`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }

  const data = await response.json();
  return data.locations;
}