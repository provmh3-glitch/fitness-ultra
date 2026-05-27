import HeroVisual from './components/HeroVisual';

export default function Home() {
  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 2rem',
    }}>
      <section className="hero-hero" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        marginBottom: '4rem',
      }}>
        <div>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡ Fitness Ultra</h2>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem', maxWidth: '660px', lineHeight: 1.75 }}>
            Complete fitness tracking with Apple Watch integration, personalized workouts, custom nutrition plans, and real-time weather.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/fitness" className="homeLink" style={{
              padding: '1rem 2rem',
              backgroundColor: '#007aff',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '999px',
              fontWeight: '700',
              minWidth: '170px',
              textAlign: 'center',
            }}>
              🏃 Fitness Tracking
            </a>
            <a href="/workouts" className="homeLink" style={{
              padding: '1rem 2rem',
              backgroundColor: '#fff',
              color: '#007aff',
              textDecoration: 'none',
              borderRadius: '999px',
              fontWeight: '700',
              minWidth: '170px',
              textAlign: 'center',
              border: '1px solid rgba(0,122,255,0.2)',
            }}>
              📅 Workout Plans
            </a>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginTop: '3rem',
      }}>
        <a href="/fitness" className="featureCard" style={{
          padding: '2rem',
          backgroundColor: '#FF6B6B',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textDecoration: 'none',
          color: '#fff',
          cursor: 'pointer',
          border: '2px solid transparent',
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🏃 Apple Watch Sync</h3>
          <p>Connect your Apple Watch and sync your fitness data in real-time. Track steps, calories, heart rate, and Activity Rings.</p>
        </a>
        <a href="/workouts" className="featureCard" style={{
          padding: '2rem',
          backgroundColor: '#4ECDC4',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textDecoration: 'none',
          color: '#fff',
          cursor: 'pointer',
          border: '2px solid transparent',
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>📅 Workout Plans</h3>
          <p>Goal-based weekly workout plans designed for weight loss, muscle gain, endurance building, and flexibility improvement.</p>
        </a>
        <a href="/nutrition" className="featureCard" style={{
          padding: '2rem',
          backgroundColor: '#F9A825',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textDecoration: 'none',
          color: '#fff',
          cursor: 'pointer',
          border: '2px solid transparent',
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🍎 Nutrition Plans</h3>
          <p>Customizable meal plans with macro tracking. Choose from weight loss, muscle gain, balanced, or vegan options.</p>
        </a>
        <a href="/workouts" className="featureCard" style={{
          padding: '2rem',
          backgroundColor: '#A78BFA',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textDecoration: 'none',
          color: '#fff',
          cursor: 'pointer',
          border: '2px solid transparent',
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>📊 Workout History</h3>
          <p>View and track all your completed workouts. Monitor your progress over time with detailed exercise logs.</p>
        </a>
        <a href="/weather" className="featureCard" style={{
          padding: '2rem',
          backgroundColor: '#38B6FF',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textDecoration: 'none',
          color: '#fff',
          cursor: 'pointer',
          border: '2px solid transparent',
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🌤️ Weather Search</h3>
          <p>Get accurate weather forecasts for any city. Plan your outdoor workouts based on real-time weather data.</p>
        </a>
        <div style={{
          padding: '2rem',
          backgroundColor: '#06B6D4',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          color: '#fff',
          border: '2px solid transparent',
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>⚡ Ultra-Fast Performance</h3>
          <p>Built with Next.js 14 and TypeScript. Lightning-fast loading times and responsive design on all devices.</p>
        </div>
      </section>
    </main>
  );
}
