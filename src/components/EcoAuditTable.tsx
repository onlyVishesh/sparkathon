import { ChevronDown, ChevronUp, Fuel, Leaf, TrendingDown } from "lucide-react";
import React, { useState } from "react";
import { AIRecommendation } from "../types";

interface EcoAuditTableProps {
  recommendation: AIRecommendation;
}

const EcoAuditTable: React.FC<EcoAuditTableProps> = ({ recommendation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fuelSavings = recommendation.defaultFuel - recommendation.cciaFuel;
  const fuelSavingsPercentage =
    (fuelSavings / recommendation.defaultFuel) * 100;
  const costSavings = fuelSavings * 85; // Assuming ₹85 per liter

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Leaf className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-gray-800">
              Eco-Audit Comparison
            </h2>
            <p className="text-gray-600 text-sm">
              Default SOP vs CCIA Optimized Plan
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Metric
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Default SOP
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    CCIA Plan
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-emerald-700">
                    Savings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Fuel Consumption</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-red-100 text-red-800">
                      {recommendation.defaultFuel}L
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {recommendation.cciaFuel}L
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-emerald-600">
                        {fuelSavings}L ({fuelSavingsPercentage.toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="font-medium">CO₂ Emissions</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-red-100 text-red-800">
                      {(recommendation.defaultFuel * 2.31).toFixed(1)} kg
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {(recommendation.cciaFuel * 2.31).toFixed(1)} kg
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-emerald-600">
                        {recommendation.co2Avoided} kg
                      </span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 text-yellow-600">₹</span>
                      <span className="font-medium">Fuel Cost</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-red-100 text-red-800">
                      ₹{(recommendation.defaultFuel * 85).toLocaleString()}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      ₹{(recommendation.cciaFuel * 85).toLocaleString()}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-emerald-600">
                        ₹{costSavings.toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">
                  Total Savings
                </h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                ₹{costSavings.toLocaleString()}
              </p>
              <p className="text-sm text-emerald-700">Per trip</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">CO₂ Avoided</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {recommendation.co2Avoided} kg
              </p>
              <p className="text-sm text-green-700">
                Carbon footprint reduction
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Efficiency Gain</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {fuelSavingsPercentage.toFixed(1)}%
              </p>
              <p className="text-sm text-blue-700">
                Fuel efficiency improvement
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoAuditTable;
