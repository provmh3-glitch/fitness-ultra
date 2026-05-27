'use client';

import { useState } from 'react';

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <h2 style={{ marginBottom: '2rem' }}>🌤️ Weather Search</h2>

      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? '🔍 Searching...' : '🔍 Search'}
        </button>
      </form>

      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c00',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem',
        }}>
          {error}
        </div>
      )}

      {weather && (
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>{weather.city}</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
          }}>
            <div>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Temperature</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{weather.temperature}°F</p>
            </div>
            <div>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Condition</p>
              <p style={{ fontSize: '1.2rem' }}>{weather.condition}</p>
            </div>
            <div>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Humidity</p>
              <p style={{ fontSize: '1.2rem' }}>{weather.humidity}%</p>
            </div>
            <div>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Wind Speed</p>
              <p style={{ fontSize: '1.2rem' }}>{weather.windSpeed} mph</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
