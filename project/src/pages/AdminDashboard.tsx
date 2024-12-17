import React, { useState } from 'react';
import { Settings, Users, Store, LogOut } from 'lucide-react';
import ProvidersList from '../components/admin/ProvidersList';
import UsersList from '../components/admin/UsersList';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Section = 'providers' | 'users';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<Section>('providers');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Panel de Administración
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveSection('providers')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium ${
                    activeSection === 'providers'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Store className="w-5 h-5" />
                  Proveedores
                </button>
                <button
                  onClick={() => setActiveSection('users')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium ${
                    activeSection === 'users'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Usuarios
                </button>
              </nav>
            </div>
          </div>
        </div>

        {activeSection === 'providers' ? (
          <ProvidersList />
        ) : (
          <UsersList />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;