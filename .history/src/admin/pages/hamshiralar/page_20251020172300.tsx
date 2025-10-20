import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { nursesData } from '../../mocks/patients';

export default function HamshiralarPage() {
  const [nurses] = useState(nursesData);

  const getShiftIcon = (startTime: string) => {
    const hour = parseInt(startTime.split(':')[0]);
    if (hour >= 6 && hour < 18) {
      return 'ri-sun-line';
    } else {
      return 'ri-moon-line';
    }
  };

  const getShiftColor = (startTime: string) => {
    const hour = parseInt(startTime.split(':')[0]);
    if (hour >= 6 && hour < 18) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Hamshiralar" subtitle="Hamshiralar boshqaruvi" />
      
      <div className="p-4 sm:p-6">
        {/* Statistika */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-nurse-line text-xl sm:text-2xl text-blue-600"></i>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Jami hamshiralar</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{nurses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-xl sm:text-2xl text-green-600"></i>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Aktiv hamshiralar</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {nurses.filter(nurse => nurse.aktiv).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-sun-line text-2xl text-yellow-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kunduzgi smena</p>
                <p className="text-2xl font-bold text-gray-900">
                  {nurses.filter(nurse => {
                    const hour = parseInt(nurse.smena_boshlanish.split(':')[0]);
                    return hour >= 6 && hour < 18;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hamshiralar ro'yxati */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Hamshiralar ro'yxati</h2>
              <Button icon="ri-add-line">
                Yangi hamshira qo'shish
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hamshira
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Smena vaqti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nurses.map((nurse) => (
                  <tr key={nurse.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <i className="ri-nurse-line text-pink-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{nurse.fio}</div>
                          <div className="text-sm text-gray-500">ID: {nurse.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {nurse.telefon}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getShiftColor(nurse.smena_boshlanish)}`}>
                          <i className={`${getShiftIcon(nurse.smena_boshlanish)} mr-1`}></i>
                          {nurse.smena_boshlanish} - {nurse.smena_tugash}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        nurse.aktiv 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {nurse.aktiv ? 'Aktiv' : 'Faol emas'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button size="sm" variant="secondary" icon="ri-edit-line">
                        Tahrirlash
                      </Button>
                      <Button size="sm" variant="success" icon="ri-user-add-line">
                        Tayinlash
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Smena jadvali */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Bugungi smena jadvali</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <i className="ri-sun-line text-yellow-600 text-xl"></i>
                  <h4 className="ml-2 font-medium text-yellow-900">Kunduzgi smena (08:00 - 20:00)</h4>
                </div>
                <div className="space-y-2">
                  {nurses.filter(nurse => {
                    const hour = parseInt(nurse.smena_boshlanish.split(':')[0]);
                    return hour >= 6 && hour < 18 && nurse.aktiv;
                  }).map(nurse => (
                    <div key={nurse.id} className="flex items-center justify-between p-2 bg-white rounded">
                      <span className="text-sm font-medium">{nurse.fio}</span>
                      <span className="text-sm text-gray-500">{nurse.telefon}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <i className="ri-moon-line text-blue-600 text-xl"></i>
                  <h4 className="ml-2 font-medium text-blue-900">Tungi smena (20:00 - 08:00)</h4>
                </div>
                <div className="space-y-2">
                  {nurses.filter(nurse => {
                    const hour = parseInt(nurse.smena_boshlanish.split(':')[0]);
                    return (hour >= 18 || hour < 6) && nurse.aktiv;
                  }).map(nurse => (
                    <div key={nurse.id} className="flex items-center justify-between p-2 bg-white rounded">
                      <span className="text-sm font-medium">{nurse.fio}</span>
                      <span className="text-sm text-gray-500">{nurse.telefon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}