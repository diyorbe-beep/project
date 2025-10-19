import { useState } from 'react';
import { patientsData } from '../../mocks/patients';

export default function DuxtirDashboard() {
  const [patients] = useState(patientsData);

  // Bugungi yangi bemorlar
  const newPatients = patients.slice(0, 3);
  
  // Kutilayotgan to'lovlar
  const pendingPayments = 8; // Mock data
  
  // Bugungi naybatlar
  const todayAppointments = 15; // Mock data
  
  // Bo'sh xonalar
  const availableRooms = 5; // Mock data

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Duxtir Dashboard</h1>
        <p className="text-gray-600">Xush kelibsiz, Malika Toshmatova</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-user-add-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Yangi bemorlar</p>
              <p className="text-2xl font-bold text-gray-900">{newPatients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-check-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Bugungi naybatlar</p>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Kutilayotgan to'lovlar</p>
              <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <i className="ri-hotel-bed-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Bo'sh xonalar</p>
              <p className="text-2xl font-bold text-gray-900">{availableRooms}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Yangi bemorlar</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="ri-user-line text-green-600"></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{patient.ism} {patient.familiya}</div>
                            <div className="text-sm text-gray-500">{patient.yosh} yosh</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.telefon}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap">Qabul</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tez harakatlar</h2>
          <div className="grid grid-cols-1 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg flex items-center gap-3 cursor-pointer">
              <i className="ri-user-add-line text-2xl"></i>
              <div className="text-left">
                <p className="font-semibold">Yangi bemor qabuli</p>
                <p className="text-sm opacity-90">Bemorni qabul qiling</p>
              </div>
            </button>
            
            <button className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg flex items-center gap-3 cursor-pointer">
              <i className="ri-calendar-check-line text-2xl"></i>
              <div className="text-left">
                <p className="font-semibold">Naybat yaratish</p>
                <p className="text-sm opacity-90">Yangi naybat yarating</p>
              </div>
            </button>
            
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg flex items-center gap-3 cursor-pointer">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
              <div className="text-left">
                <p className="font-semibold">To'lov qabuli</p>
                <p className="text-sm opacity-90">To'lovni qabul qiling</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
