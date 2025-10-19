import { useState } from 'react';
import { nursesData, nurseAssignmentsData } from '../../mocks/nurses';
import { patientsData, treatmentItemsData } from '../../mocks/patients';
import { Modal } from '../../components/base/Modal';

export default function HamshiraBemorlar() {
  const [currentNurse] = useState(nursesData[0]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Hozirgi hamshiraga biriktirilgan bemorlar
  const assignedPatients = nurseAssignmentsData
    .filter(assignment => assignment.nurse_id === currentNurse.id && assignment.status === 'faol')
    .map(assignment => {
      const patient = patientsData.find(p => p.id === assignment.patient_id);
      const treatments = treatmentItemsData.filter(t => t.plan_id && patient?.id);
      return { ...patient, assignment, treatments };
    })
    .filter(patient => 
      patient?.ism?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient?.familiya?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Biriktirilgan bemorlar</h1>
        <p className="text-gray-600">Sizga biriktirilgan bemorlar ro'yxati</p>
      </div>

      {/* Qidiruv */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ri-search-line text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Bemor ismini qidiring..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Bemorlar ro'yxati */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yosh</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jins</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xona</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergiya</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignedPatients.map((patient) => (
                <tr key={patient?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient?.ism} {patient?.familiya}</div>
                        <div className="text-sm text-gray-500">ID: {patient?.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient?.yosh}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient?.jins}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient?.telefon}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Xona {patient?.assignment?.room_id || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient?.allergiyalar}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewPatient(patient)}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                    >
                      Ko'rish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bemor ma'lumotlari modali */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Bemor ma'lumotlari">
        {selectedPatient && (
          <div className="space-y-6">
            {/* Asosiy ma'lumotlar */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shaxsiy ma'lumotlar</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">To'liq ism</p>
                  <p className="font-medium">{selectedPatient.ism} {selectedPatient.familiya}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Yosh</p>
                  <p className="font-medium">{selectedPatient.yosh}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jins</p>
                  <p className="font-medium">{selectedPatient.jins}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefon</p>
                  <p className="font-medium">{selectedPatient.telefon}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Manzil</p>
                  <p className="font-medium">{selectedPatient.manzil}</p>
                </div>
              </div>
            </div>

            {/* Tibbiy ma'lumotlar */}
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tibbiy ma'lumotlar</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Allergiyalar</p>
                  <p className="font-medium text-red-600">{selectedPatient.allergiyalar}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Surunkali kasalliklar</p>
                  <p className="font-medium">{selectedPatient.surunkali_kasalliklar}</p>
                </div>
              </div>
            </div>

            {/* Rejalashtirilgan muolajalar */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Rejalashtirilgan muolajalar</h3>
              <div className="space-y-2">
                {selectedPatient.treatments?.length > 0 ? (
                  selectedPatient.treatments.map((treatment: any) => (
                    <div key={treatment.id} className="flex justify-between items-center p-2 bg-white rounded border">
                      <div>
                        <p className="font-medium">{treatment.dori_nomi}</p>
                        <p className="text-sm text-gray-600">{treatment.doza} - {treatment.qabul_vaqti}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        treatment.status === 'berildi' ? 'bg-green-100 text-green-800' :
                        treatment.status === 'kechikti' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {treatment.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Hozircha muolajalar yo'q</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}