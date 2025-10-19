import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const hamshiraMenuItems = [
  { id: 'dashboard', label: 'Bosh sahifa', icon: 'ri-dashboard-line', path: '/hamshira' },
  { id: 'bemorlar', label: 'Mening bemorlarim', icon: 'ri-user-line', path: '/hamshira/bemorlar' },
  { id: 'vitals', label: 'Hayotiy ko\'rsatkichlar', icon: 'ri-heart-pulse-line', path: '/hamshira/vitals' },
  { id: 'muolaja', label: 'Muolajalar', icon: 'ri-medicine-bottle-line', path: '/hamshira/muolaja' },
  { id: 'tahlillar', label: 'Tahlil namunalari', icon: 'ri-test-tube-line', path: '/hamshira/tahlillar' },
  { id: 'xonalar', label: 'Xonalar', icon: 'ri-hotel-bed-line', path: '/hamshira/xonalar' },
  { id: 'bildirishnomalar', label: 'Bildirishnomalar', icon: 'ri-notification-line', path: '/hamshira/bildirishnomalar' },
  { id: 'profil', label: 'Profil', icon: 'ri-user-settings-line', path: '/hamshira/profil' }
];

export const HamshiraSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`bg-white h-screen transition-all duration-300 border-r border-gray-200 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900">HAMSHIRA PANELI</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className={`ri-${collapsed ? 'menu-unfold' : 'menu-fold'}-line text-gray-600`}></i>
          </button>
        </div>
        {!collapsed && (
          <p className="text-gray-500 text-sm mt-1">Gulnora Abdullayeva</p>
        )}
      </div>

      <nav className="mt-4">
        {hamshiraMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.path)}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
              location.pathname === item.path
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
