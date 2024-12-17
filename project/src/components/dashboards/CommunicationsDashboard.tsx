import React, { useState } from 'react';
import { Wifi, Phone, Smartphone } from 'lucide-react';
import BillList from '../BillList';
import UploadSection from '../UploadSection';
import NegotiationSettings from '../NegotiationSettings';

// Mock data for communications bills
const mockBills = [
  {
    id: 1,
    date: '2024-03-15',
    amount: 89.90,
    provider: 'Movistar',
    period: 'Feb 2024',
    penalty: {
      months: 8,
      amount: 120.00
    }
  },
  {
    id: 2,
    date: '2024-02-15',
    amount: 89.90,
    provider: 'Movistar',
    period: 'Jan 2024',
    penalty: {
      months: 9,
      amount: 135.00
    }
  },
];

const CommunicationsDashboard: React.FC = () => {
  const [bills, setBills] = useState(mockBills);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newBill = {
        id: bills.length + 1,
        date: new Date().toISOString().split('T')[0],
        amount: 89.90,
        provider: 'Movistar',
        period: 'Mar 2024',
        penalty: {
          months: 7,
          amount: 105.00
        }
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
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Comunicaciones</h1>
        <p className="text-gray-600 mt-2">Administra tus servicios de internet y telefonía</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <UploadSection 
            onFileUpload={handleFileUpload}
            isUploading={isUploading}
          />
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen del Servicio
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Velocidad Fibra</span>
                <span className="font-semibold">600 Mb</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Líneas Móviles</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Datos Móviles</span>
                <span className="font-semibold">Ilimitados</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">TV/Streaming</span>
                <span className="font-semibold">Básico</span>
              </div>
            </div>
          </div>

          <NegotiationSettings />
        </div>

        <div className="lg:col-span-2">
          <BillList bills={bills} serviceType="communications" />
        </div>
      </div>
    </div>
  );
};

export default CommunicationsDashboard;