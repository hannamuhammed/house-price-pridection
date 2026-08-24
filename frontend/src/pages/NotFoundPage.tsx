import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '100px auto', 
      textAlign: 'center',
      padding: '30px'
    }}>
      <h1 style={{ fontSize: '5rem', margin: '0' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: '#666', margin: '20px 0' }}>
        The page you're looking for doesn't exist.
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
        Go Home
      </Link>
    </div>
  );
}