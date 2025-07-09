import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Fuel,
  Leaf,
  Thermometer,
} from "lucide-react";
import React, { useState } from "react";
import { AIRecommendation } from "../types";

interface AIRecommendationsProps {
  recommendation: AIRecommendation;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-orange-600 bg-orange-100";
      case "High":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "Low":
        return <CheckCircle className="w-4 h-4" />;
      case "Medium":
        return <AlertTriangle className="w-4 h-4" />;
      case "High":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const fuelSavingsPercentage =
    ((recommendation.defaultFuel - recommendation.cciaFuel) /
      recommendation.defaultFuel) *
    100;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-gray-800">
              AI Recommendations
            </h2>
            <p className="text-gray-600 text-sm">
              Optimized cold chain logistics plan
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-blue-800">Departure Time</h3>
              </div>
              <p className="text-blue-900 font-semibold text-sm">
                {formatDateTime(recommendation.recommendedDeparture)}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
                <h3 className="font-medium text-green-800">
                  Estimated delivery:
                </h3>
              </div>
              <p className="text-green-900 font-semibold text-sm">
                {formatDateTime(recommendation.estimatedDelivery)}
              </p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-cyan-600" />
                <h3 className="font-medium text-cyan-800">Cooling Plan</h3>
              </div>
              <p className="text-cyan-900 text-sm">
                {recommendation.coolingPlan}
              </p>
            </div>

            <div
              className={`p-4 rounded-lg border ${getRiskColor(
                recommendation.spoilageRisk
              )}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {getRiskIcon(recommendation.spoilageRisk)}
                <h3 className="font-medium">Spoilage Risk</h3>
              </div>
              <p className="font-semibold">{recommendation.spoilageRisk}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Fuel className="w-5 h-5 text-green-600" />
                <h3 className="font-medium text-green-800">
                  Fuel Optimization
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Default SOP</span>
                  <span className="font-medium">
                    {recommendation.defaultFuel}L
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CCIA Plan</span>
                  <span className="font-medium text-green-600">
                    {recommendation.cciaFuel}L
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${fuelSavingsPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-green-700 font-medium">
                  {fuelSavingsPercentage.toFixed(1)}% fuel saved
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <h3 className="font-medium text-emerald-800">
                  Environmental Impact
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CO₂ Avoided</span>
                  <span className="font-medium text-emerald-600">
                    {recommendation.co2Avoided} kg
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fuel Saved</span>
                  <span className="font-medium text-emerald-600">
                    {recommendation.fuelSaved}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
            <h3 className="font-medium text-purple-800 mb-3">
              Eco-Audit Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {recommendation.defaultFuel}L
                </div>
                <div className="text-sm text-purple-700">Default SOP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {recommendation.cciaFuel}L
                </div>
                <div className="text-sm text-green-700">CCIA Plan</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
