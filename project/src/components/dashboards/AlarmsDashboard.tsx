import React from 'react';
import { Shield, Bell, Camera } from 'lucide-react';

const AlarmsDashboard: React.FC = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Alarmas</h1>
        <p className="text-gray-600 mt-2">Administra tus sistemas de seguridad</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold">Sistema de Alarma</h3>
          </div>
          <p className="text-gray-600">Próximamente disponible</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold">Notificaciones</h3>
          </div>
          <p className="text-gray-600">Próximamente disponible</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Camera className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold">Videovigilancia</h3>
          </div>
          <p className="text-gray-600">Próximamente disponible</p>
        </div>
      </div>
    </div>
  );
};

export default AlarmsDashboard;