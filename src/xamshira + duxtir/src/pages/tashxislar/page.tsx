
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { diagnosesData, patientsData } from '../../mocks/patients';

export default function TashxislarPage() {
  const [diagnoses, setDiagnoses] = useState(diagnosesData);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    patient_id: '',
    tashxis_nomi: '',
    icd_kodi: '',
    tavsif: '',
    sana: new Date().toISOString().split('T')[0]
  });

  const filteredDiagnoses = diagnoses.filter(diagnosis => {
    const patient = patientsData.find(p => p.id === diagnosis.patient_id);
    return patient && (
      patient.ism.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.familiya.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnosis.tashxis_nomi.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const openModal = (diagnosis?: any) => {
    if (diagnosis) {
      setSelectedDiagnosis(diagnosis);
      setFormData({
        patient_id: diagnosis.patient_id.toString(),
        tashxis_nomi: diagnosis.tashxis_nomi,
        icd_kodi: diagnosis.icd_kodi,
        tavsif: diagnosis.tavsif,
        sana: diagnosis.sana
      });
    } else {
      setSelectedDiagnosis(null);
      setFormData({
        patient_id: '',
        tashxis_nomi: '',
        icd_kodi: '',
        tavsif: '',
        sana: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedDiagnosis) {
      // Tahrirlash
      setDiagnoses(diagnoses.map(d => 
        d.id === selectedDiagnosis.id 
          ? { ...d, ...formData, patient_id: parseInt(formData.patient_id) }
          : d
      ));
    } else {
      // Yangi qo'shish
      const newDiagnosis = {
        id: Math.max(...diagnoses.map(d => d.id)) + 1,
        doctor_id: 1,
        ...formData,
        patient_id: parseInt(formData.patient_id)
      };
      setDiagnoses([...diagnoses, newDiagnosis]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tashxisni o\'chirmoqchimisiz?')) {
      setDiagnoses(diagnoses.filter(d => d.id !== id));
    }
  };

  const getPatientName = (patientId: number) => {
    const patient = patientsData.find(p => p.id === patientId);
    return patient ? `${patient.ism} ${patient.familiya}` : 'Noma\'lum';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Tashxislar" subtitle="Bemorlar uchun qo'yilgan tashxislar ro'yxati" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Tashxis yoki bemor qidirish..."
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
                Yangi tashxis qo'shish
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
                    Tashxis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ICD kodi
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
                {filteredDiagnoses.map((diagnosis) => (
                  <tr key={diagnosis.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-blue-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {getPatientName(diagnosis.patient_id)}
                          </div>
                          <div className="text-sm text-gray-500">ID: {diagnosis.patient_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{diagnosis.tashxis_nomi}</div>
                      <div className="text-sm text-gray-500">{diagnosis.tavsif}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {diagnosis.icd_kodi}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{diagnosis.sana}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openModal(diagnosis)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer whitespace-nowrap"
                          title="Tahrirlash"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(diagnosis.id)}
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
        title={selectedDiagnosis ? 'Tashxisni tahrirlash' : 'Yangi tashxis qo\'shish'}
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
            label="Tashxis nomi"
            value={formData.tashxis_nomi}
            onChange={(e) => setFormData({ ...formData, tashxis_nomi: e.target.value })}
            placeholder="Tashxis nomini kiriting"
            required
          />

          <Input
            label="ICD kodi"
            value={formData.icd_kodi}
            onChange={(e) => setFormData({ ...formData, icd_kodi: e.target.value })}
            placeholder="ICD kodini kiriting"
            required
          />

          <Input
            label="Sana"
            type="date"
            value={formData.sana}
            onChange={(e) => setFormData({ ...formData, sana: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
            <textarea
              value={formData.tavsif}
              onChange={(e) => setFormData({ ...formData, tavsif: e.target.value })}
              placeholder="Tashxis tavsifini kiriting"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
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
