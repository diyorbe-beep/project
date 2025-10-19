
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Bosh sahifa', icon: 'ri-dashboard-line', path: '/' },
  { id: 'shifokorlar', label: 'Shifokorlar', icon: 'ri-user-heart-line', path: '/shifokorlar' },
  { id: 'qabul', label: 'Qabul', icon: 'ri-building-line', path: '/qabul' },
  { id: 'bemorlar', label: 'Bemorlar', icon: 'ri-user-line', path: '/bemorlar' },
  { id: 'xonalar', label: 'Xonalar', icon: 'ri-hotel-bed-line', path: '/xonalar' },
  { id: 'hamshiralar', label: 'Hamshiralar', icon: 'ri-nurse-line', path: '/hamshiralar' },
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
    <div className={`bg-blue-600 text-white h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold">NAJOT CLINIC</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className={`ri-${collapsed ? 'menu-unfold' : 'menu-fold'}-line`}></i>
          </button>
        </div>
        {!collapsed && (
          <p className="text-blue-200 text-sm mt-1">Admin Paneli</p>
        )}
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.path)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-700 transition-colors ${
              location.pathname === `/admin${item.path}` ? 'bg-blue-700 border-r-4 border-white' : ''
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className={`${item.icon} text-lg`}></i>
            </div>
            {!collapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-blue-700 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <i className="ri-shield-user-line text-lg"></i>
              </div>
              <div className="ml-3">
                <p className="font-medium">Administrator</p>
                <p className="text-sm text-blue-200">Admin</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
