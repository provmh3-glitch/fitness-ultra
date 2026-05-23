import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fitness Ultra',
  description: 'Ultra-fast fitness tracking with Apple Watch integration, workout plans, and nutrition guidance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          padding: '1rem',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚡ Fitness Ultra
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7C3AED'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>Home</a>
            <a href="/fitness" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7C3AED'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>🏃 Fitness</a>
            <a href="/workouts" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7C3AED'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>📅 Workouts</a>
            <a href="/nutrition" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7C3AED'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>🍎 Nutrition</a>
            <a href="/weather" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7C3AED'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>🌤️ Weather</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
