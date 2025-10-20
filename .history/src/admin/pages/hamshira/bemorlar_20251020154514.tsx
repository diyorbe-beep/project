import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { patientsData } from '../../mocks/patients';

export default function HamshiraBemorlar() {
  const [patients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vitals, setVitals] = useState({
    temperature: '',
    blood_pressure: '',
    heart_rate: '',
    oxygen_saturation: '',
    weight: '',
    height: '',
    notes: ''
  });

  const filteredPatients = patients.filter(patient =>
    `${patient.ism} ${patient.familiya}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.telefon.includes(searchTerm)
  );

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleSaveVitals = () => {
    alert('Hayotiy ko\'rsatkichlar saqlandi!');
    setIsModalOpen(false);
    setVitals({
      temperature: '',
      blood_pressure: '',
      heart_rate: '',
      oxygen_saturation: '',
      weight: '',
      height: '',
      notes: ''
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Bemorlar</h1>
        <p className="text-sm sm:text-base text-gray-600">Bemorlarni ko'rish va hayotiy ko'rsatkichlarni yozish</p>
      </div>

      {/* Qidiruv */}
      <div className="mb-6">
        <div className="max-w-md">
          <Input
            type="text"
            placeholder="Bemor qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-lg sm:text-2xl text-blue-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">{patients.length}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami bemorlar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-heart-pulse-line text-lg sm:text-2xl text-green-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">18</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Bugun yozilgan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-alert-line text-lg sm:text-2xl text-orange-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">3</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Og'ir holat</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-lg sm:text-2xl text-purple-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">12</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilayotgan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bemorlar ro'yxati */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Bemorlar ro'yxati</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yosh</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">So'nggi ko'rsatkich</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-pink-600 text-sm sm:text-base"></i>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {patient.ism} {patient.familiya}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">ID: {patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{patient.yosh} yosh</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{patient.telefon}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">36.5°C</div>
                    <div className="text-xs text-gray-500">120/80</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Barqaror
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handlePatientClick(patient)}
                        className="text-xs sm:text-sm"
                      >
                        <i className="ri-heart-pulse-line mr-1"></i>
                        Ko'rsatkichlar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hayotiy ko'rsatkichlar modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${selectedPatient?.ism} ${selectedPatient?.familiya} - Hayotiy ko'rsatkichlar`}
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Bemor ma'lumotlari</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Yosh:</span>
                <span className="ml-2 font-medium">{selectedPatient?.yosh} yosh</span>
              </div>
              <div>
                <span className="text-gray-600">Telefon:</span>
                <span className="ml-2 font-medium">{selectedPatient?.telefon}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tana harorati (°C)</label>
              <Input
                type="number"
                step="0.1"
                value={vitals.temperature}
                onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                placeholder="36.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qon bosimi (mmHg)</label>
              <Input
                value={vitals.blood_pressure}
                onChange={(e) => setVitals({ ...vitals, blood_pressure: e.target.value })}
                placeholder="120/80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yurak urishi (bpm)</label>
              <Input
                type="number"
                value={vitals.heart_rate}
                onChange={(e) => setVitals({ ...vitals, heart_rate: e.target.value })}
                placeholder="72"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kislorod to'yinishi (%)</label>
              <Input
                type="number"
                value={vitals.oxygen_saturation}
                onChange={(e) => setVitals({ ...vitals, oxygen_saturation: e.target.value })}
                placeholder="98"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vazn (kg)</label>
              <Input
                type="number"
                step="0.1"
                value={vitals.weight}
                onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                placeholder="70.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bo'y (cm)</label>
              <Input
                type="number"
                value={vitals.height}
                onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                placeholder="175"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qo'shimcha izohlar</label>
            <textarea
              value={vitals.notes}
              onChange={(e) => setVitals({ ...vitals, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Qo'shimcha izohlarni kiriting..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Bekor qilish
            </Button>
            <Button onClick={handleSaveVitals}>
              <i className="ri-save-line mr-2"></i>
              Saqlash
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
