import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fitness Ultra',
  description: 'Ultra-fast fitness tracking with Apple Watch integration',
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
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>⚡ Fitness Ultra</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
            <a href="/fitness" style={{ color: '#fff', textDecoration: 'none' }}>🏃 Fitness</a>
            <a href="/weather" style={{ color: '#fff', textDecoration: 'none' }}>🌤️ Weather</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
