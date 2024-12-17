<content>import React from 'react';
import { X } from 'lucide-react';
import { Provider } from '@prisma/client';
import ProviderForm from './ProviderForm';

interface ProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider?: Provider;
  onSubmit: (data: Omit<Provider, 'id' | 'operations' | 'revenue'>) => Promise<void>;
}

const ProviderModal: React.FC<ProviderModalProps> = ({
  isOpen,
  onClose,
  provider,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {provider ? 'Editar Proveedor' : 'Nuevo Proveedor'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            <ProviderForm
              initialData={provider}
              onSubmit={onSubmit}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderModal;</content>