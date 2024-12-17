import React from 'react';
import { Users, Zap, Calendar, TrendingUp, Wifi, Shield, Smartphone } from 'lucide-react';

interface BaseCustomer {
  id: number;
  anonymousId: string;
  currentProvider: string;
  desiredSavings: number;
  maxContractLength: number;
  lastBillAmount: number;
  region: string;
}

interface EnergyCustomer extends BaseCustomer {
  consumption: number;
  renewableEnergy: number;
}

interface CommunicationsCustomer extends BaseCustomer {
  mobileLines: number;
  internetSpeed: number;
}

interface AlarmsCustomer extends BaseCustomer {
  cameras: number;
  sensors: number;
}

type Customer = EnergyCustomer | CommunicationsCustomer | AlarmsCustomer;

interface PotentialCustomerListProps {
  customers: Customer[];
  serviceType: 'energy' | 'communications' | 'alarms';
}

const PotentialCustomerList: React.FC<PotentialCustomerListProps> = ({ 
  customers,
  serviceType
}) => {
  const renderCustomerDetails = (customer: Customer) => {
    switch (serviceType) {
      case 'energy':
        const energyCustomer = customer as EnergyCustomer;
        return (
          <>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {energyCustomer.consumption} kWh/mes
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {energyCustomer.desiredSavings}% ahorro
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                Máx. {energyCustomer.maxContractLength} meses
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">
                {energyCustomer.renewableEnergy}% renovable
              </span>
            </div>
          </>
        );

      case 'communications':
        const commsCustomer = customer as CommunicationsCustomer;
        return (
          <>
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {commsCustomer.mobileLines} líneas
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {commsCustomer.internetSpeed} Mb
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {commsCustomer.desiredSavings}% ahorro
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                Máx. {commsCustomer.maxContractLength} meses
              </span>
            </div>
          </>
        );

      case 'alarms':
        const alarmsCustomer = customer as AlarmsCustomer;
        return (
          <>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {alarmsCustomer.sensors} sensores
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {alarmsCustomer.desiredSavings}% ahorro
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                Máx. {alarmsCustomer.maxContractLength} meses
              </span>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">
          Clientes Potenciales
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Los datos personales están protegidos hasta que el cliente acepte una oferta
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="p-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Cliente #{customer.anonymousId}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Región: {customer.region}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {customer.lastBillAmount.toFixed(2)}€
                </p>
                <p className="text-sm text-gray-500">
                  Última factura
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {renderCustomerDetails(customer)}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Enviar Oferta
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                Ver Más Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PotentialCustomerList;