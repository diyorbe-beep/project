import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';

export default function DuxtirTolovlar() {
  const [payments] = useState([
    {
      id: 1,
      patient_name: 'Alisher Karimov',
      phone: '+998 90 123 45 67',
      service: 'Kardiologiya konsultatsiya',
      amount: 150000,
      payment_method: 'Naqd',
      date: '2024-01-15',
      time: '10:30',
      status: 'To\'langan'
    },
    {
      id: 2,
      patient_name: 'Malika Toshmatova',
      phone: '+998 91 234 56 78',
      service: 'Qon tahlili',
      amount: 80000,
      payment_method: 'Plastik karta',
      date: '2024-01-15',
      time: '11:45',
      status: 'To\'langan'
    },
    {
      id: 3,
      patient_name: 'Javlon Nablyev',
      phone: '+998 92 345 67 89',
      service: 'EKG + Konsultatsiya',
      amount: 200000,
      payment_method: 'Bank o\'tkazmasi',
      date: '2024-01-15',
      time: '14:20',
      status: 'Kutilmoqda'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    service: '',
    amount: '',
    payment_method: 'Naqd',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To\'langan':
        return 'bg-green-100 text-green-800';
      case 'Kutilmoqda':
        return 'bg-yellow-100 text-yellow-800';
      case 'Bekor qilindi':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Naqd':
        return 'ri-money-dollar-circle-line';
      case 'Plastik karta':
        return 'ri-bank-card-line';
      case 'Bank o\'tkazmasi':
        return 'ri-bank-line';
      default:
        return 'ri-money-dollar-circle-line';
    }
  };

  const handleNewPayment = () => {
    setIsModalOpen(true);
  };

  const handleSavePayment = () => {
    alert('Yangi to\'lov yaratildi!');
    setIsModalOpen(false);
    setFormData({
      patient_name: '',
      phone: '',
      service: '',
      amount: '',
      payment_method: 'Naqd',
      notes: ''
    });
  };

  const handleConfirmPayment = (id: number) => {
    alert(`To'lov ${id} tasdiqlandi!`);
  };

  const totalAmount = payments.filter(p => p.status === 'To\'langan').reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'Kutilmoqda').reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">To'lovlar boshqaruvi</h1>
        <p className="text-sm sm:text-base text-gray-600">Bemorlarning to'lovlarini boshqarish va hisobotlar</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-lg sm:text-2xl text-blue-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">{payments.length}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami to'lovlar</p>
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
                {payments.filter(p => p.status === 'To\'langan').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">To'langan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-lg sm:text-2xl text-yellow-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {payments.filter(p => p.status === 'Kutilmoqda').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilmoqda</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-bank-line text-lg sm:text-2xl text-purple-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {totalAmount.toLocaleString()} so'm
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami tushum</p>
            </div>
          </div>
        </div>
      </div>

      {/* To'lovlar ro'yxati */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">To'lovlar ro'yxati</h2>
            <Button onClick={handleNewPayment} className="whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Yangi to'lov
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xizmat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summa</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To'lov usuli</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana va vaqt</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 text-sm sm:text-base"></i>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {payment.patient_name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">{payment.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="text-xs sm:text-sm text-gray-900">{payment.service}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                      {payment.amount.toLocaleString()} so'm
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <i className={`${getPaymentMethodIcon(payment.payment_method)} text-gray-400 mr-2`}></i>
                      <span className="text-xs sm:text-sm text-gray-900">{payment.payment_method}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{payment.date}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{payment.time}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      {payment.status === 'Kutilmoqda' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleConfirmPayment(payment.id)}
                          className="text-xs sm:text-sm"
                        >
                          <i className="ri-check-line mr-1"></i>
                          Tasdiqlash
                        </Button>
                      )}
                      <Button size="sm" variant="secondary">
                        <i className="ri-eye-line mr-1"></i>
                        Ko'rish
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kunlik hisobot */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Bugungi hisobot</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <i className="ri-check-line text-green-600 text-xl mr-3"></i>
                <div>
                  <p className="text-sm font-medium text-green-900">To'langan to'lovlar</p>
                  <p className="text-lg font-bold text-green-900">{totalAmount.toLocaleString()} so'm</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <i className="ri-time-line text-yellow-600 text-xl mr-3"></i>
                <div>
                  <p className="text-sm font-medium text-yellow-900">Kutilayotgan to'lovlar</p>
                  <p className="text-lg font-bold text-yellow-900">{pendingAmount.toLocaleString()} so'm</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <i className="ri-money-dollar-circle-line text-blue-600 text-xl mr-3"></i>
                <div>
                  <p className="text-sm font-medium text-blue-900">Jami tushum</p>
                  <p className="text-lg font-bold text-blue-900">{(totalAmount + pendingAmount).toLocaleString()} so'm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yangi to'lov modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi to'lov yaratish"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998 90 123 45 67"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xizmat turi</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Xizmat turini tanlang</option>
              <option value="Kardiologiya konsultatsiya">Kardiologiya konsultatsiya</option>
              <option value="Qon tahlili">Qon tahlili</option>
              <option value="EKG">EKG</option>
              <option value="Ultratovush">Ultratovush</option>
              <option value="Rentgen">Rentgen</option>
              <option value="Umumiy tekshiruv">Umumiy tekshiruv</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summa (so'm)</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="150000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To'lov usuli</label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Naqd">Naqd</option>
                <option value="Plastik karta">Plastik karta</option>
                <option value="Bank o'tkazmasi">Bank o'tkazmasi</option>
              </select>
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
            <Button onClick={handleSavePayment}>
              <i className="ri-save-line mr-2"></i>
              Saqlash
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
