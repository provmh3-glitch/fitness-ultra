'use client';

import { useState } from 'react';

export default function FitnessPage() {
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [data, setData] = useState({
    steps: 0,
    calories: 0,
    heartRate: 0,
  });

  const handleConnect = async () => {
    setConnected(true);
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/fitness/apple-watch');
      const newData = await res.json();
      setData(newData);
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <main style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <h2 style={{ marginBottom: '2rem' }}>🏃 Apple Watch Dashboard</h2>

      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
          }}>
            <input
              type="checkbox"
              checked={connected}
              onChange={(e) => setConnected(e.target.checked)}
            />
            {connected ? '✅ Connected' : '❌ Not Connected'}
          </label>
        </div>

        <button
          onClick={handleConnect}
          style={{
            marginRight: '1rem',
            backgroundColor: connected ? '#666' : '#000',
          }}
          disabled={connected}
        >
          {connected ? '🔗 Connected' : '🔗 Connect'}
        </button>
        <button
          onClick={handleSync}
          disabled={!connected || syncing}
          style={{
            backgroundColor: syncing ? '#666' : '#000',
          }}
        >
          {syncing ? '⏳ Syncing...' : '🔄 Sync Now'}
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
        }}>
          <h3 style={{ color: '#666', marginBottom: '0.5rem' }}>Steps</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.steps}</p>
        </div>
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
        }}>
          <h3 style={{ color: '#666', marginBottom: '0.5rem' }}>Calories</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.calories}</p>
        </div>
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
        }}>
          <h3 style={{ color: '#666', marginBottom: '0.5rem' }}>Heart Rate</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.heartRate} BPM</p>
        </div>
      </div>

      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={autoSync}
            onChange={(e) => setAutoSync(e.target.checked)}
          />
          Auto-sync every 5 minutes
        </label>
        {autoSync && <p style={{ marginTop: '1rem', color: '#666' }}>✅ Auto-sync enabled</p>}
      </div>
    </main>
  );
}
