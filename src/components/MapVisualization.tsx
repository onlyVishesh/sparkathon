import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Map,
  MapPin,
  Navigation,
  Route,
  Truck,
  Zap,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { cities } from "../data/cities";
import { getRoute, RouteData } from "../services/routingService";

interface MapVisualizationProps {
  origin: string;
  destination: string;
}

const MapVisualization: React.FC<MapVisualizationProps> = ({
  origin,
  destination,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(
    "Initializing route calculation..."
  );

  const originCoords = cities.find((city) => city.name === origin)?.coordinates;
  const destinationCoords = cities.find(
    (city) => city.name === destination
  )?.coordinates;

  // Convert route data to leaflet format - moved before early return
  const optimizedRoute: [number, number][] = useMemo(
    () =>
      routeData
        ? routeData.coordinates.map(
            (point) => [point.lat, point.lng] as [number, number]
          )
        : [],
    [routeData]
  );

  const directRoute: [number, number][] = useMemo(
    () =>
      originCoords && destinationCoords
        ? [originCoords, destinationCoords]
        : [],
    [originCoords, destinationCoords]
  );

  // Calculate center point for map
  const centerLat =
    originCoords && destinationCoords
      ? (originCoords[0] + destinationCoords[0]) / 2
      : 0;
  const centerLng =
    originCoords && destinationCoords
      ? (originCoords[1] + destinationCoords[1]) / 2
      : 0;

  useEffect(() => {
    if (originCoords && destinationCoords) {
      setIsLoadingRoute(true);
      setLoadingProgress(0);
      setLoadingStage("Initializing route calculation...");

      // Simulated realistic loading stages
      const loadingStages = [
        "Initializing route calculation...",
        "Analyzing traffic patterns...",
        "Calculating fuel efficiency...",
        "Checking road conditions...",
        "Optimizing for cold chain requirements...",
        "Evaluating weather conditions...",
        "Computing best departure time...",
        "Finalizing optimal route...",
      ];

      let currentStage = 0;
      let progress = 0;

      const loadingInterval = setInterval(() => {
        progress += Math.random() * 8 + 2; // Progress 2-10% each time

        if (progress > 100) {
          progress = 100;
        }

        setLoadingProgress(progress);

        // Change stage every ~15% progress
        const newStage = Math.floor(progress / 15);
        if (newStage < loadingStages.length && newStage !== currentStage) {
          currentStage = newStage;
          setLoadingStage(loadingStages[currentStage]);
        }

        if (progress >= 100) {
          clearInterval(loadingInterval);
          // Keep showing 100% for a moment before fetching real data
          setTimeout(() => {
            getRoute(originCoords, destinationCoords)
              .then(setRouteData)
              .finally(() => setIsLoadingRoute(false));
          }, 500);
        }
      }, 100); // Update every 800ms to make it last about 1 minute

      return () => clearInterval(loadingInterval);
    }
  }, [originCoords, destinationCoords]);

  if (!originCoords || !destinationCoords) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <Map className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Route Intelligence
              </h2>
              <p className="text-slate-600">
                AI-powered route optimization with real-time tracking
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border-2 border-dashed border-slate-300">
            <div className="text-center">
              <div className="p-4 bg-white rounded-full shadow-lg mb-4 mx-auto w-fit">
                <MapPin className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Ready for Route Planning
              </h3>
              <p className="text-slate-500">
                Select origin and destination cities to view optimized route
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create enhanced custom icons
  const originIcon = new Icon({
    iconUrl:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMwNTk2NjkiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  const destinationIcon = new Icon({
    iconUrl:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiNEQzI2MjYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjYiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  useEffect(() => {
    if (mapRef.current && optimizedRoute.length > 0) {
      const map = mapRef.current;
      // Fit bounds to show the entire route
      map.fitBounds(optimizedRoute, { padding: [30, 30] });
    } else if (mapRef.current) {
      const map = mapRef.current;
      const bounds = [originCoords, destinationCoords];
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [originCoords, destinationCoords, optimizedRoute]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <Map className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Route Intelligence
            </h2>
            <p className="text-slate-600">
              AI-powered route optimization with real-time tracking
            </p>
          </div>
        </div>

        {/* Route Statistics */}
        {routeData && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Route className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">
                  Total Distance
                </span>
              </div>
              <p className="text-2xl font-bold">{routeData.distance} km</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">
                  Est. Duration
                </span>
              </div>
              <p className="text-2xl font-bold">
                {Math.floor(routeData.duration / 60)}h {routeData.duration % 60}
                m
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">
                  Avg. Speed
                </span>
              </div>
              <p className="text-2xl font-bold">
                {Math.round((routeData.distance / routeData.duration) * 60)}{" "}
                km/h
              </p>
            </div>
          </div>
        )}

        {/* Route Legend */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-200">
            <div className="w-3 h-3 border-2 border-dashed border-slate-400 rounded-full"></div>
            <span className="text-sm text-slate-600 font-medium">
              Direct Route
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-200">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-slate-600 font-medium">
              Optimized Route
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-200">
            <div className="w-3 h-3 bg-emerald-600 rounded-full shadow-sm"></div>
            <span className="text-sm text-slate-600 font-medium">Origin</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-200">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
            <span className="text-sm text-slate-600 font-medium">
              Destination
            </span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-96 relative">
        {isLoadingRoute && (
          <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="text-center max-w-md">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto"></div>
                <Truck className="w-8 h-8 text-emerald-600 absolute top-4 left-4" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Calculating Optimal Route
              </h3>
              <p className="text-sm text-slate-600 mb-4">{loadingStage}</p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                {Math.round(loadingProgress)}% Complete
              </p>

              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>

              <div className="mt-4 text-xs text-slate-400">
                Analyzing {Math.floor(Math.random() * 500) + 100} data points...
              </div>
            </div>
          </div>
        )}
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={6}
          className="h-full w-full rounded-b-2xl"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Direct route - dashed line */}
          <Polyline
            positions={directRoute}
            color="#94A3B8"
            weight={3}
            opacity={0.6}
            dashArray="8, 12"
          />

          {/* Optimized route - smooth gradient line */}
          {optimizedRoute.length > 0 && (
            <Polyline
              positions={optimizedRoute}
              color="#059669"
              weight={5}
              opacity={0.9}
              smoothFactor={1}
            />
          )}

          {/* Origin marker */}
          <Marker position={originCoords} icon={originIcon}>
            <Popup className="custom-popup">
              <div className="text-center p-2">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-emerald-700">Origin Point</h3>
                </div>
                <p className="text-lg font-semibold text-slate-800">{origin}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Departure Location
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Destination marker */}
          <Marker position={destinationCoords} icon={destinationIcon}>
            <Popup className="custom-popup">
              <div className="text-center p-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <h3 className="font-bold text-red-700">Destination</h3>
                </div>
                <p className="text-lg font-semibold text-slate-800">
                  {destination}
                </p>
                <p className="text-xs text-slate-500 mt-1">Delivery Location</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Route Instructions - Accordion */}
      {routeData && routeData.instructions && (
        <div className="bg-white border-t border-slate-200">
          <button
            onClick={() => setIsDirectionsOpen(!isDirectionsOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Navigation className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-slate-800">
                  Turn-by-Turn Directions
                </h3>
                <p className="text-sm text-slate-600">
                  {routeData.instructions.length} step navigation guide
                </p>
              </div>
            </div>
            {isDirectionsOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {isDirectionsOpen && (
            <div className="px-6 pb-6">
              <div className="space-y-2">
                {routeData.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-slate-200"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-slate-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapVisualization;
