import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { patientsData } from '../../mocks/patients';

export default function ShifokorPanelPage() {
  const [patients, setPatients] = useState(patientsData);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    tashxis_nomi: '',
    icd_kodi: '',
    tavsif: '',
    dori_nomi: '',
    doza: '',
    qabul_vaqti: 'ertalab',
    davomiylik_kun: '',
    xona_id: '',
    hamshira_id: '',
    test_nomi: '',
    izoh: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.ism.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.familiya.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (type: string, patient: any) => {
    setSelectedPatient(patient);
    setModalType(type);
    setFormData({
      tashxis_nomi: '',
      icd_kodi: '',
      tavsif: '',
      dori_nomi: '',
      doza: '',
      qabul_vaqti: 'ertalab',
      davomiylik_kun: '',
      xona_id: '',
      hamshira_id: '',
      test_nomi: '',
      izoh: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log('Saqlandi:', modalType, formData);
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'tashxis':
        return (
          <div className="space-y-4">
            <Input
              label="Tashxis nomi"
              value={formData.tashxis_nomi}
              onChange={(e) => setFormData({ ...formData, tashxis_nomi: e.target.value })}
              placeholder="Tashxis nomini kiriting"
            />
            <Input
              label="ICD kodi"
              value={formData.icd_kodi}
              onChange={(e) => setFormData({ ...formData, icd_kodi: e.target.value })}
              placeholder="ICD kodini kiriting"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
              <textarea
                value={formData.tavsif}
                onChange={(e) => setFormData({ ...formData, tavsif: e.target.value })}
                placeholder="Tashxis tavsifini kiriting"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>
        );
      case 'muolaja':
        return (
          <div className="space-y-4">
            <Input
              label="Dori nomi"
              value={formData.dori_nomi}
              onChange={(e) => setFormData({ ...formData, dori_nomi: e.target.value })}
              placeholder="Dori nomini kiriting"
            />
            <Input
              label="Doza"
              value={formData.doza}
              onChange={(e) => setFormData({ ...formData, doza: e.target.value })}
              placeholder="Dozani kiriting (masalan: 1 tabletka)"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qabul vaqti</label>
              <select
                value={formData.qabul_vaqti}
                onChange={(e) => setFormData({ ...formData, qabul_vaqti: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="ertalab">Ertalab</option>
                <option value="tush">Tush</option>
                <option value="kech">Kech</option>
                <option value="ertalab-kech">Ertalab va kech</option>
              </select>
            </div>
            <Input
              label="Davomiylik (kun)"
              type="number"
              value={formData.davomiylik_kun}
              onChange={(e) => setFormData({ ...formData, davomiylik_kun: e.target.value })}
              placeholder="Necha kun davom etishi"
            />
          </div>
        );
      case 'xona':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xona tanlash</label>
              <select
                value={formData.xona_id}
                onChange={(e) => setFormData({ ...formData, xona_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="">Xonani tanlang</option>
                <option value="101">101 - Oddiy palata (bo'sh)</option>
                <option value="201">201 - VIP xona (bo'sh)</option>
                <option value="301">301 - Muolaja xonasi (bo'sh)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Izoh</label>
              <textarea
                value={formData.izoh}
                onChange={(e) => setFormData({ ...formData, izoh: e.target.value })}
                placeholder="Qo'shimcha izoh"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        );
      case 'hamshira':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hamshira tanlash</label>
              <select
                value={formData.hamshira_id}
                onChange={(e) => setFormData({ ...formData, hamshira_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="">Hamshirani tanlang</option>
                <option value="1">Gulnora Karimova - Ertalab smena</option>
                <option value="2">Malika Toshmatova - Kech smena</option>
                <option value="3">Nodira Aliyeva - Tun smena</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vazifa</label>
              <textarea
                value={formData.izoh}
                onChange={(e) => setFormData({ ...formData, izoh: e.target.value })}
                placeholder="Hamshira uchun vazifa va ko'rsatmalar"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        );
      case 'tahlil':
        return (
          <div className="space-y-4">
            <Input
              label="Tahlil nomi"
              value={formData.test_nomi}
              onChange={(e) => setFormData({ ...formData, test_nomi: e.target.value })}
              placeholder="Tahlil nomini kiriting"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fayl yuklash</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Izoh</label>
              <textarea
                value={formData.izoh}
                onChange={(e) => setFormData({ ...formData, izoh: e.target.value })}
                placeholder="Tahlil haqida izoh"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'tashxis': return 'Tashxis qo\'yish';
      case 'muolaja': return 'Muolaja belgilash';
      case 'xona': return 'Xona tayinlash';
      case 'hamshira': return 'Hamshira biriktirish';
      case 'tahlil': return 'Tahlil yuklash';
      default: return '';
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Bemor qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="text-sm text-gray-600">
              Jami bemorlar: {filteredPatients.length}
            </div>
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
                  Yosh/Jins
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  So'nggi tashxis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-green-600"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.ism} {patient.familiya}
                        </div>
                        <div className="text-sm text-gray-500">ID: {patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.yosh} yosh</div>
                    <div className="text-sm text-gray-500">{patient.jins}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.telefon}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.so_nggi_tashxis || 'Yo\'q'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => openModal('tashxis', patient)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="Tashxis qo'yish"
                      >
                        <i className="ri-stethoscope-line"></i>
                      </button>
                      <button
                        onClick={() => openModal('muolaja', patient)}
                        className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                        title="Muolaja belgilash"
                      >
                        <i className="ri-capsule-line"></i>
                      </button>
                      <button
                        onClick={() => openModal('xona', patient)}
                        className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer"
                        title="Xona tayinlash"
                      >
                        <i className="ri-hotel-bed-line"></i>
                      </button>
                      <button
                        onClick={() => openModal('hamshira', patient)}
                        className="w-8 h-8 flex items-center justify-center text-pink-600 hover:bg-pink-50 rounded-lg cursor-pointer"
                        title="Hamshira biriktirish"
                      >
                        <i className="ri-nurse-line"></i>
                      </button>
                      <button
                        onClick={() => openModal('tahlil', patient)}
                        className="w-8 h-8 flex items-center justify-center text-orange-600 hover:bg-orange-50 rounded-lg cursor-pointer"
                        title="Tahlil yuklash"
                      >
                        <i className="ri-file-upload-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={getModalTitle()}
      >
        <div className="space-y-4">
          {selectedPatient && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900">
                Bemor: {selectedPatient.ism} {selectedPatient.familiya}
              </h4>
              <p className="text-sm text-gray-600">
                {selectedPatient.yosh} yosh, {selectedPatient.jins}
              </p>
            </div>
          )}
          
          {renderModalContent()}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Bekor qilish
            </Button>
            <Button onClick={handleSave}>
              Saqlash
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
