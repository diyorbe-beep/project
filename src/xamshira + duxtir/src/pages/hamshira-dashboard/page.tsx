import { useState } from 'react';
import { nursesData, nurseAssignmentsData, treatmentItemsNurseData, vitalsData, notificationsData } from '../../mocks/nurses';
import { patientsData } from '../../mocks/patients';

export default function HamshiraDashboard() {
  const [currentNurse] = useState(nursesData[0]); // Hozirgi hamshira
  
  // Hozirgi hamshiraga biriktirilgan bemorlar
  const assignedPatients = nurseAssignmentsData
    .filter(assignment => assignment.nurse_id === currentNurse.id && assignment.status === 'faol')
    .map(assignment => {
      const patient = patientsData.find(p => p.id === assignment.patient_id);
      return { ...patient, assignment };
    });

  // Bugungi muolajalar
  const todayTreatments = treatmentItemsNurseData.filter(item => 
    assignedPatients.some(patient => patient?.id === item.patient_id)
  );

  // Kutilayotgan tahlil namunalari
  const pendingSamples = assignedPatients.length * 2; // Mock data

  // Bildirishnomalar
  const unreadNotifications = notificationsData.filter(n => !n.oqildi);

  const handleQuickVital = () => {
    // Hayotiy ko'rsatkich kiritish
    console.log('Hayotiy ko\'rsatkich kiritish');
  };

  const handleMarkTreatment = () => {
    // Muolajani berildi deb belgilash
    console.log('Muolaja berildi');
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hamshira Dashboard</h1>
        <p className="text-gray-600">Xush kelibsiz, {currentNurse.fio}</p>
        <p className="text-sm text-gray-500">Smena: {currentNurse.smena_boshlanish} - {currentNurse.smena_tugash}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-user-heart-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Biriktirilgan bemorlar</p>
              <p className="text-2xl font-bold text-gray-900">{assignedPatients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-medicine-bottle-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Bugungi muolajalar</p>
              <p className="text-2xl font-bold text-gray-900">{todayTreatments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <i className="ri-test-tube-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Kutilayotgan namunalar</p>
              <p className="text-2xl font-bold text-gray-900">{pendingSamples}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <i className="ri-notification-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Yangi bildirishnomalar</p>
              <p className="text-2xl font-bold text-gray-900">{unreadNotifications.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tez tugmalar */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tez harakatlar</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleQuickVital}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-heart-pulse-line"></i>
            Hayotiy ko'rsatkich kiritish
          </button>
          <button
            onClick={handleMarkTreatment}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-check-line"></i>
            Muolajani berildi deb belgilash
          </button>
        </div>
      </div>

      {/* Biriktirilgan bemorlar */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Biriktirilgan bemorlar</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yosh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xona</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergiya</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignedPatients.map((patient) => (
                  <tr key={patient?.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{patient?.ism} {patient?.familiya}</div>
                        <div className="text-sm text-gray-500">{patient?.telefon}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient?.yosh}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient?.assignment?.room_id || 'Belgilanmagan'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient?.allergiyalar}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap">Ko'rish</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* So'nggi bildirishnomalar */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">So'nggi bildirishnomalar</h2>
        <div className="space-y-3">
          {notificationsData.slice(0, 5).map((notification) => (
            <div key={notification.id} className={`p-4 rounded-lg border ${notification.oqildi ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.priority === 'yuqori' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{new Date(notification.sana).toLocaleString('uz-UZ')}</p>
                  </div>
                </div>
                {!notification.oqildi && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Yangi</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}