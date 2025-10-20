import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { roomsData } from '../../mocks/patients';

export default function XonalarPage() {
  const [rooms, setRooms] = useState(roomsData);

  const handleRoomStatusChange = (roomId: number, newStatus: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bosh':
        return 'bg-green-100 text-green-800';
      case 'band':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case 'VIP':
        return 'ri-vip-crown-line';
      case 'Palata':
        return 'ri-hotel-bed-line';
      default:
        return 'ri-home-line';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Xonalar" subtitle="Klinika xonalari boshqaruvi" />
      
      <div className="p-4 sm:p-6">
        {/* Statistika */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-hotel-bed-line text-xl sm:text-2xl text-blue-600"></i>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Jami xonalar</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{rooms.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-xl sm:text-2xl text-green-600"></i>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Bo'sh xonalar</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {rooms.filter(room => room.status === 'bosh').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-close-line text-xl sm:text-2xl text-red-600"></i>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Band xonalar</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {rooms.filter(room => room.status === 'band').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Xonalar ro'yxati */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Xonalar ro'yxati</h2>
              <Button icon="ri-add-line">
                Yangi xona qo'shish
              </Button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className={`${getRoomTypeIcon(room.turi)} text-lg sm:text-xl text-blue-600`}></i>
                      </div>
                      <div className="ml-2 sm:ml-3">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">Xona {room.nom}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">{room.turi}</p>
                      </div>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${getStatusColor(room.status)}`}>
                      {room.status === 'bosh' ? 'Bo\'sh' : 'Band'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <div className="flex items-center justify-between">
                      <span>Narx (kunlik):</span>
                      <span className="font-medium text-gray-900">
                        {room.narx_kun_uzs.toLocaleString()} so'm
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {room.status === 'bosh' ? (
                      <Button 
                        size="sm" 
                        variant="success" 
                        icon="ri-user-add-line"
                        onClick={() => handleRoomStatusChange(room.id, 'band')}
                      >
                        Bemor joylashtirish
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="danger" 
                        icon="ri-user-unfollow-line"
                        onClick={() => handleRoomStatusChange(room.id, 'bosh')}
                      >
                        Bo'shatish
                      </Button>
                    )}
                    <Button size="sm" variant="secondary" icon="ri-edit-line">
                      Tahrirlash
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}