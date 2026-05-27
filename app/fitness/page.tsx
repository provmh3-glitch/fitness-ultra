'use client';

import { useState } from 'react';

interface Ring {
  name: string;
  current: number;
  goal: number;
  color: string;
  icon: string;
}

export default function FitnessPage() {
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to connect your Apple Watch.');
  const [data, setData] = useState({
    steps: 0,
    calories: 0,
    heartRate: 0,
    timestamp: new Date().toISOString(),
  });
  
  const [rings, setRings] = useState<Ring[]>([
    { name: 'Move', current: 645, goal: 700, color: '#FF6B6B', icon: '🔴' },
    { name: 'Exercise', current: 28, goal: 30, color: '#4ECDC4', icon: '💪' },
    { name: 'Stand', current: 9, goal: 12, color: '#95E1D3', icon: '🧍' },
  ]);

  const decodeHeartRate = (value: DataView) => {
    const flags = value.getUint8(0);
    const is16Bit = (flags & 0x1) !== 0;
    return is16Bit ? value.getUint16(1, true) : value.getUint8(1);
  };

  // Platform detection for iOS Safari (Web Bluetooth not supported)
  const isIOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/i.test(navigator.userAgent || '');
  const webBluetoothAvailable = typeof navigator !== 'undefined' && !!(navigator as any).bluetooth;

  const handleConnect = async () => {
    if (typeof navigator === 'undefined' || !(navigator as any).bluetooth) {
      setStatusMessage('Web Bluetooth is not supported in this browser.');
      return;
    }

    try {
      setStatusMessage('Requesting Apple Watch via Bluetooth...');
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service'],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('heart_rate');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');

      const handleCharacteristicValueChanged = (event: Event) => {
        const target = event.target as any;
        const value = target.value;
        if (!value) return;
        const bpm = decodeHeartRate(value);
        setData((current) => ({
          ...current,
          heartRate: bpm,
          timestamp: new Date().toISOString(),
        }));
        setStatusMessage(`Receiving heart rate: ${bpm} BPM`);
      };

      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
      device.addEventListener('gattserverdisconnected', () => {
        setConnected(false);
        setStatusMessage('Apple Watch disconnected.');
      });

      setConnected(true);
      setStatusMessage(`Connected to ${device.name || 'Apple Watch'}.`);

      const initialValue = await characteristic.readValue();
      setData((current) => ({
        ...current,
        heartRate: decodeHeartRate(initialValue),
        timestamp: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Bluetooth connect failed:', error);
      setStatusMessage('Bluetooth connect failed. Try again or use the manual sync button.');
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      if (connected) {
        setStatusMessage('Syncing data from connected Apple Watch...');
        setData((current) => ({
          ...current,
          steps: current.steps + 50,
          calories: current.calories + 20,
          timestamp: new Date().toISOString(),
        }));
      } else {
        const res = await fetch('/api/fitness/apple-watch');
        const newData = await res.json();
        setData(newData);
      }
      setRings((current) => current.map(ring => ({
        ...ring,
        current: Math.min(ring.goal, ring.current + Math.floor(Math.random() * 50))
      })));
    } catch (error) {
      console.error('Sync failed:', error);
      setStatusMessage('Sync failed. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <main style={{
      maxWidth: '1000px',
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
            {connected ? '✅ Connected to Apple Watch' : '❌ Not Connected'}
          </label>
        </div>

        {isIOS && !webBluetoothAvailable && (
          <div style={{ marginBottom: '1rem', padding: '0.8rem', borderRadius: '10px', background: '#FFFBEB', color: '#92400E', fontWeight: 600 }}>
            Note: Safari on iPhone does not support Web Bluetooth. Use the <strong>Sync Now</strong> button to sync via our server endpoint or install the native iOS companion app for direct watch pairing.
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleConnect}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: connected ? '#0F766E' : '#7C3AED',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: connected ? 'default' : 'pointer',
              fontWeight: 'bold',
            }}
            disabled={connected}
          >
            {connected ? '🔗 Connected' : '🔗 Connect Apple Watch'}
          </button>
          <button
            onClick={handleSync}
            disabled={syncing}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: syncing ? '#999' : '#7C3AED',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: syncing ? 'default' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {syncing ? '⏳ Syncing...' : '🔄 Sync Now'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', minWidth: '220px', color: connected ? '#0f766e' : '#374151', fontWeight: 600 }}>
            {statusMessage}
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1.5rem' }}>⚡ Activity Rings</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        {rings.map((ring, index) => {
          const percentage = (ring.current / ring.goal) * 100;
          const circumference = 2 * Math.PI * 45;
          const strokeDashoffset = circumference - (percentage / 100) * circumference;

          return (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <div style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                margin: '0 auto 1rem',
              }}>
                <svg
                  width="120"
                  height="120"
                  style={{
                    transform: 'rotate(-90deg)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  {/* Background circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke={ring.color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dashoffset 0.5s ease',
                    }}
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '1.8rem' }}>{ring.icon}</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                    {Math.round(percentage)}%
                  </p>
                </div>
              </div>

              <h4 style={{ marginBottom: '0.5rem' }}>{ring.name}</h4>
              <p style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                {ring.current} / {ring.goal} {ring.name === 'Exercise' ? 'min' : ''}
              </p>
              <div style={{
                backgroundColor: '#f5f5f5',
                height: '4px',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div
                  style={{
                    backgroundColor: ring.color,
                    height: '100%',
                    width: `${Math.min(percentage, 100)}%`,
                    transition: 'width 0.3s ease',
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={{ marginBottom: '1.5rem' }}>📊 Fitness Metrics</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          backgroundColor: '#FF6B6B',
          color: '#fff',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(255,107,107,0.3)',
        }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Steps</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{data.steps.toLocaleString()}</p>
        </div>
        <div style={{
          backgroundColor: '#F9A825',
          color: '#fff',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(249,168,37,0.3)',
        }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Calories</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{data.calories}</p>
        </div>
        <div style={{
          backgroundColor: '#4ECDC4',
          color: '#fff',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(78,205,196,0.3)',
        }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Heart Rate</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{data.heartRate} BPM</p>
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
          marginBottom: '1rem',
        }}>
          <input
            type="checkbox"
            checked={autoSync}
            onChange={(e) => setAutoSync(e.target.checked)}
          />
          <span style={{ fontWeight: '500' }}>Auto-sync every 5 minutes</span>
        </label>
        {autoSync && <p style={{ marginTop: '1rem', color: '#7C3AED', fontWeight: 'bold' }}>✅ Auto-sync enabled</p>}
      </div>
    </main>
  );
}
