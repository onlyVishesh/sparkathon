export interface ShipmentData {
  origin: string;
  destination: string;
  product: string;
  quantity: number;
  deadline: string;
}

export interface AIRecommendation {
  recommendedDeparture: string;
  coolingPlan: string;
  defaultFuel: number;
  cciaFuel: number;
  fuelSaved: number;
  co2Avoided: number;
  spoilageRisk: 'Low' | 'Medium' | 'High';
  routeOptimization: string;
  estimatedDelivery: string;
}

export interface City {
  name: string;
  coordinates: [number, number];
}
