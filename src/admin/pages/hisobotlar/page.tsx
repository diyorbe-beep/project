
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { doctorsData } from '../../mocks/doctors';
import { patientsData } from '../../mocks/patients';

export default function HisobotlarPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('bugun');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const todayStats = {
    bemorlar: 45,
    tushum: 12500000,
    qabullar: 38,
    bandXonalar: 12
  };

  const topDoctors = [
    { ism: 'Dr. Aliyev Sardor', qabullar: 15, tushum: 3500000 },
    { ism: 'Dr. Karimova Nilufar', qabullar: 12, tushum: 2800000 },
    { ism: 'Dr. Toshmatov Bobur', qabullar: 11, tushum: 2600000 }
  ];

  const popularTests = [
    { nom: 'Umumiy qon tahlili', soni: 25, narx: 50000 },
    { nom: 'Biokimyoviy tahlil', soni: 18, narx: 120000 },
    { nom: 'EKG', soni: 15, narx: 80000 }
  ];

  const monthlyData = [
    { oy: 'Yanvar', bemorlar: 1250, tushum: 285000000 },
    { oy: 'Fevral', bemorlar: 1180, tushum: 268000000 },
    { oy: 'Mart', bemorlar: 1320, tushum: 295000000 },
    { oy: 'Aprel', bemorlar: 1280, tushum: 289000000 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Hisobotlar va statistika" subtitle="Klinika faoliyati bo'yicha hisobotlar" />
      
      <div className="p-6">
        {/* Filtr paneli */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Davr:</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="bugun">Bugun</option>
                <option value="hafta">Bu hafta</option>
                <option value="oy">Bu oy</option>
                <option value="yil">Bu yil</option>
                <option value="custom">Boshqa davr</option>
              </select>
            </div>
            
            {selectedPeriod === 'custom' && (
              <>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-auto"
                />
                <span className="text-gray-500">dan</span>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-auto"
                />
                <span className="text-gray-500">gacha</span>
              </>
            )}
            
            <Button className="whitespace-nowrap">
              <i className="ri-download-line mr-2"></i>
              Hisobotni yuklash
            </Button>
          </div>
        </div>

        {/* Asosiy statistika */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-2xl text-blue-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Jami bemorlar</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.bemorlar}</p>
                <p className="text-xs text-green-600">+12% o'tgan haftagaga nisbatan</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-2xl text-green-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kunlik tushum</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.tushum.toLocaleString()} so'm</p>
                <p className="text-xs text-green-600">+8% o'tgan kunga nisbatan</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-2xl text-orange-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Qabullar soni</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.qabullar}</p>
                <p className="text-xs text-red-600">-3% o'tgan kunga nisbatan</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-hotel-bed-line text-2xl text-purple-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Band xonalar</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.bandXonalar}</p>
                <p className="text-xs text-gray-500">20 ta xonadan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Eng faol shifokorlar */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Eng faol shifokorlar</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topDoctors.map((doctor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{doctor.ism}</p>
                        <p className="text-sm text-gray-500">{doctor.qabullar} ta qabul</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{doctor.tushum.toLocaleString()} so'm</p>
                      <p className="text-sm text-gray-500">tushum</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Eng ko'p tahlil turlari */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Eng ko'p tahlil turlari</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {popularTests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <i className="ri-test-tube-line text-green-600"></i>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{test.nom}</p>
                        <p className="text-sm text-gray-500">{test.soni} marta</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{test.narx.toLocaleString()} so'm</p>
                      <p className="text-sm text-gray-500">narx</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Oylik statistika */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Oylik statistika</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Oy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bemorlar soni
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tushum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      O'rtacha kunlik
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monthlyData.map((month, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{month.oy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{month.bemorlar}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{month.tushum.toLocaleString()} so'm</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{Math.round(month.bemorlar / 30)} bemor/kun</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
