import React from 'react';
import { Bell, CheckCircle, XCircle, ArrowRight, FileText } from 'lucide-react';

interface Offer {
  id: string;
  provider: string;
  currentAmount: number;
  newAmount: number;
  savings: number;
  savingsPercentage: number;
  features: string[];
  date: string;
}

const mockOffers: Offer[] = [
  {
    id: '1',
    provider: 'Naturgy',
    currentAmount: 125.50,
    newAmount: 98.75,
    savings: 26.75,
    savingsPercentage: 21.3,
    features: [
      'Tarifa plana mensual',
      '100% energía verde',
      'Sin permanencia',
      'Atención 24/7'
    ],
    date: '2024-03-20'
  },
  {
    id: '2',
    provider: 'Repsol',
    currentAmount: 125.50,
    newAmount: 102.50,
    savings: 23.00,
    savingsPercentage: 18.3,
    features: [
      'Precio fijo 12 meses',
      'Descuento en carburante',
      'Mantenimiento incluido',
      'App de control de consumo'
    ],
    date: '2024-03-19'
  }
];

const NotificationsSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Ofertas Pendientes
          </h2>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Revisa y acepta ofertas de proveedores que cumplen tus condiciones
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {mockOffers.map((offer) => (
          <div key={offer.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Oferta de {offer.provider}
                </h3>
                <p className="text-sm text-gray-500">
                  Recibida el {new Date(offer.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  -{offer.savingsPercentage}%
                </div>
                <p className="text-sm text-gray-500">
                  Ahorro mensual
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Factura actual</div>
                <div className="text-xl font-semibold">{offer.currentAmount.toFixed(2)}€</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Nueva factura</div>
                <div className="text-xl font-semibold text-green-600">
                  {offer.newAmount.toFixed(2)}€
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Características de la oferta:
              </h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {offer.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <ArrowRight className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-indigo-900">
                    Delegación de Contrato
                  </h4>
                  <p className="text-sm text-indigo-700 mt-1">
                    Al delegar el contrato, autorizas a SubPrice a gestionar todos los trámites 
                    administrativos necesarios para el cambio de proveedor en tu nombre, 
                    asegurándonos de una transición sin complicaciones.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <CheckCircle className="w-4 h-4" />
                Delegar Contrato
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                <XCircle className="w-4 h-4" />
                Rechazar Oferta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;