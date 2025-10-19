
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { nursesData } from '../../mocks/patients';

export default function HamshiralarPage() {
  const [nurses, setNurses] = useState(nursesData);
  const [selectedNurse, setSelectedNurse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    fio: '',
    telefon: '',
    smena_boshlanish: '',
    smena_tugash: '',
    aktiv: true
  });

  const filteredNurses = nurses.filter(nurse =>
    nurse.fio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nurse.telefon.includes(searchTerm)
  );

  const openModal = (nurse?: any) => {
    if (nurse) {
      setSelectedNurse(nurse);
      setFormData({
        fio: nurse.fio,
        telefon: nurse.telefon,
        smena_boshlanish: nurse.smena_boshlanish,
        smena_tugash: nurse.smena_tugash,
        aktiv: nurse.aktiv
      });
    } else {
      setSelectedNurse(null);
      setFormData({
        fio: '',
        telefon: '',
        smena_boshlanish: '',
        smena_tugash: '',
        aktiv: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedNurse) {
      // Tahrirlash
      setNurses(nurses.map(nurse => 
        nurse.id === selectedNurse.id 
          ? { ...nurse, ...formData }
          : nurse
      ));
    } else {
      // Yangi qo'shish
      const newNurse = {
        id: Math.max(...nurses.map(n => n.id)) + 1,
        ...formData
      };
      setNurses([...nurses, newNurse]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Hamshirani o\'chirmoqchimisiz?')) {
      setNurses(nurses.filter(nurse => nurse.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setNurses(nurses.map(nurse => 
      nurse.id === id 
        ? { ...nurse, aktiv: !nurse.aktiv }
        : nurse
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Hamshiralar" subtitle="Hamshiralar ro'yxati va ularni boshqarish" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Hamshira qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  Jami hamshiralar: {filteredNurses.length}
                </div>
                <Button onClick={() => openModal()} className="whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Yangi hamshira qo'shish
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hamshira
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Smena vaqti
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
                {filteredNurses.map((nurse) => (
                  <tr key={nurse.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <i className="ri-nurse-line text-pink-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {nurse.fio}
                          </div>
                          <div className="text-sm text-gray-500">ID: {nurse.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{nurse.telefon}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {nurse.smena_boshlanish} - {nurse.smena_tugash}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(nurse.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap ${
                          nurse.aktiv 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {nurse.aktiv ? 'Faol' : 'Nofaol'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openModal(nurse)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer whitespace-nowrap"
                          title="Tahrirlash"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(nurse.id)}
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
        title={selectedNurse ? 'Hamshirani tahrirlash' : 'Yangi hamshira qo\'shish'}
      >
        <div className="space-y-4">
          <Input
            label="F.I.Sh"
            value={formData.fio}
            onChange={(e) => setFormData({ ...formData, fio: e.target.value })}
            placeholder="To'liq ism familiyani kiriting"
            required
          />

          <Input
            label="Telefon"
            value={formData.telefon}
            onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
            placeholder="+998901234567"
            required
          />

          <Input
            label="Smena boshlanish vaqti"
            type="time"
            value={formData.smena_boshlanish}
            onChange={(e) => setFormData({ ...formData, smena_boshlanish: e.target.value })}
            required
          />

          <Input
            label="Smena tugash vaqti"
            type="time"
            value={formData.smena_tugash}
            onChange={(e) => setFormData({ ...formData, smena_tugash: e.target.value })}
            required
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="aktiv"
              checked={formData.aktiv}
              onChange={(e) => setFormData({ ...formData, aktiv: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="aktiv" className="ml-2 block text-sm text-gray-900">
              Faol hamshira
            </label>
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
