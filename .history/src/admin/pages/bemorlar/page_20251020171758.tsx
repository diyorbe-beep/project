import { useState } from 'react';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Modal } from '../../components/base/Modal';
import { patientsData } from '../../mocks/patients';

export default function BemolarPage() {
  const [patients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.ism.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.familiya.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Shifokor profili */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <i className="ri-user-line text-xl sm:text-2xl lg:text-3xl text-gray-400"></i>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Dr.alfohonov</h2>
                
                <div className="space-y-2 sm:space-y-3 text-left">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">F.I.Sh:</span>
                    <span className="text-gray-900">Terapeyt</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Spekslailz:</span>
                    <span className="text-gray-900">yuqori toifali</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Ish grafig jarelari:</span>
                    <span className="text-gray-900">8</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Ish grafigi:</span>
                    <span className="text-gray-900">08:00 - 17:00</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Tasnxis qo'yish
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Hamshira biriktirish
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bemor ma'lumoti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Bemor ma'lumoti</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ism:</span>
                    <span className="text-gray-900">Yosuf Ahmedov</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yosh:</span>
                    <span className="text-gray-900">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jins:</span>
                    <span className="text-gray-900">Er</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Card:</span>
                    <span className="text-gray-900">5684326702</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Xona va hamshira */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Xona va hamshira</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Xona:</span>
                    <span className="text-gray-900">202</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hamshira:</span>
                    <span className="text-gray-900">Mohira Eshmurodova</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Muolaja tartibi */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Muolaja tartibi</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Dori</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Vaqti</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Dovomiy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-900">Dorothi</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Ertalab, Tushda</td>
                    <td className="px-4 py-3 text-sm text-gray-900">50 mg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tahiil natijalari */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Tahiil natijalari</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tahill</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Natjja</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sana</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Manzil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-900">Qon tahilii</td>
                    <td className="px-4 py-3 text-sm text-gray-900">4.5 mno1/L</td>
                    <td className="px-4 py-3 text-sm text-gray-900">23.07.2023</td>
                    <td className="px-4 py-3 text-sm text-blue-600 flex items-center">
                      <i className="ri-file-line mr-1"></i>
                      natija.pdf
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Bemor ma'lumotlari"
        size="lg"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ism</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPatient.ism}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Familiya</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPatient.familiya}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tug'ilgan sana</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPatient.tugulgan_sana}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jins</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPatient.jins}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefon</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPatient.telefon}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Yosh</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPatient.yosh}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Manzil</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.manzil}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Allergiyalar</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.allergiyalar}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Surunkali kasalliklar</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.surunkali_kasalliklar}</p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Yopish
              </Button>
              <Button icon="ri-stethoscope-line">
                Tashxis qo'yish
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}