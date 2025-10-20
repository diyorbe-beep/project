import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Pill, 
  TestTube, 
  Bed, 
  Bell, 
  Settings,
  Activity,
  Thermometer,
  Droplets,
  Weight,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function HamshiraPanelPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    assignedPatients: 8,
    pendingVitals: 3,
    medicationsGiven: 12,
    alerts: 2
  };

  const assignedPatients = [
    { id: 1, name: 'Alisher Karimov', room: '101', condition: 'Qandli diabet', vitals: 'Normal', lastCheck: '2 soat oldin' },
    { id: 2, name: 'Malika Toshmatova', room: '102', condition: 'Hipertoniya', vitals: 'Yuqori BP', lastCheck: '30 daqiqa oldin' },
    { id: 3, name: 'Javlon Nablyev', room: '103', condition: 'Gastrit', vitals: 'Normal', lastCheck: '1 soat oldin' },
    { id: 4, name: 'Svetlana Rajabova', room: '104', condition: 'Yurak kasalligi', vitals: 'Puls yuqori', lastCheck: '45 daqiqa oldin' }
  ];

  const pendingVitals = [
    { id: 1, patient: 'Alisher Karimov', room: '101', priority: 'Yuqori', time: '09:00' },
    { id: 2, patient: 'Malika Toshmatova', room: '102', priority: 'O\'rta', time: '09:30' },
    { id: 3, patient: 'Javlon Nablyev', room: '103', priority: 'Past', time: '10:00' }
  ];

  const medications = [
    { id: 1, patient: 'Alisher Karimov', medication: 'Insulin', dosage: '10 units', time: '08:00', status: 'Berildi' },
    { id: 2, patient: 'Malika Toshmatova', medication: 'Amlodipine', dosage: '5mg', time: '09:00', status: 'Kutilmoqda' },
    { id: 3, patient: 'Javlon Nablyev', medication: 'Omeprazole', dosage: '20mg', time: '10:00', status: 'Kutilmoqda' }
  ];

  const getVitalsColor = (vitals: string) => {
    switch (vitals) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Yuqori BP':
        return 'bg-red-100 text-red-800';
      case 'Puls yuqori':
        return 'bg-yellow-100 text-yellow-800';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Berildi':
        return 'bg-green-100 text-green-800';
      case 'Kutilmoqda':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hamshira Paneli</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Gulnora Abdullayeva - Hamshira</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.assignedPatients}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Ajratilgan bemorlar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pendingVitals}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilayotgan vitals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.medicationsGiven}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Berilgan dorilar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.alerts}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Ogohlantirishlar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Ajratilgan bemorlar */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ajratilgan bemorlar</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {assignedPatients.map((patient) => (
                <div key={patient.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{patient.room}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVitalsColor(patient.vitals)}`}>
                      {patient.vitals}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{patient.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{patient.condition}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {patient.lastCheck}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kutilayotgan vitals */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Kutilayotgan vitals</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {pendingVitals.map((vital) => (
                <div key={vital.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{vital.patient}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(vital.priority)}`}>
                      {vital.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-xs sm:text-sm text-gray-600">{vital.room}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {vital.time}
                    </div>
                  </div>
                  <button className="mt-3 w-full px-3 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors">
                    Vitals yozish
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dorilar ro'yxati */}
      <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm">
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
              {medications.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    {med.patient}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {med.medication}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {med.dosage}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {med.time}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(med.status)}`}>
                      {med.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    {med.status === 'Kutilmoqda' && (
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Berish
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-900">
                      Batafsil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Tezkor harakatlar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Heart className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-sm font-medium text-blue-900">Vitals yozish</span>
          </button>
          <button className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Pill className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-sm font-medium text-green-900">Dori berish</span>
          </button>
          <button className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <TestTube className="w-5 h-5 text-purple-600 mr-3" />
            <span className="text-sm font-medium text-purple-900">Tahlil olish</span>
          </button>
          <button className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Bell className="w-5 h-5 text-orange-600 mr-3" />
            <span className="text-sm font-medium text-orange-900">Shifokorni chaqirish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
