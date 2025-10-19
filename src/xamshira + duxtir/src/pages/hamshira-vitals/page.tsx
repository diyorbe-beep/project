import { useState } from 'react';
import { vitalsData, nursesData, nurseAssignmentsData } from '../../mocks/nurses';
import { patientsData } from '../../mocks/patients';
import { Modal } from '../../components/base/Modal';

export default function HamshiraVitals() {
  const [currentNurse] = useState(nursesData[0]);
  const [vitals, setVitals] = useState(vitalsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [newVital, setNewVital] = useState({
    patient_id: 0,
    sana: new Date().toISOString().split('T')[0],
    vaqt: new Date().toTimeString().slice(0, 5),
    BP_sistol: '',
    BP_diastol: '',
    puls: '',
    temp: '',
    SpO2: '',
    nafas: '',
    izoh: ''
  });

  // Hozirgi hamshiraga biriktirilgan bemorlar
  const assignedPatients = nurseAssignmentsData
    .filter(assignment => assignment.nurse_id === currentNurse.id && assignment.status === 'faol')
    .map(assignment => {
      const patient = patientsData.find(p => p.id === assignment.patient_id);
      const patientVitals = vitals.filter(v => v.patient_id === assignment.patient_id);
      return { ...patient, assignment, vitals: patientVitals };
    });

  const handleAddVital = () => {
    setIsModalOpen(true);
  };

  const handleSaveVital = () => {
    if (!newVital.patient_id || !newVital.BP_sistol || !newVital.BP_diastol || !newVital.puls || !newVital.temp) {
      alert('Iltimos, barcha majburiy maydonlarni to\'ldiring');
      return;
    }

    const vital = {
      id: vitals.length + 1,
      patient_id: newVital.patient_id,
      sana: newVital.sana,
      vaqt: newVital.vaqt,
      BP_sistol: parseInt(newVital.BP_sistol),
      BP_diastol: parseInt(newVital.BP_diastol),
      puls: parseInt(newVital.puls),
      temp: parseFloat(newVital.temp),
      SpO2: parseInt(newVital.SpO2),
      nafas: parseInt(newVital.nafas),
      izoh: newVital.izoh
    };

    setVitals(prev => [...prev, vital]);
    setIsModalOpen(false);
    setNewVital({
      patient_id: 0,
      sana: new Date().toISOString().split('T')[0],
      vaqt: new Date().toTimeString().slice(0, 5),
      BP_sistol: '',
      BP_diastol: '',
      puls: '',
      temp: '',
      SpO2: '',
      nafas: '',
      izoh: ''
    });

    // Normaldan chiqsa ogohlantirish
    if (vital.BP_sistol > 140 || vital.BP_diastol > 90 || vital.temp > 37.5) {
      alert('Diqqat! Ko\'rsatkichlar me\'yordan yuqori - shifokorga xabar yuborildi.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewVital({
      patient_id: 0,
      sana: new Date().toISOString().split('T')[0],
      vaqt: new Date().toTimeString().slice(0, 5),
      BP_sistol: '',
      BP_diastol: '',
      puls: '',
      temp: '',
      SpO2: '',
      nafas: '',
      izoh: ''
    });
  };

  const getPatientName = (patientId: number) => {
    const patient = patientsData.find(p => p.id === patientId);
    return patient ? `${patient.ism} ${patient.familiya}` : 'Noma\'lum';
  };

  const isAbnormal = (vital: any) => {
    return vital.BP_sistol > 140 || vital.BP_diastol > 90 || vital.temp > 37.5 || vital.puls > 100 || vital.SpO2 < 95;
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hayotiy ko'rsatkichlar</h1>
            <p className="text-gray-600">Bemorlarning hayotiy ko'rsatkichlarini kuzatish va kiritish</p>
          </div>
          <button
            onClick={handleAddVital}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
            Ko'rsatkich kiritish
          </button>
        </div>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <i className="ri-heart-pulse-line text-blue-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Bugun kiritilgan</p>
              <p className="text-xl font-bold text-gray-900">
                {vitals.filter(v => v.sana === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center">
            <i className="ri-alert-line text-red-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Me'yordan tashqari</p>
              <p className="text-xl font-bold text-gray-900">
                {vitals.filter(v => isAbnormal(v)).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <i className="ri-check-line text-green-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Normal</p>
              <p className="text-xl font-bold text-gray-900">
                {vitals.filter(v => !isAbnormal(v)).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <i className="ri-user-heart-line text-yellow-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Kuzatilayotgan bemorlar</p>
              <p className="text-xl font-bold text-gray-900">{assignedPatients.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hayotiy ko'rsatkichlar ro'yxati */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana/Vaqt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bosim</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puls</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harorat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SpO₂</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nafas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Izoh</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitals.map((vital) => (
                <tr key={vital.id} className={`hover:bg-gray-50 ${isAbnormal(vital) ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 text-sm"></i>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {getPatientName(vital.patient_id)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{vital.sana}</div>
                    <div className="text-xs text-gray-500">{vital.vaqt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={vital.BP_sistol > 140 || vital.BP_diastol > 90 ? 'text-red-600 font-semibold' : ''}>
                      {vital.BP_sistol}/{vital.BP_diastol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={vital.puls > 100 ? 'text-red-600 font-semibold' : ''}>
                      {vital.puls}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={vital.temp > 37.5 ? 'text-red-600 font-semibold' : ''}>
                      {vital.temp}°C
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={vital.SpO2 < 95 ? 'text-red-600 font-semibold' : ''}>
                      {vital.SpO2}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vital.nafas}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.izoh}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isAbnormal(vital) ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <i className="ri-alert-line mr-1"></i>
                        Me'yordan tashqari
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <i className="ri-check-line mr-1"></i>
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ko'rsatkich kiritish modali */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Hayotiy ko'rsatkich kiritish">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bemor</label>
            <select
              value={newVital.patient_id}
              onChange={(e) => setNewVital(prev => ({ ...prev, patient_id: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>Bemorni tanlang</option>
              {assignedPatients.map((patient) => (
                <option key={patient?.id} value={patient?.id}>
                  {patient?.ism} {patient?.familiya}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sana</label>
              <input
                type="date"
                value={newVital.sana}
                onChange={(e) => setNewVital(prev => ({ ...prev, sana: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vaqt</label>
              <input
                type="time"
                value={newVital.vaqt}
                onChange={(e) => setNewVital(prev => ({ ...prev, vaqt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sistol bosim *</label>
              <input
                type="number"
                placeholder="120"
                value={newVital.BP_sistol}
                onChange={(e) => setNewVital(prev => ({ ...prev, BP_sistol: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diastol bosim *</label>
              <input
                type="number"
                placeholder="80"
                value={newVital.BP_diastol}
                onChange={(e) => setNewVital(prev => ({ ...prev, BP_diastol: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puls *</label>
              <input
                type="number"
                placeholder="72"
                value={newVital.puls}
                onChange={(e) => setNewVital(prev => ({ ...prev, puls: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harorat *</label>
              <input
                type="number"
                step="0.1"
                placeholder="36.6"
                value={newVital.temp}
                onChange={(e) => setNewVital(prev => ({ ...prev, temp: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SpO₂ (%)</label>
              <input
                type="number"
                placeholder="98"
                value={newVital.SpO2}
                onChange={(e) => setNewVital(prev => ({ ...prev, SpO2: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nafas chastotasi</label>
              <input
                type="number"
                placeholder="18"
                value={newVital.nafas}
                onChange={(e) => setNewVital(prev => ({ ...prev, nafas: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Izoh</label>
            <textarea
              placeholder="Qo'shimcha izohlar..."
              value={newVital.izoh}
              onChange={(e) => setNewVital(prev => ({ ...prev, izoh: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer whitespace-nowrap"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleSaveVital}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer whitespace-nowrap"
            >
              Saqlash
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}