import React, { useState } from 'react';
import { Store, Users, Settings } from 'lucide-react';
import AccessCard from './components/AccessCard';
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserOnboarding from './pages/UserOnboarding';
import ProviderLogin from './pages/ProviderLogin';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';

function App() {
  const [userType, setUserType] = useState<'none' | 'provider' | 'user' | 'admin' | 'onboarding' | 'provider-login' | 'user-login' | 'admin-login'>('none');

  if (userType === 'admin-login') {
    return <AdminLogin onBack={() => setUserType('none')} onLogin={() => setUserType('admin')} />;
  }

  if (userType === 'admin') {
    return <AdminDashboard onLogout={() => setUserType('none')} />;
  }

  if (userType === 'user-login') {
    return (
      <UserLogin 
        onBack={() => setUserType('none')}
        onLogin={() => setUserType('user')}
        onNewUser={() => setUserType('onboarding')}
      />
    );
  }

  if (userType === 'onboarding') {
    return <UserOnboarding onComplete={() => setUserType('user')} />;
  }

  if (userType === 'provider-login') {
    return (
      <ProviderLogin 
        onBack={() => setUserType('none')}
        onLogin={() => setUserType('provider')}
      />
    );
  }

  if (userType === 'user') {
    return <UserDashboard />;
  }

  if (userType === 'provider') {
    return <ProviderDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 relative">
          <button
            onClick={() => setUserType('admin-login')}
            className="absolute right-0 top-0 p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            title="Panel de Administración"
          >
            <Settings className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a <span className="text-indigo-600">Subprice</span>
          </h1>
          <p className="text-xl text-gray-600">
            Selecciona tu tipo de acceso para comenzar
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AccessCard 
            title="Acceso Proveedor"
            description="Para empresas y profesionales que ofrecen servicios en nuestra plataforma"
            icon={<Store className="w-8 h-8" />}
            bgImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1024"
            primaryColor="from-purple-500 to-indigo-600"
            onClick={() => setUserType('provider-login')}
          />

          <AccessCard 
            title="Acceso Usuario"
            description="Para clientes que buscan servicios y productos de calidad"
            icon={<Users className="w-8 h-8" />}
            bgImage="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1024"
            primaryColor="from-emerald-500 to-teal-600"
            onClick={() => setUserType('user-login')}
            onNewUser={() => setUserType('onboarding')}
            showNewUserOption={true}
          />
        </div>
      </div>
    </div>
  );
}

export default App;