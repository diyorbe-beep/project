import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Microscope, 
  Pill, 
  TestTube, 
  Bed, 
  UserCheck, 
  Settings,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function ShifokorPanelPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    todayPatients: 12,
    pendingDiagnosis: 3,
    completedTreatments: 8,
    scheduledAppointments: 5
  };

  const todayPatients = [
    { id: 1, name: 'Alisher Karimov', time: '09:00', reason: 'Qandli diabet tekshiruvi', status: 'Kutilmoqda' },
    { id: 2, name: 'Malika Toshmatova', time: '10:30', reason: 'Hipertoniya', status: 'Tekshirilmoqda' },
    { id: 3, name: 'Javlon Nablyev', time: '11:15', reason: 'Gastrit', status: 'Yakunlangan' },
    { id: 4, name: 'Svetlana Rajabova', time: '14:00', reason: 'Yurak tekshiruvi', status: 'Kutilmoqda' }
  ];

  const pendingDiagnoses = [
    { id: 1, patient: 'Alisher Karimov', symptoms: 'Ko\'p siydik chiqarish, chanqash', priority: 'Yuqori' },
    { id: 2, patient: 'Malika Toshmatova', symptoms: 'Bosh og\'rig\'i, yuqori qon bosimi', priority: 'O\'rta' },
    { id: 3, patient: 'Javlon Nablyev', symptoms: 'Qorin og\'rig\'i, ko\'ngil aynishi', priority: 'Past' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Kutilmoqda':
        return 'bg-yellow-100 text-yellow-800';
      case 'Tekshirilmoqda':
        return 'bg-blue-100 text-blue-800';
      case 'Yakunlangan':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Yuqori':
        return 'bg-red-100 text-red-800';
      case 'O\'rta':
        return 'bg-yellow-100 text-yellow-800';
      case 'Past':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shifokor Paneli</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Dr. Kamila Rahimova - Kardiolog</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.todayPatients}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Bugungi bemorlar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Microscope className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pendingDiagnosis}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilayotgan tashxis</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.completedTreatments}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Yakunlangan muolajalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.scheduledAppointments}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Rejalashtirilgan qabullar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Bugungi bemorlar */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Bugungi bemorlar</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {todayPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{patient.time}</p>
                    </div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{patient.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{patient.reason}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kutilayotgan tashxis */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Kutilayotgan tashxis</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {pendingDiagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{diagnosis.patient}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(diagnosis.priority)}`}>
                      {diagnosis.priority}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">{diagnosis.symptoms}</p>
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors">
                      Tashxis qo'yish
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-md hover:bg-gray-300 transition-colors">
                      Batafsil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Tezkor harakatlar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Microscope className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-sm font-medium text-blue-900">Yangi tashxis</span>
          </button>
          <button className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Pill className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-sm font-medium text-green-900">Muolaja rejasi</span>
          </button>
          <button className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <TestTube className="w-5 h-5 text-purple-600 mr-3" />
            <span className="text-sm font-medium text-purple-900">Tahlil buyurtmasi</span>
          </button>
          <button className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <UserCheck className="w-5 h-5 text-orange-600 mr-3" />
            <span className="text-sm font-medium text-orange-900">Hamshira chaqirish</span>
          </button>
        </div>
      </div>
    </div>
  );
}