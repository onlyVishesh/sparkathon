import { Calendar, MapPin, Package, Send, Truck, Weight } from "lucide-react";
import React, { useState } from "react";
import { cities, products } from "../data/cities";
import { ShipmentData } from "../types";

interface ShipmentFormProps {
  onSubmit: (data: ShipmentData) => void;
  isLoading: boolean;
}

const ShipmentForm: React.FC<ShipmentFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ShipmentData>({
    origin: "",
    destination: "",
    product: "",
    quantity: 0,
    deadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ShipmentData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    formData.origin &&
    formData.destination &&
    formData.product &&
    formData.quantity > 0 &&
    formData.deadline;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Truck className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Shipment Details
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your cold chain shipment information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Origin
            </label>
            <div className="relative">
              <select
                value={formData.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none transition-all duration-200 hover:border-gray-400 text-gray-700"
                required
              >
                <option value="" className="text-gray-500">
                  Select origin city
                </option>
                {cities.map((city) => (
                  <option
                    key={city.name}
                    value={city.name}
                    className="text-gray-700 py-2"
                  >
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Destination
            </label>
            <div className="relative">
              <select
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none transition-all duration-200 hover:border-gray-400 text-gray-700"
                required
              >
                <option value="" className="text-gray-500">
                  Select destination city
                </option>
                {cities.map((city) => (
                  <option
                    key={city.name}
                    value={city.name}
                    className="text-gray-700 py-2"
                  >
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 inline mr-2" />
              Product
            </label>
            <div className="relative">
              <select
                value={formData.product}
                onChange={(e) => handleChange("product", e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none transition-all duration-200 hover:border-gray-400 text-gray-700"
                required
              >
                <option value="" className="text-gray-500">
                  Select product
                </option>
                {products.map((product) => (
                  <option
                    key={product}
                    value={product}
                    className="text-gray-700 py-2"
                  >
                    {product}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Weight className="w-4 h-4 inline mr-2" />
              Quantity (tons)
            </label>
            <input
              type="number"
              value={formData.quantity || ""}
              onChange={(e) =>
                handleChange("quantity", parseFloat(e.target.value) || 0)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 text-gray-700"
              min="0"
              step="0.1"
              placeholder="Enter quantity"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Delivery Deadline
          </label>
          <input
            type="datetime-local"
            value={formData.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Generating AI Plan...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Generate AI Recommendation
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ShipmentForm;
