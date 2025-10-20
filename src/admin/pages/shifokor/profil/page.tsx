import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  User, 
  Save, 
  Edit, 
  Camera, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen,
  Settings,
  Lock,
  Bell,
  LogOut
} from 'lucide-react';

export default function ShifokorProfil() {
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Kamila Rahimova',
    specialization: 'Kardiolog',
    email: 'kamila.rahimova@najotclinic.uz',
    phone: '+998 90 123 45 67',
    licenseNumber: 'DOC001',
    hireDate: '2020-01-15',
    experience: '4 yil',
    education: 'Toshkent Tibbiyot Akademiyasi',
    address: 'Toshkent shahar, Yunusobod tumani',
    bio: 'Kardiologiya sohasida 4 yillik tajribaga ega shifokor. Yurak kasalliklari va qon tomir tizimi kasalliklarini davolashda mutaxassis.',
    workingHours: '09:00 - 18:00',
    consultationFee: '500,000 so\'m',
    languages: ['O\'zbek', 'Rus', 'Ingliz'],
    certifications: [
      'Kardiologiya mutaxassisi',
      'EKG tekshiruvi',
      'Yurak monitori'
    ]
  });

  const stats = {
    totalPatients: 245,
    completedAppointments: 189,
    pendingAppointments: 12,
    averageRating: 4.8
  };

  const recentActivities = [
    {
      id: 1,
      activity: 'Yangi bemor qabul qildi',
      patient: 'Alisher Karimov',
      time: '2024-01-15 10:30',
      type: 'appointment'
    },
    {
      id: 2,
      activity: 'Tashxis qo\'ydi',
      patient: 'Malika Toshmatova',
      time: '2024-01-15 09:45',
      type: 'diagnosis'
    },
    {
      id: 3,
      activity: 'Muolaja rejasi tuzdi',
      patient: 'Javlon Nablyev',
      time: '2024-01-14 16:20',
      type: 'treatment'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    alert('Profil ma\'lumotlari saqlandi!');
  };

  const handleLogout = () => {
    if (window.confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?')) {
      logout();
      navigate('/');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profil</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Shaxsiy ma'lumotlar va sozlamalar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900">{profileData.fullName}</h2>
              <p className="text-sm text-gray-500">{profileData.specialization}</p>
              
              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    {isEditing ? 'Bekor qilish' : 'Tahrirlash'}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Saqlash
                    </button>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Chiqish
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistika</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jami bemorlar</span>
                <span className="text-sm font-bold text-blue-600">{stats.totalPatients}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Yakunlangan qabullar</span>
                <span className="text-sm font-bold text-green-600">{stats.completedAppointments}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Kutilayotgan qabullar</span>
                <span className="text-sm font-bold text-yellow-600">{stats.pendingAppointments}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">O\'rtacha reyting</span>
                <span className="text-sm font-bold text-purple-600">{stats.averageRating}/5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shaxsiy ma'lumotlar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To'liq ism</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.fullName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mutaxassislik</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.specialization}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profileData.email}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profileData.phone}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Litsenziya raqami</label>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profileData.licenseNumber}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ishga qabul qilingan sana</label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <p className="text-sm text-gray-900">{new Date(profileData.hireDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kasbiy ma'lumotlar</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ta'lim</label>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profileData.education}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tajriba</label>
                <p className="text-sm text-gray-900">{profileData.experience}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ish vaqti</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.workingHours}
                    onChange={(e) => handleInputChange('workingHours', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.workingHours}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Konsultatsiya haqi</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.consultationFee}
                    onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.consultationFee}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tillar</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((language, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sertifikatlar</label>
                <div className="space-y-1">
                  {profileData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-900">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Biografiya</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                rows={4}
              />
            ) : (
              <p className="text-sm text-gray-900">{profileData.bio}</p>
            )}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">So'nggi faoliyat</h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.patient}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
