import React, { useState } from 'react';
import { Shield, Filter, Save, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

// Spanish provinces array
const spanishProvinces = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
  'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca',
  'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares',
  'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga',
  'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife',
  'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid',
  'Vizcaya', 'Zamora', 'Zaragoza'
];

interface Provider {
  id: string;
  name: string;
  email: string;
  sectors: ('energy' | 'communications' | 'alarms')[];
  status: 'active' | 'pending' | 'inactive';
  filters: {
    energy?: string[];
    communications?: string[];
    alarms?: string[];
  };
  registrationDate: string;
  subscriptionEnd: string;
  provinces?: string[];
}

interface AccessManagementProps {
  provider: Provider;
  onUpdate: (updates: any) => void;
}

const AccessManagement: React.FC<AccessManagementProps> = ({ provider, onUpdate }) => {
  const [selectedSectors, setSelectedSectors] = useState<string[]>(provider.sectors);
  const [selectedFilters, setSelectedFilters] = useState(provider.filters);
  const [subscriptionEnd, setSubscriptionEnd] = useState(provider.subscriptionEnd);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(provider.provinces || []);
  const [searchProvince, setSearchProvince] = useState('');
  const [isGeographicCoverageOpen, setIsGeographicCoverageOpen] = useState(false);

  const getFiltersForSector = (sector: string) => {
    switch (sector) {
      case 'energy':
        return [
          { id: 'consumption', label: 'Consumo' },
          { id: 'renewableEnergy', label: 'Energía Renovable' },
          { id: 'maxPrice', label: 'Precio Máximo' },
          { id: 'peakHours', label: 'Horas Punta' },
          { id: 'contractType', label: 'Tipo de Contrato' },
          { id: 'powerCapacity', label: 'Potencia Contratada' }
        ];
      case 'communications':
        return [
          { id: 'mobileLines', label: 'Líneas Móviles' },
          { id: 'internetSpeed', label: 'Velocidad Internet' },
          { id: 'tvChannels', label: 'Canales TV' },
          { id: 'mobileData', label: 'Datos Móviles' },
          { id: 'landline', label: 'Línea Fija' },
          { id: 'roaming', label: 'Roaming' }
        ];
      case 'alarms':
        return [
          { id: 'cameras', label: 'Cámaras' },
          { id: 'sensors', label: 'Sensores' },
          { id: 'monitoring', label: 'Monitorización' },
          { id: 'response', label: 'Tiempo Respuesta' },
          { id: 'smartHome', label: 'Domótica' },
          { id: 'maintenance', label: 'Mantenimiento' }
        ];
      default:
        return [];
    }
  };

  const handleSectorToggle = (sectorId: string) => {
    setSelectedSectors(prev => {
      if (prev.includes(sectorId)) {
        return prev.filter(s => s !== sectorId);
      }
      return [...prev, sectorId];
    });
  };

  const handleFilterToggle = (sectorId: string, filterId: string) => {
    setSelectedFilters(prev => {
      const sectorFilters = prev[sectorId as keyof typeof prev] || [];
      const updatedFilters = sectorFilters.includes(filterId)
        ? sectorFilters.filter(f => f !== filterId)
        : [...sectorFilters, filterId];

      return {
        ...prev,
        [sectorId]: updatedFilters,
      };
    });
  };

  const handleProvinceToggle = (province: string) => {
    setSelectedProvinces(prev => {
      if (prev.includes(province)) {
        return prev.filter(p => p !== province);
      }
      return [...prev, province];
    });
  };

  const toggleAllProvinces = () => {
    setSelectedProvinces(prev => 
      prev.length === spanishProvinces.length ? [] : [...spanishProvinces]
    );
  };

  const handleSave = () => {
    onUpdate({
      sectors: selectedSectors,
      filters: selectedFilters,
      subscriptionEnd,
      provinces: selectedProvinces,
    });
  };

  const filteredProvinces = spanishProvinces.filter(province =>
    province.toLowerCase().includes(searchProvince.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Gestión de Accesos para {provider.name}
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-medium text-gray-700">
                Período de Suscripción
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Fecha de Alta
                </label>
                <input
                  type="date"
                  value={provider.registrationDate}
                  disabled
                  className="w-full rounded-md border-gray-300 bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Fin de Suscripción
                </label>
                <input
                  type="date"
                  value={subscriptionEnd}
                  onChange={(e) => setSubscriptionEnd(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-medium text-gray-700">
                Sectores y Filtros
              </h3>
            </div>
            <div className="space-y-6">
              {['energy', 'communications', 'alarms'].map((sector) => (
                <div key={sector} className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSectors.includes(sector)}
                      onChange={() => handleSectorToggle(sector)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {sector === 'energy' ? 'Energía' : 
                       sector === 'communications' ? 'Comunicaciones' : 
                       'Alarmas'}
                    </span>
                  </label>

                  {selectedSectors.includes(sector) && (
                    <div className="ml-6 grid grid-cols-2 gap-2">
                      {getFiltersForSector(sector).map((filter) => (
                        <label key={filter.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters[sector as keyof typeof selectedFilters]?.includes(filter.id)}
                            onChange={() => handleFilterToggle(sector, filter.id)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {filter.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => setIsGeographicCoverageOpen(!isGeographicCoverageOpen)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-medium text-gray-700">
                  Cobertura Geográfica
                </h3>
                <span className="text-sm text-gray-500">
                  ({selectedProvinces.length} provincias seleccionadas)
                </span>
              </div>
              {isGeographicCoverageOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {isGeographicCoverageOpen && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar provincia..."
                    value={searchProvince}
                    onChange={(e) => setSearchProvince(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredProvinces.map((province) => (
                    <label
                      key={province}
                      className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProvinces.includes(province)}
                        onChange={() => handleProvinceToggle(province)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">{province}</span>
                    </label>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{selectedProvinces.length} provincias seleccionadas</span>
                  <button
                    onClick={toggleAllProvinces}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    {selectedProvinces.length === spanishProvinces.length
                      ? 'Deseleccionar todas'
                      : 'Seleccionar todas'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;