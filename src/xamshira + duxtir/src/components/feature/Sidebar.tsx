
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  // Admin panel menyulari
  { icon: 'ri-dashboard-line', label: 'Dashboard', path: '/dashboard' },
  { icon: 'ri-user-heart-line', label: 'Bemorlar', path: '/bemorlar' },
  { icon: 'ri-stethoscope-line', label: 'Shifokorlar', path: '/shifokorlar' },
  { icon: 'ri-nurse-line', label: 'Hamshiralar', path: '/hamshiralar' },
  { icon: 'ri-building-line', label: 'Xonalar', path: '/xonalar' },
  { icon: 'ri-test-tube-line', label: 'Tahlillar', path: '/tahlillar' },
  { icon: 'ri-medicine-bottle-line', label: 'Muolaja', path: '/muolaja' },
  { icon: 'ri-file-text-line', label: 'Tashxislar', path: '/tashxislar' },
  { icon: 'ri-bar-chart-line', label: 'Hisobotlar', path: '/hisobotlar' },
  { icon: 'ri-settings-line', label: 'Sozlamalar', path: '/sozlamalar' },
  { icon: 'ri-user-settings-line', label: 'Shifokor Panel', path: '/shifokor-panel' },

  // Hamshira panel menyulari
  { icon: 'ri-dashboard-2-line', label: 'Hamshira Dashboard', path: '/hamshira-dashboard' },
  { icon: 'ri-user-heart-line', label: 'Hamshira Bemorlar', path: '/hamshira-bemorlar' },
  { icon: 'ri-medicine-bottle-line', label: 'Hamshira Muolajalar', path: '/hamshira-muolajalar' },
  { icon: 'ri-heart-pulse-line', label: 'Hayotiy Ko\'rsatkichlar', path: '/hamshira-vitals' },
  { icon: 'ri-test-tube-line', label: 'Hamshira Tahlillar', path: '/hamshira-tahlillar' },
  { icon: 'ri-building-line', label: 'Hamshira Xonalar', path: '/hamshira-xonalar' },
  { icon: 'ri-notification-line', label: 'Bildirishnomalar', path: '/hamshira-bildirishnomalar' },
  { icon: 'ri-user-line', label: 'Hamshira Profil', path: '/hamshira-profil' }
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (path: string) => {
    navigate(path);
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
          <p className="text-blue-200 text-sm mt-1">Shifokor Paneli</p>
        )}
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.path)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-700 transition-colors ${
              location.pathname === item.path ? 'bg-blue-700 border-r-4 border-white' : ''
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
                <i className="ri-user-heart-line text-lg"></i>
              </div>
              <div className="ml-3">
                <p className="font-medium">Dr. Alfonhonov</p>
                <p className="text-sm text-blue-200">Shifokor</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
