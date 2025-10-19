
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { labResultsData, patientsData } from '../../mocks/patients';

export default function TahlillarPage() {
  const [labResults, setLabResults] = useState(labResultsData);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    patient_id: '',
    test_nomi: '',
    natija_qiymati: '',
    birlik: '',
    status: 'Normal',
    fayl_url: '',
    sana: new Date().toISOString().split('T')[0],
    izoh: ''
  });

  const filteredResults = labResults.filter(result => {
    const patient = patientsData.find(p => p.id === result.patient_id);
    return (
      result.test_nomi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient && (patient.ism.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   patient.familiya.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  const openModal = (result?: any) => {
    if (result) {
      setSelectedResult(result);
      setFormData({
        patient_id: result.patient_id.toString(),
        test_nomi: result.test_nomi,
        natija_qiymati: result.natija_qiymati,
        birlik: result.birlik,
        status: result.status,
        fayl_url: result.fayl_url,
        sana: result.sana,
        izoh: result.izoh
      });
    } else {
      setSelectedResult(null);
      setFormData({
        patient_id: '',
        test_nomi: '',
        natija_qiymati: '',
        birlik: '',
        status: 'Normal',
        fayl_url: '',
        sana: new Date().toISOString().split('T')[0],
        izoh: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedResult) {
      // Tahrirlash
      setLabResults(labResults.map(result => 
        result.id === selectedResult.id 
          ? { ...result, ...formData, patient_id: parseInt(formData.patient_id) }
          : result
      ));
    } else {
      // Yangi qo'shish
      const newResult = {
        id: Math.max(...labResults.map(r => r.id)) + 1,
        doctor_id: 1,
        ...formData,
        patient_id: parseInt(formData.patient_id)
      };
      setLabResults([...labResults, newResult]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tahlil natijasini o\'chirmoqchimisiz?')) {
      setLabResults(labResults.filter(result => result.id !== id));
    }
  };

  const getPatientName = (patientId: number) => {
    const patient = patientsData.find(p => p.id === patientId);
    return patient ? `${patient.ism} ${patient.familiya}` : 'Noma\'lum';
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

  return (
    <div className="min-h-screen bg-white">
      <Header title="Tahlillar" subtitle="Bemorlar uchun tahlil natijalari va fayllar" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Tahlil yoki bemor qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                </div>
              </div>
              <Button onClick={() => openModal()} className="whitespace-nowrap">
                <i className="ri-add-line mr-2"></i>
                Tahlil natijasini yuklash
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
                    Tahlil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Natija
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fayl
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-blue-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {getPatientName(result.patient_id)}
                          </div>
                          <div className="text-sm text-gray-500">ID: {result.patient_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{result.test_nomi}</div>
                      <div className="text-sm text-gray-500">{result.izoh}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {result.natija_qiymati} {result.birlik}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{result.sana}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.fayl_url ? (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap">
                          <i className="ri-file-download-line mr-1"></i>
                          Yuklash
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">Fayl yo'q</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openModal(result)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer whitespace-nowrap"
                          title="Tahrirlash"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(result.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer whitespace-nowrap"
                          title="O'chirish"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedResult ? 'Tahlil natijasini tahrirlash' : 'Tahlil natijasini yuklash'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bemor</label>
            <div className="relative">
              <select
                value={formData.patient_id}
                onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                required
              >
                <option value="">Bemorni tanlang</option>
                {patientsData.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.ism} {patient.familiya} - {patient.yosh} yosh
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <Input
            label="Tahlil nomi"
            value={formData.test_nomi}
            onChange={(e) => setFormData({ ...formData, test_nomi: e.target.value })}
            placeholder="Tahlil nomini kiriting"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Natija qiymati"
              value={formData.natija_qiymati}
              onChange={(e) => setFormData({ ...formData, natija_qiymati: e.target.value })}
              placeholder="Natija qiymatini kiriting"
              required
            />
            <Input
              label="Birlik"
              value={formData.birlik}
              onChange={(e) => setFormData({ ...formData, birlik: e.target.value })}
              placeholder="mmol/L, mg/dL, va h.k."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="Normal">Normal</option>
                <option value="Yuqori">Yuqori</option>
                <option value="Past">Past</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <Input
            label="Sana"
            type="date"
            value={formData.sana}
            onChange={(e) => setFormData({ ...formData, sana: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fayl yuklash</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG formatlarida fayl yuklash mumkin</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Izoh</label>
            <textarea
              value={formData.izoh}
              onChange={(e) => setFormData({ ...formData, izoh: e.target.value })}
              placeholder="Tahlil haqida qo'shimcha izoh"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="whitespace-nowrap"
            >
              Bekor qilish
            </Button>
            <Button onClick={handleSave} className="whitespace-nowrap">
              Saqlash
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
