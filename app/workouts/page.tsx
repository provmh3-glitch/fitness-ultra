'use client';

import { useState } from 'react';

interface Workout {
  day: string;
  type: string;
  duration: number;
  intensity: string;
  calories: number;
  exercises: string[];
}

interface WorkoutRecord {
  id: string;
  date: string;
  time: string;
  type: string;
  duration: number;
  calories: number;
}

const workoutPlans: { [key: string]: Workout[] } = {
  'Weight Loss': [
    {
      day: 'Monday',
      type: 'Cardio',
      duration: 45,
      intensity: 'High',
      calories: 450,
      exercises: ['Running', 'Jump Rope', 'Burpees', 'High Knees']
    },
    {
      day: 'Tuesday',
      type: 'Strength',
      duration: 50,
      intensity: 'Medium',
      calories: 400,
      exercises: ['Squats', 'Push-ups', 'Deadlifts', 'Lunges']
    },
    {
      day: 'Wednesday',
      type: 'HIIT',
      duration: 30,
      intensity: 'Very High',
      calories: 350,
      exercises: ['Mountain Climbers', 'Jumping Jacks', 'Box Jumps', 'Sprints']
    },
    {
      day: 'Thursday',
      type: 'Rest Day',
      duration: 10,
      intensity: 'Light',
      calories: 50,
      exercises: ['Stretching', 'Light Walking']
    },
    {
      day: 'Friday',
      type: 'Cardio',
      duration: 40,
      intensity: 'Medium',
      calories: 380,
      exercises: ['Cycling', 'Elliptical', 'Rowing', 'Stair Climbing']
    },
    {
      day: 'Saturday',
      type: 'Strength',
      duration: 55,
      intensity: 'High',
      calories: 420,
      exercises: ['Bench Press', 'Squats', 'Rows', 'Pull-ups']
    },
    {
      day: 'Sunday',
      type: 'Active Recovery',
      duration: 30,
      intensity: 'Light',
      calories: 120,
      exercises: ['Yoga', 'Walking', 'Stretching']
    }
  ],
  'Muscle Gain': [
    {
      day: 'Monday',
      type: 'Chest & Triceps',
      duration: 60,
      intensity: 'High',
      calories: 350,
      exercises: ['Bench Press', 'Incline Dumbbell Press', 'Cable Flyes', 'Tricep Dips']
    },
    {
      day: 'Tuesday',
      type: 'Back & Biceps',
      duration: 60,
      intensity: 'High',
      calories: 350,
      exercises: ['Deadlifts', 'Barbell Rows', 'Pull-ups', 'Barbell Curls']
    },
    {
      day: 'Wednesday',
      type: 'Rest/Cardio',
      duration: 20,
      intensity: 'Light',
      calories: 100,
      exercises: ['Light Running', 'Stretching']
    },
    {
      day: 'Thursday',
      type: 'Legs',
      duration: 65,
      intensity: 'Very High',
      calories: 380,
      exercises: ['Squats', 'Leg Press', 'Lunges', 'Leg Curls', 'Calf Raises']
    },
    {
      day: 'Friday',
      type: 'Shoulders & Arms',
      duration: 55,
      intensity: 'High',
      calories: 330,
      exercises: ['Overhead Press', 'Lateral Raises', 'Barbell Curls', 'Hammer Curls']
    },
    {
      day: 'Saturday',
      type: 'Full Body',
      duration: 70,
      intensity: 'High',
      calories: 400,
      exercises: ['Squats', 'Bench Press', 'Rows', 'Overhead Press']
    },
    {
      day: 'Sunday',
      type: 'Rest Day',
      duration: 0,
      intensity: 'Rest',
      calories: 0,
      exercises: ['Complete Rest']
    }
  ],
  'Endurance': [
    {
      day: 'Monday',
      type: 'Long Run',
      duration: 60,
      intensity: 'Medium',
      calories: 600,
      exercises: ['Distance Running', 'Steady Pace']
    },
    {
      day: 'Tuesday',
      type: 'Interval Training',
      duration: 40,
      intensity: 'Very High',
      calories: 450,
      exercises: ['Sprint Intervals', 'Recovery Jogs']
    },
    {
      day: 'Wednesday',
      type: 'Cross Training',
      duration: 45,
      intensity: 'Medium',
      calories: 380,
      exercises: ['Cycling', 'Swimming']
    },
    {
      day: 'Thursday',
      type: 'Recovery Run',
      duration: 30,
      intensity: 'Low',
      calories: 250,
      exercises: ['Easy Paced Run']
    },
    {
      day: 'Friday',
      type: 'Tempo Run',
      duration: 45,
      intensity: 'High',
      calories: 480,
      exercises: ['Fast Paced Running']
    },
    {
      day: 'Saturday',
      type: 'Long Cycling',
      duration: 90,
      intensity: 'Medium',
      calories: 700,
      exercises: ['Distance Cycling']
    },
    {
      day: 'Sunday',
      type: 'Rest Day',
      duration: 0,
      intensity: 'Rest',
      calories: 0,
      exercises: ['Complete Rest']
    }
  ],
  'Flexibility & Mobility': [
    {
      day: 'Monday',
      type: 'Yoga Flow',
      duration: 60,
      intensity: 'Medium',
      calories: 150,
      exercises: ['Sun Salutations', 'Vinyasa Flow', 'Savasana']
    },
    {
      day: 'Tuesday',
      type: 'Pilates',
      duration: 45,
      intensity: 'Medium',
      calories: 180,
      exercises: ['Core Work', 'Flexibility', 'Stability']
    },
    {
      day: 'Wednesday',
      type: 'Stretching',
      duration: 40,
      intensity: 'Light',
      calories: 80,
      exercises: ['Deep Stretches', 'Foam Rolling']
    },
    {
      day: 'Thursday',
      type: 'Yin Yoga',
      duration: 75,
      intensity: 'Low',
      calories: 100,
      exercises: ['Long Hold Poses', 'Meditation']
    },
    {
      day: 'Friday',
      type: 'Pilates & Yoga',
      duration: 50,
      intensity: 'Medium',
      calories: 160,
      exercises: ['Reformer Pilates', 'Flexibility Work']
    },
    {
      day: 'Saturday',
      type: 'Active Mobility',
      duration: 45,
      intensity: 'Medium',
      calories: 140,
      exercises: ['Dynamic Stretches', 'Joint Mobility']
    },
    {
      day: 'Sunday',
      type: 'Rest & Recovery',
      duration: 30,
      intensity: 'Light',
      calories: 60,
      exercises: ['Meditation', 'Light Stretching']
    }
  ]
};

const sampleHistory: WorkoutRecord[] = [
  { id: '1', date: '2026-05-23', time: '06:30 AM', type: 'Running', duration: 45, calories: 450 },
  { id: '2', date: '2026-05-22', time: '05:45 PM', type: 'Strength Training', duration: 50, calories: 400 },
  { id: '3', date: '2026-05-21', time: '07:00 AM', type: 'HIIT', duration: 30, calories: 350 },
  { id: '4', date: '2026-05-20', time: '06:00 PM', type: 'Yoga', duration: 60, calories: 150 },
  { id: '5', date: '2026-05-19', time: '06:30 AM', type: 'Cycling', duration: 60, calories: 550 },
];

export default function WorkoutsPage() {
  const [selectedPlan, setSelectedPlan] = useState('Weight Loss');
  const [view, setView] = useState<'plans' | 'history'>('plans');
  const [history, setHistory] = useState(sampleHistory);

  const colors: { [key: string]: string } = {
    'Weight Loss': '#FF6B6B',
    'Muscle Gain': '#4ECDC4',
    'Endurance': '#F9A825',
    'Flexibility & Mobility': '#A78BFA',
  };

  const dayColors = ['#FF6B6B', '#4ECDC4', '#F9A825', '#A78BFA', '#FF69B4', '#38B6FF', '#95E1D3'];

  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <h2 style={{ marginBottom: '2rem' }}>📅 Workout Plans & History</h2>

      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <button
          onClick={() => setView('plans')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: view === 'plans' ? '#7C3AED' : '#ddd',
            color: view === 'plans' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📅 Workout Plans
        </button>
        <button
          onClick={() => setView('history')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: view === 'history' ? '#7C3AED' : '#ddd',
            color: view === 'history' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📊 Workout History
        </button>
      </div>

      {view === 'plans' ? (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            {Object.keys(workoutPlans).map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                style={{
                  padding: '1rem',
                  backgroundColor: selectedPlan === plan ? colors[plan] : '#f0f0f0',
                  color: selectedPlan === plan ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                }}
              >
                {plan}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {workoutPlans[selectedPlan].map((workout, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: dayColors[index % dayColors.length],
                  color: '#fff',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>⚡ {workout.day}</h3>
                <p style={{ marginBottom: '0.5rem', opacity: 0.9 }}>{workout.type}</p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                }}>
                  <div>
                    <p style={{ opacity: 0.8 }}>Duration: {workout.duration} min</p>
                    <p style={{ opacity: 0.8 }}>Calories: {workout.calories}</p>
                  </div>
                  <div>
                    <p style={{ opacity: 0.8 }}>Intensity: {workout.intensity}</p>
                  </div>
                </div>
                <div>
                  <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.9 }}>Exercises:</p>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}>
                    {workout.exercises.map((exercise, i) => (
                      <li key={i} style={{
                        fontSize: '0.85rem',
                        opacity: 0.9,
                        marginBottom: '0.25rem',
                      }}>
                        ✓ {exercise}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>📊 Your Workout History</h3>
          <div style={{
            display: 'grid',
            gap: '1rem',
          }}>
            {history.map((record) => (
              <div
                key={record.id}
                style={{
                  backgroundColor: '#fff',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>Date</p>
                  <p style={{ fontWeight: 'bold' }}>{record.date}</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>Time</p>
                  <p style={{ fontWeight: 'bold' }}>{record.time}</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>Workout Type</p>
                  <p style={{ fontWeight: 'bold' }}>{record.type}</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>Duration</p>
                  <p style={{ fontWeight: 'bold' }}>{record.duration} min</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>Calories</p>
                  <p style={{ fontWeight: 'bold', color: '#FF6B6B' }}>⚡ {record.calories}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
