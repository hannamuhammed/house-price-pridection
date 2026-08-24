import { useLocation, Link } from 'react-router-dom';

export default function ResultPage() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
        <h1>No prediction found</h1>
        <Link to="/" style={{ color: '#4CAF50', textDecoration: 'none' }}>
          ← Go back and make a prediction
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '100px auto', 
      textAlign: 'center',
      padding: '30px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>Predicted Price</h1>
      <div style={{ 
        fontSize: '3.5rem', 
        fontWeight: 'bold', 
        color: '#4CAF50',
        margin: '30px 0',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        {result.formatted_price}
      </div>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>
        Raw value: ₹ {result.predicted_price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
      </p>
      <Link 
        to="/" 
        style={{ 
          display: 'inline-block',
          padding: '12px 30px',
          backgroundColor: '#4CAF50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
      >
        ← Make Another Prediction
      </Link>
    </div>
  );
}