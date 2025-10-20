import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Plus, 
  Phone, 
  Calendar, 
  Heart, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Stethoscope,
  X,
  LogOut
} from 'lucide-react';

export default function ShifokorBemorlar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'Barchasi' },
    { value: 'active', label: 'Faol bemorlar' },
    { value: 'completed', label: 'Yakunlangan' },
    { value: 'follow_up', label: 'Kuzatuvda' }
  ];

  const patients = [
    {
      id: 1,
      name: 'Alisher Karimov',
      age: 45,
      gender: 'Erkak',
      phone: '+998 90 123 45 67',
      diagnosis: 'Qandli diabet',
      status: 'active',
      lastVisit: '2024-01-10',
      nextVisit: '2024-01-20',
      priority: 'high',
      condition: 'Stabil',
      medications: ['Metformin', 'Insulin'],
      notes: 'Yurak ritmi buzilishi shubhasi'
    },
    {
      id: 2,
      name: 'Malika Toshmatova',
      age: 38,
      gender: 'Ayol',
      phone: '+998 91 234 56 78',
      diagnosis: 'Hipertoniya',
      status: 'follow_up',
      lastVisit: '2024-01-08',
      nextVisit: '2024-01-18',
      priority: 'normal',
      condition: 'Yaxshilanmoqda',
      medications: ['Amlodipine', 'Lisinopril'],
      notes: 'Yuqori qon bosimi'
    },
    {
      id: 3,
      name: 'Javlon Nablyev',
      age: 52,
      gender: 'Erkak',
      phone: '+998 92 345 67 89',
      diagnosis: 'Gastrit',
      status: 'completed',
      lastVisit: '2024-01-05',
      nextVisit: null,
      priority: 'low',
      condition: 'Tuzalgan',
      medications: ['Omeprazole'],
      notes: 'Qorin og\'rig\'i'
    },
    {
      id: 4,
      name: 'Svetlana Rajabova',
      age: 41,
      gender: 'Ayol',
      phone: '+998 93 456 78 90',
      diagnosis: 'Yurak kasalligi',
      status: 'active',
      lastVisit: '2024-01-12',
      nextVisit: '2024-01-22',
      priority: 'high',
      condition: 'Kuzatuvda',
      medications: ['Atorvastatin', 'Aspirin'],
      notes: 'Yurak ritmi buzilishi'
    }
  ];

  const stats = {
    totalPatients: patients.length,
    activePatients: patients.filter(p => p.status === 'active').length,
    followUpPatients: patients.filter(p => p.status === 'follow_up').length,
    completedPatients: patients.filter(p => p.status === 'completed').length,
    highPriority: patients.filter(p => p.priority === 'high').length
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm) ||
                         patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'follow_up':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Faol';
      case 'follow_up':
        return 'Kuzatuvda';
      case 'completed':
        return 'Yakunlangan';
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

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mening bemorlarim</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Dr. Kamila Rahimova - Kardiolog</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami bemorlar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.activePatients}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Faol bemorlar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.followUpPatients}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kuzatuvda</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.completedPatients}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Yakunlangan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.highPriority}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Yuqori prioritet</p>
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
                placeholder="Bemor qidirish..."
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
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Yangi bemor
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Bemorlar ro'yxati</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tashxis</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oxirgi qabul</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {patient.phone}
                        </div>
                        <div className="text-xs text-gray-500">{patient.age} yosh, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{patient.diagnosis}</div>
                    <div className="text-xs text-gray-500">{patient.condition}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                        {getStatusText(patient.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                        {getPriorityText(patient.priority)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-900">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </div>
                        {patient.nextVisit && (
                          <div className="text-xs text-blue-600">
                            Keyingi: {new Date(patient.nextVisit).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePatientClick(patient)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ko'rish"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Tashxis qo'yish"
                      >
                        <Stethoscope className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="Tahrirlash"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Bemor ma'lumotlari</h3>
                <button
                  onClick={() => setShowPatientModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ism</label>
                    <p className="text-sm text-gray-900">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Yosh</label>
                    <p className="text-sm text-gray-900">{selectedPatient.age} yosh</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefon</label>
                    <p className="text-sm text-gray-900">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Jins</label>
                    <p className="text-sm text-gray-900">{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tashxis</label>
                    <p className="text-sm text-gray-900">{selectedPatient.diagnosis}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Holat</label>
                    <p className="text-sm text-gray-900">{selectedPatient.condition}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dorilar</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPatient.medications.map((med, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Eslatmalar</label>
                  <p className="text-sm text-gray-900">{selectedPatient.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
