import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictPrice, getLocations } from '../api/predictionClient';

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locations, setLocations] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    location: '',
    carpet_area_sqft: '',
    floor_num: '',
    bathroom: '',
    balcony: '',
    furnishing: 'Furnished',
    transaction: 'New Property'
  });

  useEffect(() => {
    getLocations()
      .then(setLocations)
      .catch(() => setError('Failed to load locations'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await predictPrice({
        ...formData,
        carpet_area_sqft: parseFloat(formData.carpet_area_sqft),
        floor_num: parseInt(formData.floor_num),
        bathroom: parseInt(formData.bathroom),
        balcony: parseInt(formData.balcony)
      });

      navigate('/result', { state: { result } });
    } catch (err) {
      setError('Failed to get prediction. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '50px auto', 
      padding: '30px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🏠 House Price Prediction</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Enter property details to get an estimated price
      </p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Location *
          </label>
          <select
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          >
            <option value="">-- Select Location --</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Carpet Area (sqft) *
          </label>
          <input
            type="number"
            placeholder="e.g., 1000"
            value={formData.carpet_area_sqft}
            onChange={e => setFormData({...formData, carpet_area_sqft: e.target.value})}
            required
            min="100"
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Floor Number *
          </label>
          <input
            type="number"
            placeholder="e.g., 5"
            value={formData.floor_num}
            onChange={e => setFormData({...formData, floor_num: e.target.value})}
            required
            min="0"
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Bathrooms *
          </label>
          <input
            type="number"
            placeholder="e.g., 2"
            value={formData.bathroom}
            onChange={e => setFormData({...formData, bathroom: e.target.value})}
            required
            min="1"
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Balconies *
          </label>
          <input
            type="number"
            placeholder="e.g., 1"
            value={formData.balcony}
            onChange={e => setFormData({...formData, balcony: e.target.value})}
            required
            min="0"
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Furnishing *
          </label>
          <select
            value={formData.furnishing}
            onChange={e => setFormData({...formData, furnishing: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          >
            <option>Furnished</option>
            <option>Semi-Furnished</option>
            <option>Unfurnished</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Transaction Type *
          </label>
          <select
            value={formData.transaction}
            onChange={e => setFormData({...formData, transaction: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          >
            <option>New Property</option>
            <option>Resale</option>
          </select>
        </div>

        {error && (
          <p style={{ 
            color: 'red', 
            backgroundColor: '#ffe6e6', 
            padding: '10px', 
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            ⚠️ {error}
          </p>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Predicting...' : '🔮 Predict Price'}
        </button>
      </form>
    </div>
  );
}