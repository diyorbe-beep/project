import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { treatmentItemsData, patientsData } from '../../mocks/patients';

export default function MuolajaPage() {
  const [treatments] = useState(treatmentItemsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dori_nomi: '',
    doza: '',
    qabul_vaqti: 'ertalab',
    davomiylik_kun: '',
    izoh: ''
  });

  const handleNewTreatment = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Yangi muolaja:', formData);
    setIsModalOpen(false);
    setFormData({
      dori_nomi: '',
      doza: '',
      qabul_vaqti: 'ertalab',
      davomiylik_kun: '',
      izoh: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'berildi':
        return 'bg-green-100 text-green-800';
      case 'rejalashtirilgan':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeIcon = (time: string) => {
    switch (time) {
      case 'ertalab':
        return 'ri-sun-line';
      case 'tush':
        return 'ri-sun-fill';
      case 'kech':
        return 'ri-moon-line';
      default:
        return 'ri-time-line';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Muolaja" subtitle="Bemorlar muolaja rejalari" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Muolaja rejalari</h2>
              <Button icon="ri-add-line" onClick={handleNewTreatment}>
                Yangi muolaja belgilash
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatments.map((treatment) => (
                <div key={treatment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{treatment.dori_nomi}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(treatment.status)}`}>
                      {treatment.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <i className="ri-medicine-bottle-line mr-2"></i>
                      <span>Doza: {treatment.doza}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <i className={`${getTimeIcon(treatment.qabul_vaqti)} mr-2`}></i>
                      <span>Vaqt: {treatment.qabul_vaqti}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <i className="ri-calendar-line mr-2"></i>
                      <span>Davomiylik: {treatment.davomiylik_kun} kun</span>
                    </div>
                    
                    {treatment.izoh && (
                      <div className="flex items-start">
                        <i className="ri-information-line mr-2 mt-0.5"></i>
                        <span>{treatment.izoh}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="secondary" icon="ri-edit-line">
                      Tahrirlash
                    </Button>
                    {treatment.status === 'rejalashtirilgan' && (
                      <Button size="sm" variant="success" icon="ri-check-line">
                        Berildi
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi muolaja belgilash"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Dori nomi"
              value={formData.dori_nomi}
              onChange={(e) => setFormData({...formData, dori_nomi: e.target.value})}
              placeholder="Dori nomini kiriting"
              required
            />
            <Input
              label="Doza"
              value={formData.doza}
              onChange={(e) => setFormData({...formData, doza: e.target.value})}
              placeholder="Dozani kiriting (masalan: 500mg)"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qabul vaqti
              </label>
              <div className="relative">
                <select
                  value={formData.qabul_vaqti}
                  onChange={(e) => setFormData({...formData, qabul_vaqti: e.target.value})}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="ertalab">Ertalab</option>
                  <option value="tush">Tush</option>
                  <option value="kech">Kech</option>
                </select>
              </div>
            </div>
            
            <Input
              label="Davomiylik (kun)"
              type="number"
              value={formData.davomiylik_kun}
              onChange={(e) => setFormData({...formData, davomiylik_kun: e.target.value})}
              placeholder="Necha kun"
              min="1"
              required
            />
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