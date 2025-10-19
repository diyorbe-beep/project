
import { patientsData } from '../../mocks/patients';
import { doctorsData } from '../../mocks/doctors';

export default function DashboardPage() {
  const todayDate = new Date().toISOString().split('T')[0];
  
  const stats = {
    totalDoctors: 235,
    totalNurses: 380,
    totalPatients: 1257,
    totalRooms: 30
  };

  const oldPatients = [
    { id: 1, name: 'Anvar Karimov', age: 45 },
    { id: 2, name: 'Svetlana Rajabova', age: 58 },
    { id: 3, name: 'Javlon Nablyev', age: 34 }
  ];

  const medicalHistory = [
    { date: '15.04.2024', diagnosis: 'Qandli diabet', doctor: 'S. Tursunova' },
    { date: '20.02.2024', diagnosis: 'Hipertoniya', doctor: 'S. Tursunova' },
    { date: '12.09.2023', diagnosis: 'Gastrit', doctor: 'D. Umarov' }
  ];

  const labResults = [
    { date: '15.04.2024', diagnosis: 'Qandli diabet', doctor: 'S. Tursunova', doctor2: 'S. Tursunova' },
    { date: '20.02.2024', diagnosis: 'Hipertoniya', doctor: 'S. Tursunova', doctor2: 'S. Tursunova' },
    { date: '12.08.2023', diagnosis: 'Gastrit', doctor: 'O. Umarov', doctor2: 'O. Umarov' }
  ];

  return (
    <div className="p-8">
        {/* Asosiy statistika kartochalari */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-heart-line text-2xl text-blue-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
                <p className="text-sm font-medium text-gray-600">Shifokorlar</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-nurse-line text-2xl text-blue-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalNurses}</p>
                <p className="text-sm font-medium text-gray-600">Hamshiralar</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-2xl text-blue-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients.toLocaleString()}</p>
                <p className="text-sm font-medium text-gray-600">Bemorlar</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-hotel-bed-line text-2xl text-blue-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalRooms}</p>
                <p className="text-sm font-medium text-gray-600">Xonalar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Yangi Bemor qo'shish va Eski Bemorlar */}
          <div className="lg:col-span-1 space-y-6">
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Yangi Bemor qo'shish
            </button>
            
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Eski Bemorlar</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {oldPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-500">Yosh: {patient.age}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Talibly Kartasi</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">15.04.2024</span>
                    <span className="text-gray-900">Glukoza</span>
                    <span className="text-gray-900">7.2 mmol/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">12.04.2024</span>
                    <span className="text-gray-900">Hipertoniya</span>
                    <span className="text-blue-600">PDF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">12.03.2023</span>
                    <span className="text-gray-900">Gastrit</span>
                    <span className="text-gray-900">13.5 g/dL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tibbly Kartasi */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Tibbly Kartasi</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-gray-900">Anvar Karimov</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">F.I.Sh:</span>
                      <span className="text-gray-900">15.03.1379 Erkak</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Telefon:</span>
                      <span className="text-gray-900">+990 90 123-45-67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Manzil:</span>
                      <span className="text-gray-900">Toshkent sh.. Olmazor tuman. kaxziliklar xaqida batatsll...</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-semibold text-gray-900">Tashxis: Qandli diabet</p>
                    <p className="text-gray-700">Mudlaja: Metformin 500 ng. kuniga 2 marta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kasallik Tarixi */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Kasallik Tarixi</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {medicalHistory.map((history, index) => (
                    <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{history.date}</p>
                        <p className="text-sm text-gray-600">{history.diagnosis}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{history.doctor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tahill nattijalari */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Tahill nattijalari</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sana</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tashxis</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Shifokor</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Shifokor</th>
                  </tr>
                </thead>
                <tbody>
                  {labResults.map((result, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900">{result.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{result.diagnosis}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{result.doctor}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{result.doctor2}</td>
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
