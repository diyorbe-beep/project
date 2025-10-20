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
  CheckCircle,
  TrendingUp,
  Calendar,
  UserCheck,
  Stethoscope
} from 'lucide-react';

export default function HamshiraDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    assignedPatients: 12,
    pendingVitals: 5,
    medicationsGiven: 18,
    alerts: 3,
    completedTasks: 15,
    scheduledAppointments: 8
  };

  const assignedPatients = [
    { 
      id: 1, 
      name: 'Alisher Karimov', 
      room: '101', 
      condition: 'Qandli diabet', 
      vitals: 'Normal', 
      lastCheck: '2 soat oldin',
      nextCheck: '30 daqiqa',
      priority: 'normal'
    },
    { 
      id: 2, 
      name: 'Malika Toshmatova', 
      room: '102', 
      condition: 'Hipertoniya', 
      vitals: 'Yuqori BP', 
      lastCheck: '30 daqiqa oldin',
      nextCheck: '15 daqiqa',
      priority: 'high'
    },
    { 
      id: 3, 
      name: 'Javlon Nablyev', 
      room: '103', 
      condition: 'Gastrit', 
      vitals: 'Normal', 
      lastCheck: '1 soat oldin',
      nextCheck: '1 soat',
      priority: 'normal'
    },
    { 
      id: 4, 
      name: 'Svetlana Rajabova', 
      room: '104', 
      condition: 'Yurak kasalligi', 
      vitals: 'Puls yuqori', 
      lastCheck: '45 daqiqa oldin',
      nextCheck: '45 daqiqa',
      priority: 'high'
    }
  ];

  const pendingTasks = [
    { 
      id: 1, 
      patient: 'Alisher Karimov', 
      task: 'Vitals tekshiruvi', 
      time: '09:00', 
      priority: 'high',
      type: 'vitals'
    },
    { 
      id: 2, 
      patient: 'Malika Toshmatova', 
      task: 'Insulin inyeksiyasi', 
      time: '09:30', 
      priority: 'high',
      type: 'medication'
    },
    { 
      id: 3, 
      patient: 'Javlon Nablyev', 
      task: 'Qon olish', 
      time: '10:00', 
      priority: 'normal',
      type: 'lab'
    },
    { 
      id: 4, 
      patient: 'Svetlana Rajabova', 
      task: 'EKG tekshiruvi', 
      time: '10:30', 
      priority: 'high',
      type: 'examination'
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      patient: 'Alisher Karimov', 
      activity: 'Vitals yozildi', 
      time: '08:45',
      status: 'completed'
    },
    { 
      id: 2, 
      patient: 'Malika Toshmatova', 
      activity: 'Dori berildi', 
      time: '08:30',
      status: 'completed'
    },
    { 
      id: 3, 
      patient: 'Javlon Nablyev', 
      activity: 'Tahlil olinmadi', 
      time: '08:15',
      status: 'cancelled'
    }
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
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
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

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'vitals':
        return Heart;
      case 'medication':
        return Pill;
      case 'lab':
        return TestTube;
      case 'examination':
        return Stethoscope;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hamshira Dashboard</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Ajratilgan bemorlar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ajratilgan bemorlar</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {assignedPatients.map((patient) => {
                  const TaskIcon = getTaskIcon('vitals');
                  return (
                    <div key={patient.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{patient.room}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVitalsColor(patient.vitals)}`}>
                            {patient.vitals}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                            {getPriorityText(patient.priority)}
                          </span>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{patient.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">{patient.condition}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Oxirgi tekshiruv: {patient.lastCheck}
                        </div>
                        <div className="flex items-center text-xs text-blue-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          Keyingi: {patient.nextCheck}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kutilayotgan vazifalar */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Kutilayotgan vazifalar</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {pendingTasks.map((task) => {
                  const TaskIcon = getTaskIcon(task.type);
                  return (
                    <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <TaskIcon className="w-4 h-4 text-blue-600 mr-2" />
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{task.patient}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {getPriorityText(task.priority)}
                          </span>
                          <span className="text-xs text-gray-500">{task.time}</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3">{task.task}</p>
                      <button className="w-full px-3 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors">
                        Vazifani bajarish
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* So'nggi faoliyat */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">So'nggi faoliyat</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                        {activity.patient}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{activity.activity}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tezkor harakatlar */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tezkor harakatlar</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Heart className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-blue-900">Vitals yozish</span>
                </button>
                <button className="w-full flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Pill className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-green-900">Dori berish</span>
                </button>
                <button className="w-full flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <TestTube className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-purple-900">Tahlil olish</span>
                </button>
                <button className="w-full flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <Bell className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-sm font-medium text-orange-900">Shifokorni chaqirish</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistika */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Bugungi statistika</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Yakunlangan vazifalar</span>
                  <span className="text-sm font-bold text-green-600">{stats.completedTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rejalashtirilgan qabullar</span>
                  <span className="text-sm font-bold text-blue-600">{stats.scheduledAppointments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Kutilayotgan vitals</span>
                  <span className="text-sm font-bold text-yellow-600">{stats.pendingVitals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ogohlantirishlar</span>
                  <span className="text-sm font-bold text-red-600">{stats.alerts}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}