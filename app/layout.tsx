import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fitness Ultra',
  description: 'Ultra-fast fitness tracking with Apple Watch integration, workout plans, and nutrition guidance',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
      </head>
      <body>
        <nav className="app-header" style={{ padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/icon.svg" alt="Ultra" className="app-logo" />
            <div>
              <div className="logo-text">Ultra</div>
              <div style={{ fontSize: '12px', color: '#9b9b9b' }}>Fitness</div>
            </div>
          </div>
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
