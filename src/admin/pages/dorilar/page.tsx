import { useState } from 'react';
import { 
  Pill, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter
} from 'lucide-react';

export default function DorilarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const categories = ['all', 'antibiotic', 'painkiller', 'vitamin', 'heart', 'diabetes'];

  const medications = [
    {
      id: 1,
      name: 'Amoxicillin',
      category: 'antibiotic',
      dosage: '500mg',
      quantity: 150,
      minStock: 50,
      expiryDate: '2025-06-15',
      price: 25000,
      supplier: 'UzPharm',
      status: 'active'
    },
    {
      id: 2,
      name: 'Paracetamol',
      category: 'painkiller',
      dosage: '500mg',
      quantity: 300,
      minStock: 100,
      expiryDate: '2025-12-20',
      price: 5000,
      supplier: 'MediCorp',
      status: 'active'
    },
    {
      id: 3,
      name: 'Vitamin D3',
      category: 'vitamin',
      dosage: '1000 IU',
      quantity: 80,
      minStock: 30,
      expiryDate: '2025-03-10',
      price: 35000,
      supplier: 'VitaLife',
      status: 'low_stock'
    },
    {
      id: 4,
      name: 'Metformin',
      category: 'diabetes',
      dosage: '850mg',
      quantity: 120,
      minStock: 40,
      expiryDate: '2025-08-25',
      price: 18000,
      supplier: 'DiabetCare',
      status: 'active'
    },
    {
      id: 5,
      name: 'Amlodipine',
      category: 'heart',
      dosage: '5mg',
      quantity: 25,
      minStock: 20,
      expiryDate: '2024-12-31',
      price: 22000,
      supplier: 'CardioMed',
      status: 'expiring_soon'
    }
  ];

  const stats = {
    totalMedications: medications.length,
    lowStock: medications.filter(m => m.status === 'low_stock').length,
    expiringSoon: medications.filter(m => m.status === 'expiring_soon').length,
    totalValue: medications.reduce((sum, med) => sum + (med.quantity * med.price), 0)
  };

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'expiring_soon':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Faol';
      case 'low_stock':
        return 'Kam zaxira';
      case 'expiring_soon':
        return 'Muddati tugayapti';
      default:
        return 'Noma\'lum';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'antibiotic':
        return 'Antibiotik';
      case 'painkiller':
        return 'Og\'riq qoldiruvchi';
      case 'vitamin':
        return 'Vitamin';
      case 'heart':
        return 'Yurak dorilari';
      case 'diabetes':
        return 'Qandli diabet';
      default:
        return category;
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  const isLowStock = (quantity: number, minStock: number) => {
    return quantity <= minStock;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dorilar boshqaruvi</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Dorilar zaxirasi va boshqaruvi</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalMedications}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami dorilar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.lowStock}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Kam zaxira</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.expiringSoon}</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Muddati tugayapti</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.totalValue.toLocaleString()} so'm
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Jami qiymat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Dorini qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">Barcha kategoriyalar</option>
              <option value="antibiotic">Antibiotik</option>
              <option value="painkiller">Og'riq qoldiruvchi</option>
              <option value="vitamin">Vitamin</option>
              <option value="heart">Yurak dorilari</option>
              <option value="diabetes">Qandli diabet</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yangi dori qo'shish
          </button>
        </div>
      </div>

      {/* Medications Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Dorilar ro'yxati</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dori nomi</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategoriya</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doza</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miqdor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Muddati</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedications.map((medication) => (
                <tr key={medication.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Pill className="w-4 h-4 text-blue-600 mr-2" />
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{medication.name}</div>
                        <div className="text-xs text-gray-500">{medication.supplier}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {getCategoryText(medication.category)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {medication.dosage}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm text-gray-900">{medication.quantity}</span>
                      {isLowStock(medication.quantity, medication.minStock) && (
                        <TrendingDown className="w-3 h-3 text-red-500 ml-1" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm text-gray-900">
                        {new Date(medication.expiryDate).toLocaleDateString()}
                      </span>
                      {isExpiringSoon(medication.expiryDate) && (
                        <AlertTriangle className="w-3 h-3 text-red-500 ml-1" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(medication.status)}`}>
                      {getStatusText(medication.status)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedMedication(medication);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStock > 0 && (
        <div className="mt-6 sm:mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Ogohlantirish</h3>
              <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                {stats.lowStock} ta dorining zaxirasi kam. Zaxirani to'ldirish kerak.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Expiring Soon Alert */}
      {stats.expiringSoon > 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Muddati tugayapti</h3>
              <p className="text-xs sm:text-sm text-red-700 mt-1">
                {stats.expiringSoon} ta dorining muddati 30 kundan kam qoldi.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
