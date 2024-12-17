import React, { useState, useMemo } from 'react';
import { Store, Check, X, Edit2, Save, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import AccessManagement from './AccessManagement';
import SearchBar from './SearchBar';

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
  stats: {
    monthlyOperations: number;
    monthlyRevenue: number;
  };
}

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Iberdrola',
    email: 'ofertas@iberdrola.es',
    sectors: ['energy'],
    status: 'active',
    filters: {
      energy: ['consumption', 'renewableEnergy', 'maxPrice'],
    },
    registrationDate: '2024-01-15',
    subscriptionEnd: '2025-01-15',
    stats: {
      monthlyOperations: 45,
      monthlyRevenue: 5625.50
    }
  },
  {
    id: '2',
    name: 'Movistar',
    email: 'business@movistar.es',
    sectors: ['communications'],
    status: 'active',
    filters: {
      communications: ['mobileLines', 'internetSpeed', 'tvChannels'],
    },
    registrationDate: '2024-02-01',
    subscriptionEnd: '2025-02-01',
    stats: {
      monthlyOperations: 32,
      monthlyRevenue: 2880.00
    }
  },
];

const ProvidersList: React.FC = () => {
  const [providers, setProviders] = useState(mockProviders);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return providers.filter(provider => 
      provider.name.toLowerCase().includes(query) ||
      provider.email.toLowerCase().includes(query) ||
      provider.sectors.some(sector => sector.toLowerCase().includes(query))
    );
  }, [providers, searchQuery]);

  const getStatusBadge = (status: Provider['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status === 'active' ? 'Activo' : status === 'pending' ? 'Pendiente' : 'Inactivo'}
      </span>
    );
  };

  const getSectorLabel = (sector: Provider['sectors'][number]) => {
    const labels = {
      energy: 'Energía',
      communications: 'Comunicaciones',
      alarms: 'Alarmas',
    };
    return labels[sector];
  };

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(selectedProvider?.id === provider.id ? null : provider);
  };

  const handleAccessUpdate = (providerId: string, updatedAccess: any) => {
    setProviders(providers.map(p => 
      p.id === providerId 
        ? { ...p, ...updatedAccess }
        : p
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Store className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Proveedores Registrados
            </h2>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Añadir Proveedor
          </button>
        </div>

        <SearchBar
          placeholder="Buscar por nombre, email o sector..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proveedor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sectores
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Operaciones (último mes)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ingresos (último mes)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Suscripción
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProviders.map((provider) => (
              <React.Fragment key={provider.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {provider.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {provider.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {provider.sectors.map((sector) => (
                        <span
                          key={sector}
                          className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs"
                        >
                          {getSectorLabel(sector)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(provider.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {provider.stats.monthlyOperations}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {provider.stats.monthlyRevenue.toLocaleString('es-ES', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getDaysRemaining(provider.subscriptionEnd)} días restantes
                    </div>
                    <div className="text-xs text-gray-500">
                      Hasta {formatDate(provider.subscriptionEnd)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleProviderSelect(provider)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                {selectedProvider?.id === provider.id && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-gray-50">
                      <AccessManagement 
                        provider={provider}
                        onUpdate={(updates) => handleAccessUpdate(provider.id, updates)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvidersList;