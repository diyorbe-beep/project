import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, LogOut } from 'lucide-react';

export const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-8 h-8 text-sky-900" />
          <h1 className="text-2xl font-bold text-sky-900">NAJOT CLINIC</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
            Admin Panel
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Xush kelibsiz, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Chiqish</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
