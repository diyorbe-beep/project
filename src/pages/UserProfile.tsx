import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../admin/contexts/AuthContext';
import { 
  User, 
  Calendar, 
  FileText, 
  Pill, 
  TestTube, 
  CreditCard,
  Edit,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  Heart,
  AlertCircle,
  Clock,
  CheckCircle,
  Download,
  LogOut,
  Home
} from 'lucide-react';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      ism: user?.full_name?.split(' ')[0] || 'Foydalanuvchi',
      familiya: user?.full_name?.split(' ')[1] || '',
      tugulgan_sana: '1990-01-01',
      jins: 'Erkak',
      telefon: '+998 90 123 45 67',
      email: user?.email || 'user@example.com',
      manzil: 'Toshkent shahar, Yunusobod tumani',
      qon_guruhi: 'A(II)+',
      allergiyalar: 'Yo\'q',
      surunkali_kasalliklar: 'Yo\'q',
      operatsiyalar: 'Yo\'q',
      oilaviy_tarix: 'Yo\'q'
    };
  });

  const [appointments] = useState(() => {
    const saved = localStorage.getItem('userAppointments');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        shifokor: 'Dr. Kamila Rahimova',
        mutaxassislik: 'Kardiolog',
        sana: '2024-12-25',
        vaqt: '10:00',
        holat: 'Kutilmoqda',
        sabab: 'Yurak tekshiruvi'
      },
      {
        id: 2,
        shifokor: 'Dr. Alisher Karimov',
        mutaxassislik: 'Terapevt',
        sana: '2024-12-20',
        vaqt: '14:30',
        holat: 'Bajarildi',
        sabab: 'Umumiy tekshiruv'
      }
    ];
  });

  const [labResults] = useState(() => {
    const saved = localStorage.getItem('userLabResults');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        tahlil_nomi: 'Umumiy qon tahlili',
        sana: '2024-12-15',
        natija: 'Normal',
        shifokor: 'Dr. Alisher Karimov',
        fayl: 'qon_tahlili.pdf'
      },
      {
        id: 2,
        tahlil_nomi: 'EKG',
        sana: '2024-12-10',
        natija: 'Normal',
        shifokor: 'Dr. Kamila Rahimova',
        fayl: 'ekg_natija.pdf'
      }
    ];
  });

  const [prescriptions] = useState(() => {
    const saved = localStorage.getItem('userPrescriptions');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        dori: 'Aspirin 100mg',
        shifokor: 'Dr. Kamila Rahimova',
        sana: '2024-12-10',
        davomiyligi: '30 kun',
        dozasi: '1 dona kuniga'
      },
      {
        id: 2,
        dori: 'Vitamin D3',
        shifokor: 'Dr. Alisher Karimov',
        sana: '2024-12-05',
        davomiyligi: '60 kun',
        dozasi: '1 dona kuniga'
      }
    ];
  });

  const [payments] = useState(() => {
    const saved = localStorage.getItem('userPayments');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        xizmat: 'Kardiolog konsultatsiyasi',
        summa: '500,000',
        sana: '2024-12-10',
        holat: 'To\'langan'
      },
      {
        id: 2,
        xizmat: 'Umumiy qon tahlili',
        summa: '150,000',
        sana: '2024-12-15',
        holat: 'To\'langan'
      }
    ];
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  }, [profileData]);

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profil ma\'lumotlari saqlandi!');
  };

  const handleLogout = () => {
    if (confirm('Tizimdan chiqmoqchimisiz?')) {
      logout();
      navigate('/');
    }
  };

  const handleCancelAppointment = (id: number) => {
    if (confirm('Uchrashuvni bekor qilmoqchimisiz?')) {
      alert('Uchrashuvni bekor qilish funksiyasi ishga tushirildi');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Bosh sahifa</span>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mening Profilim</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profil</span>
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'appointments'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Uchrashuvlar</span>
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'results'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TestTube className="w-4 h-4" />
                <span>Tahlillar</span>
              </button>
              <button
                onClick={() => setActiveTab('prescriptions')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'prescriptions'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Pill className="w-4 h-4" />
                <span>Retseptlar</span>
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'payments'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>To'lovlar</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {profileData.ism} {profileData.familiya}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{profileData.email}</p>
                  
                  <div className="mt-6 space-y-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Saqlash
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Bekor qilish
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Tahrirlash
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Tezkor Ma'lumotlar</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Keyingi uchrashuv:</span>
                      <span className="text-gray-900 font-medium">25 Dekabr</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Qon guruhi:</span>
                      <span className="text-gray-900 font-medium">{profileData.qon_guruhi}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Shaxsiy Ma'lumotlar</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ism</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.ism}
                        onChange={(e) => setProfileData({ ...profileData, ism: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.ism}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Familiya</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.familiya}
                        onChange={(e) => setProfileData({ ...profileData, familiya: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.familiya}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tug'ilgan sana</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={profileData.tugulgan_sana}
                        onChange={(e) => setProfileData({ ...profileData, tugulgan_sana: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.tugulgan_sana}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jins</label>
                    {isEditing ? (
                      <select
                        value={profileData.jins}
                        onChange={(e) => setProfileData({ ...profileData, jins: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Erkak">Erkak</option>
                        <option value="Ayol">Ayol</option>
                      </select>
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.jins}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Telefon
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.telefon}
                        onChange={(e) => setProfileData({ ...profileData, telefon: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.telefon}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Manzil
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.manzil}
                        onChange={(e) => setProfileData({ ...profileData, manzil: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.manzil}</p>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-6">Tibbiy Ma'lumotlar</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qon guruhi</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.qon_guruhi}
                        onChange={(e) => setProfileData({ ...profileData, qon_guruhi: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.qon_guruhi}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allergiyalar</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.allergiyalar}
                        onChange={(e) => setProfileData({ ...profileData, allergiyalar: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.allergiyalar}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Surunkali kasalliklar</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.surunkali_kasalliklar}
                        onChange={(e) => setProfileData({ ...profileData, surunkali_kasalliklar: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{profileData.surunkali_kasalliklar}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Mening Uchrashuvlarim</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{appointment.shifokor}</h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              appointment.holat === 'Kutilmoqda'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {appointment.holat}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{appointment.mutaxassislik}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointment.sana}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.vaqt}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Sabab:</strong> {appointment.sabab}
                        </p>
                      </div>
                      {appointment.holat === 'Kutilmoqda' && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Bekor qilish
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lab Results Tab */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Tahlil Natijalari</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Tahlil</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Sana</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Natija</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Shifokor</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {labResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">{result.tahlil_nomi}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{result.sana}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            {result.natija}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{result.shifokor}</td>
                        <td className="px-4 py-3">
                          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs sm:text-sm">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Yuklab olish</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Mening Retseptlarim</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Pill className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{prescription.dori}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Dozasi:</strong> {prescription.dozasi}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Davomiyligi:</strong> {prescription.davomiyligi}
                          </p>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {prescription.sana}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {prescription.shifokor}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">To'lovlar Tarixi</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Xizmat</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Sana</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Summa</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">{payment.xizmat}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{payment.sana}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-900 font-medium">
                          {payment.summa} so'm
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            {payment.holat}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

