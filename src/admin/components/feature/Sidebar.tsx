
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Bosh sahifa', icon: 'ri-dashboard-line', path: '/' },
  { id: 'shifokorlar', label: 'Shifokorlar', icon: 'ri-user-heart-line', path: '/shifokorlar' },
  { id: 'shifokor-panel', label: 'Shifokor paneli', icon: 'ri-stethoscope-line', path: '/shifokor-panel' },
  { id: 'qabul', label: 'Qabul', icon: 'ri-building-line', path: '/qabul' },
  { id: 'bemorlar', label: 'Bemorlar', icon: 'ri-user-line', path: '/bemorlar' },
  { id: 'xonalar', label: 'Xonalar', icon: 'ri-hotel-bed-line', path: '/xonalar' },
  { id: 'hamshiralar', label: 'Hamshiralar', icon: 'ri-nurse-line', path: '/hamshiralar' },
  { id: 'hamshira-dashboard', label: 'Hamshira paneli', icon: 'ri-nurse-line', path: '/hamshira-dashboard' },
  { id: 'dorilar', label: 'Dorilar', icon: 'ri-medicine-bottle-line', path: '/dorilar' },
  { id: 'tahlillar', label: 'Tahlillar', icon: 'ri-test-tube-line', path: '/tahlillar' },
  { id: 'hisobotlar', label: 'Hisobotlar', icon: 'ri-bar-chart-line', path: '/hisobotlar' },
  { id: 'sozlamalar', label: 'Sozlamalar', icon: 'ri-settings-line', path: '/sozlamalar' }
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (path: string) => {
    navigate(`/admin${path}`);
  };

  return (
    <div className={`bg-white h-screen transition-all duration-300 border-r border-gray-200 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900">NAJOT CLINIC</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className={`ri-${collapsed ? 'menu-unfold' : 'menu-fold'}-line text-gray-600`}></i>
          </button>
        </div>
        {!collapsed && (
          <p className="text-gray-500 text-sm mt-1">Admin Paneli</p>
        )}
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.path)}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
              location.pathname === `/admin${item.path}` 
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`${item.icon} text-lg`}></i>
            </div>
            {!collapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
