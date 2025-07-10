import { AIRecommendation, ShipmentData } from "../types";

export const generateAIRecommendation = (
  shipment: ShipmentData
): AIRecommendation => {
  const baseRecommendation = {
    estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    routeOptimization: "Highway route with 2 temperature checkpoints",
  };

  switch (shipment.product) {
    case "Ice Cream":
      return {
        ...baseRecommendation,
        recommendedDeparture: "2025-07-11T22:00",
        coolingPlan:
          "Pre-chill to -22°C, then maintain -18°C throughout journey",
        defaultFuel: 25,
        cciaFuel: 15,
        fuelSaved: 40,
        co2Avoided: 26,
        spoilageRisk: "Low",
        routeOptimization: "Night departure route with 3 reefer stations",
      };

    case "Paneer":
      return {
        ...baseRecommendation,
        recommendedDeparture: "2025-07-11T05:00",
        coolingPlan: "Maintain 0°C to 2°C with humidity control",
        defaultFuel: 18,
        cciaFuel: 12,
        fuelSaved: 33,
        co2Avoided: 15,
        spoilageRisk: "Low",
        routeOptimization:
          "Early morning departure with temperature monitoring",
      };

    case "Chicken":
      return {
        ...baseRecommendation,
        recommendedDeparture: "2025-07-11T04:00",
        coolingPlan: "Maintain -5°C to 0°C with strict temperature control",
        defaultFuel: 22,
        cciaFuel: 16,
        fuelSaved: 27,
        co2Avoided: 18,
        spoilageRisk: "Medium",
        routeOptimization: "Direct route with continuous cold chain monitoring",
      };

    case "Frozen Peas":
      return {
        ...baseRecommendation,
        recommendedDeparture: "2025-07-11T20:00",
        coolingPlan: "Maintain -18°C with minimal temperature fluctuation",
        defaultFuel: 20,
        cciaFuel: 13,
        fuelSaved: 35,
        co2Avoided: 19,
        spoilageRisk: "Low",
        routeOptimization: "Night route with optimized reefer cycles",
      };

    case "Flavored Milk":
      return {
        ...baseRecommendation,
        recommendedDeparture: "2025-07-11T06:00",
        coolingPlan: "Maintain 2°C to 4°C with gentle handling",
        defaultFuel: 16,
        cciaFuel: 11,
        fuelSaved: 31,
        co2Avoided: 13,
        spoilageRisk: "Medium",
        routeOptimization: "Morning departure with smooth road preference",
      };

    case "Curd":
      return {
        ...baseRecommendation,
        recommendedDeparture: "2025-07-11T07:00",
        coolingPlan: "Maintain 2°C to 6°C with minimal vibration",
        defaultFuel: 14,
        cciaFuel: 10,
        fuelSaved: 29,
        co2Avoided: 11,
        spoilageRisk: "High",
        routeOptimization: "Shortest route with stable temperature zones",
      };

    default:
      return {
        ...baseRecommendation,
        recommendedDeparture: "2025-07-11T08:00",
        coolingPlan: "Standard refrigeration at 4°C",
        defaultFuel: 18,
        cciaFuel: 14,
        fuelSaved: 22,
        co2Avoided: 12,
        spoilageRisk: "Medium",
        routeOptimization: "Standard route with temperature monitoring",
      };
  }
};
