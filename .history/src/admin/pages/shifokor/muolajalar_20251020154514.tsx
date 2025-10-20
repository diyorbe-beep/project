import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';

export default function ShifokorMuolajalar() {
  const [treatments] = useState([
    {
      id: 1,
      patient_name: 'Alisher Karimov',
      treatment_name: 'Kardiologiya muolajasi',
      duration: '30 daqiqa',
      date: '2024-01-15',
      time: '10:00',
      status: 'Tugallandi'
    },
    {
      id: 2,
      patient_name: 'Malika Toshmatova',
      treatment_name: 'Gastroskopiya',
      duration: '45 daqiqa',
      date: '2024-01-16',
      time: '14:30',
      status: 'Rejalashtirilgan'
    },
    {
      id: 3,
      patient_name: 'Javlon Nablyev',
      treatment_name: 'Qon tahlili',
      duration: '15 daqiqa',
      date: '2024-01-14',
      time: '09:15',
      status: 'Tugallandi'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    treatment_name: '',
    duration: '',
    date: '',
    time: '',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rejalashtirilgan':
        return 'bg-blue-100 text-blue-800';
      case 'Davom etmoqda':
        return 'bg-orange-100 text-orange-800';
      case 'Tugallandi':
        return 'bg-green-100 text-green-800';
      case 'Bekor qilindi':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddTreatment = () => {
    setIsModalOpen(true);
  };

  const handleSaveTreatment = () => {
    alert('Yangi muolaja qo\'shildi!');
    setIsModalOpen(false);
    setFormData({
      patient_name: '',
      treatment_name: '',
      duration: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Muolajalar</h1>
        <p className="text-sm sm:text-base text-gray-600">Bemorlarning muolajalari va davolanish jarayoni</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-medicine-bottle-line text-lg sm:text-2xl text-blue-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">{treatments.length}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami muolaja</p>
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
                {treatments.filter(t => t.status === 'Tugallandi').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Tugallangan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-lg sm:text-2xl text-orange-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {treatments.filter(t => t.status === 'Rejalashtirilgan').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Rejalashtirilgan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-line text-lg sm:text-2xl text-purple-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">3</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Bugun rejalashtirilgan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Muolajalar ro'yxati */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Muolajalar ro'yxati</h2>
            <Button onClick={handleAddTreatment} className="whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Yangi muolaja
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Muolaja</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Davomiyligi</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana va vaqt</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {treatments.map((treatment) => (
                <tr key={treatment.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 text-sm sm:text-base"></i>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {treatment.patient_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{treatment.treatment_name}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{treatment.duration}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{treatment.date}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{treatment.time}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(treatment.status)}`}>
                      {treatment.status}
                    </span>
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

      {/* Bugungi jadval */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Bugungi muolajalar jadvali</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {treatments.filter(t => t.status === 'Rejalashtirilgan').map((treatment) => (
              <div key={treatment.id} className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-900">{treatment.patient_name}</h4>
                  <span className="text-xs text-blue-600">{treatment.time}</span>
                </div>
                <p className="text-sm text-blue-700">{treatment.treatment_name}</p>
                <p className="text-xs text-blue-600 mt-1">Davomiyligi: {treatment.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yangi muolaja modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi muolaja qo'shish"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bemor ismi</label>
              <Input
                value={formData.patient_name}
                onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                placeholder="Bemor ismini kiriting"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Muolaja nomi</label>
              <Input
                value={formData.treatment_name}
                onChange={(e) => setFormData({ ...formData, treatment_name: e.target.value })}
                placeholder="Muolaja nomini kiriting"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Davomiyligi</label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Masalan: 30 daqiqa"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sana</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vaqt</label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
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
            <Button onClick={handleSaveTreatment}>
              <i className="ri-save-line mr-2"></i>
              Saqlash
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
