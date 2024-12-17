import React, { useState } from 'react';
import BillList from '../BillList';
import UploadSection from '../UploadSection';
import NegotiationSettings from '../NegotiationSettings';

// Temporary mock data
const mockBills = [
  {
    id: 1,
    date: '2024-03-15',
    amount: 125.50,
    consumption: 450,
    provider: 'Iberdrola',
    period: 'Feb 2024',
  },
  {
    id: 2,
    date: '2024-02-15',
    amount: 138.75,
    consumption: 475,
    provider: 'Iberdrola',
    period: 'Jan 2024',
  },
];

const EnergyDashboard: React.FC = () => {
  const [bills, setBills] = useState(mockBills);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newBill = {
        id: bills.length + 1,
        date: new Date().toISOString().split('T')[0],
        amount: Math.random() * 200 + 100,
        consumption: Math.floor(Math.random() * 200 + 400),
        provider: 'Iberdrola',
        period: 'Mar 2024',
      };
      
      setBills(prevBills => [newBill, ...prevBills]);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Energía</h1>
        <p className="text-gray-600 mt-2">Administra tus facturas de electricidad</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <UploadSection 
            onFileUpload={handleFileUpload}
            isUploading={isUploading}
          />
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen Rápido
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Facturas</span>
                <span className="font-semibold">{bills.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Último Consumo</span>
                <span className="font-semibold">
                  {bills[0]?.consumption} kWh
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Último Importe</span>
                <span className="font-semibold">
                  {bills[0]?.amount.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          <NegotiationSettings />
        </div>

        <div className="lg:col-span-2">
          <BillList bills={bills} />
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;