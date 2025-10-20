import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Bed, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  User, 
  Calendar, 
  Clock,
  AlertCircle,
  CheckCircle,
  Activity,
  Users,
  X,
  LogOut
} from 'lucide-react';

export default function ShifokorXonalar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const statusOptions = [
    { value: 'all', label: 'Barchasi' },
    { value: 'available', label: 'Bo\'sh' },
    { value: 'occupied', label: 'Band' },
    { value: 'maintenance', label: 'Ta\'mirlashda' }
  ];

  const rooms = [
    {
      id: 1,
      roomNumber: '101',
      type: 'Standard',
      capacity: 2,
      status: 'occupied',
      currentPatients: [
        { name: 'Alisher Karimov', admissionDate: '2024-01-10', diagnosis: 'Qandli diabet' },
        { name: 'Malika Toshmatova', admissionDate: '2024-01-12', diagnosis: 'Hipertoniya' }
      ],
      equipment: ['Oksigen', 'EKG', 'Monitor'],
      lastCleaned: '2024-01-15',
      notes: 'Bemorlar uchun qulay'
    },
    {
      id: 2,
      roomNumber: '102',
      type: 'VIP',
      capacity: 1,
      status: 'available',
      currentPatients: [],
      equipment: ['Oksigen', 'EKG', 'Monitor', 'TV', 'Refrigerator'],
      lastCleaned: '2024-01-15',
      notes: 'VIP bemorlar uchun'
    },
    {
      id: 3,
      roomNumber: '103',
      type: 'Standard',
      capacity: 2,
      status: 'occupied',
      currentPatients: [
        { name: 'Javlon Nablyev', admissionDate: '2024-01-13', diagnosis: 'Gastrit' }
      ],
      equipment: ['Oksigen', 'EKG'],
      lastCleaned: '2024-01-14',
      notes: 'Bitta bemor'
    },
    {
      id: 4,
      roomNumber: '104',
      type: 'ICU',
      capacity: 1,
      status: 'maintenance',
      currentPatients: [],
      equipment: ['Oksigen', 'EKG', 'Monitor', 'Ventilator', 'Defibrillator'],
      lastCleaned: '2024-01-14',
      notes: 'Ta\'mirlash jarayonida'
    }
  ];

  const stats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter(r => r.status === 'available').length,
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
    maintenanceRooms: rooms.filter(r => r.status === 'maintenance').length
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.includes(searchTerm) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Bo\'sh';
      case 'occupied':
        return 'Band';
      case 'maintenance':
        return 'Ta\'mirlashda';
      default:
        return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'ICU':
        return 'bg-red-100 text-red-800';
      case 'Standard':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
    setShowAssignModal(true);
  };

  const handleLogout = () => {
    if (window.confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Xonalar</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Dr. Kamila Rahimova - Kardiolog</p>
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
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.occupiedRooms}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Band xonalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.maintenanceRooms}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Ta'mirlashda</p>
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
                placeholder="Xona qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-64"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bed className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Xona {room.roomNumber}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(room.type)}`}>
                      {room.type}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                  {getStatusText(room.status)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Sig'im:</span>
                  <span className="text-sm font-medium text-gray-900">{room.capacity} bemor</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Joriy bemorlar:</span>
                  <span className="text-sm font-medium text-gray-900">{room.currentPatients.length}/{room.capacity}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Oxirgi tozalanish:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(room.lastCleaned).toLocaleDateString()}
                  </span>
                </div>

                {room.currentPatients.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-500">Bemorlar:</span>
                    <div className="mt-1 space-y-1">
                      {room.currentPatients.map((patient, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <User className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-900">{patient.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(patient.admissionDate).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-sm text-gray-500">Uskunalar:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {room.equipment.map((equipment, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {equipment}
                      </span>
                    ))}
                  </div>
                </div>

                {room.notes && (
                  <div>
                    <span className="text-sm text-gray-500">Eslatmalar:</span>
                    <p className="text-xs text-gray-600 mt-1">{room.notes}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleRoomSelect(room)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Bemor ajratish
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Room Assignment Modal */}
      {showAssignModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Xona {selectedRoom.roomNumber}</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bemor tanlash</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option value="">Bemorni tanlang</option>
                    <option value="1">Alisher Karimov</option>
                    <option value="2">Malika Toshmatova</option>
                    <option value="3">Javlon Nablyev</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kiritish sanasi</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eslatmalar</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                    placeholder="Qo'shimcha eslatmalar"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajratish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
