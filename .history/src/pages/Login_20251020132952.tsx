import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../admin/contexts/AuthContext';
import { Stethoscope, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      // Get user role and navigate to appropriate dashboard
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'shifokor':
          navigate('/shifokor');
          break;
        case 'hamshira':
          navigate('/hamshira');
          break;
        case 'duxtir':
          navigate('/duxtir');
          break;
        default:
          navigate('/');
      }
    } else {
      setError('Email yoki parol noto\'g\'ri');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Admin Panel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            NAJOT CLINIC boshqaruv paneliga kirish
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email manzil"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Parol
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Kirilmoqda...
                </div>
              ) : (
                'Kirish'
              )}
            </button>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-600 mb-4">
              <p className="font-medium">Demo ma'lumotlar:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p><strong>Admin:</strong></p>
                  <p>admin@najotclinic.uz</p>
                  <p>admin123</p>
                </div>
                <div>
                  <p><strong>Shifokor:</strong></p>
                  <p>shifokor@najotclinic.uz</p>
                  <p>shifokor123</p>
                </div>
                <div>
                  <p><strong>Hamshira:</strong></p>
                  <p>hamshira@najotclinic.uz</p>
                  <p>hamshira123</p>
                </div>
                <div>
                  <p><strong>Duxtir:</strong></p>
                  <p>duxtir@najotclinic.uz</p>
                  <p>duxtir123</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Hali ro'yxatdan o'tmadingizmi?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Ro'yxatdan o'ting
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
