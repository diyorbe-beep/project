
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { roomsData } from '../../mocks/patients';

export default function XonalarPage() {
  const [rooms, setRooms] = useState(roomsData);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    turi: 'Palata',
    status: 'bosh',
    narx_kun_uzs: ''
  });

  const filteredRooms = rooms.filter(room =>
    room.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.turi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (room?: any) => {
    if (room) {
      setSelectedRoom(room);
      setFormData({
        nom: room.nom,
        turi: room.turi,
        status: room.status,
        narx_kun_uzs: room.narx_kun_uzs.toString()
      });
    } else {
      setSelectedRoom(null);
      setFormData({
        nom: '',
        turi: 'Palata',
        status: 'bosh',
        narx_kun_uzs: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedRoom) {
      // Tahrirlash
      setRooms(rooms.map(room => 
        room.id === selectedRoom.id 
          ? { ...room, ...formData, narx_kun_uzs: parseInt(formData.narx_kun_uzs) }
          : room
      ));
    } else {
      // Yangi qo'shish
      const newRoom = {
        id: Math.max(...rooms.map(r => r.id)) + 1,
        ...formData,
        narx_kun_uzs: parseInt(formData.narx_kun_uzs)
      };
      setRooms([...rooms, newRoom]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Xonani o\'chirmoqchimisiz?')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bosh':
        return 'bg-green-100 text-green-800';
      case 'band':
        return 'bg-red-100 text-red-800';
      case 'tozalashda':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'bosh':
        return 'Bo\'sh';
      case 'band':
        return 'Band';
      case 'tozalashda':
        return 'Tozalashda';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'VIP':
        return 'ri-vip-crown-line';
      case 'Palata':
        return 'ri-hotel-bed-line';
      default:
        return 'ri-building-line';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Xonalar" subtitle="Klinika xonalarini boshqarish va nazorat qilish" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Xona qidirish..."
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
                  Jami xonalar: {filteredRooms.length}
                </div>
                <Button onClick={() => openModal()} className="whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Yangi xona qo'shish
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className={`${getTypeIcon(room.turi)} text-blue-600 text-xl`}></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">Xona {room.nom}</h3>
                      <p className="text-sm text-gray-500">{room.turi}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                    {getStatusText(room.status)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Narx (kunlik):</span>
                    <span className="font-medium text-gray-900">
                      {room.narx_kun_uzs.toLocaleString()} so'm
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(room)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-edit-line mr-1"></i>
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRoom ? 'Xonani tahrirlash' : 'Yangi xona qo\'shish'}
      >
        <div className="space-y-4">
          <Input
            label="Xona raqami"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            placeholder="Xona raqamini kiriting"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xona turi</label>
            <div className="relative">
              <select
                value={formData.turi}
                onChange={(e) => setFormData({ ...formData, turi: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="Palata">Palata</option>
                <option value="VIP">VIP</option>
                <option value="Muolaja">Muolaja xonasi</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                <option value="bosh">Bo'sh</option>
                <option value="band">Band</option>
                <option value="tozalashda">Tozalashda</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <Input
            label="Kunlik narx (so'm)"
            type="number"
            value={formData.narx_kun_uzs}
            onChange={(e) => setFormData({ ...formData, narx_kun_uzs: e.target.value })}
            placeholder="Kunlik narxni kiriting"
            required
          />

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
