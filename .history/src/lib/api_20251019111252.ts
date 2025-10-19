import { supabase } from './supabase';

// Types
export interface Staff {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'shifokor' | 'hamshira' | 'duxtir';
  specialization?: string;
  license_number?: string;
  hire_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  birth_date?: string;
  gender?: 'Erkak' | 'Ayol';
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  insurance_number?: string;
  allergies?: string;
  chronic_conditions?: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id?: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  doctor?: Staff;
}

export interface Vital {
  id: string;
  patient_id: string;
  nurse_id?: string;
  measurement_date: string;
  measurement_time: string;
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  heart_rate?: number;
  temperature?: number;
  oxygen_saturation?: number;
  respiratory_rate?: number;
  weight?: number;
  height?: number;
  notes?: string;
  created_at: string;
  patient?: Patient;
  nurse?: Staff;
}

export interface LabTest {
  id: string;
  patient_id: string;
  doctor_id?: string;
  test_name: string;
  test_type: string;
  ordered_date: string;
  sample_collected_date?: string;
  results_available_date?: string;
  status: 'ordered' | 'sample_collected' | 'in_progress' | 'completed' | 'cancelled';
  results?: string;
  normal_range?: string;
  interpretation?: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  doctor?: Staff;
}

export interface TreatmentPlan {
  id: string;
  patient_id: string;
  doctor_id?: string;
  diagnosis_id?: string;
  plan_name: string;
  start_date: string;
  end_date?: string;
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  doctor?: Staff;
}

export interface TreatmentItem {
  id: string;
  treatment_plan_id: string;
  medication_id?: string;
  item_type: 'medication' | 'procedure' | 'therapy';
  item_name: string;
  dosage?: string;
  frequency?: string;
  start_time?: string;
  end_time?: string;
  duration_days?: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'missed';
  assigned_nurse_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  treatment_plan?: TreatmentPlan;
  medication?: any;
  assigned_nurse?: Staff;
}

export interface Payment {
  id: string;
  patient_id: string;
  appointment_id?: string;
  admission_id?: string;
  amount: number;
  payment_type: 'cash' | 'card' | 'insurance' | 'transfer';
  payment_date: string;
  description?: string;
  receipt_number?: string;
  created_by?: string;
  created_at: string;
  patient?: Patient;
  creator?: Staff;
}

export interface Notification {
  id: string;
  recipient_id: string;
  title: string;
  message: string;
  type: 'appointment' | 'medication' | 'vital' | 'lab_result' | 'payment' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  is_read: boolean;
  data?: any;
  created_at: string;
  read_at?: string;
  recipient?: Staff;
}

export interface Room {
  id: string;
  room_number: string;
  room_type: 'Oddiy palata' | 'VIP xona' | 'Muolaja xonasi' | 'Ambulatoriya';
  floor?: number;
  bed_count: number;
  is_occupied: boolean;
  price_per_day?: number;
  created_at: string;
  updated_at: string;
}

// Mock data for development
const mockStaff: Staff[] = [
  {
    id: '1',
    email: 'admin@najotclinic.uz',
    full_name: 'Administrator',
    phone: '+998901234567',
    role: 'admin',
    specialization: 'System Administrator',
    license_number: 'ADM001',
    hire_date: '2024-01-01',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'shifokor@najotclinic.uz',
    full_name: 'Dr. Kamila Rahimova',
    phone: '+998902345678',
    role: 'shifokor',
    specialization: 'Kardiolog',
    license_number: 'DOC001',
    hire_date: '2024-01-01',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'hamshira@najotclinic.uz',
    full_name: 'Gulnora Abdullayeva',
    phone: '+998903456789',
    role: 'hamshira',
    specialization: 'Hamshira',
    license_number: 'NUR001',
    hire_date: '2024-01-01',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    email: 'duxtir@najotclinic.uz',
    full_name: 'Malika Toshmatova',
    phone: '+998904567890',
    role: 'duxtir',
    specialization: 'Duxtir',
    license_number: 'REC001',
    hire_date: '2024-01-01',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const mockPatients: Patient[] = [
  {
    id: '1',
    full_name: 'Ahmad Karimov',
    phone: '+998901234567',
    email: 'ahmad@example.com',
    birth_date: '1990-05-15',
    gender: 'Erkak',
    address: 'Toshkent shahri, Yunusobod tumani',
    emergency_contact: 'Malika Karimova',
    emergency_phone: '+998901234568',
    insurance_number: 'INS001',
    allergies: 'Penicillin',
    chronic_conditions: 'Diabetes',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    full_name: 'Malika Toshmatova',
    phone: '+998902345678',
    email: 'malika@example.com',
    birth_date: '1985-03-20',
    gender: 'Ayol',
    address: 'Toshkent shahri, Chilonzor tumani',
    emergency_contact: 'Akmal Toshmatov',
    emergency_phone: '+998902345679',
    insurance_number: 'INS002',
    allergies: 'Aspirin',
    chronic_conditions: 'Hypertension',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  }
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patient_id: '1',
    doctor_id: '2',
    appointment_date: '2024-01-20',
    appointment_time: '10:00',
    service_type: 'Konsultatsiya',
    status: 'confirmed',
    notes: 'Qalblashtirish tekshiruvi',
    created_by: '1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    patient: mockPatients[0],
    doctor: mockStaff[1]
  }
];

// Auth API
export const authAPI = {
  async login(email: string, password: string): Promise<{ user: Staff | null; error: string | null }> {
    try {
      // Mock login - find user by email
      const user = mockStaff.find(staff => staff.email === email);
      
      if (!user) {
        return { user: null, error: 'Email yoki parol noto\'g\'ri' };
      }

      // For demo purposes, we'll skip password verification
      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'Xatolik yuz berdi' };
    }
  },

  async getCurrentUser(): Promise<Staff | null> {
    try {
      // Return first admin user for demo
      return mockStaff[0];
    } catch {
      return null;
    }
  }
};

// Patients API
export const patientsAPI = {
  async getAll(): Promise<Patient[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPatients;
  },

  async getById(id: string): Promise<Patient | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPatients.find(p => p.id === id) || null;
  },

  async create(patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockPatients.unshift(newPatient);
    return newPatient;
  },

  async update(id: string, updates: Partial<Patient>): Promise<Patient> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    
    mockPatients[index] = {
      ...mockPatients[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    return mockPatients[index];
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    mockPatients.splice(index, 1);
  }
};

// Appointments API
export const appointmentsAPI = {
  async getAll(): Promise<Appointment[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAppointments;
  },

  async getByDate(date: string): Promise<Appointment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAppointments.filter(a => a.appointment_date === date);
  },

  async create(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<Appointment> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockAppointments.unshift(newAppointment);
    return newAppointment;
  },

  async update(id: string, updates: Partial<Appointment>): Promise<Appointment> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockAppointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    mockAppointments[index] = {
      ...mockAppointments[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    return mockAppointments[index];
  }
};

// Vitals API
export const vitalsAPI = {
  async getByPatient(patientId: string): Promise<Vital[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  async create(vital: Omit<Vital, 'id' | 'created_at'>): Promise<Vital> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newVital: Vital = {
      ...vital,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    return newVital;
  }
};

// Lab Tests API
export const labTestsAPI = {
  async getAll(): Promise<LabTest[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  async getByPatient(patientId: string): Promise<LabTest[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  },

  async create(labTest: Omit<LabTest, 'id' | 'created_at' | 'updated_at'>): Promise<LabTest> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newLabTest: LabTest = {
      ...labTest,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    return newLabTest;
  },

  async update(id: string, updates: Partial<LabTest>): Promise<LabTest> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const updatedLabTest: LabTest = {
      id,
      patient_id: '',
      test_name: '',
      test_type: '',
      ordered_date: '',
      status: 'ordered',
      created_at: '',
      updated_at: '',
      ...updates,
      updated_at: new Date().toISOString()
    };
    return updatedLabTest;
  }
};

// Treatment Plans API
export const treatmentPlansAPI = {
  async getByPatient(patientId: string): Promise<TreatmentPlan[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  async create(treatmentPlan: Omit<TreatmentPlan, 'id' | 'created_at' | 'updated_at'>): Promise<TreatmentPlan> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newTreatmentPlan: TreatmentPlan = {
      ...treatmentPlan,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    return newTreatmentPlan;
  }
};

// Treatment Items API
export const treatmentItemsAPI = {
  async getByNurse(nurseId: string): Promise<TreatmentItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  async updateStatus(id: string, status: string): Promise<TreatmentItem> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const updatedItem: TreatmentItem = {
      id,
      treatment_plan_id: '',
      item_type: 'medication',
      item_name: '',
      status: status as any,
      created_at: '',
      updated_at: new Date().toISOString()
    };
    return updatedItem;
  }
};

// Payments API
export const paymentsAPI = {
  async getAll(): Promise<Payment[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  async getByPatient(patientId: string): Promise<Payment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  },

  async create(payment: Omit<Payment, 'id' | 'created_at'>): Promise<Payment> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    return newPayment;
  }
};

// Notifications API
export const notificationsAPI = {
  async getByUser(userId: string): Promise<Notification[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  async markAsRead(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
  },

  async create(notification: Omit<Notification, 'id' | 'created_at' | 'read_at'>): Promise<Notification> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    return newNotification;
  }
};

// Rooms API
export const roomsAPI = {
  async getAll(): Promise<Room[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: '1',
        room_number: '101',
        room_type: 'Oddiy palata',
        floor: 1,
        bed_count: 2,
        is_occupied: false,
        price_per_day: 150000,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        room_number: '201',
        room_type: 'VIP xona',
        floor: 2,
        bed_count: 1,
        is_occupied: true,
        price_per_day: 300000,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];
  },

  async getAvailable(): Promise<Room[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {
        id: '1',
        room_number: '101',
        room_type: 'Oddiy palata',
        floor: 1,
        bed_count: 2,
        is_occupied: false,
        price_per_day: 150000,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];
  },

  async update(id: string, updates: Partial<Room>): Promise<Room> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const updatedRoom: Room = {
      id,
      room_number: '',
      room_type: 'Oddiy palata',
      bed_count: 1,
      is_occupied: false,
      created_at: '',
      updated_at: '',
      ...updates,
      updated_at: new Date().toISOString()
    };
    return updatedRoom;
  }
};

// File Upload API
export const fileAPI = {
  async uploadFile(file: File, patientId?: string, labTestId?: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const fileName = `${Date.now()}_${file.name}`;
    return `uploads/${fileName}`;
  },

  async getFileUrl(filePath: string): Promise<string> {
    return `https://demo-storage.com/${filePath}`;
  }
};