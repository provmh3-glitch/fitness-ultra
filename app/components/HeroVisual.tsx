export default function HeroVisual() {
  return (
    <div className="hero-visual card" style={{ position: 'relative', overflow: 'hidden', minHeight: '420px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(0, 122, 255, 0.18), transparent 26%), radial-gradient(circle at bottom right, rgba(124, 58, 237, 0.14), transparent 24%)' }} />
      <div style={{ position: 'relative', display: 'grid', gap: '1rem', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ color: '#111', maxWidth: '65%' }}>
            <p style={{ margin: 0, color: '#007aff', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Daily Progress</p>
            <h3 style={{ margin: '0.65rem 0 0', fontSize: '2rem', lineHeight: 1.05 }}>Track your rings, reps, and daily wins.</h3>
            <p style={{ margin: '1rem 0 0', color: '#5f5f67', lineHeight: 1.6 }}>A smarter fitness dashboard built for iOS-style clarity with quick metrics, goal cards, and live wearable sync.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="small btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '92px' }}>Apple Watch</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'stretch' }}>
          <div style={{ borderRadius: '22px', background: 'rgba(255,255,255,0.9)', padding: '1.25rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#333' }}>
              <div>
                <p style={{ margin: 0, color: '#9b9b9b', fontSize: '0.9rem' }}>Move</p>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '1.4rem' }}>645</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, color: '#9b9b9b', fontSize: '0.9rem' }}>Goal</p>
                <p style={{ margin: 0, fontWeight: 700 }}>700</p>
              </div>
            </div>
            <div style={{ height: '8px', background: '#f2f2f7', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #007aff, #4f46e5)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ borderRadius: '22px', background: 'rgba(0,0,0,0.82)', color: '#fff', padding: '1.3rem', minHeight: '100%' }}>
              <p style={{ margin: 0, color: '#9b9b9b', fontSize: '0.9rem' }}>Heart Rate</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '2.4rem', fontWeight: 800 }}>128</p>
              <p style={{ margin: '0.75rem 0 0', color: '#8e8e93' }}>BPM • Peak zone</p>
            </div>
            <div style={{ borderRadius: '22px', background: 'rgba(255,255,255,0.9)', padding: '1.3rem' }}>
              <p style={{ margin: 0, color: '#9b9b9b', fontSize: '0.9rem' }}>Workout Tempo</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '96px', background: '#f2f2f7', borderRadius: '14px', padding: '0.75rem', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>10</p>
                  <p style={{ margin: 0, color: '#8e8e93' }}>Reps</p>
                </div>
                <div style={{ minWidth: '96px', background: '#f2f2f7', borderRadius: '14px', padding: '0.75rem', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>5</p>
                  <p style={{ margin: 0, color: '#8e8e93' }}>Sets</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '0.5rem' }}>
          <div style={{ borderRadius: '22px', background: 'rgba(255,255,255,0.96)', padding: '1.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ margin: 0, color: '#9b9b9b' }}>Today</p>
              <span style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '999px', background: '#f2f2f7', color: '#333' }}>Active</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ borderRadius: '18px', background: '#fafafa', padding: '1rem' }}>
                <p style={{ margin: 0, color: '#9b9b9b', fontSize: '0.85rem' }}>Steps</p>
                <p style={{ margin: '0.75rem 0 0', fontWeight: 700 }}>11,400</p>
              </div>
              <div style={{ borderRadius: '18px', background: '#fafafa', padding: '1rem' }}>
                <p style={{ margin: 0, color: '#9b9b9b', fontSize: '0.85rem' }}>Calories</p>
                <p style={{ margin: '0.75rem 0 0', fontWeight: 700 }}>542 kcal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
