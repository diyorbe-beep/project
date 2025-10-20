import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Stethoscope, Microscope, Heart, Phone, MapPin, Clock } from 'lucide-react';
import { AppointmentModal } from './components/AppointmentModal';
import { AuthProvider, useAuth } from './admin/contexts/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin components
import { AdminLayout } from './admin/components/AdminLayout';
import { ShifokorLayout } from './admin/components/ShifokorLayout';
import { HamshiraLayout } from './admin/components/HamshiraLayout';
import { DuxtirLayout } from './admin/components/DuxtirLayout';
import DashboardPage from './admin/pages/dashboard/page';
import ShifokorlarPage from './admin/pages/shifokorlar/page';
import BemolarPage from './admin/pages/bemorlar/page';
import HamshiralarPage from './admin/pages/hamshiralar/page';

// Role-based pages
import ShifokorDashboard from './admin/pages/shifokor/dashboard';
import HamshiraDashboard from './admin/pages/hamshira/dashboard';
import DuxtirDashboard from './admin/pages/duxtir/dashboard';
import XonalarPage from './admin/pages/xonalar/page';
import TahlillarPage from './admin/pages/tahlillar/page';
import HisobotlarPage from './admin/pages/hisobotlar/page';
import SozlamalarPage from './admin/pages/sozlamalar/page';
import ShifokorPanelPage from './admin/pages/shifokor-panel/page';
import HamshiraPanelPage from './admin/pages/hamshira-panel/page';
import DorilarPage from './admin/pages/dorilar/page';
import QabulPage from './admin/pages/qabul/page';
import NotFoundPage from './admin/pages/NotFound';

// Public website component
function PublicWebsite() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    if (!user) {
      const shouldRegister = window.confirm('Navbatga yozilish uchun ro\'yxatdan o\'tishingiz kerak. Register sahifasiga o\'tamizmi?');
      if (shouldRegister) {
        navigate('/register');
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-sky-900" />
              <h1 className="text-lg sm:text-2xl font-bold text-sky-900">NAJOT CLINIC</h1>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-sky-900 transition-colors">Bosh sahifa</a>
              <a href="#services" className="text-gray-700 hover:text-sky-900 transition-colors">Xizmatlar</a>
              <a href="#doctors" className="text-gray-700 hover:text-sky-900 transition-colors">Shifokorlar</a>
              <a href="/login" className="text-gray-700 hover:text-sky-900 transition-colors">Login</a>
              <a href="/register" className="text-gray-700 hover:text-sky-900 transition-colors">Register</a>
              <button
                onClick={handleAppointmentClick}
                className="bg-sky-900 text-white px-6 py-2 rounded-lg hover:bg-sky-800 transition-colors"
              >
                Navbatga yozilish
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) {
                    menu.classList.toggle('hidden');
                  }
                }}
                className="text-gray-700 hover:text-sky-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div id="mobile-menu" className="hidden md:hidden mt-4 space-y-2">
            <a href="#home" className="block text-gray-700 hover:text-sky-900 transition-colors py-2">Bosh sahifa</a>
            <a href="#services" className="block text-gray-700 hover:text-sky-900 transition-colors py-2">Xizmatlar</a>
            <a href="#doctors" className="block text-gray-700 hover:text-sky-900 transition-colors py-2">Shifokorlar</a>
            <a href="/login" className="block text-gray-700 hover:text-sky-900 transition-colors py-2">Login</a>
            <a href="/register" className="block text-gray-700 hover:text-sky-900 transition-colors py-2">Register</a>
            <button
              onClick={handleAppointmentClick}
              className="w-full bg-sky-900 text-white px-6 py-2 rounded-lg hover:bg-sky-800 transition-colors"
            >
              Navbatga yozilish
            </button>
          </div>
        </nav>
      </header>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-gray-50 to-sky-50 py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-900 mb-4 sm:mb-6 leading-tight">
              Sizning sog'lig'ingiz – bizning ustuvorligimiz
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Terapiya, diagnostika va pediatriya xizmatlarini taqdim etamiz
            </p>
            <button
              onClick={handleAppointmentClick}
              className="w-full sm:w-auto bg-sky-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-sky-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Onlayn yozilish
            </button>

            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-sky-900">10+</div>
                <div className="text-sm sm:text-base text-gray-600">Yillik tajriba</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-sky-900">5000+</div>
                <div className="text-sm sm:text-base text-gray-600">Bemorlar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-sky-900">15+</div>
                <div className="text-sm sm:text-base text-gray-600">Mutaxassislar</div>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="bg-sky-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
              <img
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Medical Team"
                className="rounded-xl sm:rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-900 text-center mb-4">Xizmatlar</h2>
          <p className="text-gray-600 text-center mb-8 sm:mb-16">Professional tibbiy xizmatlar bilan tanishing</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Laboratory Services */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sky-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Microscope className="w-8 h-8 sm:w-10 sm:h-10 text-sky-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-3 sm:mb-4">Laborator tahlil</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">Zamonaviy uskunalar yordamida to'liq qon tahlili, biokimyoviy va boshqa tadqiqotlar</p>
              <p className="text-2xl sm:text-3xl font-bold text-sky-900 text-center mb-4 sm:mb-6">100 000 so'm</p>
              <div className="flex justify-center">
                <button className="text-sky-900 font-semibold hover:text-sky-700 transition-colors text-sm sm:text-base">
                  Batafsil →
                </button>
              </div>
            </div>

            {/* Ultrasound Diagnostics */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sky-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <div className="w-8 h-8 sm:w-10 sm:h-10 text-sky-700 flex items-center justify-center text-xl sm:text-2xl font-bold">
                  UZI
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-3 sm:mb-4">UZI diagnostika</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">Yuqori sifatli ultratovush tekshiruvi orqali organlarning holatini aniqlash</p>
              <p className="text-2xl sm:text-3xl font-bold text-sky-900 text-center mb-4 sm:mb-6">150 000 so'm</p>
              <div className="flex justify-center">
                <button className="text-sky-900 font-semibold hover:text-sky-700 transition-colors text-sm sm:text-base">
                  Batafsil →
                </button>
              </div>
            </div>

            {/* Pediatrics */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sky-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-sky-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-3 sm:mb-4">Pediatriya</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">Bolalar uchun maxsus professional tibbiy xizmatlar va parvarish</p>
              <div className="flex justify-center mb-4 sm:mb-6">
                <button className="w-full sm:w-auto bg-sky-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-sky-800 transition-colors text-sm sm:text-base">
                  Batafsil ko'rish
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-sky-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-900 text-center mb-4">Shifokorlar</h2>
          <p className="text-gray-600 text-center mb-8 sm:mb-16">Tajribali mutaxassislarimiz bilan tanishing</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Doctor 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="h-60 sm:h-80 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Dr. Kamila Rahimova"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">Dr. Kamila Rahimova</h3>
                <p className="text-sky-700 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Kardiolog</p>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">12 yillik tajriba, yurak kasalliklari bo'yicha mutaxassis</p>
                <button className="text-sky-900 font-semibold hover:text-sky-700 transition-colors text-sm sm:text-base">
                  Batafsil ma'lumot →
                </button>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="h-60 sm:h-80 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src="https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Dr. Alisher Usmonov"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">Dr. Alisher Usmonov</h3>
                <p className="text-sky-700 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Radiolog</p>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">15 yillik tajriba, diagnostika bo'yicha tajribali shifokor</p>
                <button className="text-sky-900 font-semibold hover:text-sky-700 transition-colors text-sm sm:text-base">
                  Batafsil ma'lumot →
                </button>
              </div>
            </div>

            {/* Doctor 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all sm:col-span-2 md:col-span-1">
              <div className="h-60 sm:h-80 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Dr. Dinoza Karimova"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">Dr. Dinoza Karimova</h3>
                <p className="text-sky-700 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Pediatr</p>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">10 yillik tajriba, bolalar salomatligi mutaxassisi</p>
                <button className="text-sky-900 font-semibold hover:text-sky-700 transition-colors text-sm sm:text-base">
                  Batafsil ma'lumot →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-900 text-center mb-8 sm:mb-16">Biz bilan bog'laning</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-sky-700" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-600 text-sm sm:text-base">+998 90 123 45 67</p>
              <p className="text-gray-600 text-sm sm:text-base">+998 91 234 56 78</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-sky-700" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">Manzil</h3>
              <p className="text-gray-600 text-sm sm:text-base">Toshkent shahar,</p>
              <p className="text-gray-600 text-sm sm:text-base">Yunusobod tumani</p>
            </div>

            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-sky-700" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">Ish vaqti</h3>
              <p className="text-gray-600 text-sm sm:text-base">Dushanba - Shanba</p>
              <p className="text-gray-600 text-sm sm:text-base">09:00 - 20:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8" />
            <h3 className="text-xl sm:text-2xl font-bold">NAJOT CLINIC</h3>
          </div>
          <p className="text-sky-200 mb-3 sm:mb-4 text-sm sm:text-base">Sizning sog'ligingiz bizning g'amxo'rligimizda</p>
          <p className="text-sky-300 text-xs sm:text-sm">© 2024 NAJOT CLINIC. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicWebsite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/shifokorlar" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <ShifokorlarPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/bemorlar" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <BemolarPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/hamshiralar" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <HamshiralarPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/xonalar" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <XonalarPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/tahlillar" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <TahlillarPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/hisobotlar" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <HisobotlarPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/sozlamalar" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <SozlamalarPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/shifokor-panel" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <ShifokorPanelPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/hamshira-panel" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <HamshiraPanelPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/dorilar" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <DorilarPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/qabul" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <QabulPage />
              </AdminLayout>
            </ProtectedRoute>
          } />

          {/* Shifokor routes */}
          <Route path="/shifokor" element={
            <ProtectedRoute allowedRoles={['shifokor']}>
              <ShifokorLayout>
                <ShifokorDashboard />
              </ShifokorLayout>
            </ProtectedRoute>
          } />

          {/* Hamshira routes */}
          <Route path="/hamshira" element={
            <ProtectedRoute allowedRoles={['hamshira']}>
              <HamshiraLayout>
                <HamshiraDashboard />
              </HamshiraLayout>
            </ProtectedRoute>
          } />

          {/* Duxtir routes */}
          <Route path="/duxtir" element={
            <ProtectedRoute allowedRoles={['duxtir']}>
              <DuxtirLayout>
                <DuxtirDashboard />
              </DuxtirLayout>
            </ProtectedRoute>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
