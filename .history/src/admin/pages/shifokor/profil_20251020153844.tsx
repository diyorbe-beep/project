import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';

export default function ShifokorProfil() {
  const [profile, setProfile] = useState({
    full_name: 'Dr. Kamila Rahimova',
    specialization: 'Kardiolog',
    license_number: 'DOC001',
    phone: '+998 90 234 56 78',
    email: 'shifokor@najotclinic.uz',
    experience: '8 yil',
    education: 'Toshkent tibbiyot universiteti',
    languages: ['O\'zbek tili', 'Rus tili', 'Ingliz tili'],
    bio: 'Kardiologiya sohasida 8 yillik tajribaga ega mutaxassis. Yuqori malakali tibbiy xizmat ko\'rsatish va bemorlarning sog\'lig\'ini tiklashga yordam berishni maqsad qilgan.',
    schedule: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 16:00',
      saturday: '10:00 - 14:00',
      sunday: 'Dam olish'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('umumiy');

  const handleSave = () => {
    alert('Profil ma\'lumotlari saqlandi!');
    setIsEditing(false);
  };

  const tabs = [
    { id: 'umumiy', label: 'Umumiy ma\'lumotlar', icon: 'ri-user-line' },
    { id: 'jadval', label: 'Ish jadvali', icon: 'ri-calendar-line' },
    { id: 'xavfsizlik', label: 'Xavfsizlik', icon: 'ri-shield-check-line' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Profil</h1>
        <p className="text-sm sm:text-base text-gray-600">Shaxsiy ma'lumotlar va sozlamalar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil kartasi */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-heart-line text-3xl text-blue-600"></i>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{profile.full_name}</h2>
              <p className="text-sm text-gray-600 mb-4">{profile.specialization}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center">
                  <i className="ri-phone-line text-gray-400 mr-2"></i>
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <i className="ri-mail-line text-gray-400 mr-2"></i>
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center justify-center">
                  <i className="ri-time-line text-gray-400 mr-2"></i>
                  <span>{profile.experience} tajriba</span>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full"
                  variant={isEditing ? "secondary" : "primary"}
                >
                  {isEditing ? 'Bekor qilish' : 'Tahrirlash'}
                </Button>
              </div>
            </div>
          </div>

          {/* Statistika */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bu oy statistikasi</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Qabul qilingan bemorlar</span>
                <span className="font-semibold text-gray-900">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Muolajalar soni</span>
                <span className="font-semibold text-gray-900">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Buyurtma berilgan tahlillar</span>
                <span className="font-semibold text-gray-900">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tugallangan tashxislar</span>
                <span className="font-semibold text-gray-900">134</span>
              </div>
            </div>
          </div>
        </div>

        {/* Asosiy ma'lumotlar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tab navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Umumiy ma'lumotlar */}
              {activeTab === 'umumiy' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To'liq ism</label>
                      <Input
                        value={profile.full_name}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mutaxassislik</label>
                      <Input
                        value={profile.specialization}
                        onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Litsenziya raqami</label>
                      <Input
                        value={profile.license_number}
                        onChange={(e) => setProfile({ ...profile, license_number: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tajriba</label>
                      <Input
                        value={profile.experience}
                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ta'lim</label>
                    <Input
                      value={profile.education}
                      onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Biografiya</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Biladigan tillar</label>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((lang, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Ish jadvali */}
              {activeTab === 'jadval' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Haftalik ish jadvali</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(profile.schedule).map(([day, time]) => (
                      <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <i className="ri-calendar-line text-gray-400 mr-3"></i>
                          <span className="font-medium text-gray-900 capitalize">
                            {day === 'monday' ? 'Dushanba' :
                             day === 'tuesday' ? 'Seshanba' :
                             day === 'wednesday' ? 'Chorshanba' :
                             day === 'thursday' ? 'Payshanba' :
                             day === 'friday' ? 'Juma' :
                             day === 'saturday' ? 'Shanba' :
                             'Yakshanba'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Xavfsizlik */}
              {activeTab === 'xavfsizlik' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Parol o'zgartirish</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Joriy parol</label>
                      <Input
                        type="password"
                        placeholder="Joriy parolni kiriting"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Yangi parol</label>
                      <Input
                        type="password"
                        placeholder="Yangi parolni kiriting"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parolni tasdiqlang</label>
                    <Input
                      type="password"
                      placeholder="Parolni qayta kiriting"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Xavfsizlik tavsiyalari</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Parol kamida 8 ta belgi bo'lishi kerak</li>
                      <li>• Katta va kichik harflardan foydalaning</li>
                      <li>• Raqam va maxsus belgilar qo'shing</li>
                      <li>• Parolni hech kim bilan baham ko'rmang</li>
                    </ul>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Bekor qilish
                  </Button>
                  <Button onClick={handleSave}>
                    <i className="ri-save-line mr-2"></i>
                    Saqlash
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
