import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../admin/contexts/AuthContext';
import { X, Calendar, Clock, User, Phone, Mail, FileText, Stethoscope } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    email: '',
    service: '',
    doctor: '',
    appointment_date: '',
    appointment_time: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'Laborator tahlil',
    'UZI diagnostika',
    'Pediatriya',
    'Kardiologiya',
    'Terapiya',
    'Boshqa'
  ];

  const doctors = [
    'Dr. Kamila Rahimova (Kardiolog)',
    'Dr. Alisher Usmonov (Radiolog)',
    'Dr. Dinoza Karimova (Pediatr)',
    'Farqi yo\'q'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          patient_name: '',
          phone: '',
          email: '',
          service: '',
          doctor: '',
          appointment_date: '',
          appointment_time: '',
          notes: ''
        });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-sky-900">Navbatga yozilish</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Name */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              To'liq ismingiz *
            </label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              placeholder="Familiya Ism Otangizning ismi"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2" />
              Telefon raqam *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              placeholder="+998 90 123 45 67"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              placeholder="email@example.com"
            />
          </div>

          {/* Service */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Stethoscope className="w-4 h-4 mr-2" />
              Xizmat turi *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Tanlang</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Shifokor
            </label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Tanlang</option>
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Sana *
              </label>
              <input
                type="date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                min={today}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                Vaqt *
              </label>
              <select
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Tanlang</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-2" />
              Qo'shimcha ma'lumot
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Shikoyatlaringiz yoki qo'shimcha ma'lumotlar..."
            />
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg">
              Muvaffaqiyatli! Sizning navbatingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 text-red-800 px-4 py-3 rounded-lg">
              Xatolik: {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-sky-900 text-white rounded-lg hover:bg-sky-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Yuborilmoqda...' : 'Tasdiqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
