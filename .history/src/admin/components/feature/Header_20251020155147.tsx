import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Bell, LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{title}</h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-600 mt-1 truncate">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
                <button className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <HelpCircle className="w-4 h-4 text-gray-600" />
                </button>
                <button className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Bell className="w-4 h-4 text-gray-600" />
                </button>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-xs sm:text-sm text-gray-600 hidden sm:block truncate max-w-20">{user?.full_name}</span>
            <button 
              onClick={handleLogout}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
              title="Chiqish"
            >
              <LogOut className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};