import React, { useState, useMemo } from 'react';
import { Users, Edit2, Trash2, Plus, Mail, Calendar } from 'lucide-react';
import UserModal from './UserModal';
import SearchBar from './SearchBar';

interface User {
  id: string;
  email: string;
  role: 'user';
  status: 'active' | 'inactive';
  services: {
    energy?: boolean;
    communications?: boolean;
    alarms?: boolean;
  };
  createdAt: string;
  lastLogin?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'usuario1@example.com',
    role: 'user',
    status: 'active',
    services: {
      energy: true,
      communications: true,
      alarms: false
    },
    createdAt: '2024-01-15',
    lastLogin: '2024-03-20'
  },
  {
    id: '2',
    email: 'usuario2@example.com',
    role: 'user',
    status: 'active',
    services: {
      energy: false,
      communications: true,
      alarms: true
    },
    createdAt: '2024-02-01',
    lastLogin: '2024-03-19'
  }
];

const UsersList: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter(user => 
      user.email.toLowerCase().includes(query) ||
      Object.entries(user.services)
        .filter(([_, value]) => value)
        .some(([key]) => key.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleSubmit = async (data: Partial<User>) => {
    if (selectedUser) {
      // Actualizar usuario existente
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, ...data } : u
      ));
    } else {
      // Crear nuevo usuario
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email!,
        role: 'user',
        status: data.status || 'active',
        services: data.services || {},
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Gestión de Usuarios
            </h2>
          </div>
          <button
            onClick={handleCreateUser}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Añadir Usuario
          </button>
        </div>

        <SearchBar
          placeholder="Buscar por email o servicios..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servicios
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Último Acceso
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        Desde {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(user.services).map(([service, active]) => 
                      active && (
                        <span
                          key={service}
                          className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs"
                        >
                          {service === 'energy' ? 'Energía' :
                           service === 'communications' ? 'Comunicaciones' :
                           'Alarmas'}
                        </span>
                      )
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </div>
                  ) : (
                    'Nunca'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UsersList;