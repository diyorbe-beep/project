import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Microscope, 
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
  FileText,
  Heart,
  Activity,
  LogOut
} from 'lucide-react';

export default function ShifokorTashxis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [diagnosisForm, setDiagnosisForm] = useState({
    patientId: '',
    diagnosis: '',
    symptoms: '',
    treatment: '',
    prescription: '',
    notes: '',
    followUpDate: '',
    priority: 'normal'
  });

  const patients = [
    {
      id: 1,
      name: 'Alisher Karimov',
      age: 45,
      phone: '+998 90 123 45 67',
      condition: 'Yangi bemor',
      lastDiagnosis: null,
      visitDate: '2024-01-15',
      status: 'pending_diagnosis'
    },
    {
      id: 2,
      name: 'Malika Toshmatova',
      age: 38,
      phone: '+998 91 234 56 78',
      condition: 'Kuzatuvda',
      lastDiagnosis: 'Hipertoniya',
      visitDate: '2024-01-15',
      status: 'follow_up'
    },
    {
      id: 3,
      name: 'Javlon Nablyev',
      age: 52,
      phone: '+998 92 345 67 89',
      condition: 'Qayta tekshiruv',
      lastDiagnosis: 'Gastrit',
      visitDate: '2024-01-15',
      status: 'review'
    }
  ];

  const recentDiagnoses = [
    {
      id: 1,
      patientName: 'Alisher Karimov',
      diagnosis: 'Qandli diabet',
      date: '2024-01-15',
      status: 'confirmed',
      doctor: 'Dr. Kamila Rahimova'
    },
    {
      id: 2,
      patientName: 'Malika Toshmatova',
      diagnosis: 'Hipertoniya',
      date: '2024-01-14',
      status: 'confirmed',
      doctor: 'Dr. Kamila Rahimova'
    },
    {
      id: 3,
      patientName: 'Javlon Nablyev',
      diagnosis: 'Gastrit',
      date: '2024-01-13',
      status: 'pending',
      doctor: 'Dr. Kamila Rahimova'
    }
  ];

  const stats = {
    pendingDiagnoses: patients.filter(p => p.status === 'pending_diagnosis').length,
    followUpCases: patients.filter(p => p.status === 'follow_up').length,
    totalDiagnosed: recentDiagnoses.length,
    confirmedDiagnoses: recentDiagnoses.filter(d => d.status === 'confirmed').length
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
    setDiagnosisForm({
      ...diagnosisForm,
      patientId: patient.id
    });
    setShowDiagnosisModal(true);
  };

  const handleDiagnosisSubmit = () => {
    alert('Tashxis saqlandi!');
    setShowDiagnosisModal(false);
    setDiagnosisForm({
      patientId: '',
      diagnosis: '',
      symptoms: '',
      treatment: '',
      prescription: '',
      notes: '',
      followUpDate: '',
      priority: 'normal'
    });
  };

  const handleLogout = () => {
    if (window.confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?')) {
      logout();
      navigate('/');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_diagnosis':
        return 'bg-yellow-100 text-yellow-800';
      case 'follow_up':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_diagnosis':
        return 'Tashxis kutilmoqda';
      case 'follow_up':
        return 'Kuzatuvda';
      case 'review':
        return 'Qayta tekshiruv';
      default:
        return status;
    }
  };

  const getDiagnosisStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tashxis qo'yish</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Dr. Kamila Rahimova - Kardiolog</p>
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Microscope className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pendingDiagnoses}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilayotgan tashxis</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.followUpCases}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kuzatuvda</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.confirmedDiagnoses}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Tasdiqlangan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalDiagnosed}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami tashxis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Bemorlar ro'yxati */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tashxis kutilayotgan bemorlar</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Bemor qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
                />
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.age} yosh</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {getStatusText(patient.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Telefon</p>
                      <p className="text-sm text-gray-900">{patient.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Holat</p>
                      <p className="text-sm text-gray-900">{patient.condition}</p>
                    </div>
                  </div>
                  
                  {patient.lastDiagnosis && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Oxirgi tashxis</p>
                      <p className="text-sm text-gray-900">{patient.lastDiagnosis}</p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handlePatientSelect(patient)}
                    className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Tashxis qo'yish
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* So'nggi tashxislar */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">So'nggi tashxislar</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {recentDiagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{diagnosis.patientName}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDiagnosisStatusColor(diagnosis.status)}`}>
                      {diagnosis.status === 'confirmed' ? 'Tasdiqlangan' : 'Kutilmoqda'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 mb-2">{diagnosis.diagnosis}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(diagnosis.date).toLocaleDateString()}
                    <Clock className="w-3 h-3 ml-4 mr-1" />
                    {diagnosis.doctor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis Modal */}
      {showDiagnosisModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Tashxis qo'yish</h3>
                <button
                  onClick={() => setShowDiagnosisModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Bemor: {selectedPatient.name}</h4>
                <p className="text-sm text-blue-700">{selectedPatient.age} yosh, {selectedPatient.phone}</p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleDiagnosisSubmit(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tashxis</label>
                  <input
                    type="text"
                    value={diagnosisForm.diagnosis}
                    onChange={(e) => setDiagnosisForm({...diagnosisForm, diagnosis: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Tashxisni kiriting"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alomatlar</label>
                  <textarea
                    value={diagnosisForm.symptoms}
                    onChange={(e) => setDiagnosisForm({...diagnosisForm, symptoms: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                    placeholder="Bemorning alomatlarini kiriting"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Muolaja rejasi</label>
                  <textarea
                    value={diagnosisForm.treatment}
                    onChange={(e) => setDiagnosisForm({...diagnosisForm, treatment: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                    placeholder="Muolaja rejasini kiriting"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Retsept</label>
                  <textarea
                    value={diagnosisForm.prescription}
                    onChange={(e) => setDiagnosisForm({...diagnosisForm, prescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                    placeholder="Retseptni kiriting"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keyingi tekshiruv</label>
                    <input
                      type="date"
                      value={diagnosisForm.followUpDate}
                      onChange={(e) => setDiagnosisForm({...diagnosisForm, followUpDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prioritet</label>
                    <select
                      value={diagnosisForm.priority}
                      onChange={(e) => setDiagnosisForm({...diagnosisForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="low">Past</option>
                      <option value="normal">O'rta</option>
                      <option value="high">Yuqori</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qo'shimcha eslatmalar</label>
                  <textarea
                    value={diagnosisForm.notes}
                    onChange={(e) => setDiagnosisForm({...diagnosisForm, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={2}
                    placeholder="Qo'shimcha eslatmalar"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDiagnosisModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
