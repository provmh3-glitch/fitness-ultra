export default function Home() {
  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 2rem',
    }}>
      <section style={{
        textAlign: 'center',
        marginBottom: '4rem',
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡ Fitness Ultra</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
          Track your fitness with Apple Watch integration + real-time weather updates
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/fitness" style={{
            padding: '1rem 2rem',
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
          }}>
            🏃 Start Fitness Tracking
          </a>
          <a href="/weather" style={{
            padding: '1rem 2rem',
            backgroundColor: '#333',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
          }}>
            🌤️ Check Weather
          </a>
        </div>
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem',
      }}>
        <div style={{
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ marginBottom: '1rem' }}>🏃 Apple Watch Sync</h3>
          <p>Connect your Apple Watch and sync your fitness data in real-time. Track steps, calories, and heart rate.</p>
        </div>
        <div style={{
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ marginBottom: '1rem' }}>🌤️ Weather Integration</h3>
          <p>Get accurate weather forecasts for your location. Plan your workouts based on real-time weather data.</p>
        </div>
        <div style={{
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ marginBottom: '1rem' }}>📊 Analytics Dashboard</h3>
          <p>Visualize your fitness trends and progress. Get insights into your daily activity and performance metrics.</p>
        </div>
      </section>
    </main>
  );
}
