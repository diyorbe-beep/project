import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { 
  CalendarCheck, 
  CheckCircle, 
  Clock, 
  Calendar,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  X,
  Save
} from 'lucide-react';

export default function DuxtirQabul() {
  const [appointments] = useState([
    {
      id: 1,
      patient_name: 'Alisher Karimov',
      phone: '+998 90 123 45 67',
      doctor: 'Dr. Kamila Rahimova',
      date: '2024-01-15',
      time: '10:00',
      reason: 'Qandli diabet tekshiruvi',
      status: 'Tasdiqlangan'
    },
    {
      id: 2,
      patient_name: 'Malika Toshmatova',
      phone: '+998 91 234 56 78',
      doctor: 'Dr. Sardor Aliyev',
      date: '2024-01-15',
      time: '11:30',
      reason: 'Kardiologiya konsultatsiya',
      status: 'Kutilmoqda'
    },
    {
      id: 3,
      patient_name: 'Javlon Nablyev',
      phone: '+998 92 345 67 89',
      doctor: 'Dr. Kamila Rahimova',
      date: '2024-01-15',
      time: '14:00',
      reason: 'Umumiy tekshiruv',
      status: 'Tasdiqlangan'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Tasdiqlangan':
        return 'bg-green-100 text-green-800';
      case 'Kutilmoqda':
        return 'bg-yellow-100 text-yellow-800';
      case 'Bekor qilindi':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewAppointment = () => {
    setIsModalOpen(true);
  };

  const handleSaveAppointment = () => {
    alert('Yangi qabul yaratildi!');
    setIsModalOpen(false);
    setFormData({
      patient_name: '',
      phone: '',
      doctor: '',
      date: '',
      time: '',
      reason: ''
    });
  };

  const handleConfirmAppointment = (id: number) => {
    alert(`Qabul ${id} tasdiqlandi!`);
  };

  const handleCancelAppointment = (id: number) => {
    if (confirm('Qabulni bekor qilmoqchimisiz?')) {
      alert(`Qabul ${id} bekor qilindi!`);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Qabul boshqaruvi</h1>
        <p className="text-sm sm:text-base text-gray-600">Bemorlarning qabullarini boshqarish va rejalashtirish</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">{appointments.length}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami qabullar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {appointments.filter(a => a.status === 'Tasdiqlangan').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Tasdiqlangan</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {appointments.filter(a => a.status === 'Kutilmoqda').length}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kutilmoqda</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-sm sm:text-base font-bold text-gray-900">8</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Bugun rejalashtirilgan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Qabullar ro'yxati */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Qabullar ro'yxati</h2>
            <Button onClick={handleNewAppointment} className="whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2" />
              Yangi qabul
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium Mont text-gray-500 uppercase tracking-wider">Shifokor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana va vaqt</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sabab</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {appointment.patient_name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">{appointment.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{appointment.doctor}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{appointment.date}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{appointment.time}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="text-xs sm:text-sm text-gray-900">{appointment.reason}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      {appointment.status === 'Kutilmoqda' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleConfirmAppointment(appointment.id)}
                            className="text-xs sm:text-sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Tasdiqlash
                          </Button>
                          <Button 
                            size="sm" 
                            variant="danger"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-xs sm:text-sm"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Bekor qilish
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="secondary">
                        <Edit className="w-4 h-4 mr-1" />
                        Tahrirlash
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bugungi jadval */}
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Bugungi qabullar jadvali</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{appointment.patient_name}</h4>
                  <span className="text-xs text-gray-600">{appointment.time}</span>
                </div>
                <p className="text-sm text-gray-700">{appointment.doctor}</p>
                <p className="text-xs text-gray-500 mt-1">{appointment.reason}</p>
                <div className="mt-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yangi qabul modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi qabul yaratish"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bemor ismi</label>
              <Input
                value={formData.patient_name}
                onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                placeholder="Bemor ismini kiriting"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998 90 123 45 67"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shifokor</label>
            <select
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Shifokorni tanlang</option>
              <option value="Dr. Kamila Rahimova">Dr. Kamila Rahimova</option>
              <option value="Dr. Sardor Aliyev">Dr. Sardor Aliyev</option>
              <option value="Dr. Nilufar Karimova">Dr. Nilufar Karimova</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sana</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vaqt</label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qabul sababi</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Qabul sababini kiriting..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Bekor qilish
            </Button>
            <Button onClick={handleSaveAppointment}>
              <Save className="w-4 h-4 mr-2" />
              Saqlash
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
