
import { useState } from 'react';
import { Header } from '../../components/feature/Header';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';

export default function SozlamalarPage() {
  const [activeTab, setActiveTab] = useState('umumiy');
  const [clinicInfo, setClinicInfo] = useState({
    nom: 'Najot Clinic',
    manzil: 'Toshkent sh., Yunusobod tumani, Amir Temur ko\'chasi 108',
    telefon: '+998 71 123 45 67',
    email: 'info@najotclinic.uz',
    veb_sayt: 'www.najotclinic.uz',
    litsenziya: 'LT-2023-001234'
  });

  const [systemSettings, setSystemSettings] = useState({
    til: 'uz',
    vaqt_zonasi: 'Asia/Tashkent',
    valyuta: 'UZS',
    sms_xabarnoma: true,
    email_xabarnoma: true,
    backup_vaqti: '02:00'
  });

  const [userLogs, setUserLogs] = useState([
    { id: 1, foydalanuvchi: 'admin', amal: 'Tizimga kirdi', vaqt: '2024-01-15 09:30:25', ip: '192.168.1.100' },
    { id: 2, foydalanuvchi: 'dr.aliyev', amal: 'Bemor qo\'shdi', vaqt: '2024-01-15 10:15:42', ip: '192.168.1.105' },
    { id: 3, foydalanuvchi: 'nurse.karimova', amal: 'Tahlil yukladi', vaqt: '2024-01-15 11:20:18', ip: '192.168.1.110' },
    { id: 4, foydalanuvchi: 'admin', amal: 'Yangi shifokor qo\'shdi', vaqt: '2024-01-15 14:45:33', ip: '192.168.1.100' }
  ]);

  const handleSaveClinicInfo = () => {
    alert('Klinika ma\'lumotlari saqlandi!');
  };

  const handleSaveSystemSettings = () => {
    alert('Tizim sozlamalari saqlandi!');
  };

  const handleBackup = () => {
    alert('Ma\'lumotlar zaxiralash boshlandi!');
  };

  const tabs = [
    { id: 'umumiy', label: 'Umumiy ma\'lumotlar', icon: 'ri-information-line' },
    { id: 'tizim', label: 'Tizim sozlamalari', icon: 'ri-settings-3-line' },
    { id: 'xavfsizlik', label: 'Xavfsizlik', icon: 'ri-shield-check-line' },
    { id: 'loglar', label: 'Foydalanuvchi loglari', icon: 'ri-file-list-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Tizim sozlamalari" subtitle="Klinika va tizim sozlamalarini boshqarish" />
      
      <div className="p-6">
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
                <h3 className="text-lg font-medium text-gray-900">Klinika ma'lumotlari</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Klinika nomi"
                    value={clinicInfo.nom}
                    onChange={(e) => setClinicInfo({ ...clinicInfo, nom: e.target.value })}
                  />
                  <Input
                    label="Telefon raqam"
                    value={clinicInfo.telefon}
                    onChange={(e) => setClinicInfo({ ...clinicInfo, telefon: e.target.value })}
                  />
                </div>

                <Input
                  label="Manzil"
                  value={clinicInfo.manzil}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, manzil: e.target.value })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email"
                    type="email"
                    value={clinicInfo.email}
                    onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                  />
                  <Input
                    label="Veb-sayt"
                    value={clinicInfo.veb_sayt}
                    onChange={(e) => setClinicInfo({ ...clinicInfo, veb_sayt: e.target.value })}
                  />
                </div>

                <Input
                  label="Litsenziya raqami"
                  value={clinicInfo.litsenziya}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, litsenziya: e.target.value })}
                />

                <div className="flex justify-end">
                  <Button onClick={handleSaveClinicInfo}>
                    <i className="ri-save-line mr-2"></i>
                    Saqlash
                  </Button>
                </div>
              </div>
            )}

            {/* Tizim sozlamalari */}
            {activeTab === 'tizim' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Tizim sozlamalari</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Til</label>
                    <select
                      value={systemSettings.til}
                      onChange={(e) => setSystemSettings({ ...systemSettings, til: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                    >
                      <option value="uz">O'zbek tili</option>
                      <option value="ru">Rus tili</option>
                      <option value="en">Ingliz tili</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vaqt zonasi</label>
                    <select
                      value={systemSettings.vaqt_zonasi}
                      onChange={(e) => setSystemSettings({ ...systemSettings, vaqt_zonasi: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                    >
                      <option value="Asia/Tashkent">Toshkent (UTC+5)</option>
                      <option value="Asia/Almaty">Almaty (UTC+6)</option>
                      <option value="Europe/Moscow">Moskva (UTC+3)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valyuta</label>
                    <select
                      value={systemSettings.valyuta}
                      onChange={(e) => setSystemSettings({ ...systemSettings, valyuta: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                    >
                      <option value="UZS">O'zbek so'mi (UZS)</option>
                      <option value="USD">AQSH dollari (USD)</option>
                      <option value="EUR">Evro (EUR)</option>
                    </select>
                  </div>

                  <Input
                    label="Backup vaqti"
                    type="time"
                    value={systemSettings.backup_vaqti}
                    onChange={(e) => setSystemSettings({ ...systemSettings, backup_vaqti: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Xabarnomalar</h4>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sms_xabarnoma"
                      checked={systemSettings.sms_xabarnoma}
                      onChange={(e) => setSystemSettings({ ...systemSettings, sms_xabarnoma: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sms_xabarnoma" className="ml-2 block text-sm text-gray-900">
                      SMS xabarnomalarni yoqish
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email_xabarnoma"
                      checked={systemSettings.email_xabarnoma}
                      onChange={(e) => setSystemSettings({ ...systemSettings, email_xabarnoma: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="email_xabarnoma" className="ml-2 block text-sm text-gray-900">
                      Email xabarnomalarni yoqish
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSystemSettings}>
                    <i className="ri-save-line mr-2"></i>
                    Saqlash
                  </Button>
                </div>
              </div>
            )}

            {/* Xavfsizlik */}
            {activeTab === 'xavfsizlik' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Xavfsizlik sozlamalari</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Ma'lumotlar zaxirasi</h4>
                    <p className="text-sm text-blue-700 mb-4">
                      Tizim ma'lumotlarini muntazam zaxiralash uchun avtomatik backup sozlang
                    </p>
                    <Button onClick={handleBackup} variant="secondary">
                      <i className="ri-download-cloud-line mr-2"></i>
                      Hozir zaxiralash
                    </Button>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Parol siyosati</h4>
                    <p className="text-sm text-green-700 mb-4">
                      Barcha foydalanuvchilar uchun kuchli parol talablari
                    </p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Kamida 8 ta belgi</li>
                      <li>• Katta va kichik harflar</li>
                      <li>• Raqam va maxsus belgilar</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Tizim xavfsizligi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-yellow-700">So'nggi backup:</p>
                      <p className="font-medium text-yellow-900">2024-01-15 02:00:00</p>
                    </div>
                    <div>
                      <p className="text-yellow-700">Faol sessiyalar:</p>
                      <p className="font-medium text-yellow-900">12 ta foydalanuvchi</p>
                    </div>
                    <div>
                      <p className="text-yellow-700">So'nggi xavfsizlik tekshiruvi:</p>
                      <p className="font-medium text-yellow-900">2024-01-14 18:30:00</p>
                    </div>
                    <div>
                      <p className="text-yellow-700">Tizim holati:</p>
                      <p className="font-medium text-green-600">Xavfsiz</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Foydalanuvchi loglari */}
            {activeTab === 'loglar' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Foydalanuvchi faoliyati</h3>
                  <Button variant="secondary">
                    <i className="ri-download-line mr-2"></i>
                    Loglarni yuklash
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Foydalanuvchi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vaqt
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP manzil
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <i className="ri-user-line text-blue-600"></i>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{log.foydalanuvchi}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{log.amal}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{log.vaqt}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{log.ip}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
