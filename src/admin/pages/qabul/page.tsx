import { useState } from 'react';
import { 
  CalendarCheck, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Clock, 
  User, 
  Phone, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function QabulPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'Barchasi' },
    { value: 'pending', label: 'Kutilmoqda' },
    { value: 'confirmed', label: 'Tasdiqlangan' },
    { value: 'completed', label: 'Yakunlangan' },
    { value: 'cancelled', label: 'Bekor qilingan' }
  ];

  const appointments = [
    {
      id: 1,
      patientName: 'Alisher Karimov',
      phone: '+998 90 123 45 67',
      doctor: 'Dr. Kamila Rahimova',
      specialty: 'Kardiolog',
      date: '2024-01-15',
      time: '10:00',
      reason: 'Qandli diabet tekshiruvi',
      status: 'confirmed',
      priority: 'normal',
      notes: 'Yurak ritmi buzilishi shubhasi'
    },
    {
      id: 2,
      patientName: 'Malika Toshmatova',
      phone: '+998 91 234 56 78',
      doctor: 'Dr. Kamila Rahimova',
      specialty: 'Kardiolog',
      date: '2024-01-15',
      time: '11:30',
      reason: 'Hipertoniya tekshiruvi',
      status: 'pending',
      priority: 'high',
      notes: 'Yuqori qon bosimi'
    },
    {
      id: 3,
      patientName: 'Javlon Nablyev',
      phone: '+998 92 345 67 89',
      doctor: 'Dr. Kamila Rahimova',
      specialty: 'Kardiolog',
      date: '2024-01-15',
      time: '14:00',
      reason: 'Gastrit tekshiruvi',
      status: 'completed',
      priority: 'normal',
      notes: 'Qorin og\'rig\'i'
    },
    {
      id: 4,
      patientName: 'Svetlana Rajabova',
      phone: '+998 93 456 78 90',
      doctor: 'Dr. Kamila Rahimova',
      specialty: 'Kardiolog',
      date: '2024-01-15',
      time: '15:30',
      reason: 'Yurak tekshiruvi',
      status: 'cancelled',
      priority: 'low',
      notes: 'Bemor bekor qildi'
    }
  ];

  const stats = {
    totalToday: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.phone.includes(searchTerm) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Tasdiqlangan';
      case 'pending':
        return 'Kutilmoqda';
      case 'completed':
        return 'Yakunlangan';
      case 'cancelled':
        return 'Bekor qilingan';
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

  const handleConfirmAppointment = (id: number) => {
    alert(`Qabul ${id} tasdiqlandi!`);
  };

  const handleCancelAppointment = (id: number) => {
    alert(`Qabul ${id} bekor qilindi!`);
  };

  const handleCompleteAppointment = (id: number) => {
    alert(`Qabul ${id} yakunlandi!`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Qabul boshqaruvi</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Bemorlar qabulini boshqarish</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-¡0 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalToday}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Bugungi qabullar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Tasdiqlangan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilmoqda</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Yakunlangan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Bekor qilingan</p>
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
                placeholder="Bemor yoki shifokor qidirish..."
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
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="today">Bugun</option>
              <option value="tomorrow">Ertaga</option>
              <option value="week">Bu hafta</option>
              <option value="month">Bu oy</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yangi qabul
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Qabullar ro'yxati</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shifokor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana/Vaqt</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sabab</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{appointment.patientName}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {appointment.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{appointment.doctor}</div>
                    <div className="text-xs text-gray-500">{appointment.specialty}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-900">{new Date(appointment.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{appointment.reason}</div>
                    {appointment.priority === 'high' && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {getPriorityText(appointment.priority)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirmAppointment(appointment.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Tasdiqlash"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Bekor qilish"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {appointment.status === 'confirmed' && (
                        <button
                          onClick={() => handleCompleteAppointment(appointment.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Yakunlash"
                        >
                          <Users className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowEditModal(true);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                        title="Tahrirlash"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Ko'rish"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Bugun yakunlangan</h3>
              <p className="text-xs text-green-700 mt-1">{stats.completed} ta qabul</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Kutilayotgan</h3>
              <p className="text-xs text-yellow-700 mt-1">{stats.pending} ta qabul</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center">
            <TrendingDown className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Bekor qilingan</h3>
              <p className="text-xs text-red-700 mt-1">{stats.cancelled} ta qabul</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
