export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface WeatherForecast {
  current: WeatherData;
  forecast: Array<{
    date: string;
    temp_min: number;
    temp_max: number;
    condition: string;
    icon: string;
  }>;
}

// Mock weather service - in production, replace with actual OpenWeatherMap API
export const getWeatherData = async (cityName: string): Promise<WeatherForecast> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockWeatherData: Record<string, WeatherForecast> = {
    'Mumbai': {
      current: { temperature: 32, condition: 'Partly Cloudy', humidity: 78, windSpeed: 12, icon: '02d' },
      forecast: [
        { date: '2025-01-16', temp_min: 24, temp_max: 32, condition: 'Partly Cloudy', icon: '02d' },
        { date: '2025-01-17', temp_min: 26, temp_max: 34, condition: 'Sunny', icon: '01d' },
        { date: '2025-01-18', temp_min: 25, temp_max: 33, condition: 'Cloudy', icon: '03d' },
      ]
    },
    'Pune': {
      current: { temperature: 28, condition: 'Sunny', humidity: 65, windSpeed: 8, icon: '01d' },
      forecast: [
        { date: '2025-01-16', temp_min: 20, temp_max: 28, condition: 'Sunny', icon: '01d' },
        { date: '2025-01-17', temp_min: 22, temp_max: 30, condition: 'Partly Cloudy', icon: '02d' },
        { date: '2025-01-18', temp_min: 21, temp_max: 29, condition: 'Sunny', icon: '01d' },
      ]
    },
    'Delhi': {
      current: { temperature: 18, condition: 'Foggy', humidity: 85, windSpeed: 5, icon: '50d' },
      forecast: [
        { date: '2025-01-16', temp_min: 8, temp_max: 18, condition: 'Foggy', icon: '50d' },
        { date: '2025-01-17', temp_min: 10, temp_max: 20, condition: 'Partly Cloudy', icon: '02d' },
        { date: '2025-01-18', temp_min: 12, temp_max: 22, condition: 'Sunny', icon: '01d' },
      ]
    },
    'Bangalore': {
      current: { temperature: 24, condition: 'Pleasant', humidity: 70, windSpeed: 10, icon: '02d' },
      forecast: [
        { date: '2025-01-16', temp_min: 18, temp_max: 24, condition: 'Pleasant', icon: '02d' },
        { date: '2025-01-17', temp_min: 19, temp_max: 26, condition: 'Sunny', icon: '01d' },
        { date: '2025-01-18', temp_min: 17, temp_max: 25, condition: 'Cloudy', icon: '03d' },
      ]
    },
    'Chennai': {
      current: { temperature: 30, condition: 'Hot', humidity: 82, windSpeed: 15, icon: '01d' },
      forecast: [
        { date: '2025-01-16', temp_min: 26, temp_max: 30, condition: 'Hot', icon: '01d' },
        { date: '2025-01-17', temp_min: 27, temp_max: 32, condition: 'Very Hot', icon: '01d' },
        { date: '2025-01-18', temp_min: 25, temp_max: 31, condition: 'Hot', icon: '02d' },
      ]
    },
    'Hyderabad': {
      current: { temperature: 26, condition: 'Warm', humidity: 68, windSpeed: 9, icon: '02d' },
      forecast: [
        { date: '2025-01-16', temp_min: 20, temp_max: 26, condition: 'Warm', icon: '02d' },
        { date: '2025-01-17', temp_min: 22, temp_max: 28, condition: 'Sunny', icon: '01d' },
        { date: '2025-01-18', temp_min: 21, temp_max: 27, condition: 'Partly Cloudy', icon: '02d' },
      ]
    },
    'Kolkata': {
      current: { temperature: 22, condition: 'Mild', humidity: 75, windSpeed: 7, icon: '03d' },
      forecast: [
        { date: '2025-01-16', temp_min: 16, temp_max: 22, condition: 'Mild', icon: '03d' },
        { date: '2025-01-17', temp_min: 18, temp_max: 24, condition: 'Cloudy', icon: '03d' },
        { date: '2025-01-18', temp_min: 17, temp_max: 23, condition: 'Partly Cloudy', icon: '02d' },
      ]
    },
    'Ahmedabad': {
      current: { temperature: 25, condition: 'Pleasant', humidity: 60, windSpeed: 11, icon: '01d' },
      forecast: [
        { date: '2025-01-16', temp_min: 18, temp_max: 25, condition: 'Pleasant', icon: '01d' },
        { date: '2025-01-17', temp_min: 20, temp_max: 27, condition: 'Sunny', icon: '01d' },
        { date: '2025-01-18', temp_min: 19, temp_max: 26, condition: 'Clear', icon: '01d' },
      ]
    },
    'Aurangabad': {
      current: { temperature: 27, condition: 'Warm', humidity: 65, windSpeed: 8, icon: '02d' },
      forecast: [
        { date: '2025-01-16', temp_min: 19, temp_max: 27, condition: 'Warm', icon: '02d' },
        { date: '2025-01-17', temp_min: 21, temp_max: 29, condition: 'Hot', icon: '01d' },
        { date: '2025-01-18', temp_min: 20, temp_max: 28, condition: 'Sunny', icon: '01d' },
      ]
    },
    'Nashik': {
      current: { temperature: 26, condition: 'Pleasant', humidity: 62, windSpeed: 9, icon: '02d' },
      forecast: [
        { date: '2025-01-16', temp_min: 18, temp_max: 26, condition: 'Pleasant', icon: '02d' },
        { date: '2025-01-17', temp_min: 20, temp_max: 28, condition: 'Warm', icon: '01d' },
        { date: '2025-01-18', temp_min: 19, temp_max: 27, condition: 'Sunny', icon: '01d' },
      ]
    }
  };

  return mockWeatherData[cityName] || mockWeatherData['Mumbai'];
};

export const getWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return iconMap[iconCode] || '☀️';
};