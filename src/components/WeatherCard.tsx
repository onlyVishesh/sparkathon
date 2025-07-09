import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';
import { WeatherForecast, getWeatherIcon } from '../services/weatherService';

interface WeatherCardProps {
  cityName: string;
  weather: WeatherForecast;
  isLoading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ cityName, weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-20 mb-2"></div>
          <div className="h-8 bg-blue-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-blue-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  const getConditionIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return <Sun className="w-5 h-5 text-yellow-500" />;
    if (lowerCondition.includes('cloud')) return <Cloud className="w-5 h-5 text-gray-500" />;
    if (lowerCondition.includes('rain')) return <CloudRain className="w-5 h-5 text-blue-500" />;
    if (lowerCondition.includes('fog')) return <Cloud className="w-5 h-5 text-gray-400" />;
    return <Sun className="w-5 h-5 text-yellow-500" />;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 30) return 'text-red-600';
    if (temp > 20) return 'text-orange-600';
    return 'text-blue-600';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-blue-900">{cityName}</h3>
        {getConditionIcon(weather.current.condition)}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-blue-600" />
          <span className={`text-2xl font-bold ${getTemperatureColor(weather.current.temperature)}`}>
            {weather.current.temperature}°C
          </span>
        </div>
        
        <p className="text-blue-800 text-sm font-medium">{weather.current.condition}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            <span>{weather.current.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3" />
            <span>{weather.current.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-blue-200">
        <h4 className="text-xs font-medium text-blue-800 mb-2">3-Day Forecast</h4>
        <div className="space-y-1">
          {weather.forecast.slice(0, 3).map((day, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-blue-700">
                {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-blue-600">{day.temp_min}°</span>
                <span className="text-blue-400">/</span>
                <span className="text-red-600">{day.temp_max}°</span>
                <span className="ml-1">{getWeatherIcon(day.icon)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;