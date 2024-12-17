import React, { useState } from 'react';
import { Search, Filter, Users, TrendingUp, Zap, Calendar, Wifi, Shield } from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import PotentialCustomerList from '../components/PotentialCustomerList';

type ServiceType = 'energy' | 'communications' | 'alarms';

// Mock data - In production, this would come from an API
const mockCustomers = {
  energy: [
    {
      id: 1,
      anonymousId: 'SP7842',
      currentProvider: 'Iberdrola',
      consumption: 450,
      desiredSavings: 10,
      renewableEnergy: 50,
      maxContractLength: 12,
      lastBillAmount: 125.50,
      region: 'Madrid',
    },
    {
      id: 2,
      anonymousId: 'SP9123',
      currentProvider: 'Endesa',
      consumption: 380,
      desiredSavings: 15,
      renewableEnergy: 75,
      maxContractLength: 24,
      lastBillAmount: 98.75,
      region: 'Barcelona',
    },
  ],
  communications: [
    {
      id: 3,
      anonymousId: 'SP5532',
      currentProvider: 'Movistar',
      desiredSavings: 12,
      mobileLines: 3,
      internetSpeed: 600,
      maxContractLength: 18,
      lastBillAmount: 89.90,
      region: 'Valencia',
    },
    {
      id: 4,
      anonymousId: 'SP6721',
      currentProvider: 'Vodafone',
      desiredSavings: 20,
      mobileLines: 2,
      internetSpeed: 300,
      maxContractLength: 12,
      lastBillAmount: 75.50,
      region: 'Sevilla',
    },
  ],
  alarms: [
    {
      id: 5,
      anonymousId: 'SP3344',
      currentProvider: 'Securitas Direct',
      desiredSavings: 15,
      cameras: 2,
      sensors: 4,
      maxContractLength: 24,
      lastBillAmount: 45.90,
      region: 'Madrid',
    },
  ],
};

function ProviderDashboard() {
  const [selectedService, setSelectedService] = useState<ServiceType>('energy');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filters: any) => {
    // In production, this would make an API call with the filters
    console.log('Applied filters:', filters);
  };

  const getServiceIcon = (service: ServiceType) => {
    switch (service) {
      case 'energy':
        return <Zap className="w-5 h-5" />;
      case 'communications':
        return <Wifi className="w-5 h-5" />;
      case 'alarms':
        return <Shield className="w-5 h-5" />;
    }
  };

  const getServiceLabel = (service: ServiceType) => {
    switch (service) {
      case 'energy':
        return 'Energía';
      case 'communications':
        return 'Comunicaciones';
      case 'alarms':
        return 'Alarmas';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Proveedor</h1>
          <p className="text-gray-600 mt-2">
            Encuentra clientes potenciales basados en sus condiciones de consumo
          </p>
        </header>

        {/* Service Type Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Selecciona el sector
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['energy', 'communications', 'alarms'] as ServiceType[]).map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all
                    ${selectedService === service 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50'
                    }`}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedService === service 
                      ? 'bg-indigo-100' 
                      : 'bg-gray-100'
                    }`}>
                    {getServiceIcon(service)}
                  </div>
                  <span className="font-medium">{getServiceLabel(service)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Cards */}
          <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes Potenciales</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {mockCustomers[selectedService].length}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {selectedService === 'energy' ? 'Consumo Promedio' : 
                     selectedService === 'communications' ? 'Líneas Promedio' :
                     'Dispositivos Promedio'}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {selectedService === 'energy' 
                      ? '425 kWh'
                      : selectedService === 'communications'
                      ? '2.5'
                      : '3'}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ahorro Promedio</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">12.5%</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Duración Promedio</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">18 meses</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="lg:col-span-1">
            <SearchFilters 
              onFilterChange={handleFilterChange}
              serviceType={selectedService}
            />
          </div>

          {/* Customers List */}
          <div className="lg:col-span-3">
            <PotentialCustomerList 
              customers={mockCustomers[selectedService]}
              serviceType={selectedService}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;