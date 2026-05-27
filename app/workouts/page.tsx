'use client';

import { useEffect, useState } from 'react';

interface Exercise {
  name: string;
  sets?: number | string;
  reps?: string;
}

interface Workout {
  day: string;
  type: string;
  duration: number;
  intensity: string;
  calories: number;
  exercises: Array<string | Exercise>;
  reps?: string;
  sets?: string;
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
      exercises: ['Distance Running', 'Steady Pace'],
      reps: 'N/A',
      sets: '1',
    },
    {
      day: 'Tuesday',
      type: 'Interval Training',
      duration: 40,
      intensity: 'Very High',
      calories: 450,
      exercises: ['Sprint Intervals', 'Recovery Jogs'],
      reps: '8-10 intervals',
      sets: '4',
    },
    {
      day: 'Wednesday',
      type: 'Cross Training',
      duration: 45,
      intensity: 'Medium',
      calories: 380,
      exercises: ['Cycling', 'Swimming'],
      reps: 'N/A',
      sets: '1',
    },
    {
      day: 'Thursday',
      type: 'Recovery Run',
      duration: 30,
      intensity: 'Low',
      calories: 250,
      exercises: ['Easy Paced Run'],
      reps: 'N/A',
      sets: '1',
    },
    {
      day: 'Friday',
      type: 'Tempo Run',
      duration: 45,
      intensity: 'High',
      calories: 480,
      exercises: ['Fast Paced Running'],
      reps: 'N/A',
      sets: '1',
    },
    {
      day: 'Saturday',
      type: 'Long Cycling',
      duration: 90,
      intensity: 'Medium',
      calories: 700,
      exercises: ['Distance Cycling'],
      reps: 'N/A',
      sets: '1',
    },
    {
      day: 'Sunday',
      type: 'Rest Day',
      duration: 0,
      intensity: 'Rest',
      calories: 0,
      exercises: ['Complete Rest'],
      reps: 'N/A',
      sets: '0',
    }
  ],
  'Balanced': [
    {
      day: 'Monday',
      type: 'Total Body Strength',
      duration: 55,
      intensity: 'Medium',
      calories: 420,
      exercises: ['Squats', 'Bench Press', 'Rows', 'Plank'],
      reps: '3 x 10-12',
      sets: '3',
    },
    {
      day: 'Tuesday',
      type: 'Cardio & Core',
      duration: 45,
      intensity: 'Medium',
      calories: 380,
      exercises: ['Rowing', 'Plank', 'Russian Twists'],
      reps: '3 x 12',
      sets: '3',
    },
    {
      day: 'Wednesday',
      type: 'Lower Body',
      duration: 50,
      intensity: 'Medium',
      calories: 400,
      exercises: ['Lunges', 'Deadlifts', 'Leg Press'],
      reps: '3 x 8-10',
      sets: '3',
    },
    {
      day: 'Thursday',
      type: 'Active Recovery',
      duration: 30,
      intensity: 'Low',
      calories: 120,
      exercises: ['Yoga', 'Stretching'],
      reps: 'N/A',
      sets: '1',
    },
    {
      day: 'Friday',
      type: 'Upper Body',
      duration: 55,
      intensity: 'Medium',
      calories: 420,
      exercises: ['Pull-ups', 'Overhead Press', 'Dumbbell Rows'],
      reps: '3 x 8-12',
      sets: '3',
    },
    {
      day: 'Saturday',
      type: 'Metabolic Conditioning',
      duration: 40,
      intensity: 'High',
      calories: 450,
      exercises: ['Burpees', 'Kettlebell Swings', 'Jump Rope'],
      reps: '4 x 12',
      sets: '4',
    },
    {
      day: 'Sunday',
      type: 'Recovery',
      duration: 30,
      intensity: 'Light',
      calories: 100,
      exercises: ['Walking', 'Foam Rolling'],
      reps: 'N/A',
      sets: '1',
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
  const [history, setHistory] = useState<WorkoutRecord[]>(sampleHistory);
  const [plansState, setPlansState] = useState<{ [key: string]: Workout[] }>(workoutPlans);
  const [goalDetail, setGoalDetail] = useState<string>('Weighted workouts based on your current body composition.');
  const [newWorkout, setNewWorkout] = useState<WorkoutRecord>({
    id: '',
    date: '',
    time: '',
    type: '',
    duration: 30,
    calories: 250,
  });

  const colors: { [key: string]: string } = {
    'Weight Loss': '#FF6B6B',
    'Muscle Gain': '#4ECDC4',
    'Endurance': '#F9A825',
    'Balanced': '#F59E0B',
    'Flexibility & Mobility': '#A78BFA',
  };

  const dayColors = ['#FF6B6B', '#4ECDC4', '#F9A825', '#A78BFA', '#FF69B4', '#38B6FF', '#95E1D3'];

  useEffect(() => {
    const storedHistory = typeof window !== 'undefined' ? window.localStorage.getItem('fitnessUltraWorkoutHistory') : null;
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }

    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('fitnessUltraBodyComposition') : null;
    if (stored) {
      const bodyComp = JSON.parse(stored) as { goal: string };
      if (bodyComp.goal === 'Muscle Gain') {
        setSelectedPlan('Muscle Gain');
        setGoalDetail('Higher volume strength with reps and sets tailored for hypertrophy.');
      } else if (bodyComp.goal === 'Weight Loss') {
        setSelectedPlan('Weight Loss');
        setGoalDetail('Metabolic conditioning with rep ranges suited for fat loss.');
      } else if (bodyComp.goal === 'Endurance') {
        setSelectedPlan('Endurance');
        setGoalDetail('Endurance-based sets with lighter load and higher reps.');
      } else {
        setSelectedPlan('Balanced');
        setGoalDetail('A balanced plan with mixed strength and conditioning work.');
      }
    }
    const storedPlans = typeof window !== 'undefined' ? window.localStorage.getItem('fitnessUltraPlans') : null;
    if (storedPlans) {
      try {
        setPlansState(JSON.parse(storedPlans));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  const persistHistory = (nextHistory: WorkoutRecord[]) => {
    setHistory(nextHistory);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('fitnessUltraWorkoutHistory', JSON.stringify(nextHistory));
    }
  };

  const persistPlans = (nextPlans: { [key: string]: Workout[] }) => {
    setPlansState(nextPlans);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('fitnessUltraPlans', JSON.stringify(nextPlans));
    }
  };

  const [editing, setEditing] = useState<null | { plan: string; workoutIndex: number; exerciseIndex: number }>(null);
  const [editValues, setEditValues] = useState<{ name: string; sets: string; reps: string }>({ name: '', sets: '', reps: '' });

  const startEditExercise = (plan: string, workoutIndex: number, exerciseIndex: number) => {
    const ex = plansState[plan][workoutIndex].exercises[exerciseIndex];
    if (typeof ex === 'string') {
      setEditValues({ name: ex, sets: '', reps: '' });
    } else {
      setEditValues({ name: ex.name, sets: String(ex.sets || ''), reps: ex.reps || '' });
    }
    setEditing({ plan, workoutIndex, exerciseIndex });
  };

  const saveEditExercise = () => {
    if (!editing) return;
    const { plan, workoutIndex, exerciseIndex } = editing;
    const updated = { ...plansState };
    const workouts = updated[plan].map((w) => ({ ...w }));
    const target = { ...workouts[workoutIndex] } as Workout;
    const exObj: Exercise = { name: editValues.name };
    if (editValues.sets) exObj.sets = isNaN(Number(editValues.sets)) ? editValues.sets : Number(editValues.sets);
    if (editValues.reps) exObj.reps = editValues.reps;
    target.exercises = [...target.exercises];
    target.exercises[exerciseIndex] = exObj;
    workouts[workoutIndex] = target;
    updated[plan] = workouts;
    persistPlans(updated);
    setEditing(null);
  };

  const cancelEditExercise = () => setEditing(null);

  const addWorkout = () => {
    if (!newWorkout.date || !newWorkout.time || !newWorkout.type) return;
    const record = {
      ...newWorkout,
      id: Date.now().toString(),
    };
    persistHistory([...history, record]);
    setNewWorkout({ id: '', date: '', time: '', type: '', duration: 30, calories: 250 });
  };

  const deleteWorkout = (id: string) => {
    persistHistory(history.filter((record) => record.id !== id));
  };

  const syncFromAppleWatch = async () => {
    try {
      const res = await fetch('/api/fitness/apple-watch');
      const data = await res.json();
      const now = new Date();
      const record: WorkoutRecord = {
        id: Date.now().toString(),
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: data.workoutType || 'Apple Watch Session',
        duration: data.duration || 45,
        calories: data.calories,
      };
      persistHistory([...history, record]);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const attemptBluetoothSync = async () => {
    if (typeof navigator === 'undefined' || !(navigator as any).bluetooth) {
      // Web Bluetooth not available; fall back to server sync
      await syncFromAppleWatch();
      return;
    }

    try {
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service'],
      });
      await device.gatt.connect();
      // For safety we won't attempt complex decoding here; instead post a small handshake payload
      const payload = {
        deviceName: device.name || 'Unknown Apple Watch',
        workoutType: 'Apple Watch (Bluetooth)',
        duration: 30,
        calories: 200,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch('/api/fitness/apple-watch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const serverData = await res.json();
      // create a workout record from the returned payload (server echoes back)
      const now = new Date();
      const record: WorkoutRecord = {
        id: Date.now().toString(),
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: serverData.payload?.workoutType || 'Apple Watch (Bluetooth)',
        duration: serverData.payload?.duration || 30,
        calories: serverData.payload?.calories || 0,
      };
      persistHistory([...history, record]);
    } catch (err) {
      console.error('Bluetooth sync failed, falling back to server:', err);
      await syncFromAppleWatch();
    }
  };

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
            {Object.keys(plansState).map((plan) => (
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

          <p style={{ marginBottom: '1.5rem', color: '#6B7280' }}>{goalDetail}</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {plansState[selectedPlan].map((workout, index) => (
              <div
                key={index}
                style={{
                    backgroundColor: dayColors[index % dayColors.length],
                    color: '#fff',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                    overflow: 'hidden',
                    minHeight: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
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
                    marginBottom: '0.75rem'
                  }}>
                    {workout.exercises.map((exercise, i) => {
                      const ex: Exercise = ((): Exercise => {
                        if (typeof exercise === 'string') {
                          const name = exercise;
                          // Special case: chest days with bench press default to 5 sets x 10 reps
                          if (workout.type.toLowerCase().includes('chest') && name.toLowerCase().includes('bench')) {
                            return { name, sets: 5, reps: '10' };
                          }
                          // Cardio / endurance: single set, reps N/A
                          if (/run|cycling|rowing|cardio|sprint|distance/i.test(name)) {
                            return { name, sets: 1, reps: 'N/A' };
                          }
                          // sensible default for strength movements
                          return { name, sets: 3, reps: '8-12' };
                        }
                        return exercise as Exercise;
                      })();

                      return (
                        <li key={i} className="pop-in" style={{
                          fontSize: '0.95rem',
                          opacity: 0.98,
                          marginBottom: '0.45rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}>
                          <span style={{ flex: 1 }}>✓ {ex.name} {ex.sets ? `— ${ex.sets} sets` : ''} {ex.reps ? ` x ${ex.reps} reps` : ''}</span>
                          <button
                            onClick={() => startEditExercise(selectedPlan, index, i)}
                            className="small btn-ghost"
                            style={{ marginLeft: '0.5rem', background: 'transparent', color: '#fff', borderRadius: '8px' }}
                          >
                            Edit
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {editing && editing.plan === selectedPlan && editing.workoutIndex === index && (
                    <div style={{ marginTop: '0.75rem', background: 'rgba(0,0,0,0.08)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input value={editValues.name} onChange={(e) => setEditValues({ ...editValues, name: e.target.value })} style={{ flex: 2, padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                        <input value={editValues.sets} placeholder="Sets" onChange={(e) => setEditValues({ ...editValues, sets: e.target.value })} style={{ width: '85px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                        <input value={editValues.reps} placeholder="Reps" onChange={(e) => setEditValues({ ...editValues, reps: e.target.value })} style={{ width: '100px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ddd' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={saveEditExercise} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '0.5rem' }}>Save</button>
                        <button onClick={cancelEditExercise} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#F87171', color: '#fff', border: 'none', borderRadius: '0.5rem' }}>Cancel</button>
                      </div>
                    </div>
                  )}
                  {(workout.reps || workout.sets) && (
                    <div style={{ marginTop: '1rem', opacity: 0.9, fontSize: '0.9rem' }}>
                      <p style={{ margin: 0 }}>Sets: {workout.sets || '3'}</p>
                      <p style={{ margin: 0 }}>Reps: {workout.reps || '10-12'}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h3 style={{ marginBottom: '1rem' }}>📊 Your Workout History</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button
              onClick={syncFromAppleWatch}
              style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: '#38B6FF',
                color: '#fff',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              🔄 Sync from Apple Watch
            </button>
            <button
              onClick={attemptBluetoothSync}
              style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: '#1E40AF',
                color: '#fff',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              🔵 Connect via Bluetooth
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', flex: 1 }}>
              <input
                placeholder="Workout type"
                value={newWorkout.type}
                onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                style={{ padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
              />
              <input
                type="date"
                value={newWorkout.date}
                onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
                style={{ padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
              />
              <input
                type="time"
                value={newWorkout.time}
                onChange={(e) => setNewWorkout({ ...newWorkout, time: e.target.value })}
                style={{ padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1 }}>
              <input
                type="number"
                min={1}
                placeholder="Duration"
                value={newWorkout.duration}
                onChange={(e) => setNewWorkout({ ...newWorkout, duration: Number(e.target.value) })}
                style={{ padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
              />
              <input
                type="number"
                min={1}
                placeholder="Calories"
                value={newWorkout.calories}
                onChange={(e) => setNewWorkout({ ...newWorkout, calories: Number(e.target.value) })}
                style={{ padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #ddd' }}
              />
            </div>
            <button
              onClick={addWorkout}
              style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: '#7C3AED',
                color: '#fff',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              ➕ Add Workout
            </button>
          </div>
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
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr auto',
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
                <button
                  onClick={() => deleteWorkout(record.id)}
                  style={{
                    backgroundColor: '#F87171',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
