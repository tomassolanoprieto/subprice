import React from 'react';

interface AccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
  primaryColor: string;
  onClick: () => void;
  onNewUser?: () => void;
  showNewUserOption?: boolean;
}

const AccessCard: React.FC<AccessCardProps> = ({
  title,
  description,
  icon,
  bgImage,
  primaryColor,
  onClick,
  onNewUser,
  showNewUserOption = false,
}) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-2">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        src={bgImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="relative z-20 p-8 h-full flex flex-col min-h-[320px]">
        <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${primaryColor} mb-6 self-start`}>
          {icon}
        </div>
        
        <div className="mt-auto">
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-200 text-lg mb-6">{description}</p>
          
          <div className="space-y-3">
            <button 
              onClick={onClick}
              className="w-full bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold 
                transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg
                flex items-center justify-center gap-2"
            >
              Ingresar
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

            {showNewUserOption && onNewUser && (
              <button
                onClick={onNewUser}
                className="w-full bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold 
                  transition-all duration-300 hover:bg-white hover:text-gray-900 hover:shadow-lg
                  flex items-center justify-center gap-2"
              >
                Todavía no soy cliente
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessCard;