import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Pill, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Save, 
  X, 
  User, 
  Calendar, 
  Clock,
  AlertCircle,
  CheckCircle,
  Activity,
  Syringe,
  LogOut
} from 'lucide-react';

export default function HamshiraMuolaja() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const medications = [
    {
      id: 1,
      patientName: 'Alisher Karimov',
      room: '101',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Kunlik 2 marta',
      time: '08:00, 20:00',
      status: 'pending',
      priority: 'high',
      notes: 'Ovqatdan keyin'
    },
    {
      id: 2,
      patientName: 'Malika Toshmatova',
      room: '102',
      medication: 'Amlodipine',
      dosage: '10mg',
      frequency: 'Kunlik 1 marta',
      time: '09:00',
      status: 'given',
      priority: 'normal',
      notes: 'Sut bilan'
    },
    {
      id: 3,
      patientName: 'Javlon Nablyev',
      room: '103',
      medication: 'Omeprazole',
      dosage: '20mg',
      frequency: 'Kunlik 1 marta',
      time: '07:00',
      status: 'given',
      priority: 'low',
      notes: 'Bo\'sh qoringa'
    },
    {
      id: 4,
      patientName: 'Svetlana Rajabova',
      room: '104',
      medication: 'Atorvastatin',
      dosage: '40mg',
      frequency: 'Kunlik 1 marta',
      time: '22:00',
      status: 'pending',
      priority: 'high',
      notes: 'Kechqurun'
    }
  ];

  const stats = {
    totalMedications: medications.length,
    pendingMedications: medications.filter(m => m.status === 'pending').length,
    givenMedications: medications.filter(m => m.status === 'given').length,
    highPriorityMedications: medications.filter(m => m.priority === 'high').length
  };

  const filteredMedications = medications.filter(medication =>
    medication.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.room.includes(searchTerm)
  );

  const handleMedicationClick = (medication: any) => {
    setSelectedMedication(medication);
    setShowMedicationModal(true);
  };

  const handleLogout = () => {
    if (window.confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?')) {
      logout();
      navigate('/');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'given':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'given':
        return 'Berilgan';
      case 'pending':
        return 'Kutilmoqda';
      case 'missed':
        return 'O\'tkazib yuborilgan';
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

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Muolaja berish</h1>
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
              <Pill className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalMedications}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami dorilar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pendingMedications}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilmoqda</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.givenMedications}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Berilgan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.highPriorityMedications}</p>
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
                placeholder="Dori yoki bemor qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-64"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Yangi dori
          </button>
        </div>
      </div>

      {/* Medications Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Dorilar ro'yxati</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dori</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doza</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaqt</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedications.map((medication) => (
                <tr key={medication.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{medication.patientName}</div>
                        <div className="text-xs text-gray-500">Xona {medication.room}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{medication.medication}</div>
                    <div className="text-xs text-gray-500">{medication.frequency}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{medication.dosage}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-900">{medication.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(medication.status)}`}>
                        {getStatusText(medication.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(medication.priority)}`}>
                        {getPriorityText(medication.priority)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleMedicationClick(medication)}
                        className="text-green-600 hover:text-green-900"
                        title="Dori berish"
                      >
                        <Syringe className="w-4 h-4" />
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

      {/* Medication Modal */}
      {showMedicationModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Dori berish</h3>
                <button
                  onClick={() => setShowMedicationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Bemor: {selectedMedication.patientName}</h4>
                <p className="text-sm text-green-700">Xona: {selectedMedication.room}</p>
                <p className="text-sm text-green-700">Dori: {selectedMedication.medication}</p>
                <p className="text-sm text-green-700">Doza: {selectedMedication.dosage}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Berilgan vaqt</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    defaultValue={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Izoh</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                    placeholder="Dori berish haqida izoh"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowMedicationModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => { alert('Dori berildi!'); setShowMedicationModal(false); }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Dori berildi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
