import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Bell, 
  Search, 
  Eye, 
  CheckCircle, 
  X, 
  User, 
  Calendar, 
  Clock,
  AlertCircle,
  Activity,
  MessageSquare,
  Phone,
  LogOut
} from 'lucide-react';

export default function HamshiraBildirishnomalar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'emergency',
      title: 'Jiddiy holat',
      message: 'Alisher Karimovning qon bosimi keskin ko\'tarildi',
      patientName: 'Alisher Karimov',
      room: '101',
      priority: 'high',
      status: 'unread',
      createdAt: '2024-01-15 10:30',
      createdBy: 'Sistema',
      action: 'Shifokorni chaqiring',
      notes: 'Qon bosimi 180/110 mmHg'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Dori berish',
      message: 'Malika Toshmatovaga Amlodipine berish kerak',
      patientName: 'Malika Toshmatova',
      room: '102',
      priority: 'normal',
      status: 'read',
      createdAt: '2024-01-15 09:15',
      createdBy: 'Dr. Kamila Rahimova',
      action: 'Dori berish',
      notes: 'Kunlik 1 marta, 10mg'
    },
    {
      id: 3,
      type: 'vitals',
      title: 'Vitals tekshiruvi',
      message: 'Javlon Nablyevning vitals tekshiruvi vaqti',
      patientName: 'Javlon Nablyev',
      room: '103',
      priority: 'normal',
      status: 'read',
      createdAt: '2024-01-15 08:45',
      createdBy: 'Sistema',
      action: 'Vitals yozish',
      notes: 'Harorat, qon bosimi, yurak urishi'
    },
    {
      id: 4,
      type: 'lab',
      title: 'Tahlil natijasi',
      message: 'Svetlana Rajabovaning qon tahlili tayyor',
      patientName: 'Svetlana Rajabova',
      room: '104',
      priority: 'high',
      status: 'unread',
      createdAt: '2024-01-15 11:20',
      createdBy: 'Lab teknisyen',
      action: 'Natijani ko\'rish',
      notes: 'Qon tahlili natijasi mavjud'
    },
    {
      id: 5,
      type: 'equipment',
      title: 'Asbob muammosi',
      message: 'Xona 105dagi yurak monitori ishlamayapti',
      patientName: null,
      room: '105',
      priority: 'normal',
      status: 'unread',
      createdAt: '2024-01-15 12:00',
      createdBy: 'Texnik xizmat',
      action: 'Texnikni chaqirish',
      notes: 'Monitor ekran qorong\'i'
    }
  ];

  const stats = {
    totalNotifications: notifications.length,
    unreadNotifications: notifications.filter(n => n.status === 'unread').length,
    highPriorityNotifications: notifications.filter(n => n.priority === 'high').length,
    emergencyNotifications: notifications.filter(n => n.type === 'emergency').length
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (notification.patientName && notification.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    notification.room.includes(searchTerm)
  );

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
    setShowNotificationModal(true);
  };

  const handleLogout = () => {
    if (window.confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?')) {
      logout();
      navigate('/');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'medication':
        return 'bg-blue-100 text-blue-800';
      case 'vitals':
        return 'bg-green-100 text-green-800';
      case 'lab':
        return 'bg-purple-100 text-purple-800';
      case 'equipment':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'Jiddiy';
      case 'medication':
        return 'Dori';
      case 'vitals':
        return 'Vitals';
      case 'lab':
        return 'Tahlil';
      case 'equipment':
        return 'Asbob';
      default:
        return type;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Yuqori';
      case 'normal':
        return 'O\'rta';
      case 'low':
        return 'Past';
      default:
        return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread':
        return 'O\'qilmagan';
      case 'read':
        return 'O\'qilgan';
      default:
        return status;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bildirishnomalar</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Gulnora Abdullayeva - Hamshira</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Chiqish
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalNotifications}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami bildirishnomalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.unreadNotifications}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">O'qilmagan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.highPriorityNotifications}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Yuqori prioritet</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.emergencyNotifications}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jiddiy holatlar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Bildirishnoma qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Bildirishnomalar ro'yxati</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className="p-4 sm:p-6 hover:bg-gray-50 cursor-pointer" onClick={() => handleNotificationClick(notification)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${getTypeColor(notification.type)}`}>
                      {getTypeText(notification.type)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${getPriorityColor(notification.priority)}`}>
                      {getPriorityText(notification.priority)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                      {getStatusText(notification.status)}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {notification.patientName && (
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        <span>{notification.patientName}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <span>Xona {notification.room}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{new Date(notification.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${getTypeColor(selectedNotification.type)}`}>
                    {getTypeText(selectedNotification.type)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedNotification.priority)}`}>
                    {getPriorityText(selectedNotification.priority)}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedNotification.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{selectedNotification.message}</p>
              
              <div className="space-y-2 mb-4">
                {selectedNotification.patientName && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">Bemor: {selectedNotification.patientName}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">Xona: {selectedNotification.room}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">
                    Vaqt: {new Date(selectedNotification.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">Yuboruvchi: {selectedNotification.createdBy}</span>
                </div>
              </div>
              
              {selectedNotification.notes && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Eslatma:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{selectedNotification.notes}</p>
                </div>
              )}
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Kerakli harakat:</h4>
                <p className="text-sm text-gray-600">{selectedNotification.action}</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Yopish
                </button>
                <button
                  onClick={() => { alert('Harakat bajarildi!'); setShowNotificationModal(false); }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Harakat bajarildi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
