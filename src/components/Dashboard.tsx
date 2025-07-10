import { Brain, Check } from "lucide-react";
import React, { useState } from "react";
import { getWeatherData, WeatherForecast } from "../services/weatherService";
import { AIRecommendation, ShipmentData } from "../types";
import { generateEnhancedAIRecommendation } from "../utils/enhancedMockAI";
import AIRecommendations from "./AIRecommendations";
import EcoAuditTable from "./EcoAuditTable";
import MapVisualization from "./MapVisualization";
import ShipmentForm from "./ShipmentForm";
import WeatherCard from "./WeatherCard";

const Dashboard: React.FC = () => {
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);
  const [originWeather, setOriginWeather] = useState<WeatherForecast | null>(
    null
  );
  const [destinationWeather, setDestinationWeather] =
    useState<WeatherForecast | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
  const [isRouteProcessed, setIsRouteProcessed] = useState(false);

  const handleFormSubmit = async (data: ShipmentData) => {
    setIsLoading(true);
    setIsLoadingWeather(true);
    setShipmentData(data);
    setLoadingProgress(0);
    setCompletedTasks([]);
    setCurrentTaskIndex(0);
    setIsRouteProcessed(false);

    // AI Agent simulation tasks
    const tasks = [
      { message: "Initializing AI Agent...", duration: 1000 },
      { message: "Fetching weather data...", duration: 1500 },
      { message: "Analyzing patterns...", duration: 1200 },
      { message: "Optimizing route...", duration: 1500 },
      { message: "Generating recommendations...", duration: 1500 },
    ];

    let taskIndex = 0;
    let progress = 0;

    const taskInterval = setInterval(() => {
      if (taskIndex < tasks.length) {
        // Mark current task as completed when it starts
        setCompletedTasks((prev) => [...prev, taskIndex]);

        // Mark route as processed when "Optimizing route" task is completed
        if (taskIndex === 3) {
          // "Optimizing route" is at index 3
          setIsRouteProcessed(true);
        }

        progress += 100 / tasks.length;
        setLoadingProgress(Math.min(progress, 100));

        taskIndex++;

        // Set next task as current if there is one
        if (taskIndex < tasks.length) {
          setCurrentTaskIndex(taskIndex);
        } else {
          setCurrentTaskIndex(-1); // All tasks completed
          clearInterval(taskInterval);
        }
      }
    }, 1500); // Increased to 2 seconds per task

    try {
      // Start fetching data after initial delay
      setTimeout(async () => {
        // Fetch weather data for both cities
        const [originWeatherData, destinationWeatherData] = await Promise.all([
          getWeatherData(data.origin),
          getWeatherData(data.destination),
        ]);

        setOriginWeather(originWeatherData);
        setDestinationWeather(destinationWeatherData);
        setIsLoadingWeather(false);

        // Generate AI recommendation with weather data
        const aiRecommendation = generateEnhancedAIRecommendation(
          data,
          originWeatherData,
          destinationWeatherData
        );

        // Ensure minimum 10 seconds loading time
        setTimeout(() => {
          setRecommendation(aiRecommendation);
          setLoadingProgress(100);

          // Clear loading after brief completion message
          setTimeout(() => {
            setIsLoading(false);
            clearInterval(taskInterval);
          }, 800);
        }, Math.max(0, 10000 - Date.now() + loadingStartTime));
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTimeout(() => {
        setIsLoading(false);
        clearInterval(taskInterval);
      }, 10000);
    }

    const loadingStartTime = Date.now();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 py-4">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Cold Chain Intelligence Advisor
                </h1>
                <p className="text-sm text-gray-600">
                  AI-Powered Logistics Optimization
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">
                  AI Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-1 space-y-8">
            <ShipmentForm onSubmit={handleFormSubmit} isLoading={isLoading} />

            {/* Weather Cards */}
            {shipmentData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WeatherCard
                  cityName={shipmentData.origin}
                  weather={originWeather!}
                  isLoading={isLoadingWeather}
                />
                <WeatherCard
                  cityName={shipmentData.destination}
                  weather={destinationWeather!}
                  isLoading={isLoadingWeather}
                />
              </div>
            )}

            {recommendation && (
              <EcoAuditTable recommendation={recommendation} />
            )}
          </div>

          {/* Right Column */}
          <div className="xl:col-span-2 space-y-8">
            {shipmentData && isRouteProcessed && (
              <MapVisualization
                origin={shipmentData.origin}
                destination={shipmentData.destination}
              />
            )}

            {recommendation && (
              <AIRecommendations recommendation={recommendation} />
            )}

            {!recommendation && !isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center w-full flex justify-center items-center">
                <div>
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    AI Ready for Analysis
                  </h3>
                  <p className="text-gray-500">
                    Enter shipment details to get weather-aware recommendations
                    for your cold chain logistics
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]  ">
            <div className="bg-white rounded-2xl p-8 max-w-5xl mx-4 shadow-2xl">
              <div className="text-center">
                {/* AI Agent Header */}
                <div className="relative mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                  <Brain className="w-8 h-8 text-blue-600 absolute top-4 left-4" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  AI Agent Processing
                </h3>
                <p className="text-gray-600 mb-6 text-base">
                  Analyzing your shipment requirements
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(loadingProgress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* AI Processing Steps */}
                <div className="text-left space-y-3 mb-6">
                  <h4 className="text-base font-semibold text-gray-800 text-center mb-4">
                    Processing Steps
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Initializing AI Agent...",
                      "Fetching weather data...",
                      "Analyzing patterns...",
                      "Optimizing route...",
                      "Generating recommendations...",
                    ].map((task, index) => {
                      const isCompleted = completedTasks.includes(index);
                      const isCurrent = currentTaskIndex === index;

                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                            isCompleted
                              ? "bg-green-50 border border-green-200"
                              : isCurrent
                              ? "bg-blue-50 border border-blue-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCompleted
                                ? "bg-green-500"
                                : isCurrent
                                ? "bg-blue-500 animate-pulse"
                                : "bg-gray-300"
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <span className="text-white text-sm font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-base font-medium transition-all duration-300 ${
                              isCompleted
                                ? "text-green-700"
                                : isCurrent
                                ? "text-blue-700"
                                : "text-gray-500"
                            }`}
                          >
                            {task}
                          </span>
                          {isCurrent && (
                            <div className="ml-auto">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Processing Details */}
                <div className="text-sm text-gray-500">
                  <p>
                    Processing {Math.floor(Math.random() * 200) + 50} data
                    points...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
