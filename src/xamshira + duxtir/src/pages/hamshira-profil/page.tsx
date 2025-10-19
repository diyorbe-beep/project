import { useState } from 'react';
import { nursesData } from '../../mocks/nurses';

export default function HamshiraProfil() {
  const [currentNurse] = useState(nursesData[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fio: currentNurse.fio,
    telefon: currentNurse.telefon,
    smena_boshlanish: currentNurse.smena_boshlanish,
    smena_tugash: currentNurse.smena_tugash
  });

  const handleSave = () => {
    // Bu yerda ma'lumotlarni saqlash logikasi bo'ladi
    console.log('Ma\'lumotlar saqlandi:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      fio: currentNurse.fio,
      telefon: currentNurse.telefon,
      smena_boshlanish: currentNurse.smena_boshlanish,
      smena_tugash: currentNurse.smena_tugash
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil</h1>
        <p className="text-gray-600">Shaxsiy ma'lumotlar va sozlamalar</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profil kartasi */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-line text-blue-600 text-4xl"></i>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentNurse.fio}</h2>
              <p className="text-gray-600 mb-4">Hamshira</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center text-gray-600">
                  <i className="ri-phone-line mr-2"></i>
                  {currentNurse.telefon}
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <i className="ri-time-line mr-2"></i>
                  {currentNurse.smena_boshlanish} - {currentNurse.smena_tugash}
                </div>
                <div className="flex items-center justify-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    currentNurse.aktiv ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <i className={`${currentNurse.aktiv ? 'ri-check-line' : 'ri-close-line'} mr-1`}></i>
                    {currentNurse.aktiv ? 'Faol' : 'Nofaol'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tez havolalar */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tez havolalar</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
                  <i className="ri-question-line mr-3"></i>
                  Yordam markazi
                </a>
                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
                  <i className="ri-phone-line mr-3"></i>
                  Qo'llab-quvvatlash
                </a>
                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
                  <i className="ri-book-line mr-3"></i>
                  Qo'llanma
                </a>
                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
                  <i className="ri-settings-line mr-3"></i>
                  Tizim sozlamalari
                </a>
              </div>
            </div>
          </div>

          {/* Ma'lumotlar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shaxsiy ma'lumotlar */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Shaxsiy ma'lumotlar</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-edit-line mr-1"></i>
                    Tahrirlash
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap"
                    >
                      Saqlash
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap"
                    >
                      Bekor qilish
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To'liq ism</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.fio}
                      onChange={(e) => setEditData(prev => ({ ...prev, fio: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{currentNurse.fio}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon raqam</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.telefon}
                      onChange={(e) => setEditData(prev => ({ ...prev, telefon: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{currentNurse.telefon}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Smena boshlanishi</label>
                  {isEditing ? (
                    <input
                      type="time"
                      value={editData.smena_boshlanish}
                      onChange={(e) => setEditData(prev => ({ ...prev, smena_boshlanish: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{currentNurse.smena_boshlanish}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Smena tugashi</label>
                  {isEditing ? (
                    <input
                      type="time"
                      value={editData.smena_tugash}
                      onChange={(e) => setEditData(prev => ({ ...prev, smena_tugash: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{currentNurse.smena_tugash}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Ish statistikasi */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Ish statistikasi</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-calendar-line text-blue-500 text-2xl mr-3"></i>
                    <div>
                      <p className="text-sm text-gray-600">Ish kunlari</p>
                      <p className="text-xl font-bold text-gray-900">156</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-user-heart-line text-green-500 text-2xl mr-3"></i>
                    <div>
                      <p className="text-sm text-gray-600">Davolangan bemorlar</p>
                      <p className="text-xl font-bold text-gray-900">89</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-medicine-bottle-line text-yellow-500 text-2xl mr-3"></i>
                    <div>
                      <p className="text-sm text-gray-600">Berilgan muolajalar</p>
                      <p className="text-xl font-bold text-gray-900">234</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Qo'llab-quvvatlash */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Qo'llab-quvvatlash</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-phone-line text-blue-500 text-xl mr-3"></i>
                    <div>
                      <p className="font-medium text-gray-900">Texnik yordam</p>
                      <p className="text-sm text-gray-600">+998 71 123-45-67</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap">
                    Qo'ng'iroq qilish
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-mail-line text-green-500 text-xl mr-3"></i>
                    <div>
                      <p className="font-medium text-gray-900">Email yordam</p>
                      <p className="text-sm text-gray-600">support@najotclinic.uz</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap">
                    Email yuborish
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-chat-3-line text-purple-500 text-xl mr-3"></i>
                    <div>
                      <p className="font-medium text-gray-900">Onlayn chat</p>
                      <p className="text-sm text-gray-600">Dushanba-Juma 9:00-18:00</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap">
                    Chat boshlash
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}