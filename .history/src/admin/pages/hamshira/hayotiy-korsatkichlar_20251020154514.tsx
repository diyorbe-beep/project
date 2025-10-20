import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';

export default function HayotiyKorsatkichlar() {
  const [vitals] = useState([
    {
      id: 1,
      patient_name: 'Alisher Karimov',
      temperature: '36.5°C',
      blood_pressure: '120/80 mmHg',
      heart_rate: '72 bpm',
      oxygen_saturation: '98%',
      weight: '75 kg',
      height: '175 cm',
      time: '08:00',
      date: '2024-01-15',
      nurse: 'Gulnora Abdullayeva'
    },
    {
      id: 2,
      patient_name: 'Malika Toshmatova',
      temperature: '37.2°C',
      blood_pressure: '110/70 mmHg',
      heart_rate: '68 bpm',
      oxygen_saturation: '99%',
      weight: '65 kg',
      height: '165 cm',
      time: '10:30',
      date: '2024-01-15',
      nurse: 'Gulnora Abdullayeva'
    },
    {
      id: 3,
      patient_name: 'Javlon Nablyev',
      temperature: '36.8°C',
      blood_pressure: '140/90 mmHg',
      heart_rate: '85 bpm',
      oxygen_saturation: '96%',
      weight: '80 kg',
      height: '180 cm',
      time: '12:00',
      date: '2024-01-15',
      nurse: 'Gulnora Abdullayeva'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [formData, setFormData] = useState({
    temperature: '',
    blood_pressure: '',
    heart_rate: '',
    oxygen_saturation: '',
    weight: '',
    height: '',
    notes: ''
  });

  const getVitalStatus = (value: string, type: string) => {
    if (type === 'temperature') {
      const temp = parseFloat(value);
      if (temp < 36.1 || temp > 37.2) return 'warning';
      return 'normal';
    }
    if (type === 'blood_pressure') {
      const bp = value.split('/');
      const systolic = parseInt(bp[0]);
      const diastolic = parseInt(bp[1]);
      if (systolic > 140 || diastolic > 90) return 'warning';
      return 'normal';
    }
    if (type === 'heart_rate') {
      const hr = parseInt(value);
      if (hr < 60 || hr > 100) return 'warning';
      return 'normal';
    }
    if (type === 'oxygen_saturation') {
      const oxygen = parseInt(value);
      if (oxygen < 95) return 'warning';
      return 'normal';
    }
    return 'normal';
  };

  const handleAddVitals = () => {
    setIsModalOpen(true);
  };

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
    setFormData({
      temperature: '',
      blood_pressure: '',
      heart_rate: '',
      oxygen_saturation: '',
      weight: '',
      height: '',
      notes: ''
    });
  };

  const handleSaveVitals = () => {
    alert('Hayotiy ko\'rsatkichlar saqlandi!');
    setIsModalOpen(false);
    setSelectedPatient(null);
    setFormData({
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
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Hayotiy ko'rsatkichlar</h1>
        <p className="text-sm sm:text-base text-gray-600">Bemorlarning hayotiy ko'rsatkichlarini yozish va kuzatish</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-heart-pulse-line text-lg sm:text-2xl text-blue-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">{vitals.length}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Bugun yozilgan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-lg sm:text-2xl text-green-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {vitals.filter(v => getVitalStatus(v.temperature, 'temperature') === 'normal').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Normal ko'rsatkich</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-alert-line text-lg sm:text-2xl text-yellow-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {vitals.filter(v => getVitalStatus(v.temperature, 'temperature') === 'warning').length}
              </p>
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

      {/* Hayotiy ko'rsatkichlar ro'yxati */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Hayotiy ko'rsatkichlar ro'yxati</h2>
            <Button onClick={handleAddVitals} className="whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Yangi ko'rsatkich yozish
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harorat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qon bosimi</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yurak urishi</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kislorod</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaqt</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitals.map((vital) => (
                <tr key={vital.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-pink-600 text-sm sm:text-base"></i>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {vital.patient_name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">{vital.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      getVitalStatus(vital.temperature, 'temperature') === 'normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vital.temperature}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      getVitalStatus(vital.blood_pressure, 'blood_pressure') === 'normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vital.blood_pressure}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      getVitalStatus(vital.heart_rate, 'heart_rate') === 'normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vital.heart_rate}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      getVitalStatus(vital.oxygen_saturation, 'oxygen_saturation') === 'normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vital.oxygen_saturation}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{vital.time}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <Button size="sm" variant="secondary">
                        <i className="ri-eye-line mr-1"></i>
                        Ko'rish
                      </Button>
                      <Button size="sm" variant="secondary">
                        <i className="ri-edit-line mr-1"></i>
                        Tahrirlash
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Og'ir holatdagi bemorlar */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Og'ir holatdagi bemorlar</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {vitals.filter(v => getVitalStatus(v.temperature, 'temperature') === 'warning').map((vital) => (
              <div key={vital.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-red-600 text-sm"></i>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-red-900">{vital.patient_name}</p>
                    <p className="text-sm text-red-700">
                      Harorat: {vital.temperature} | Qon bosimi: {vital.blood_pressure}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    Og'ir holat
                  </span>
                  <p className="text-xs text-red-600 mt-1">{vital.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yangi ko'rsatkich yozish modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi hayotiy ko'rsatkich yozish"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bemorni tanlang</label>
            <select
              onChange={(e) => handlePatientSelect({ id: e.target.value, name: e.target.selectedOptions[0].text })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Bemorni tanlang</option>
              <option value="1">Alisher Karimov</option>
              <option value="2">Malika Toshmatova</option>
              <option value="3">Javlon Nablyev</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tana harorati (°C)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                placeholder="36.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qon bosimi (mmHg)</label>
              <Input
                value={formData.blood_pressure}
                onChange={(e) => setFormData({ ...formData, blood_pressure: e.target.value })}
                placeholder="120/80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yurak urishi (bpm)</label>
              <Input
                type="number"
                value={formData.heart_rate}
                onChange={(e) => setFormData({ ...formData, heart_rate: e.target.value })}
                placeholder="72"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kislorod to'yinishi (%)</label>
              <Input
                type="number"
                value={formData.oxygen_saturation}
                onChange={(e) => setFormData({ ...formData, oxygen_saturation: e.target.value })}
                placeholder="98"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vazn (kg)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="70.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bo'y (cm)</label>
              <Input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="175"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qo'shimcha izohlar</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
