import React from 'react';
import { Zap, Phone, Shield } from 'lucide-react';

type ServiceType = 'energy' | 'communications' | 'alarms';

interface ServiceSelectorProps {
  onServiceSelect: (service: ServiceType) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ onServiceSelect }) => {
  const services = [
    {
      id: 'energy',
      name: 'Energía',
      description: 'Gestiona tus facturas de electricidad y gas',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-600',
      bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1024',
    },
    {
      id: 'communications',
      name: 'Comunicaciones',
      description: 'Internet, telefonía y servicios móviles',
      icon: <Phone className="w-8 h-8" />,
      color: 'from-blue-500 to-indigo-600',
      bgImage: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1024',
    },
    {
      id: 'alarms',
      name: 'Alarmas',
      description: 'Sistemas de seguridad y vigilancia',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-600',
      bgImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1024',
    },
  ];

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Selecciona un Servicio
        </h1>
        <p className="text-gray-600">
          Elige el tipo de servicio que deseas gestionar
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => onServiceSelect(service.id as ServiceType)}
            className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <img
              src={service.bgImage}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            <div className="relative z-20 p-8 h-full flex flex-col min-h-[320px]">
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${service.color} mb-6 self-start`}>
                {service.icon}
              </div>
              
              <div className="mt-auto">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {service.name}
                </h2>
                <p className="text-gray-200 text-lg mb-6">
                  {service.description}
                </p>
                
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold 
                  transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg
                  flex items-center gap-2">
                  Gestionar
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;