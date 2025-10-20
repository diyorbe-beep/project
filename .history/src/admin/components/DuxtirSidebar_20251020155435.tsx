import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  UserHeart, 
  Bed, 
  BarChart3, 
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const duxtirMenuItems = [
  { id: 'dashboard', label: 'Bosh sahifa', icon: LayoutDashboard, path: '/duxtir' },
  { id: 'qabul', label: 'Qabul', icon: CalendarCheck, path: '/duxtir/qabul' },
  { id: 'bemorlar', label: 'Bemorlar', icon: Users, path: '/duxtir/bemorlar' },
  { id: 'shifokorlar', label: 'Shifokorlar', icon: UserHeart, path: '/duxtir/shifokorlar' },
  { id: 'xonalar', label: 'Xonalar', icon: Bed, path: '/duxtir/xonalar' },
  { id: 'hisobotlar', label: 'Hisobotlar', icon: BarChart3, path: '/duxtir/hisobotlar' },
  { id: 'profil', label: 'Profil', icon: Settings, path: '/duxtir/profil' }
];

export const DuxtirSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        bg-white h-screen transition-all duration-300 border-r border-gray-200 
        fixed lg:relative z-50
        ${collapsed ? 'w-16' : 'w-64'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">DUXTIR PANELI</h1>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
            >
              {collapsed ? <ChevronRight className="w-5 h-5 text-gray-600" /> : <ChevronLeft className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
          {!collapsed && (
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Malika Toshmatova</p>
          )}
        </div>

        <nav className="mt-4">
          {duxtirMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleMenuClick(item.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-4 sm:px-6 py-2 sm:py-3 text-left transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              {!collapsed && (
                <span className="ml-3 font-medium text-sm sm:text-base">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};