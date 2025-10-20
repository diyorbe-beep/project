import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';

export default function ShifokorTashxislar() {
  const [diagnoses] = useState([
    {
      id: 1,
      patient_name: 'Alisher Karimov',
      patient_age: 45,
      diagnosis: 'Hipertoniya',
      severity: 'O\'rtacha',
      date: '2024-01-15',
      status: 'Faol'
    },
    {
      id: 2,
      patient_name: 'Malika Toshmatova',
      patient_age: 32,
      diagnosis: 'Gastrit',
      severity: 'Yengil',
      date: '2024-01-14',
      status: 'Davolanishda'
    },
    {
      id: 3,
      patient_name: 'Javlon Nablyev',
      patient_age: 28,
      diagnosis: 'Qandli diabet',
      severity: 'Og\'ir',
      date: '2024-01-13',
      status: 'Faol'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    diagnosis: '',
    severity: 'Yengil',
    notes: ''
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Yengil':
        return 'bg-green-100 text-green-800';
      case 'O\'rtacha':
        return 'bg-yellow-100 text-yellow-800';
      case 'Og\'ir':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Faol':
        return 'bg-blue-100 text-blue-800';
      case 'Davolanishda':
        return 'bg-orange-100 text-orange-800';
      case 'Tugallangan':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddDiagnosis = () => {
    setIsModalOpen(true);
  };

  const handleSaveDiagnosis = () => {
    alert('Yangi tashxis qo\'shildi!');
    setIsModalOpen(false);
    setFormData({
      patient_name: '',
      diagnosis: '',
      severity: 'Yengil',
      notes: ''
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Tashxislar</h1>
        <p className="text-sm sm:text-base text-gray-600">Bemorlarning tashxislari va davolanish holati</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-microscope-line text-lg sm:text-2xl text-blue-600"></i>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">{diagnoses.length}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami tashxis</p>
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
                {diagnoses.filter(d => d.status === 'Tugallangan').length}
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
                {diagnoses.filter(d => d.status === 'Davolanishda').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Davolanishda</p>
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
                {diagnoses.filter(d => d.severity === 'Og\'ir').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Og\'ir holat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tashxislar ro'yxati */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Tashxislar ro'yxati</h2>
            <Button onClick={handleAddDiagnosis} className="whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Yangi tashxis
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tashxis</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Og'irlik</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {diagnoses.map((diagnosis) => (
                <tr key={diagnosis.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 text-sm sm:text-base"></i>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {diagnosis.patient_name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">{diagnosis.patient_age} yosh</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{diagnosis.diagnosis}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(diagnosis.severity)}`}>
                      {diagnosis.severity}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{diagnosis.date}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(diagnosis.status)}`}>
                      {diagnosis.status}
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

      {/* Yangi tashxis modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi tashxis qo'shish"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Tashxis</label>
            <Input
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              placeholder="Tashxisni kiriting"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Og'irlik darajasi</label>
            <select
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yengil">Yengil</option>
              <option value="O'rtacha">O'rtacha</option>
              <option value="Og'ir">Og'ir</option>
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
            <Button onClick={handleSaveDiagnosis}>
              <i className="ri-save-line mr-2"></i>
              Saqlash
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
