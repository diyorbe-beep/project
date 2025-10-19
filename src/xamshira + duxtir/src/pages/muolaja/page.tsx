
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { treatmentPlansData, treatmentItemsData, patientsData } from '../../mocks/patients';

export default function MuolajaPage() {
  const [treatmentItems, setTreatmentItems] = useState(treatmentItemsData);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    plan_id: '',
    dori_nomi: '',
    doza: '',
    qabul_vaqti: 'ertalab',
    davomiylik_kun: '',
    izoh: '',
    status: 'rejalashtirilgan'
  });

  const filteredItems = treatmentItems.filter(item => {
    const plan = treatmentPlansData.find(p => p.id === item.plan_id);
    const patient = plan ? patientsData.find(p => p.id === plan.patient_id) : null;
    return (
      item.dori_nomi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient && (patient.ism.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   patient.familiya.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  const openModal = (item?: any) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        plan_id: item.plan_id.toString(),
        dori_nomi: item.dori_nomi,
        doza: item.doza,
        qabul_vaqti: item.qabul_vaqti,
        davomiylik_kun: item.davomiylik_kun.toString(),
        izoh: item.izoh,
        status: item.status
      });
    } else {
      setSelectedItem(null);
      setFormData({
        plan_id: '',
        dori_nomi: '',
        doza: '',
        qabul_vaqti: 'ertalab',
        davomiylik_kun: '',
        izoh: '',
        status: 'rejalashtirilgan'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedItem) {
      // Tahrirlash
      setTreatmentItems(treatmentItems.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              ...formData, 
              plan_id: parseInt(formData.plan_id),
              davomiylik_kun: parseInt(formData.davomiylik_kun)
            }
          : item
      ));
    } else {
      // Yangi qo'shish
      const newItem = {
        id: Math.max(...treatmentItems.map(item => item.id)) + 1,
        ...formData,
        plan_id: parseInt(formData.plan_id),
        davomiylik_kun: parseInt(formData.davomiylik_kun)
      };
      setTreatmentItems([...treatmentItems, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Muolaja elementini o\'chirmoqchimisiz?')) {
      setTreatmentItems(treatmentItems.filter(item => item.id !== id));
    }
  };

  const getPatientName = (planId: number) => {
    const plan = treatmentPlansData.find(p => p.id === planId);
    if (!plan) return 'Noma\'lum';
    const patient = patientsData.find(p => p.id === plan.patient_id);
    return patient ? `${patient.ism} ${patient.familiya}` : 'Noma\'lum';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rejalashtirilgan':
        return 'bg-yellow-100 text-yellow-800';
      case 'berildi':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'rejalashtirilgan':
        return 'Rejalashtirilgan';
      case 'berildi':
        return 'Berildi';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Muolaja" subtitle="Bemorlar uchun belgilangan muolaja rejasi" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Dori yoki bemor qidirish..."
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
                Dori qo'shish
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
                    Dori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doza
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qabul vaqti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Davomiylik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-blue-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {getPatientName(item.plan_id)}
                          </div>
                          <div className="text-sm text-gray-500">Plan ID: {item.plan_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.dori_nomi}</div>
                      <div className="text-sm text-gray-500">{item.izoh}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.doza}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{item.qabul_vaqti}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.davomiylik_kun} kun</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openModal(item)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer whitespace-nowrap"
                          title="Tahrirlash"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
        title={selectedItem ? 'Muolajani tahrirlash' : 'Yangi dori qo\'shish'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Muolaja rejasi</label>
            <div className="relative">
              <select
                value={formData.plan_id}
                onChange={(e) => setFormData({ ...formData, plan_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                required
              >
                <option value="">Muolaja rejasini tanlang</option>
                {treatmentPlansData.map(plan => {
                  const patient = patientsData.find(p => p.id === plan.patient_id);
                  return (
                    <option key={plan.id} value={plan.id}>
                      {patient ? `${patient.ism} ${patient.familiya}` : 'Noma\'lum'} - {plan.boshlanish_sana}
                    </option>
                  );
                })}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <Input
            label="Dori nomi"
            value={formData.dori_nomi}
            onChange={(e) => setFormData({ ...formData, dori_nomi: e.target.value })}
            placeholder="Dori nomini kiriting"
            required
          />

          <Input
            label="Doza"
            value={formData.doza}
            onChange={(e) => setFormData({ ...formData, doza: e.target.value })}
            placeholder="Dozani kiriting (masalan: 1 tabletka)"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qabul vaqti</label>
            <div className="relative">
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <Input
            label="Davomiylik (kun)"
            type="number"
            value={formData.davomiylik_kun}
            onChange={(e) => setFormData({ ...formData, davomiylik_kun: e.target.value })}
            placeholder="Necha kun davom etishi"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="rejalashtirilgan">Rejalashtirilgan</option>
                <option value="berildi">Berildi</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Izoh</label>
            <textarea
              value={formData.izoh}
              onChange={(e) => setFormData({ ...formData, izoh: e.target.value })}
              placeholder="Qo'shimcha izoh"
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
