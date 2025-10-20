import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Bed, 
  Search, 
  Eye, 
  User, 
  Calendar, 
  Clock,
  AlertCircle,
  CheckCircle,
  Activity,
  Users,
  LogOut
} from 'lucide-react';

export default function HamshiraXonalar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const rooms = [
    {
      id: 1,
      roomNumber: '101',
      roomType: 'Yakka xona',
      status: 'occupied',
      capacity: 1,
      currentPatients: 1,
      patientName: 'Alisher Karimov',
      admissionDate: '2024-01-14',
      assignedNurse: 'Gulnora Abdullayeva',
      lastCleaned: '2024-01-15 08:00',
      nextCleaning: '2024-01-15 20:00',
      equipment: ['Yurak monitori', 'Oksigen maskasi', 'IV stand'],
      notes: 'Kardiologiya bemori'
    },
    {
      id: 2,
      roomNumber: '102',
      roomType: 'Yakka xona',
      status: 'occupied',
      capacity: 1,
      currentPatients: 1,
      patientName: 'Malika Toshmatova',
      admissionDate: '2024-01-13',
      assignedNurse: 'Gulnora Abdullayeva',
      lastCleaned: '2024-01-15 09:30',
      nextCleaning: '2024-01-15 21:30',
      equipment: ['BP monitori', 'Oksigen maskasi'],
      notes: 'Hipertoniya bemori'
    },
    {
      id: 3,
      roomNumber: '103',
      roomType: 'Yakka xona',
      status: 'occupied',
      capacity: 1,
      currentPatients: 1,
      patientName: 'Javlon Nablyev',
      admissionDate: '2024-01-12',
      assignedNurse: 'Gulnora Abdullayeva',
      lastCleaned: '2024-01-15 07:45',
      nextCleaning: '2024-01-15 19:45',
      equipment: ['Gastroskop', 'IV stand'],
      notes: 'Gastrit bemori'
    },
    {
      id: 4,
      roomNumber: '104',
      roomType: 'Yakka xona',
      status: 'occupied',
      capacity: 1,
      currentPatients: 1,
      patientName: 'Svetlana Rajabova',
      admissionDate: '2024-01-15',
      assignedNurse: 'Gulnora Abdullayeva',
      lastCleaned: '2024-01-15 10:15',
      nextCleaning: '2024-01-15 22:15',
      equipment: ['Yurak monitori', 'Oksigen maskasi', 'IV stand', 'Defibrillator'],
      notes: 'Jiddiy yurak kasalligi'
    },
    {
      id: 5,
      roomNumber: '105',
      roomType: 'Yakka xona',
      status: 'available',
      capacity: 1,
      currentPatients: 0,
      patientName: null,
      admissionDate: null,
      assignedNurse: 'Gulnora Abdullayeva',
      lastCleaned: '2024-01-15 11:00',
      nextCleaning: '2024-01-15 23:00',
      equipment: ['Yurak monitori', 'Oksigen maskasi', 'IV stand'],
      notes: 'Bo\'sh xona'
    }
  ];

  const stats = {
    totalRooms: rooms.length,
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
    availableRooms: rooms.filter(r => r.status === 'available').length,
    totalPatients: rooms.filter(r => r.status === 'occupied').reduce((sum, r) => sum + r.currentPatients, 0)
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNumber.includes(searchTerm) ||
    (room.patientName && room.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    if (window.confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?')) {
      logout();
      navigate('/');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'Band';
      case 'available':
        return 'Bo\'sh';
      case 'maintenance':
        return 'Ta\'mirlash';
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Xonalar</h1>
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
              <Bed className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalRooms}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami xonalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.occupiedRooms}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Band xonalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.availableRooms}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Bo'sh xonalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami bemorlar</p>
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
                placeholder="Xona yoki bemor qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bed className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Xona {room.roomNumber}</h3>
                  <p className="text-sm text-gray-500">{room.roomType}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                {getStatusText(room.status)}
              </span>
            </div>

            {room.status === 'occupied' && room.patientName ? (
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">{room.patientName}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-xs text-gray-500">
                    Qabul: {new Date(room.admissionDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-xs text-gray-500">
                    Oxirgi tozalash: {new Date(room.lastCleaned).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-700">Xona bo'sh</span>
                </div>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-xs text-gray-500">
                    Oxirgi tozalash: {new Date(room.lastCleaned).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )}

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Asboblar:</h4>
              <div className="flex flex-wrap gap-1">
                {room.equipment.map((equipment, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {equipment}
                  </span>
                ))}
              </div>
            </div>

            {room.notes && (
              <div className="mb-4">
                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  {room.notes}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Keyingi tozalash: {new Date(room.nextCleaning).toLocaleTimeString()}
              </span>
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
