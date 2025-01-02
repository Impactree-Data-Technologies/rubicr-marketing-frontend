"use client"
import React, { useState, ChangeEvent } from "react";

// Define interface for state data
interface StateData {
  emissionFactor: number;
  avgRate: number;
}

// Define interface for state data dictionary
interface StateDataDictionary {
  [key: string]: StateData;
}

// Define interfaces for calculation inputs
interface PowerInputs {
  electricity: string;
  gridFactor: string;
}

interface SpendInputs {
  electricitySpend: string;
  averageRate: string;
  emissionFactor: string;
}

// Define interfaces for calculation results
interface PowerResult {
  totalEmissions: string;
  unit: string;
}

interface SpendResult {
  consumption: string;
  totalEmissions: string;
  unit: string;
}

const Scope2Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"power" | "spend">("power");
  const [selectedState, setSelectedState] = useState<string>("");
  const [useCustomValues, setUseCustomValues] = useState<boolean>(false);

  // Define state-specific data
  const stateData: StateDataDictionary = {
    "Andhra Pradesh": { emissionFactor: 0.82, avgRate: 6.70 },
    // ... rest of the state data
  };

  // State management with typed useState hooks
  const [powerInputs, setPowerInputs] = useState<PowerInputs>({
    electricity: "",
    gridFactor: "",
  });

  const [spendInputs, setSpendInputs] = useState<SpendInputs>({
    electricitySpend: "",
    averageRate: "",
    emissionFactor: "",
  });

  const [powerResult, setPowerResult] = useState<PowerResult | null>(null);
  const [spendResult, setSpendResult] = useState<SpendResult | null>(null);

  // Typed event handlers
  const handleStateChange = (state: string): void => {
    setSelectedState(state);
    if (state && stateData[state] && !useCustomValues) {
      setSpendInputs({
        ...spendInputs,
        averageRate: stateData[state].avgRate.toString(),
        emissionFactor: stateData[state].emissionFactor.toString(),
      });
      setPowerInputs({
        ...powerInputs,
        gridFactor: stateData[state].emissionFactor.toString(),
      });
    }
  };

  const handleCustomToggle = (checked: boolean): void => {
    setUseCustomValues(checked);
    if (!checked && selectedState) {
      setSpendInputs({
        ...spendInputs,
        averageRate: stateData[selectedState].avgRate.toString(),
        emissionFactor: stateData[selectedState].emissionFactor.toString(),
      });
      setPowerInputs({
        ...powerInputs,
        gridFactor: stateData[selectedState].emissionFactor.toString(),
      });
    }
  };

  const handlePowerInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setPowerInputs({
      ...powerInputs,
      [name]: value,
    });
  };

  const handleSpendInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSpendInputs({
      ...spendInputs,
      [name]: value,
    });
  };

  // Calculation functions with type safety
  const calculatePowerBased = (): void => {
    const electricity = parseFloat(powerInputs.electricity);
    const gridFactor = parseFloat(powerInputs.gridFactor);

    if (!isNaN(electricity) && !isNaN(gridFactor)) {
      const emissions = (electricity * gridFactor) / 1000;
      setPowerResult({
        totalEmissions: emissions.toFixed(2),
        unit: "tCO2e",
      });
    }
  };

  const calculateSpendBased = (): void => {
    const spend = parseFloat(spendInputs.electricitySpend);
    const rate = parseFloat(spendInputs.averageRate);
    const factor = parseFloat(spendInputs.emissionFactor);

    if (!isNaN(spend) && !isNaN(rate) && !isNaN(factor)) {
      const kwh = spend / rate;
      const emissions = (kwh * factor) / 1000;
      setSpendResult({
        consumption: kwh.toFixed(2),
        totalEmissions: emissions.toFixed(2),
        unit: "tCO2e",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Emission Calculator</h1>

      {/* State Selection and Custom Toggle */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <label className="block text-sm font-medium mb-2">
              Select State <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              disabled={useCustomValues}
            >
              <option value="">Select a state</option>
              {Object.keys(stateData).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              id="customValues"
              checked={useCustomValues}
              onChange={(e) => handleCustomToggle(e.target.checked)}
              className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="customValues" className="ml-2 block text-sm text-gray-900">
              Use Custom Values
            </label>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "power"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("power")}
        >
          Power-Based Method
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "spend"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("spend")}
        >
          Spend-Based Method
        </button>
      </div>

      <div className="space-y-6">
        {/* Power-Based Form */}
        {activeTab === "power" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Electricity Consumption (kWh) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="electricity"
                  value={powerInputs.electricity}
                  onChange={handlePowerInputChange}
                  placeholder="Enter electricity consumption"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Grid Emission Factor (kgCO2e/kWh) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="gridFactor"
                  value={powerInputs.gridFactor}
                  onChange={handlePowerInputChange}
                  readOnly={!useCustomValues}
                  className={`w-full p-2 border rounded-md ${
                    useCustomValues 
                      ? "focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      : "bg-gray-50"
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={calculatePowerBased}
                disabled={!selectedState && !useCustomValues}
                className="px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Calculate Emissions
              </button>
            </div>

            {powerResult && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p>Total Emissions: {powerResult.totalEmissions} {powerResult.unit}</p>
              </div>
            )}
          </div>
        )}

        {/* Spend-Based Form */}
        {activeTab === "spend" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Electricity Spend (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="electricitySpend"
                  value={spendInputs.electricitySpend}
                  onChange={handleSpendInputChange}
                  placeholder="Enter electricity spend"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Average Electricity Rate (₹/kWh) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="averageRate"
                  value={spendInputs.averageRate}
                  onChange={handleSpendInputChange}
                  readOnly={!useCustomValues}
                  className={`w-full p-2 border rounded-md ${
                    useCustomValues 
                      ? "focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      : "bg-gray-50"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Emission Factor (kgCO2e/kWh) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="emissionFactor"
                  value={spendInputs.emissionFactor}
                  onChange={handleSpendInputChange}
                  readOnly={!useCustomValues}
                  className={`w-full p-2 border rounded-md ${
                    useCustomValues 
                      ? "focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      : "bg-gray-50"
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={calculateSpendBased}
                disabled={!selectedState && !useCustomValues}
                className="px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Calculate Emissions
              </button>
            </div>

            {spendResult && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p>Estimated Consumption: {spendResult.consumption} kWh</p>
                <p>Total Emissions: {spendResult.totalEmissions} {spendResult.unit}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scope2Calculator;