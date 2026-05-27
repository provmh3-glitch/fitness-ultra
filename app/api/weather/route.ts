export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'London';

  // Simulated weather data in Fahrenheit
  const weatherData = {
    city,
    temperature: Math.floor(Math.random() * 40) + 50,
    condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 40) + 40,
    windSpeed: Math.floor(Math.random() * 15) + 5,
    timestamp: new Date().toISOString(),
  };

  return Response.json(weatherData);
}
