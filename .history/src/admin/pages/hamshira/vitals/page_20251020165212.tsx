import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Thermometer, 
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
  Heart,
  Droplets,
  Weight,
  LogOut
} from 'lucide-react';

export default function HamshiraVitals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [vitalsForm, setVitalsForm] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    notes: ''
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const vitalsRecords = [
    {
      id: 1,
      patientName: 'Alisher Karimov',
      room: '101',
      temperature: 36.8,
      bloodPressure: '125/80',
      heartRate: 75,
      oxygenSaturation: 98,
      weight: 75.5,
      height: 175,
      recordedAt: '2024-01-15 10:00',
      recordedBy: 'Gulnora Abdullayeva',
      status: 'normal'
    },
    {
      id: 2,
      patientName: 'Malika Toshmatova',
      room: '102',
      temperature: 37.2,
      bloodPressure: '140/90',
      heartRate: 85,
      oxygenSaturation: 96,
      weight: 68.2,
      height: 165,
      recordedAt: '2024-01-15 09:30',
      recordedBy: 'Gulnora Abdullayeva',
      status: 'abnormal'
    },
    {
      id: 3,
      patientName: 'Javlon Nablyev',
      room: '103',
      temperature: 36.5,
      bloodPressure: '115/75',
      heartRate: 68,
      oxygenSaturation: 99,
      weight: 82.1,
      height: 180,
      recordedAt: '2024-01-15 08:45',
      recordedBy: 'Gulnora Abdullayeva',
      status: 'normal'
    },
    {
      id: 4,
      patientName: 'Svetlana Rajabova',
      room: '104',
      temperature: 37.8,
      bloodPressure: '160/95',
      heartRate: 95,
      oxygenSaturation: 94,
      weight: 72.3,
      height: 168,
      recordedAt: '2024-01-15 11:15',
      recordedBy: 'Gulnora Abdullayeva',
      status: 'critical'
    }
  ];

  const stats = {
    totalRecords: vitalsRecords.length,
    normalRecords: vitalsRecords.filter(v => v.status === 'normal').length,
    abnormalRecords: vitalsRecords.filter(v => v.status === 'abnormal').length,
    criticalRecords: vitalsRecords.filter(v => v.status === 'critical').length
  };

  const filteredRecords = vitalsRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.room.includes(searchTerm)
  );

  const handleVitalsClick = (record: any) => {
    setSelectedPatient(record);
    setVitalsForm({
      temperature: record.temperature.toString(),
      bloodPressure: record.bloodPressure,
      heartRate: record.heartRate.toString(),
      oxygenSaturation: record.oxygenSaturation.toString(),
      weight: record.weight.toString(),
      height: record.height.toString(),
      notes: ''
    });
    setShowVitalsModal(true);
  };

  const handleLogout = () => {
    if (window.confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?')) {
      logout();
      navigate('/');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal':
        return 'Normal';
      case 'abnormal':
        return 'Abnormal';
      case 'critical':
        return 'Jiddiy';
      default:
        return status;
    }
  };

  const isAbnormalVital = (value: number, type: string) => {
    switch (type) {
      case 'temperature':
        return value < 36.0 || value > 37.5;
      case 'heartRate':
        return value < 60 || value > 100;
      case 'oxygenSaturation':
        return value < 95;
      default:
        return false;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Vitals yozish</h1>
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
              <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalRecords}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami yozuvlar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.normalRecords}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Normal</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.abnormalRecords}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Abnormal</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.criticalRecords}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jiddiy</p>
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
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Yangi vitals
          </button>
        </div>
      </div>

      {/* Vitals Records Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Vitals yozuvlari</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harorat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qon bosimi</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yurak urishi</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaqt</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{record.patientName}</div>
                        <div className="text-xs text-gray-500">Xona {record.room}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm text-gray-900">{record.temperature}°C</span>
                      {isAbnormalVital(record.temperature, 'temperature') && (
                        <AlertCircle className="w-4 h-4 text-red-500 ml-1" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{record.bloodPressure} mmHg</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm text-gray-900">{record.heartRate} bpm</span>
                      {isAbnormalVital(record.heartRate, 'heartRate') && (
                        <AlertCircle className="w-4 h-4 text-red-500 ml-1" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-900">
                          {new Date(record.recordedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(record.recordedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVitalsClick(record)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Tahrirlash"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
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

      {/* Vitals Modal */}
      {showVitalsModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Vitals yozish</h3>
                <button
                  onClick={() => setShowVitalsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Bemor: {selectedPatient.patientName}</h4>
                <p className="text-sm text-blue-700">Xona: {selectedPatient.room}</p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); alert('Vitals saqlandi!'); setShowVitalsModal(false); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Harorat (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={vitalsForm.temperature}
                      onChange={(e) => setVitalsForm({...vitalsForm, temperature: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="36.6"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qon bosimi (mmHg)</label>
                    <input
                      type="text"
                      value={vitalsForm.bloodPressure}
                      onChange={(e) => setVitalsForm({...vitalsForm, bloodPressure: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="120/80"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Yurak urishi (bpm)</label>
                    <input
                      type="number"
                      value={vitalsForm.heartRate}
                      onChange={(e) => setVitalsForm({...vitalsForm, heartRate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="72"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kislorod to'yinishi (%)</label>
                    <input
                      type="number"
                      value={vitalsForm.oxygenSaturation}
                      onChange={(e) => setVitalsForm({...vitalsForm, oxygenSaturation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="98"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vazn (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={vitalsForm.weight}
                      onChange={(e) => setVitalsForm({...vitalsForm, weight: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bo'yi (sm)</label>
                    <input
                      type="number"
                      value={vitalsForm.height}
                      onChange={(e) => setVitalsForm({...vitalsForm, height: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="170"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qo'shimcha eslatmalar</label>
                  <textarea
                    value={vitalsForm.notes}
                    onChange={(e) => setVitalsForm({...vitalsForm, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={3}
                    placeholder="Qo'shimcha eslatmalar"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowVitalsModal(false)}
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
