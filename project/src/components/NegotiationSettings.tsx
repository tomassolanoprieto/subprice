import React, { useState } from 'react';
import { Settings, Save, PlusCircle, X } from 'lucide-react';

interface Condition {
  id: string;
  type: string;
  value: number;
}

interface NegotiationSettingsProps {
  serviceType?: 'energy' | 'communications' | 'alarms';
}

const NegotiationSettings: React.FC<NegotiationSettingsProps> = ({ 
  serviceType = 'energy' 
}) => {
  const getDefaultConditions = () => {
    if (serviceType === 'communications') {
      return [
        { id: '1', type: 'savings', value: 10 },
        { id: '2', type: 'mobile_lines', value: 2 },
      ];
    }
    return [
      { id: '1', type: 'savings', value: 10 },
      { id: '2', type: 'renewable', value: 50 },
    ];
  };

  const [conditions, setConditions] = useState<Condition[]>(getDefaultConditions());

  const getConditionOptions = () => {
    if (serviceType === 'communications') {
      return [
        { value: 'savings', label: 'Ahorro Mínimo' },
        { value: 'mobile_lines', label: 'Líneas Móviles' },
        { value: 'internet_speed', label: 'Velocidad Internet' },
        { value: 'mobile_data', label: 'Datos Móviles (GB)' },
        { value: 'tv_channels', label: 'Canales TV' },
        { value: 'contract_length', label: 'Duración del Contrato' },
      ];
    }
    return [
      { value: 'savings', label: 'Ahorro Mínimo' },
      { value: 'renewable', label: 'Energía Renovable' },
      { value: 'contract_length', label: 'Duración del Contrato' },
    ];
  };

  const getValueSuffix = (type: string) => {
    switch (type) {
      case 'savings':
      case 'renewable':
        return '%';
      case 'contract_length':
        return 'meses';
      case 'mobile_lines':
        return 'líneas';
      case 'internet_speed':
        return 'Mb';
      case 'mobile_data':
        return 'GB';
      case 'tv_channels':
        return 'canales';
      default:
        return '';
    }
  };

  const addCondition = () => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      type: getConditionOptions()[0].value,
      value: 0,
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof Condition, value: any) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Condiciones de Negociación
          </h2>
        </div>
        <button
          onClick={addCondition}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <PlusCircle className="w-4 h-4" />
          Añadir Condición
        </button>
      </div>

      <div className="space-y-4">
        {conditions.map((condition) => (
          <div
            key={condition.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <select
              value={condition.type}
              onChange={(e) => updateCondition(condition.id, 'type', e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {getConditionOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={condition.value}
                onChange={(e) => updateCondition(condition.id, 'value', Number(e.target.value))}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="text-sm text-gray-500">
                {getValueSuffix(condition.type)}
              </span>
            </div>

            <button
              onClick={() => removeCondition(condition.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Guardar Cambios
        </button>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          ¿Cómo funciona?
        </h3>
        <p className="text-sm text-blue-700">
          Estas condiciones se utilizarán para evaluar automáticamente las ofertas de los proveedores.
          Si una oferta cumple con todas las condiciones establecidas, se te notificará para que puedas
          realizar el cambio de proveedor de manera sencilla.
        </p>
      </div>
    </div>
  );
};

export default NegotiationSettings;