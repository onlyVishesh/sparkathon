export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RouteData {
  coordinates: RoutePoint[];
  distance: number; // in km
  duration: number; // in minutes
  instructions: string[];
}

// City coordinates for major highway junctions and intermediate cities
const HIGHWAY_NETWORK = {
  'Mumbai': { coords: [19.0760, 72.8777], highways: ['NH48', 'NH3', 'NH17'] },
  'Pune': { coords: [18.5204, 73.8567], highways: ['NH48', 'NH50'] },
  'Delhi': { coords: [28.7041, 77.1025], highways: ['NH1', 'NH8', 'NH24'] },
  'Bangalore': { coords: [12.9716, 77.5946], highways: ['NH44', 'NH75'] },
  'Chennai': { coords: [13.0827, 80.2707], highways: ['NH16', 'NH32'] },
  'Hyderabad': { coords: [17.3850, 78.4867], highways: ['NH44', 'NH65'] },
  'Kolkata': { coords: [22.5726, 88.3639], highways: ['NH16', 'NH19'] },
  'Ahmedabad': { coords: [23.0225, 72.5714], highways: ['NH8', 'NH27'] },
  'Aurangabad': { coords: [19.8762, 75.3433], highways: ['NH52', 'NH211'] },
  'Nashik': { coords: [19.9975, 73.7898], highways: ['NH3', 'NH50'] },
};

// Major highway junction points between cities
const HIGHWAY_JUNCTIONS = {
  'Mumbai-Pune': [
    [19.0760, 72.8777], // Mumbai start
    [19.1136, 73.0092], // Kalyan junction
    [19.2183, 73.0967], // Karjat
    [18.7322, 73.4250], // Lonavala
    [18.5204, 73.8567]  // Pune end
  ],
  'Mumbai-Delhi': [
    [19.0760, 72.8777], // Mumbai
    [19.9975, 73.7898], // Nashik
    [23.2599, 77.4126], // Bhopal
    [26.9124, 75.7873], // Jaipur
    [28.7041, 77.1025]  // Delhi
  ],
  'Pune-Bangalore': [
    [18.5204, 73.8567], // Pune
    [17.6599, 75.9064], // Solapur
    [15.3173, 75.7139], // Hubli
    [14.4426, 76.4648], // Davangere
    [13.3409, 77.1172], // Tumkur
    [12.9716, 77.5946]  // Bangalore
  ],
  'Delhi-Bangalore': [
    [28.7041, 77.1025], // Delhi
    [26.9124, 75.7873], // Jaipur
    [23.2599, 77.4126], // Bhopal
    [21.1458, 79.0882], // Nagpur
    [17.3850, 78.4867], // Hyderabad
    [12.9716, 77.5946]  // Bangalore
  ]
};

export const getRoute = async (origin: [number, number], destination: [number, number]): Promise<RouteData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Find city names for origin and destination
  const originCity = findCityByCoords(origin);
  const destCity = findCityByCoords(destination);
  
  // Generate realistic highway route
  const waypoints = generateHighwayRoute(origin, destination, originCity, destCity);
  
  // Calculate distance and duration
  const distance = calculateRouteDistance(waypoints);
  const duration = calculateRealisticDuration(distance, waypoints.length);
  
  return {
    coordinates: waypoints,
    distance: Math.round(distance),
    duration,
    instructions: generateDetailedInstructions(originCity, destCity, distance)
  };
};

function findCityByCoords(coords: [number, number]): string {
  let closestCity = 'Mumbai';
  let minDistance = Infinity;
  
  Object.entries(HIGHWAY_NETWORK).forEach(([city, data]) => {
    const distance = calculateDistance(coords, data.coords as [number, number]);
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  });
  
  return closestCity;
}

function generateHighwayRoute(start: [number, number], end: [number, number], originCity: string, destCity: string): RoutePoint[] {
  const routeKey = `${originCity}-${destCity}`;
  const reverseRouteKey = `${destCity}-${originCity}`;
  
  // Check if we have predefined highway route
  let baseRoute = HIGHWAY_JUNCTIONS[routeKey];
  if (!baseRoute) {
    baseRoute = HIGHWAY_JUNCTIONS[reverseRouteKey]?.slice().reverse();
  }
  
  // If no predefined route, create intelligent route through major cities
  if (!baseRoute) {
    baseRoute = createIntelligentRoute(start, end, originCity, destCity);
  }
  
  // Generate smooth highway-like path through the base route
  return generateSmoothHighwayPath(baseRoute || [start, end]);
}

function createIntelligentRoute(start: [number, number], end: [number, number], originCity: string, destCity: string): [number, number][] {
  const route: [number, number][] = [start];
  
  // Find intermediate cities that make geographical sense
  const intermediateCities = findIntermediateCities(start, end);
  
  // Add intermediate cities to route
  intermediateCities.forEach(city => {
    const cityData = HIGHWAY_NETWORK[city];
    if (cityData) {
      route.push(cityData.coords as [number, number]);
    }
  });
  
  route.push(end);
  return route;
}

function findIntermediateCities(start: [number, number], end: [number, number]): string[] {
  const cities: string[] = [];
  const midLat = (start[0] + end[0]) / 2;
  const midLng = (start[1] + end[1]) / 2;
  
  // Find cities that are roughly between start and end
  Object.entries(HIGHWAY_NETWORK).forEach(([city, data]) => {
    const coords = data.coords as [number, number];
    const distanceFromMid = calculateDistance([midLat, midLng], coords);
    const totalDistance = calculateDistance(start, end);
    
    // If city is reasonably close to the midpoint and not too far from the route
    if (distanceFromMid < totalDistance * 0.3 && isOnRoute(start, end, coords)) {
      cities.push(city);
    }
  });
  
  return cities.slice(0, 2); // Limit to 2 intermediate cities
}

function isOnRoute(start: [number, number], end: [number, number], point: [number, number]): boolean {
  // Check if point is roughly on the path between start and end
  const distStartToPoint = calculateDistance(start, point);
  const distPointToEnd = calculateDistance(point, end);
  const directDistance = calculateDistance(start, end);
  
  // Point is on route if the detour is less than 20% of direct distance
  return (distStartToPoint + distPointToEnd) < (directDistance * 1.2);
}

function generateSmoothHighwayPath(baseRoute: [number, number][]): RoutePoint[] {
  const points: RoutePoint[] = [];
  
  for (let i = 0; i < baseRoute.length - 1; i++) {
    const segmentStart = baseRoute[i];
    const segmentEnd = baseRoute[i + 1];
    const segmentDistance = calculateDistance(segmentStart, segmentEnd);
    
    // More points for longer segments to create smoother curves
    const segmentPoints = Math.max(8, Math.floor(segmentDistance / 20));
    
    for (let j = 0; j <= segmentPoints; j++) {
      const ratio = j / segmentPoints;
      
      // Create highway-like curves using bezier-like interpolation
      const curveIntensity = 0.002 * segmentDistance; // Curve intensity based on distance
      const curve1 = Math.sin(ratio * Math.PI) * curveIntensity;
      const curve2 = Math.sin(ratio * Math.PI * 2) * curveIntensity * 0.3;
      
      // Add some randomness to simulate real road deviations
      const randomFactor = (Math.random() - 0.5) * 0.001;
      
      const lat = segmentStart[0] + (segmentEnd[0] - segmentStart[0]) * ratio + curve1 + randomFactor;
      const lng = segmentStart[1] + (segmentEnd[1] - segmentStart[1]) * ratio + curve2 + randomFactor;
      
      points.push({ lat, lng });
    }
  }
  
  // Smooth the path to remove sharp angles
  return smoothPath(points);
}

function smoothPath(points: RoutePoint[]): RoutePoint[] {
  if (points.length < 3) return points;
  
  const smoothed: RoutePoint[] = [points[0]]; // Keep first point
  
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const current = points[i];
    const next = points[i + 1];
    
    // Apply smoothing using weighted average
    const smoothedLat = (prev.lat * 0.25 + current.lat * 0.5 + next.lat * 0.25);
    const smoothedLng = (prev.lng * 0.25 + current.lng * 0.5 + next.lng * 0.25);
    
    smoothed.push({ lat: smoothedLat, lng: smoothedLng });
  }
  
  smoothed.push(points[points.length - 1]); // Keep last point
  return smoothed;
}

function calculateRouteDistance(points: RoutePoint[]): number {
  let totalDistance = 0;
  
  for (let i = 0; i < points.length - 1; i++) {
    const point1 = [points[i].lat, points[i].lng] as [number, number];
    const point2 = [points[i + 1].lat, points[i + 1].lng] as [number, number];
    totalDistance += calculateDistance(point1, point2);
  }
  
  return totalDistance;
}

function calculateRealisticDuration(distance: number, numWaypoints: number): number {
  // Base duration calculation
  let duration = distance * 1.5; // Base: 40 km/h average including stops
  
  // Add time for city traffic and highway transitions
  const cityTime = numWaypoints * 15; // 15 minutes per major city/junction
  
  // Add random traffic delays
  const trafficDelay = Math.random() * 30;
  
  return Math.round(duration + cityTime + trafficDelay);
}

function calculateDistance(point1: [number, number], point2: [number, number]): number {
  const R = 6371; // Earth's radius in km
  const dLat = (point2[0] - point1[0]) * Math.PI / 180;
  const dLon = (point2[1] - point1[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1[0] * Math.PI / 180) * Math.cos(point2[0] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function generateDetailedInstructions(originCity: string, destCity: string, distance: number): string[] {
  const instructions = [
    `Start from ${originCity} city center`,
    'Head toward highway entrance',
    'Merge onto national highway',
    `Continue on highway for ${Math.round(distance * 0.7)} km`,
    'Pass through major junction',
    `Take exit toward ${destCity}`,
    'Continue on arterial road',
    'Follow signs to city center',
    `Arrive at ${destCity} destination`
  ];
  
  return instructions;
}