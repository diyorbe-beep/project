import { useState } from 'react';
import { treatmentItemsNurseData, nursesData, nurseAssignmentsData } from '../../mocks/nurses';
import { patientsData } from '../../mocks/patients';

export default function HamshiraMuolajalar() {
  const [currentNurse] = useState(nursesData[0]);
  const [filter, setFilter] = useState('barchasi');
  const [treatments, setTreatments] = useState(treatmentItemsNurseData);

  // Hozirgi hamshiraga biriktirilgan bemorlar ID lari
  const assignedPatientIds = nurseAssignmentsData
    .filter(assignment => assignment.nurse_id === currentNurse.id && assignment.status === 'faol')
    .map(assignment => assignment.patient_id);

  // Filtrlangan muolajalar
  const filteredTreatments = treatments
    .filter(treatment => assignedPatientIds.includes(treatment.patient_id))
    .filter(treatment => {
      if (filter === 'bugun') return true; // Mock: barcha muolajalar bugungi deb hisoblanadi
      if (filter === 'ertaga') return false; // Mock: ertaga uchun muolajalar yo'q
      if (filter === 'kechikkan') return treatment.status === 'kechikti';
      return true;
    });

  const handleStatusChange = (treatmentId: number, newStatus: string) => {
    setTreatments(prev => prev.map(treatment => 
      treatment.id === treatmentId 
        ? { ...treatment, status: newStatus }
        : treatment
    ));
  };

  const getPatientName = (patientId: number) => {
    const patient = patientsData.find(p => p.id === patientId);
    return patient ? `${patient.ism} ${patient.familiya}` : 'Noma\'lum';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'berildi': return 'bg-green-100 text-green-800';
      case 'kechikti': return 'bg-red-100 text-red-800';
      case 'rejalashtirilgan': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'berildi': return 'ri-check-line';
      case 'kechikti': return 'ri-time-line';
      case 'rejalashtirilgan': return 'ri-calendar-line';
      default: return 'ri-question-line';
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Muolajalar</h1>
        <p className="text-gray-600">Bemorlar uchun rejalashtirilgan muolajalar</p>
      </div>

      {/* Filtrlar */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'barchasi', label: 'Barchasi' },
            { key: 'bugun', label: 'Bugun' },
            { key: 'ertaga', label: 'Ertaga' },
            { key: 'kechikkan', label: 'Kechikkan' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap ${
                filter === filterOption.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <i className="ri-medicine-bottle-line text-blue-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Jami muolajalar</p>
              <p className="text-xl font-bold text-gray-900">{filteredTreatments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <i className="ri-check-line text-green-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Berildi</p>
              <p className="text-xl font-bold text-gray-900">
                {filteredTreatments.filter(t => t.status === 'berildi').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <i className="ri-calendar-line text-yellow-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Rejalashtirilgan</p>
              <p className="text-xl font-bold text-gray-900">
                {filteredTreatments.filter(t => t.status === 'rejalashtirilgan').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center">
            <i className="ri-time-line text-red-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Kechikkan</p>
              <p className="text-xl font-bold text-gray-900">
                {filteredTreatments.filter(t => t.status === 'kechikti').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Muolajalar ro'yxati */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doza</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaqt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Izoh</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTreatments.map((treatment) => (
                <tr key={treatment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 text-sm"></i>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {getPatientName(treatment.patient_id)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{treatment.dori_nomi}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{treatment.doza}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="capitalize">{treatment.qabul_vaqti}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(treatment.status)}`}>
                      <i className={`${getStatusIcon(treatment.status)} mr-1`}></i>
                      {treatment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{treatment.izoh}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {treatment.status === 'rejalashtirilgan' && (
                        <button
                          onClick={() => handleStatusChange(treatment.id, 'berildi')}
                          className="text-green-600 hover:text-green-900 cursor-pointer whitespace-nowrap"
                        >
                          Berildi
                        </button>
                      )}
                      {treatment.status === 'rejalashtirilgan' && (
                        <button
                          onClick={() => handleStatusChange(treatment.id, 'kechikti')}
                          className="text-red-600 hover:text-red-900 cursor-pointer whitespace-nowrap"
                        >
                          Kechikti
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTreatments.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-medicine-bottle-line text-gray-400 text-6xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Muolajalar topilmadi</h3>
          <p className="text-gray-500">Tanlangan filtr bo'yicha muolajalar mavjud emas.</p>
        </div>
      )}
    </div>
  );
}