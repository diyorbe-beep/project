import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const duxtirMenuItems = [
  { id: 'dashboard', label: 'Bosh sahifa', icon: 'ri-dashboard-line', path: '/duxtir' },
  { id: 'qabul', label: 'Qabul', icon: 'ri-user-add-line', path: '/duxtir/qabul' },
  { id: 'bemorlar', label: 'Bemorlar ro\'yxati', icon: 'ri-user-line', path: '/duxtir/bemorlar' },
  { id: 'naybat', label: 'Naybatlar', icon: 'ri-calendar-check-line', path: '/duxtir/naybat' },
  { id: 'tolovlar', label: 'To\'lovlar', icon: 'ri-money-dollar-circle-line', path: '/duxtir/tolovlar' },
  { id: 'xonalar', label: 'Xonalar', icon: 'ri-hotel-bed-line', path: '/duxtir/xonalar' },
  { id: 'hisobotlar', label: 'Hisobotlar', icon: 'ri-bar-chart-line', path: '/duxtir/hisobotlar' },
  { id: 'profil', label: 'Profil', icon: 'ri-user-settings-line', path: '/duxtir/profil' }
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
          <i className="ri-menu-line text-gray-600 text-lg"></i>
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
              <i className={`ri-${collapsed ? 'menu-unfold' : 'menu-fold'}-line text-gray-600`}></i>
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
                <i className={`${item.icon} text-sm sm:text-lg`}></i>
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
