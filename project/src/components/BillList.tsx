import React from 'react';
import { FileText, TrendingUp, Calendar, CreditCard, AlertTriangle } from 'lucide-react';

interface Bill {
  id: number;
  date: string;
  amount: number;
  consumption?: number; // Optional for communications
  provider: string;
  period: string;
  penalty?: {
    months: number;
    amount: number;
  };
}

interface BillListProps {
  bills: Bill[];
  serviceType?: 'energy' | 'communications' | 'alarms';
}

const BillList: React.FC<BillListProps> = ({ bills, serviceType = 'energy' }) => {
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalConsumption = bills.reduce((sum, bill) => sum + (bill.consumption || 0), 0);
  const hasPenalty = bills.some(bill => bill.penalty);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Total Summary */}
      <div className="p-6 bg-indigo-50 border-b border-indigo-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Total Acumulado
              </h3>
              <p className="text-sm text-gray-600">
                {bills.length} facturas
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-600">
              {totalAmount.toFixed(2)}€
            </p>
            {serviceType === 'energy' && (
              <p className="text-sm text-gray-600">
                {totalConsumption.toLocaleString()} kWh totales
              </p>
            )}
          </div>
        </div>
        
        {hasPenalty && serviceType === 'communications' && (
          <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Penalización por Permanencia
              </p>
              <p className="text-sm text-amber-700 mt-1">
                {bills[0].penalty?.months} meses restantes 
                ({bills[0].penalty?.amount.toFixed(2)}€ aprox.)
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="divide-y divide-gray-100">
        {bills.map((bill) => (
          <div 
            key={bill.id}
            className="p-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Factura {bill.provider}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Periodo: {bill.period}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {bill.amount.toFixed(2)}€
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(bill.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              {serviceType === 'energy' && bill.consumption && (
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {bill.consumption} kWh
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {bill.period}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillList;