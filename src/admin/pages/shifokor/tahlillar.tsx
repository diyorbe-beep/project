import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';

export default function ShifokorTahlillar() {
  const [labResults] = useState([
    {
      id: 1,
      patient_name: 'Alisher Karimov',
      test_name: 'Umumiy qon tahlili',
      result: '7.2 mmol/L',
      status: 'Normal',
      date: '2024-01-15',
      ordered_by: 'Dr. Kamila Rahimova'
    },
    {
      id: 2,
      patient_name: 'Malika Toshmatova',
      test_name: 'Biokimyoviy tahlil',
      result: '120/80 mmHg',
      status: 'Normal',
      date: '2024-01-14',
      ordered_by: 'Dr. Kamila Rahimova'
    },
    {
      id: 3,
      patient_name: 'Javlon Nablyev',
      test_name: 'Qand tahlili',
      result: '8.5 mmol/L',
      status: 'Yuqori',
      date: '2024-01-13',
      ordered_by: 'Dr. Kamila Rahimova'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    test_name: '',
    urgency: 'Oddiy',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Yuqori':
        return 'bg-red-100 text-red-800';
      case 'Past':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Shoshilinch':
        return 'bg-red-100 text-red-800';
      case 'Oddiy':
        return 'bg-blue-100 text-blue-800';
      case 'Kechiktirilgan':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOrderTest = () => {
    setIsModalOpen(true);
  };

  const handleSaveOrder = () => {
    alert('Tahlil buyurtmasi yuborildi!');
    setIsModalOpen(false);
    setFormData({
      patient_name: '',
      test_name: '',
      urgency: 'Oddiy',
      notes: ''
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Tahlillar</h1>
        <p className="text-sm sm:text-base text-gray-600">Bemorlarning laboratoriya tahlillari va natijalari</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-test-tube-line text-lg sm:text-2xl text-blue-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">{labResults.length}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami tahlillar</p>
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
                {labResults.filter(t => t.status === 'Normal').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Normal natijalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alert-line text-lg sm:text-2xl text-red-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {labResults.filter(t => t.status === 'Yuqori').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Og'ir natijalar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-lg sm:text-2xl text-orange-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">5</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilayotgan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tahlillar ro'yxati */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Tahlillar natijalari</h2>
            <Button onClick={handleOrderTest} className="whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Yangi tahlil buyurtmasi
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahlil nomi</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Natija</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {labResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 text-sm sm:text-base"></i>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {result.patient_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{result.test_name}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{result.result}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{result.date}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <Button size="sm" variant="secondary">
                        <i className="ri-eye-line mr-1"></i>
                        Ko'rish
                      </Button>
                      <Button size="sm" variant="secondary">
                        <i className="ri-download-line mr-1"></i>
                        Yuklab olish
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kutilayotgan tahlillar */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Kutilayotgan tahlillar</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {[
              { patient: 'Sardor Aliyev', test: 'EKG', urgency: 'Shoshilinch', date: 'Bugun 15:00' },
              { patient: 'Nilufar Karimova', test: 'Qon tahlili', urgency: 'Oddiy', date: 'Ertaga 10:00' },
              { patient: 'Bobur Toshmatov', test: 'Ultratovush', urgency: 'Oddiy', date: 'Ertaga 14:30' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-blue-600 text-sm"></i>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{item.patient}</p>
                    <p className="text-sm text-gray-500">{item.test}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(item.urgency)}`}>
                    {item.urgency}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yangi tahlil buyurtmasi modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi tahlil buyurtmasi"
      >
        <div className="space-y-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Tahlil nomi</label>
            <select
              value={formData.test_name}
              onChange={(e) => setFormData({ ...formData, test_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Tahlil turini tanlang</option>
              <option value="Umumiy qon tahlili">Umumiy qon tahlili</option>
              <option value="Biokimyoviy tahlil">Biokimyoviy tahlil</option>
              <option value="Qand tahlili">Qand tahlili</option>
              <option value="EKG">EKG</option>
              <option value="Ultratovush">Ultratovush</option>
              <option value="Rentgen">Rentgen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shoshilinch darajasi</label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Oddiy">Oddiy</option>
              <option value="Shoshilinch">Shoshilinch</option>
              <option value="Kechiktirilgan">Kechiktirilgan</option>
            </select>
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
            <Button onClick={handleSaveOrder}>
              <i className="ri-send-plane-line mr-2"></i>
              Buyurtmani yuborish
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
