import React, { useState } from 'react';
import { Upload, ArrowLeft, FileText, Mail } from 'lucide-react';

interface UserOnboardingProps {
  onComplete: () => void;
}

const UserOnboarding: React.FC<UserOnboardingProps> = ({ onComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleFileUpload = async (file: File) => {
    if (!validateEmail(email)) {
      setEmailError('Por favor, introduce un email válido');
      return;
    }

    setIsUploading(true);
    
    // Simulate file upload progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(i);
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsUploading(false);
    setUploadProgress(0);
    onComplete();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Comienza con SubPrice
            </h1>
            <p className="text-gray-600">
              Sube tu última factura y nosotros nos encargamos del resto
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-8 p-4 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">
                  ¿Por qué necesitamos tu factura?
                </h3>
                <p className="text-sm text-blue-700">
                  Con tu factura podemos analizar tu consumo actual y encontrar las mejores 
                  ofertas que se ajusten a tus necesidades. Además, nos permite crear tu 
                  cuenta con los datos correctos para facilitar futuras gestiones.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium text-gray-900">
                  Tu dirección de email
                </h3>
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="ejemplo@correo.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    emailError ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600">
                    {emailError}
                  </p>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Lo utilizaremos para notificarte sobre ofertas y el estado de tu cuenta
              </p>
            </div>

            <div
              className={`
                relative border-2 border-dashed rounded-xl p-8
                ${isUploading ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300'}
                transition-colors duration-200
              `}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                disabled={isUploading}
              />
              
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm font-medium text-gray-900">
                  {isUploading ? 'Subiendo archivo...' : 'Arrastra tu factura aquí'}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  PDF, JPG o PNG hasta 10MB
                </p>
                
                {isUploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {uploadProgress}% completado
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Al subir tu factura, aceptas nuestros{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700">
                términos y condiciones
              </a>
              {' '}y{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700">
                política de privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;