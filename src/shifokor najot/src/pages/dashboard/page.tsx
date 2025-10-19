
import { Header } from '../../components/feature/Header';
import { patientsData } from '../../mocks/patients';
import { doctorsData } from '../../mocks/doctors';

export default function DashboardPage() {
  const todayDate = new Date().toISOString().split('T')[0];
  
  const stats = {
    totalDoctors: doctorsData.length,
    activeDoctors: doctorsData.filter(d => d.holat === 'faol').length,
    totalPatients: patientsData.length,
    todayRevenue: 12500000,
    totalRooms: 20,
    occupiedRooms: 12
  };

  const recentActivities = [
    { id: 1, type: 'doctor_added', message: 'Yangi shifokor qo\'shildi: Dr. Aliyev', time: '10 daqiqa oldin' },
    { id: 2, type: 'patient_registered', message: 'Yangi bemor ro\'yxatdan o\'tdi: Karimov Anvar', time: '25 daqiqa oldin' },
    { id: 3, type: 'room_assigned', message: '12-xona bemorga tayinlandi', time: '1 soat oldin' },
    { id: 4, type: 'test_uploaded', message: 'Tahlil natijasi yuklandi', time: '2 soat oldin' }
  ];

  const quickStats = [
    { label: 'Bugungi qabullar', value: 45, icon: 'ri-calendar-check-line', color: 'blue' },
    { label: 'Kutayotgan bemorlar', value: 8, icon: 'ri-time-line', color: 'orange' },
    { label: 'Tugallangan muolajalar', value: 23, icon: 'ri-check-line', color: 'green' },
    { label: 'Yangi tahlillar', value: 12, icon: 'ri-test-tube-line', color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Admin Dashboard" subtitle="Najot Clinic - Boshqaruv paneli" />
      
      <div className="p-6">
        {/* Asosiy statistika kartochalari */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-heart-line text-2xl text-blue-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Jami shifokorlar</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
                <p className="text-xs text-green-600">{stats.activeDoctors} ta faol</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-2xl text-green-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Jami bemorlar</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                <p className="text-xs text-blue-600">+12 yangi bemor</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-2xl text-orange-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bugungi tushum</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+8% o'tgan kunga nisbatan</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-hotel-bed-line text-2xl text-purple-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Xonalar</p>
                <p className="text-2xl font-bold text-gray-900">{stats.occupiedRooms}/{stats.totalRooms}</p>
                <p className="text-xs text-gray-500">band/jami</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tezkor statistika */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-${stat.color}-600`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* So'nggi faoliyatlar */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">So'nggi faoliyatlar</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-notification-line text-blue-600 text-sm"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Faol shifokorlar */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Faol shifokorlar</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {doctorsData.filter(d => d.holat === 'faol').slice(0, 4).map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-heart-line text-blue-600"></i>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{doctor.ism}</p>
                        <p className="text-sm text-gray-500">{doctor.mutaxassislik}</p>
                      </div>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Faol
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bugungi vazifalar */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Bugungi vazifalar</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <i className="ri-user-add-line text-blue-600 text-xl"></i>
                  <div className="ml-3">
                    <p className="font-medium text-blue-900">Yangi xodimlar</p>
                    <p className="text-sm text-blue-700">2 ta yangi shifokor qo'shish</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <i className="ri-file-text-line text-green-600 text-xl"></i>
                  <div className="ml-3">
                    <p className="font-medium text-green-900">Hisobotlar</p>
                    <p className="text-sm text-green-700">Oylik hisobot tayyorlash</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <i className="ri-settings-line text-orange-600 text-xl"></i>
                  <div className="ml-3">
                    <p className="font-medium text-orange-900">Tizim yangilanishi</p>
                    <p className="text-sm text-orange-700">Backup va yangilanish</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
