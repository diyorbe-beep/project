import { useState } from 'react';
import { notificationsData } from '../../mocks/nurses';

export default function HamshiraBildirishnomalar() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState('barchasi');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'oqilmagan') return !notification.oqildi;
    if (filter === 'oqilgan') return notification.oqildi;
    if (filter === 'yuqori') return notification.priority === 'yuqori';
    return true;
  });

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id 
        ? { ...notification, oqildi: true }
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, oqildi: true })));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'yuqori': return 'bg-red-100 text-red-800 border-red-200';
      case 'o\'rta': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'past': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'yuqori': return 'ri-alert-line';
      case 'o\'rta': return 'ri-information-line';
      case 'past': return 'ri-check-line';
      default: return 'ri-notification-line';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'muolaja': return 'ri-medicine-bottle-line';
      case 'vital': return 'ri-heart-pulse-line';
      case 'tahlil': return 'ri-test-tube-line';
      case 'xona': return 'ri-building-line';
      default: return 'ri-notification-line';
    }
  };

  const unreadCount = notifications.filter(n => !n.oqildi).length;

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bildirishnomalar</h1>
            <p className="text-gray-600">Muhim xabarlar va vazifalar</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
            >
              Barchasini o'qilgan deb belgilash
            </button>
          )}
        </div>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <i className="ri-notification-line text-blue-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Jami bildirishnomalar</p>
              <p className="text-xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center">
            <i className="ri-mail-line text-red-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">O'qilmagan</p>
              <p className="text-xl font-bold text-gray-900">{unreadCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <i className="ri-alert-line text-yellow-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Yuqori muhimlik</p>
              <p className="text-xl font-bold text-gray-900">
                {notifications.filter(n => n.priority === 'yuqori').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <i className="ri-check-line text-green-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">O'qilgan</p>
              <p className="text-xl font-bold text-gray-900">
                {notifications.filter(n => n.oqildi).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtrlar */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'barchasi', label: 'Barchasi' },
            { key: 'oqilmagan', label: 'O\'qilmagan' },
            { key: 'oqilgan', label: 'O\'qilgan' },
            { key: 'yuqori', label: 'Yuqori muhimlik' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap ${
                filter === filterOption.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bildirishnomalar ro'yxati */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border transition-all ${
              notification.oqildi 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-white border-blue-200 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                {/* Tip ikoni */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  notification.oqildi ? 'bg-gray-200' : 'bg-blue-100'
                }`}>
                  <i className={`${getTypeIcon(notification.type)} ${
                    notification.oqildi ? 'text-gray-500' : 'text-blue-600'
                  } text-lg`}></i>
                </div>

                {/* Mazmun */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notification.priority)}`}>
                      <i className={`${getPriorityIcon(notification.priority)} mr-1`}></i>
                      {notification.priority} muhimlik
                    </span>
                    {!notification.oqildi && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Yangi</span>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    notification.oqildi ? 'text-gray-600' : 'text-gray-900 font-medium'
                  }`}>
                    {notification.message}
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    {new Date(notification.sana).toLocaleString('uz-UZ')}
                  </p>
                </div>

                {/* Harakatlar */}
                <div className="flex gap-2">
                  {!notification.oqildi && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-900 text-sm cursor-pointer whitespace-nowrap"
                    >
                      O'qilgan deb belgilash
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-notification-line text-gray-400 text-6xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Bildirishnomalar topilmadi</h3>
          <p className="text-gray-500">Tanlangan filtr bo'yicha bildirishnomalar mavjud emas.</p>
        </div>
      )}

      {/* Bildirishnoma turlari qo'llanmasi */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirishnoma turlari</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <i className="ri-medicine-bottle-line text-green-500 text-xl mr-2"></i>
              <h4 className="font-medium">Muolaja</h4>
            </div>
            <p className="text-sm text-gray-600">Dori berish vaqti, muolaja eslatmalari</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <i className="ri-heart-pulse-line text-red-500 text-xl mr-2"></i>
              <h4 className="font-medium">Hayotiy ko'rsatkichlar</h4>
            </div>
            <p className="text-sm text-gray-600">Me'yordan tashqari ko'rsatkichlar</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <i className="ri-test-tube-line text-blue-500 text-xl mr-2"></i>
              <h4 className="font-medium">Tahlillar</h4>
            </div>
            <p className="text-sm text-gray-600">Namuna olish, natijalar</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <i className="ri-building-line text-purple-500 text-xl mr-2"></i>
              <h4 className="font-medium">Xonalar</h4>
            </div>
            <p className="text-sm text-gray-600">Xona holati o'zgarishlari</p>
          </div>
        </div>
      </div>
    </div>
  );
}