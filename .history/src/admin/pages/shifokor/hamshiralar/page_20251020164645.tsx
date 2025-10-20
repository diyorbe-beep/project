import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  UserCheck, 
  Search, 
  Phone, 
  Eye, 
  MessageCircle, 
  User, 
  Calendar, 
  Clock,
  AlertCircle,
  CheckCircle,
  Activity,
  Users,
  Heart,
  X,
  LogOut
} from 'lucide-react';

export default function ShifokorHamshiralar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const nurses = [
    {
      id: 1,
      name: 'Gulnora Abdullayeva',
      specialization: 'Umumiy hamshira',
      phone: '+998 90 123 45 67',
      status: 'available',
      currentPatients: 3,
      shift: 'Kunduzgi',
      experience: '5 yil',
      lastActivity: '2024-01-15 10:30',
      skills: ['Vitals tekshiruvi', 'Dori berish', 'Tahlil olish'],
      assignedPatients: [
        { name: 'Alisher Karimov', room: '101', priority: 'high' },
        { name: 'Malika Toshmatova', room: '102', priority: 'normal' },
        { name: 'Javlon Nablyev', room: '103', priority: 'low' }
      ]
    },
    {
      id: 2,
      name: 'Malika Toshmatova',
      specialization: 'Kardiologiya hamshirasi',
      phone: '+998 91 234 56 78',
      status: 'busy',
      currentPatients: 2,
      shift: 'Kunduzgi',
      experience: '8 yil',
      lastActivity: '2024-01-15 10:15',
      skills: ['EKG tekshiruvi', 'Yurak monitori', 'Qon bosimi'],
      assignedPatients: [
        { name: 'Svetlana Rajabova', room: '104', priority: 'high' },
        { name: 'Otabek Karimov', room: '105', priority: 'normal' }
      ]
    },
    {
      id: 3,
      name: 'Svetlana Rajabova',
      specialization: 'ICU hamshirasi',
      phone: '+998 92 345 67 89',
      status: 'available',
      currentPatients: 1,
      shift: 'Kechki',
      experience: '12 yil',
      lastActivity: '2024-01-15 10:45',
      skills: ['Ventilator', 'Monitor tekshiruvi', 'Jaroxatli muolaja'],
      assignedPatients: [
        { name: 'Rustam Umarov', room: 'ICU-1', priority: 'high' }
      ]
    }
  ];

  const stats = {
    totalNurses: nurses.length,
    availableNurses: nurses.filter(n => n.status === 'available').length,
    busyNurses: nurses.filter(n => n.status === 'busy').length,
    totalPatients: nurses.reduce((sum, nurse) => sum + nurse.currentPatients, 0)
  };

  const filteredNurses = nurses.filter(nurse =>
    nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nurse.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Mavjud';
      case 'busy':
        return 'Band';
      case 'offline':
        return 'Oflayn';
      default:
        return status;
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

  const handleCallNurse = (nurse: any) => {
    setSelectedNurse(nurse);
    setShowCallModal(true);
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hamshiralar</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Dr. Kamila Rahimova - Kardiolog</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalNurses}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami hamshiralar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.availableNurses}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Mavjud</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.busyNurses}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Band</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Hamshira qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Nurses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredNurses.map((nurse) => (
          <div key={nurse.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{nurse.name}</h3>
                    <p className="text-sm text-gray-500">{nurse.specialization}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(nurse.status)}`}>
                  {getStatusText(nurse.status)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Telefon:</span>
                  <span className="text-sm font-medium text-gray-900">{nurse.phone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">V smena:</span>
                  <span className="text-sm font-medium text-gray-900">{nurse.shift}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Tajriba:</span>
                  <span className="text-sm font-medium text-gray-900">{nurse.experience}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Bemorlar:</span>
                  <span className="text-sm font-medium text-gray-900">{nurse.currentPatients} ta</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Oxirgi faoliyat:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(nurse.lastActivity).toLocaleTimeString()}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Ko'nikmalar:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {nurse.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {nurse.assignedPatients.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-500">Ajratilgan bemorlar:</span>
                    <div className="mt-1 space-y-1">
                      {nurse.assignedPatients.map((patient, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <User className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-900">{patient.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">{patient.room}</span>
                            <span className={`px-1 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                              {patient.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleCallNurse(nurse)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Chaqirish
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call Modal */}
      {showCallModal && selectedNurse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold-grey-900">Hamshirani chaqirish</h3>
                <button
                  onClick={() => setShowCallModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">{selectedNurse.name}</h4>
                <p className="text-sm text-gray-500">{selectedNurse.specialization}</p>
                <p className="text-sm text-gray-500">{selectedNurse.phone}</p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Telefon qilish
                </button>
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Xabar yuborish
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Vazifa berish
                </button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p><strong>V smena:</strong> {selectedNurse.shift}</p>
                  <p><strong>Bemorlar:</strong> {selectedNurse.currentPatients} ta</p>
                  <p><strong>Holat:</strong> {getStatusText(selectedNurse.status)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
