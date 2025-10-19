import { useState } from 'react';
import { nursesData, nurseAssignmentsData } from '../../mocks/nurses';
import { patientsData, roomsData } from '../../mocks/patients';

export default function HamshiraXonalar() {
  const [currentNurse] = useState(nursesData[0]);
  const [rooms, setRooms] = useState(roomsData);

  // Hozirgi hamshiraga biriktirilgan bemorlar va ularning xonalari
  const assignedPatients = nurseAssignmentsData
    .filter(assignment => assignment.nurse_id === currentNurse.id && assignment.status === 'faol')
    .map(assignment => {
      const patient = patientsData.find(p => p.id === assignment.patient_id);
      const room = rooms.find(r => r.id === assignment.room_id);
      return { ...patient, assignment, room };
    });

  // Hamshiraga biriktirilgan xonalar
  const assignedRooms = rooms.filter(room => 
    assignedPatients.some(patient => patient.room?.id === room.id)
  );

  const handleCleaningRequest = (roomId: number) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, status: 'tozalashda' }
        : room
    ));
  };

  const handleCleaningComplete = (roomId: number) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, status: 'bosh' }
        : room
    ));
  };

  const getPatientInRoom = (roomId: number) => {
    return assignedPatients.find(patient => patient.room?.id === roomId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bosh': return 'bg-green-100 text-green-800';
      case 'band': return 'bg-red-100 text-red-800';
      case 'tozalashda': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'bosh': return 'ri-check-line';
      case 'band': return 'ri-user-line';
      case 'tozalashda': return 'ri-brush-line';
      default: return 'ri-question-line';
    }
  };

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case 'VIP': return 'ri-vip-crown-line';
      case 'Palata': return 'ri-hotel-bed-line';
      default: return 'ri-building-line';
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Xonalar</h1>
        <p className="text-gray-600">Sizga biriktirilgan bemorlarning xonalari</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <i className="ri-building-line text-blue-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Biriktirilgan xonalar</p>
              <p className="text-xl font-bold text-gray-900">{assignedRooms.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center">
            <i className="ri-user-line text-red-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Band xonalar</p>
              <p className="text-xl font-bold text-gray-900">
                {assignedRooms.filter(r => r.status === 'band').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <i className="ri-brush-line text-yellow-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Tozalashda</p>
              <p className="text-xl font-bold text-gray-900">
                {assignedRooms.filter(r => r.status === 'tozalashda').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <i className="ri-check-line text-green-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Bo'sh xonalar</p>
              <p className="text-xl font-bold text-gray-900">
                {assignedRooms.filter(r => r.status === 'bosh').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Xonalar ro'yxati */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignedRooms.map((room) => {
          const patient = getPatientInRoom(room.id);
          return (
            <div key={room.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              {/* Xona sarlavhasi */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className={`${getRoomTypeIcon(room.turi)} text-blue-600 text-xl`}></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Xona {room.nom}</h3>
                    <p className="text-sm text-gray-500">{room.turi}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                  <i className={`${getStatusIcon(room.status)} mr-1`}></i>
                  {room.status}
                </span>
              </div>

              {/* Bemor ma'lumotlari */}
              {patient && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-user-line text-gray-600 mr-2"></i>
                    <span className="font-medium text-gray-900">
                      {patient.ism} {patient.familiya}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <i className="ri-calendar-line mr-2"></i>
                      <span>Yosh: {patient.yosh}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-phone-line mr-2"></i>
                      <span>{patient.telefon}</span>
                    </div>
                    {patient.allergiyalar && patient.allergiyalar !== 'Yo\'q' && (
                      <div className="flex items-center text-red-600">
                        <i className="ri-alert-line mr-2"></i>
                        <span>Allergiya: {patient.allergiyalar}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Xona ma'lumotlari */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Narx (kunlik):</span>
                  <span className="font-medium">{room.narx_kun_uzs?.toLocaleString()} so'm</span>
                </div>
              </div>

              {/* Harakatlar */}
              <div className="flex gap-2">
                {room.status === 'band' && (
                  <button
                    onClick={() => handleCleaningRequest(room.id)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-brush-line mr-1"></i>
                    Tozalashga yuborish
                  </button>
                )}
                {room.status === 'tozalashda' && (
                  <button
                    onClick={() => handleCleaningComplete(room.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-check-line mr-1"></i>
                    Tozalash tugadi
                  </button>
                )}
                {room.status === 'bosh' && (
                  <div className="flex-1 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm text-center">
                    <i className="ri-check-line mr-1"></i>
                    Tayyor
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {assignedRooms.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-building-line text-gray-400 text-6xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Biriktirilgan xonalar topilmadi</h3>
          <p className="text-gray-500">Hozircha sizga biriktirilgan bemorlar uchun xonalar yo'q.</p>
        </div>
      )}

      {/* Tozalash qo'llanmasi */}
      <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Xona tozalash qo'llanmasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Oddiy tozalash</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Karavotni almashtirish</li>
              <li>• Polni yuvish</li>
              <li>• Havo almashish</li>
              <li>• Jihozlarni dezinfeksiya qilish</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Chuqur tozalash</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• To'liq dezinfeksiya</li>
              <li>• Devorlarni tozalash</li>
              <li>• Hamma jihozlarni tekshirish</li>
              <li>• UV nurlanish (agar kerak bo'lsa)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}