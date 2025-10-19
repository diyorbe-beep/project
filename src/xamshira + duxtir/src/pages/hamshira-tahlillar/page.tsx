import { useState } from 'react';
import { labOrdersData, labSamplesData, nursesData, nurseAssignmentsData } from '../../mocks/nurses';
import { patientsData } from '../../mocks/patients';

export default function HamshiraTahlillar() {
  const [currentNurse] = useState(nursesData[0]);
  const [orders, setOrders] = useState(labOrdersData);
  const [samples, setSamples] = useState(labSamplesData);

  // Hozirgi hamshiraga biriktirilgan bemorlar ID lari
  const assignedPatientIds = nurseAssignmentsData
    .filter(assignment => assignment.nurse_id === currentNurse.id && assignment.status === 'faol')
    .map(assignment => assignment.patient_id);

  // Filtrlangan buyurtmalar
  const filteredOrders = orders.filter(order => assignedPatientIds.includes(order.patient_id));

  const handleSampleTaken = (orderId: number) => {
    const newSample = {
      id: samples.length + 1,
      order_id: orderId,
      olindi_vaqti: new Date().toISOString(),
      topshirildi_vaqti: '',
      izoh: 'Namuna olindi'
    };

    setSamples(prev => [...prev, newSample]);
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, holat: 'qabul_qilindi' }
        : order
    ));
  };

  const handleSampleDelivered = (orderId: number) => {
    const sampleIndex = samples.findIndex(s => s.order_id === orderId);
    if (sampleIndex !== -1) {
      setSamples(prev => prev.map((sample, index) => 
        index === sampleIndex 
          ? { ...sample, topshirildi_vaqti: new Date().toISOString(), izoh: 'Laboratoriyaga topshirildi' }
          : sample
      ));
    }
  };

  const getPatientName = (patientId: number) => {
    const patient = patientsData.find(p => p.id === patientId);
    return patient ? `${patient.ism} ${patient.familiya}` : 'Noma\'lum';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'buyurtma': return 'bg-yellow-100 text-yellow-800';
      case 'qabul_qilindi': return 'bg-blue-100 text-blue-800';
      case 'tayyor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'buyurtma': return 'ri-calendar-line';
      case 'qabul_qilindi': return 'ri-flask-line';
      case 'tayyor': return 'ri-check-line';
      default: return 'ri-question-line';
    }
  };

  const getSampleInfo = (orderId: number) => {
    return samples.find(s => s.order_id === orderId);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tahlillar</h1>
        <p className="text-gray-600">Tahlil buyurtmalari va namuna olish</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <i className="ri-calendar-line text-yellow-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Buyurtmalar</p>
              <p className="text-xl font-bold text-gray-900">
                {filteredOrders.filter(o => o.holat === 'buyurtma').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <i className="ri-flask-line text-blue-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Qabul qilindi</p>
              <p className="text-xl font-bold text-gray-900">
                {filteredOrders.filter(o => o.holat === 'qabul_qilindi').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <i className="ri-check-line text-green-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Tayyor</p>
              <p className="text-xl font-bold text-gray-900">
                {filteredOrders.filter(o => o.holat === 'tayyor').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <i className="ri-test-tube-line text-purple-500 text-2xl"></i>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Jami namunalar</p>
              <p className="text-xl font-bold text-gray-900">{samples.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tahlil buyurtmalari ro'yxati */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Tahlil buyurtmalari</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bemor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahlil</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Namuna ma'lumoti</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const sampleInfo = getSampleInfo(order.id);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-blue-600 text-sm"></i>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {getPatientName(order.patient_id)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.test_nomi}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.sana}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.holat)}`}>
                        <i className={`${getStatusIcon(order.holat)} mr-1`}></i>
                        {order.holat}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sampleInfo ? (
                        <div>
                          <div>Olindi: {new Date(sampleInfo.olindi_vaqti).toLocaleString('uz-UZ')}</div>
                          {sampleInfo.topshirildi_vaqti && (
                            <div>Topshirildi: {new Date(sampleInfo.topshirildi_vaqti).toLocaleString('uz-UZ')}</div>
                          )}
                        </div>
                      ) : (
                        'Namuna olinmagan'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {order.holat === 'buyurtma' && (
                          <button
                            onClick={() => handleSampleTaken(order.id)}
                            className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                          >
                            Namuna olindi
                          </button>
                        )}
                        {order.holat === 'qabul_qilindi' && sampleInfo && !sampleInfo.topshirildi_vaqti && (
                          <button
                            onClick={() => handleSampleDelivered(order.id)}
                            className="text-green-600 hover:text-green-900 cursor-pointer whitespace-nowrap"
                          >
                            Laboratoriyaga topshirish
                          </button>
                        )}
                        {order.holat === 'tayyor' && (
                          <span className="text-green-600">Natija tayyor</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-test-tube-line text-gray-400 text-6xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tahlil buyurtmalari topilmadi</h3>
          <p className="text-gray-500">Hozircha sizga biriktirilgan bemorlar uchun tahlil buyurtmalari yo'q.</p>
        </div>
      )}

      {/* Namuna olish qo'llanmasi */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Namuna olish qo'llanmasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <i className="ri-drop-line text-red-500 text-xl mr-2"></i>
              <h4 className="font-medium">Qon tahlili</h4>
            </div>
            <p className="text-sm text-gray-600">Och qoringa, ertalab 8:00-10:00 oralig'ida</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <i className="ri-flask-line text-yellow-500 text-xl mr-2"></i>
              <h4 className="font-medium">Siydik tahlili</h4>
            </div>
            <p className="text-sm text-gray-600">Ertalabki birinchi siydik, toza idishda</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <i className="ri-heart-pulse-line text-green-500 text-xl mr-2"></i>
              <h4 className="font-medium">EKG</h4>
            </div>
            <p className="text-sm text-gray-600">Tinch holatda, 10 daqiqa dam olishdan keyin</p>
          </div>
        </div>
      </div>
    </div>
  );
}