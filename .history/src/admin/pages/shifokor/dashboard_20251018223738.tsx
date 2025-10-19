import { useState } from 'react';
import { patientsData } from '../../mocks/patients';
import { nursesData } from '../../mocks/nurses';

export default function ShifokorDashboard() {
  const [patients] = useState(patientsData);
  const [nurses] = useState(nursesData);

  // Bugungi bemorlar
  const todayPatients = patients.slice(0, 5);

  // Kutilayotgan tashxis
  const pendingDiagnosis = patients.filter(p => !p.so_nggi_tashxis).length;

  // Faol muolaja rejalari
  const activeTreatments = 12; // Mock data

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shifokor Dashboard</h1>
        <p className="text-gray-600">Xush kelibsiz, Dr. Kamila Rahimova</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-user-heart-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Bugungi bemorlar</p>
              <p className="text-2xl font-bold text-gray-900">{todayPatients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-stethoscope-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Kutilayotgan tashxis</p>
              <p className="text-2xl font-bold text-gray-900">{pendingDiagnosis}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <i className="ri-medicine-bottle-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Faol muolaja rejalari</p>
              <p className="text-2xl font-bold text-gray-900">{activeTreatments}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <i className="ri-nurse-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Biriktirilgan hamshiralar</p>
              <p className="text-2xl font-bold text-gray-900">{nurses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bugungi bemorlar */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Bugungi bemorlar</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yosh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todayPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-blue-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.ism} {patient.familiya}</div>
                          <div className="text-sm text-gray-500">{patient.telefon}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.yosh}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.telefon}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.so_nggi_tashxis ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.so_nggi_tashxis ? 'Tashxis qo\'yilgan' : 'Kutilmoqda'}
                      </span>
                    </td>
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

      {/* Tez harakatlar */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tez harakatlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg flex items-center gap-3 cursor-pointer">
            <i className="ri-stethoscope-line text-2xl"></i>
            <div className="text-left">
              <p className="font-semibold">Yangi tashxis</p>
              <p className="text-sm opacity-90">Bemorga tashxis qo'ying</p>
            </div>
          </button>
          
          <button className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg flex items-center gap-3 cursor-pointer">
            <i className="ri-medicine-bottle-line text-2xl"></i>
            <div className="text-left">
              <p className="font-semibold">Muolaja rejasi</p>
              <p className="text-sm opacity-90">Muolaja rejasini yarating</p>
            </div>
          </button>
          
          <button className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg flex items-center gap-3 cursor-pointer">
            <i className="ri-nurse-line text-2xl"></i>
            <div className="text-left">
              <p className="font-semibold">Hamshira biriktirish</p>
              <p className="text-sm opacity-90">Bemor uchun hamshira tanlang</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
