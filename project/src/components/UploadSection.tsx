import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  onFileUpload,
  isUploading 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Subir Nueva Factura
      </h2>
      
      <div
        className={`
          relative border-2 border-dashed rounded-xl
          ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
          transition-colors duration-200
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          disabled={isUploading}
        />
        
        <div className="p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-sm font-medium text-gray-900">
            {isUploading ? 'Subiendo archivo...' : 'Arrastra tu factura aquí'}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            PDF, JPG o PNG hasta 10MB
          </p>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`
              mt-4 inline-flex items-center px-4 py-2 rounded-md
              text-sm font-medium text-white
              ${isUploading 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'}
              transition-colors duration-200
            `}
          >
            {isUploading ? 'Procesando...' : 'Seleccionar archivo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;