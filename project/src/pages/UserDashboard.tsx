import React, { useState } from 'react';
import ServiceSelector from '../components/ServiceSelector';
import EnergyDashboard from '../components/dashboards/EnergyDashboard';
import CommunicationsDashboard from '../components/dashboards/CommunicationsDashboard';
import AlarmsDashboard from '../components/dashboards/AlarmsDashboard';
import PersonalDataSection from '../components/PersonalDataSection';
import NotificationsSection from '../components/NotificationsSection';
import { User, ArrowLeft, Bell } from 'lucide-react';

type View = 'services' | 'personal-data' | 'energy' | 'communications' | 'alarms' | 'notifications';

function UserDashboard() {
  const [currentView, setCurrentView] = useState<View>('services');

  const renderView = () => {
    switch (currentView) {
      case 'energy':
        return <EnergyDashboard />;
      case 'communications':
        return <CommunicationsDashboard />;
      case 'alarms':
        return <AlarmsDashboard />;
      case 'personal-data':
        return <PersonalDataSection />;
      case 'notifications':
        return <NotificationsSection />;
      default:
        return <ServiceSelector onServiceSelect={(service) => setCurrentView(service)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <img 
              src="/logo.png" 
              alt="SubPrice" 
              className="h-8 w-auto"
            />
            {currentView !== 'services' && (
              <button
                onClick={() => setCurrentView('services')}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Volver a servicios
              </button>
            )}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('notifications')}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  2
                </span>
              </button>
              <button
                onClick={() => setCurrentView('personal-data')}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {renderView()}
      </div>
    </div>
  );
}

export default UserDashboard;