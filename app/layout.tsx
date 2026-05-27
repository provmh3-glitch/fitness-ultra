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
            <a href="/" className="navLink">Home</a>
            <a href="/goals" className="navLink">🎯 Goals</a>
            <a href="/fitness" className="navLink">🏃 Fitness</a>
            <a href="/workouts" className="navLink">📅 Workouts</a>
            <a href="/nutrition" className="navLink">🍎 Nutrition</a>
            <a href="/weather" className="navLink">🌤️ Weather</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
