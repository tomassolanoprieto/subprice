import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';

interface FilterState {
  minSavings: number;
  maxSavings: number;
  minPrice: number;
  maxPrice: number;
  minConsumption?: number;
  maxConsumption?: number;
  minLines?: number;
  maxLines?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minDevices?: number;
  maxDevices?: number;
  contractLength: number;
  currentProvider: string;
}

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  serviceType: 'energy' | 'communications' | 'alarms';
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange, serviceType }) => {
  const getInitialState = (): FilterState => {
    const baseState = {
      minSavings: 0,
      maxSavings: 100,
      minPrice: 0,
      maxPrice: 1000,
      contractLength: 12,
      currentProvider: '',
    };

    switch (serviceType) {
      case 'energy':
        return {
          ...baseState,
          minConsumption: 0,
          maxConsumption: 1000,
        };
      case 'communications':
        return {
          ...baseState,
          minLines: 1,
          maxLines: 10,
          minSpeed: 100,
          maxSpeed: 1000,
        };
      case 'alarms':
        return {
          ...baseState,
          minDevices: 1,
          maxDevices: 10,
        };
      default:
        return baseState;
    }
  };

  const [filters, setFilters] = useState<FilterState>(getInitialState());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters(getInitialState());
  };

  const getProviderOptions = () => {
    switch (serviceType) {
      case 'energy':
        return [
          { value: 'iberdrola', label: 'Iberdrola' },
          { value: 'endesa', label: 'Endesa' },
          { value: 'naturgy', label: 'Naturgy' },
          { value: 'repsol', label: 'Repsol' },
        ];
      case 'communications':
        return [
          { value: 'movistar', label: 'Movistar' },
          { value: 'vodafone', label: 'Vodafone' },
          { value: 'orange', label: 'Orange' },
          { value: 'yoigo', label: 'Yoigo' },
        ];
      case 'alarms':
        return [
          { value: 'securitas', label: 'Securitas Direct' },
          { value: 'prosegur', label: 'Prosegur' },
          { value: 'tyco', label: 'Tyco' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
        <button
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <RefreshCw className="w-4 h-4" />
          Resetear
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ahorro Deseado (%)
          </label>
          <div className="flex gap-4">
            <div>
              <label className="text-xs text-gray-500">Mínimo</label>
              <input
                type="number"
                name="minSavings"
                value={filters.minSavings}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Máximo</label>
              <input
                type="number"
                name="maxSavings"
                value={filters.maxSavings}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {serviceType === 'energy' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumo Mensual (kWh)
            </label>
            <div className="flex gap-4">
              <div>
                <label className="text-xs text-gray-500">Mínimo</label>
                <input
                  type="number"
                  name="minConsumption"
                  value={filters.minConsumption}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Máximo</label>
                <input
                  type="number"
                  name="maxConsumption"
                  value={filters.maxConsumption}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
        )}

        {serviceType === 'communications' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Líneas Móviles
              </label>
              <div className="flex gap-4">
                <div>
                  <label className="text-xs text-gray-500">Mínimo</label>
                  <input
                    type="number"
                    name="minLines"
                    value={filters.minLines}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Máximo</label>
                  <input
                    type="number"
                    name="maxLines"
                    value={filters.maxLines}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Velocidad Internet (Mb)
              </label>
              <div className="flex gap-4">
                <div>
                  <label className="text-xs text-gray-500">Mínimo</label>
                  <input
                    type="number"
                    name="minSpeed"
                    value={filters.minSpeed}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Máximo</label>
                  <input
                    type="number"
                    name="maxSpeed"
                    value={filters.maxSpeed}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {serviceType === 'alarms' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dispositivos
            </label>
            <div className="flex gap-4">
              <div>
                <label className="text-xs text-gray-500">Mínimo</label>
                <input
                  type="number"
                  name="minDevices"
                  value={filters.minDevices}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Máximo</label>
                <input
                  type="number"
                  name="maxDevices"
                  value={filters.maxDevices}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duración Máxima del Contrato (meses)
          </label>
          <input
            type="number"
            name="contractLength"
            value={filters.contractLength}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proveedor Actual
          </label>
          <select
            name="currentProvider"
            value={filters.currentProvider}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Todos</option>
            {getProviderOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Search className="w-4 h-4" />
          Buscar Clientes
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;