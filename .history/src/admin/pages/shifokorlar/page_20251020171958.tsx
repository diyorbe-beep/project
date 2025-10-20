
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { doctorsData } from '../../mocks/doctors';

export default function ShifokorlarPage() {
  const [doctors, setDoctors] = useState(doctorsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    ism: '',
    mutaxassislik: '',
    telefon: '',
    email: '',
    login: '',
    parol: '',
    tajriba_yil: '',
    holat: 'faol'
  });

  const filteredDoctors = doctors.filter(doctor =>
    doctor.ism.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.mutaxassislik.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setFormData({
      ism: '',
      mutaxassislik: '',
      telefon: '',
      email: '',
      login: '',
      parol: '',
      tajriba_yil: '',
      holat: 'faol'
    });
    setIsModalOpen(true);
  };

  const handleEditDoctor = (doctor: any) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
    setIsModalOpen(true);
  };

  const handleSaveDoctor = () => {
    if (editingDoctor) {
      setDoctors(doctors.map(d => d.id === editingDoctor.id ? { ...formData, id: editingDoctor.id } : d));
    } else {
      const newDoctor = { ...formData, id: Date.now() };
      setDoctors([...doctors, newDoctor]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteDoctor = (id: number) => {
    if (confirm('Shifokorni o\'chirmoqchimisiz?')) {
      setDoctors(doctors.filter(d => d.id !== id));
    }
  };

  const toggleDoctorStatus = (id: number) => {
    setDoctors(doctors.map(d => 
      d.id === id ? { ...d, holat: d.holat === 'faol' ? 'nofaol' : 'faol' } : d
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Shifokorlar boshqaruvi" subtitle="Shifokorlarni qo'shish, tahrirlash va boshqarish" />
      
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="Shifokor qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleAddDoctor} className="whitespace-nowrap">
                <i className="ri-add-line mr-2"></i>
                Yangi shifokor
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shifokor
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mutaxassislik
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aloqa
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tajriba
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holat
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-heart-line text-blue-600"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.ism}</div>
                          <div className="text-sm text-gray-500">{doctor.login}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.mutaxassislik}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.telefon}</div>
                      <div className="text-sm text-gray-500">{doctor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.tajriba_yil} yil</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleDoctorStatus(doctor.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                          doctor.holat === 'faol'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {doctor.holat === 'faol' ? 'Faol' : 'Nofaol'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditDoctor(doctor)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteDoctor(doctor.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
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
        title={editingDoctor ? 'Shifokorni tahrirlash' : 'Yangi shifokor qo\'shish'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Ism familiya"
              value={formData.ism}
              onChange={(e) => setFormData({ ...formData, ism: e.target.value })}
              placeholder="Ism familiyani kiriting"
            />
            <Input
              label="Mutaxassislik"
              value={formData.mutaxassislik}
              onChange={(e) => setFormData({ ...formData, mutaxassislik: e.target.value })}
              placeholder="Mutaxassislikni kiriting"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Telefon"
              value={formData.telefon}
              onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
              placeholder="+998 90 123 45 67"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Login"
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              placeholder="Login kiriting"
            />
            <Input
              label="Parol"
              type="password"
              value={formData.parol}
              onChange={(e) => setFormData({ ...formData, parol: e.target.value })}
              placeholder="Parol kiriting"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tajriba (yil)"
              type="number"
              value={formData.tajriba_yil}
              onChange={(e) => setFormData({ ...formData, tajriba_yil: e.target.value })}
              placeholder="Tajriba yilini kiriting"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holat</label>
              <select
                value={formData.holat}
                onChange={(e) => setFormData({ ...formData, holat: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="faol">Faol</option>
                <option value="nofaol">Nofaol</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Bekor qilish
            </Button>
            <Button onClick={handleSaveDoctor}>
              {editingDoctor ? 'Saqlash' : 'Qo\'shish'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
