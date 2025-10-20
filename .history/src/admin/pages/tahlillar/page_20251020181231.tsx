import { useState, useEffect } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { labResultsData, patientsData } from '../../mocks/patients';

export default function TahlillarPage() {
  const [labResults, setLabResults] = useState(() => {
    const saved = localStorage.getItem('labResults');
    return saved ? JSON.parse(saved) : labResultsData;
  });

  useEffect(() => {
    localStorage.setItem('labResults', JSON.stringify(labResults));
  }, [labResults]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    test_nomi: '',
    natija_qiymati: '',
    birlik: '',
    status: 'Normal',
    izoh: ''
  });

  const handleNewTest = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Yangi tahlil:', formData);
    setIsModalOpen(false);
    setFormData({
      test_nomi: '',
      natija_qiymati: '',
      birlik: '',
      status: 'Normal',
      izoh: ''
    });
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'ri-check-line';
      case 'Yuqori':
        return 'ri-arrow-up-line';
      case 'Past':
        return 'ri-arrow-down-line';
      default:
        return 'ri-question-line';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Tahlillar" subtitle="Laboratoriya tahlillari natijalar" />
      
      <div className="p-4 sm:p-6">
        {/* Statistika */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-test-tube-line text-xl sm:text-2xl text-blue-600"></i>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Jami tahlillar</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{labResults.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Normal</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labResults.filter(result => result.status === 'Normal').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-arrow-up-line text-2xl text-red-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Yuqori</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labResults.filter(result => result.status === 'Yuqori').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-arrow-down-line text-2xl text-yellow-600"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Past</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labResults.filter(result => result.status === 'Past').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tahlillar ro'yxati */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Tahlillar ro'yxati</h2>
              <Button icon="ri-add-line" onClick={handleNewTest}>
                Yangi tahlil yuklash
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bemor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tahlil nomi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Natija
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {labResults.map((result) => {
                  const patient = patientsData.find(p => p.id === result.patient_id);
                  return (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="ri-user-line text-blue-600"></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient?.ism} {patient?.familiya}
                            </div>
                            <div className="text-sm text-gray-500">ID: {patient?.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{result.test_nomi}</div>
                        {result.izoh && (
                          <div className="text-sm text-gray-500">{result.izoh}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {result.natija_qiymati} {result.birlik}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                          <i className={`${getStatusIcon(result.status)} mr-1`}></i>
                          {result.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.sana}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button size="sm" variant="secondary" icon="ri-download-line">
                          Yuklab olish
                        </Button>
                        <Button size="sm" variant="secondary" icon="ri-edit-line">
                          Tahrirlash
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi tahlil natijasini yuklash"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tahlil nomi"
              value={formData.test_nomi}
              onChange={(e) => setFormData({...formData, test_nomi: e.target.value})}
              placeholder="Tahlil nomini kiriting"
              required
            />
            <Input
              label="Natija qiymati"
              value={formData.natija_qiymati}
              onChange={(e) => setFormData({...formData, natija_qiymati: e.target.value})}
              placeholder="Natija qiymatini kiriting"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Birlik"
              value={formData.birlik}
              onChange={(e) => setFormData({...formData, birlik: e.target.value})}
              placeholder="Birlikni kiriting (masalan: mg/L)"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Holat
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Normal">Normal</option>
                  <option value="Yuqori">Yuqori</option>
                  <option value="Past">Past</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Izoh
            </label>
            <textarea
              value={formData.izoh}
              onChange={(e) => setFormData({...formData, izoh: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Qo'shimcha izohlar"
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
            <p className="text-sm text-gray-600">Tahlil faylini yuklash uchun bosing yoki shu yerga tashlang</p>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (maksimal 10MB)</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" icon="ri-save-line">
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}