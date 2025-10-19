import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { diagnosesData, patientsData } from '../../mocks/patients';

export default function TashxislarPage() {
  const [diagnoses] = useState(diagnosesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [formData, setFormData] = useState({
    tashxis_nomi: '',
    icd_kodi: '',
    tavsif: '',
    sana: new Date().toISOString().split('T')[0]
  });

  const handleNewDiagnosis = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bu yerda tashxis saqlash logikasi bo'ladi
    console.log('Yangi tashxis:', formData);
    setIsModalOpen(false);
    setFormData({
      tashxis_nomi: '',
      icd_kodi: '',
      tavsif: '',
      sana: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Tashxislar" subtitle="Bemorlar tashxislari ro'yxati" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Tashxislar ro'yxati</h2>
              <Button icon="ri-add-line" onClick={handleNewDiagnosis}>
                Yangi tashxis qo'yish
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
                {diagnoses.map((diagnosis) => {
                  const patient = patientsData.find(p => p.id === diagnosis.patient_id);
                  return (
                    <tr key={diagnosis.id} className="hover:bg-gray-50">
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
                        <div className="text-sm font-medium text-gray-900">{diagnosis.tashxis_nomi}</div>
                        <div className="text-sm text-gray-500">{diagnosis.tavsif}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {diagnosis.icd_kodi}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {diagnosis.sana}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button size="sm" variant="secondary" icon="ri-edit-line">
                          Tahrirlash
                        </Button>
                        <Button size="sm" variant="success" icon="ri-capsule-line">
                          Muolaja
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
        title="Yangi tashxis qo'yish"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tashxis nomi"
              value={formData.tashxis_nomi}
              onChange={(e) => setFormData({...formData, tashxis_nomi: e.target.value})}
              placeholder="Tashxis nomini kiriting"
              required
            />
            <Input
              label="ICD kodi"
              value={formData.icd_kodi}
              onChange={(e) => setFormData({...formData, icd_kodi: e.target.value})}
              placeholder="ICD kodini kiriting"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tavsif
            </label>
            <textarea
              value={formData.tavsif}
              onChange={(e) => setFormData({...formData, tavsif: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Tashxis haqida batafsil ma'lumot"
              required
            />
          </div>
          
          <Input
            label="Sana"
            type="date"
            value={formData.sana}
            onChange={(e) => setFormData({...formData, sana: e.target.value})}
            required
          />

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