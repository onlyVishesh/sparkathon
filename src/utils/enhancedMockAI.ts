import { WeatherForecast } from "../services/weatherService";
import { AIRecommendation, ShipmentData } from "../types";

export const generateEnhancedAIRecommendation = (
  shipment: ShipmentData,
  originWeather: WeatherForecast,
  destinationWeather: WeatherForecast
): AIRecommendation => {
  
  const baseRecommendation = {
    estimatedDelivery: new Date(Date.now() + 100 * 60 * 60 * 1000).toISOString(),
    routeOptimization: "Optimized route with temperature monitoring",
  };

  // Weather-influenced logic
  const avgTemp =
    (originWeather.current.temperature +
      destinationWeather.current.temperature) /
    2;
  const isHotWeather = avgTemp > 30;
  const isColdWeather = avgTemp < 15;

  // Time-based recommendations
  const getOptimalDepartureTime = (product: string, weather: number) => {
    if (product === "Ice Cream" || product === "Frozen Peas") {
      return weather > 30 ? "22:00" : "20:00"; // Night departure for frozen items in hot weather
    }
    if (product === "Chicken") {
      return weather > 25 ? "04:00" : "06:00"; // Early morning for meat
    }
    return weather > 30 ? "05:00" : "07:00"; // Early morning for dairy in hot weather
  };

  const departureTime = getOptimalDepartureTime(shipment.product, avgTemp);

  switch (shipment.product) {
    case "Ice Cream":
      return {
        ...baseRecommendation,
        recommendedDeparture: `2025-07-10T${departureTime}`,
        coolingPlan: isHotWeather
          ? "Pre-chill to -25°C, maintain -18°C with enhanced insulation"
          : "Pre-chill to -22°C, maintain -18°C throughout journey",
        defaultFuel: isHotWeather ? 28 : 25,
        cciaFuel: isHotWeather ? 16 : 15,
        fuelSaved: isHotWeather ? 43 : 40,
        co2Avoided: isHotWeather ? 28 : 26,
        spoilageRisk: isHotWeather ? "Medium" : "Low",
        routeOptimization: isHotWeather
          ? "Night route with 4 temperature checkpoints and enhanced cooling"
          : "Night route with 3 temperature checkpoints",
      };

    case "Paneer":
      return {
        ...baseRecommendation,
        recommendedDeparture: `2025-07-11T${departureTime}`,
        coolingPlan: isHotWeather
          ? "Maintain 0°C to 1°C with humidity control and extra insulation"
          : "Maintain 0°C to 2°C with humidity control",
        defaultFuel: isHotWeather ? 20 : 18,
        cciaFuel: isHotWeather ? 13 : 12,
        fuelSaved: isHotWeather ? 35 : 33,
        co2Avoided: isHotWeather ? 17 : 15,
        spoilageRisk: isHotWeather ? "Medium" : "Low",
        routeOptimization: isHotWeather
          ? "Early morning route with enhanced temperature monitoring"
          : "Morning route with standard temperature monitoring",
      };

    case "Chicken":
      return {
        ...baseRecommendation,
        recommendedDeparture: `2025-07-10T${departureTime}`,
        coolingPlan: isHotWeather
          ? "Maintain -2°C to 0°C with strict temperature control and backup cooling"
          : "Maintain -1°C to 0°C with strict temperature control",
        defaultFuel: isHotWeather ? 25 : 22,
        cciaFuel: isHotWeather ? 18 : 16,
        fuelSaved: isHotWeather ? 28 : 27,
        co2Avoided: isHotWeather ? 20 : 18,
        spoilageRisk: isHotWeather ? "High" : "Medium",
        routeOptimization: isHotWeather
          ? "Direct route with continuous monitoring and backup systems"
          : "Direct route with continuous cold chain monitoring",
      };

    case "Frozen Peas":
      return {
        ...baseRecommendation,
        recommendedDeparture: `2025-07-10T${departureTime}`,
        coolingPlan: isHotWeather
          ? "Maintain -20°C with minimal temperature fluctuation and enhanced insulation"
          : "Maintain -18°C with minimal temperature fluctuation",
        defaultFuel: isHotWeather ? 23 : 20,
        cciaFuel: isHotWeather ? 14 : 13,
        fuelSaved: isHotWeather ? 39 : 35,
        co2Avoided: isHotWeather ? 21 : 19,
        spoilageRisk: "Low",
        routeOptimization: isHotWeather
          ? "Night route with optimized cooling cycles and weather monitoring"
          : "Night route with optimized cooling cycles",
      };

    case "Flavored Milk":
      return {
        ...baseRecommendation,
        recommendedDeparture: `2025-07-11T${departureTime}`,
        coolingPlan: isHotWeather
          ? "Maintain 1°C to 3°C with gentle handling and enhanced cooling"
          : "Maintain 2°C to 4°C with gentle handling",
        defaultFuel: isHotWeather ? 18 : 16,
        cciaFuel: isHotWeather ? 12 : 11,
        fuelSaved: isHotWeather ? 33 : 31,
        co2Avoided: isHotWeather ? 15 : 13,
        spoilageRisk: isHotWeather ? "High" : "Medium",
        routeOptimization: isHotWeather
          ? "Early morning route with enhanced cooling and smooth roads"
          : "Morning route with smooth road preference",
      };

    case "Curd":
      return {
        ...baseRecommendation,
        recommendedDeparture: `2025-07-11T${departureTime}`,
        coolingPlan: isHotWeather
          ? "Maintain 1°C to 4°C with minimal vibration and enhanced cooling"
          : "Maintain 2°C to 6°C with minimal vibration",
        defaultFuel: isHotWeather ? 16 : 14,
        cciaFuel: isHotWeather ? 11 : 10,
        fuelSaved: isHotWeather ? 31 : 29,
        co2Avoided: isHotWeather ? 13 : 11,
        spoilageRisk: isHotWeather ? "High" : "High",
        routeOptimization: isHotWeather
          ? "Shortest route with enhanced temperature control and minimal stops"
          : "Shortest route with stable temperature zones",
      };

    default:
      return {
        ...baseRecommendation,
        recommendedDeparture: `2025-07-10T${departureTime}`,
        coolingPlan: isHotWeather
          ? "Enhanced refrigeration at 2°C with weather adaptation"
          : "Standard refrigeration at 4°C",
        defaultFuel: isHotWeather ? 20 : 18,
        cciaFuel: isHotWeather ? 15 : 14,
        fuelSaved: isHotWeather ? 25 : 22,
        co2Avoided: isHotWeather ? 14 : 12,
        spoilageRisk: isHotWeather ? "High" : "Medium",
        routeOptimization: isHotWeather
          ? "Weather-optimized route with enhanced monitoring"
          : "Standard route with temperature monitoring",
      };
  }
};
