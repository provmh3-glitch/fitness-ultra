export async function GET() {
  // Simulated Apple Watch data
  const data = {
    steps: Math.floor(Math.random() * 15000) + 5000,
    calories: Math.floor(Math.random() * 1000) + 500,
    heartRate: Math.floor(Math.random() * 40) + 60,
    duration: Math.floor(Math.random() * 40) + 30,
    workoutType: 'Outdoor Workout',
    timestamp: new Date().toISOString(),
  };

  return Response.json(data);
}
