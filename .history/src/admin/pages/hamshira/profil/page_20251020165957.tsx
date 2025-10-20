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

export default function HamshiraProfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Gulnora Abdullayeva',
    position: 'Hamshira',
    email: 'gulnora.abdullayeva@najotclinic.uz',
    phone: '+998 90 987 65 43',
    licenseNumber: 'NUR001',
    hireDate: '2019-03-10',
    experience: '5 yil',
    education: 'Toshkent Tibbiyot Kolleji',
    address: 'Toshkent shahar, Chilonzor tumani',
    bio: 'Hamshiralik sohasida 5 yillik tajribaga ega. Bemorlar bilan ishlash va tibbiy yordam ko\'rsatishda mutaxassis.',
    workingHours: '08:00 - 20:00',
    specialization: 'Umumiy hamshiralik',
    languages: ['O\'zbek', 'Rus', 'Ingliz'],
    certifications: [
      'Umumiy hamshiralik',
      'Kardiologiya hamshiraligi',
      'Qon olish texnikasi',
      'CPR sertifikati'
    ]
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalPatients: 180,
    completedTasks: 245,
    pendingTasks: 12,
    averageRating: 4.9
  };

  const recentActivities = [
    {
      id: 1,
      type: 'completed',
      description: 'Alisher Karimovga vitals yozildi',
      time: '2024-01-15 10:15',
      patient: 'Alisher Karimov'
    },
    {
      id: 2,
      type: 'pending',
      description: 'Malika Toshmatovaga dori berish kerak',
      time: '2024-01-15 09:30',
      patient: 'Malika Toshmatova'
    },
    {
      id: 3,
      type: 'completed',
      description: 'Javlon Nablyevning tahlili olingan',
      time: '2024-01-15 08:45',
      patient: 'Javlon Nablyev'
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profil</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Shaxsiy ma'lumotlar va sozlamalar</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Chiqish
          </button>
        </div>
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
              <p className="text-sm text-gray-500">{profileData.position}</p>
              
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
                <span className="text-sm text-gray-600">Yakunlangan vazifalar</span>
                <span className="text-sm font-bold text-green-600">{stats.completedTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Kutilayotgan vazifalar</span>
                <span className="text-sm font-bold text-yellow-600">{stats.pendingTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reyting</span>
                <span className="text-sm font-bold text-purple-600">{stats.averageRating}/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Shaxsiy ma'lumotlar</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Lavozim</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.position}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Litsenziya raqami</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.licenseNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ishga qabul qilingan sana</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.hireDate}
                    onChange={(e) => handleInputChange('hireDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{new Date(profileData.hireDate).toLocaleDateString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tajriba</label>
                <p className="text-sm text-gray-900">{profileData.experience}</p>
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

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Manzil</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.address}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Haqida</label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sertifikatlar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm text-gray-900">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">So'nggi faoliyat</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activity.type === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.type === 'completed' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.patient} • {new Date(activity.time).toLocaleString()}
                    </p>
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
