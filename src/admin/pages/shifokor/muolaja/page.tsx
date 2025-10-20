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
  Users,
  Calendar, 
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Activity,
  Heart,
  LogOut
} from 'lucide-react';

export default function ShifokorMuolaja() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [treatmentForm, setTreatmentForm] = useState({
    patientId: '',
    treatmentType: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    notes: ''
  });

  const patients = [
    {
      id: 1,
      name: 'Alisher Karimov',
      age: 45,
      diagnosis: 'Qandli diabet',
      currentMedications: ['Metformin'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Malika Toshmatova',
      age: 38,
      diagnosis: 'Hipertoniya',
      currentMedications: ['Amlodipine'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Javlon Nablyev',
      age: 52,
      diagnosis: 'Gastrit',
      currentMedications: ['Omeprazole'],
      status: 'completed'
    }
  ];

  const treatments = [
    {
      id: 1,
      patientName: 'Alisher Karimov',
      treatmentType: 'Medikamentoz',
      medication: 'Insulin',
      dosage: '10 units',
      frequency: 'Kunlik 2 marta',
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      status: 'active',
      doctor: 'Dr. Kamila Rahimova'
    },
    {
      id: 2,
      patientName: 'Malika Toshmatova',
      treatmentType: 'Medikamentoz',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Kunlik 1 marta',
      startDate: '2024-01-08',
      endDate: '2024-01-22',
      status: 'active',
      doctor: 'Dr. Kamila Rahimova'
    },
    {
      id: 3,
      patientName: 'Javlon Nablyev',
      treatmentType: 'Medikamentoz',
      medication: 'Omeprazole',
      dosage: '20mg',
      frequency: 'Kunlik 1 marta',
      startDate: '2024-01-05',
      endDate: '2024-01-19',
      status: 'completed',
      doctor: 'Dr. Kamila Rahimova'
    }
  ];

  const stats = {
    activeTreatments: treatments.filter(t => t.status === 'active').length,
    completedTreatments: treatments.filter(t => t.status === 'completed').length,
    totalPatients: patients.length,
    medicationsPrescribed: treatments.length
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
    setTreatmentForm({
      ...treatmentForm,
      patientId: patient.id
    });
    setShowTreatmentModal(true);
  };

  const handleTreatmentSubmit = () => {
    alert('Muolaja rejasi saqlandi!');
    setShowTreatmentModal(false);
    setTreatmentForm({
      patientId: '',
      treatmentType: '',
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      notes: ''
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
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Faol';
      case 'completed':
        return 'Yakunlangan';
      case 'paused':
        return 'To\'xtatilgan';
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Muolaja berish</h1>
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.activeTreatments}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Faol muolajalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.completedTreatments}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Yakunlangan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.medicationsPrescribed}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Retsept berilgan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami bemorlar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Bemorlar ro'yxati */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Muolaja kutilayotgan bemorlar</h3>
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
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">Tashxis</p>
                    <p className="text-sm text-gray-900">{patient.diagnosis}</p>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">Joriy dorilar</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.currentMedications.map((med, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePatientSelect(patient)}
                    className="w-full px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Muolaja rejasi qo'shish
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Muolaja rejalari */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Muolaja rejalari</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {treatments.map((treatment) => (
                <div key={treatment.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{treatment.patientName}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(treatment.status)}`}>
                      {getStatusText(treatment.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-500">Dori</p>
                      <p className="text-sm text-gray-900">{treatment.medication}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Doza</p>
                      <p className="text-sm text-gray-900">{treatment.dosage}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-500">Chastota</p>
                    <p className="text-sm text-gray-900">{treatment.frequency}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(treatment.startDate).toLocaleDateString()}</span>
                    <span>-</span>
                    <span>{new Date(treatment.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Modal */}
      {showTreatmentModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Muolaja rejasi qo'shish</h3>
                <button
                  onClick={() => setShowTreatmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Bemor: {selectedPatient.name}</h4>
                <p className="text-sm text-green-700">{selectedPatient.diagnosis}</p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleTreatmentSubmit(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Muolaja turi</label>
                  <select
                    value={treatmentForm.treatmentType}
                    onChange={(e) => setTreatmentForm({...treatmentForm, treatmentType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  >
                    <option value="">Muolaja turini tanlang</option>
                    <option value="Medikamentoz">Medikamentoz</option>
                    <option value="Fizioterapiya">Fizioterapiya</option>
                    <option value="Dieta">Dieta</option>
                    <option value="Jaroxatli">Jaroxatli</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dori nomi</label>
                    <input
                      type="text"
                      value={treatmentForm.medication}
                      onChange={(e) => setTreatmentForm({...treatmentForm, medication: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Dori nomini kiriting"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Doza</label>
                    <input
                      type="text"
                      value={treatmentForm.dosage}
                      onChange={(e) => setTreatmentForm({...treatmentForm, dosage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Dozani kiriting"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chastota</label>
                    <select
                      value={treatmentForm.frequency}
                      onChange={(e) => setTreatmentForm({...treatmentForm, frequency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    >
                      <option value="">Chastotani tanlang</option>
                      <option value="Kunlik 1 marta">Kunlik 1 marta</option>
                      <option value="Kunlik 2 marta">Kunlik 2 marta</option>
                      <option value="Kunlik 3 marta">Kunlik 3 marta</option>
                      <option value="Haftalik 1 marta">Haftalik 1 marta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Davomiyligi</label>
                    <input
                      type="text"
                      value={treatmentForm.duration}
                      onChange={(e) => setTreatmentForm({...treatmentForm, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Davomiyligi"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ko'rsatmalar</label>
                  <textarea
                    value={treatmentForm.instructions}
                    onChange={(e) => setTreatmentForm({...treatmentForm, instructions: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                    placeholder="Bemor uchun ko'rsatmalar"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qo'shimcha eslatmalar</label>
                  <textarea
                    value={treatmentForm.notes}
                    onChange={(e) => setTreatmentForm({...treatmentForm, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={2}
                    placeholder="Qo'shimcha eslatmalar"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTreatmentModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
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
