'use client';

import { useEffect, useState } from 'react';

type GoalOption = 'Weight Loss' | 'Muscle Gain' | 'Endurance' | 'Balanced';

interface BodyComposition {
  weight: number;
  bodyFat: number;
  muscleMass: number;
  heightFeet: number;
  heightInches: number;
  goal: GoalOption;
}

const STORAGE_KEY = 'fitnessUltraBodyComposition';

function getHeightInInches({ heightFeet, heightInches }: BodyComposition) {
  return heightFeet * 12 + heightInches;
}

function getRecommendedCalories(bodyComp: BodyComposition) {
  const weight = bodyComp.weight;
  switch (bodyComp.goal) {
    case 'Weight Loss':
      return Math.round(weight * 12.5);
    case 'Muscle Gain':
      return Math.round(weight * 18.5);
    case 'Endurance':
      return Math.round(weight * 14.5);
    case 'Balanced':
    default:
      return Math.round(weight * 15);
  }
}

export default function GoalsPage() {
  const [bodyComp, setBodyComp] = useState<BodyComposition>({
    weight: 180,
    bodyFat: 20,
    muscleMass: 35,
    heightFeet: 5,
    heightInches: 10,
    goal: 'Balanced',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBodyComp(JSON.parse(stored));
    }
  }, []);

  const handleChange = (field: keyof BodyComposition, value: number | GoalOption) => {
    setBodyComp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bodyComp));
    setSaved(true);
  };

  const totalHeight = getHeightInInches(bodyComp);
  const bmi = Math.round((bodyComp.weight / ((totalHeight * 0.0254) ** 2)) * 10) / 10;
  const calories = getRecommendedCalories(bodyComp);

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>🎯 Goals & Body Composition</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Enter your body composition and daily goal so workouts and meal plans can be tailored to you.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Current Weight (lbs)
            </label>
            <input
              type="number"
              min={80}
              value={bodyComp.weight}
              onChange={(e) => handleChange('weight', Number(e.target.value))}
              style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Body Fat Percentage (%)
            </label>
            <input
              type="number"
              min={2}
              max={60}
              step={0.1}
              value={bodyComp.bodyFat}
              onChange={(e) => handleChange('bodyFat', Number(e.target.value))}
              style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Muscle Mass (%)
            </label>
            <input
              type="number"
              min={5}
              max={80}
              step={0.1}
              value={bodyComp.muscleMass}
              onChange={(e) => handleChange('muscleMass', Number(e.target.value))}
              style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
                Height (ft)
              </label>
              <input
                type="number"
                min={4}
                max={7}
                value={bodyComp.heightFeet}
                onChange={(e) => handleChange('heightFeet', Number(e.target.value))}
                style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
                Height (in)
              </label>
              <input
                type="number"
                min={0}
                max={11}
                value={bodyComp.heightInches}
                onChange={(e) => handleChange('heightInches', Number(e.target.value))}
                style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Primary Goal
            </label>
            <select
              value={bodyComp.goal}
              onChange={(e) => handleChange('goal', e.target.value as GoalOption)}
              style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
            >
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Endurance">Endurance</option>
              <option value="Balanced">Balanced</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '0.75rem',
              backgroundColor: '#7C3AED',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Save My Goals
          </button>

          {saved && (
            <p style={{ marginTop: '1rem', color: '#22C55E', fontWeight: 'bold' }}>
              Saved! Your workouts and meal plans will now use your body composition.
            </p>
          )}
        </form>

        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Your Current Composition</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                { label: 'Weight', value: `${bodyComp.weight} lbs` },
                { label: 'Body Fat', value: `${bodyComp.bodyFat}%` },
                { label: 'Muscle Mass', value: `${bodyComp.muscleMass}%` },
                { label: 'Height', value: `${bodyComp.heightFeet} ft ${bodyComp.heightInches} in` },
                { label: 'BMI', value: `${bmi}` },
                { label: 'Goal', value: bodyComp.goal },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: '0.75rem', backgroundColor: '#F8FAFC' }}>
                  <span style={{ color: '#4B5563' }}>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Personalized Recommendations</h3>
            <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
              Your current profile suggests a daily intake close to:
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7C3AED' }}>{calories} kcal</p>
            <p style={{ marginTop: '1rem', color: '#6B7280' }}>
              Based on your goal, workouts and nutrition plans across the app will be tuned to your body composition.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
