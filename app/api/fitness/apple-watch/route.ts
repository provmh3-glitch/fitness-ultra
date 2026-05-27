export const runtime = 'nodejs';

import fs from 'fs/promises';
import path from 'path';

const STORE_PATH = path.join(process.cwd(), 'data', 'apple_watch_sync.json');

async function ensureStore() {
  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    try {
      await fs.access(STORE_PATH);
    } catch {
      await fs.writeFile(STORE_PATH, JSON.stringify([]));
    }
  } catch (e) {
    // ignore
  }
}

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await ensureStore();
    const raw = await fs.readFile(STORE_PATH, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    const entry = { ...body, serverTimestamp: new Date().toISOString() };
    arr.push(entry);
    await fs.writeFile(STORE_PATH, JSON.stringify(arr, null, 2));
    return Response.json({ received: true, serverTimestamp: new Date().toISOString(), payload: body });
  } catch (err) {
    return new Response(JSON.stringify({ received: false, error: String(err) }), { status: 400 });
  }
}
