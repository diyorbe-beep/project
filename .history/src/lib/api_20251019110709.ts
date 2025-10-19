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
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Patient | null> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  async create(patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Patient>): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Appointments API
export const appointmentsAPI = {
  async getAll(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .order('appointment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getByDate(date: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .eq('appointment_date', date)
      .order('appointment_time', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async create(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Appointment>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }
};

// Vitals API
export const vitalsAPI = {
  async getByPatient(patientId: string): Promise<Vital[]> {
    const { data, error } = await supabase
      .from('vitals')
      .select(`
        *,
        patient:patients(*),
        nurse:staff(*)
      `)
      .eq('patient_id', patientId)
      .order('measurement_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(vital: Omit<Vital, 'id' | 'created_at'>): Promise<Vital> {
    const { data, error } = await supabase
      .from('vitals')
      .insert([vital])
      .select(`
        *,
        patient:patients(*),
        nurse:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }
};

// Lab Tests API
export const labTestsAPI = {
  async getAll(): Promise<LabTest[]> {
    const { data, error } = await supabase
      .from('lab_tests')
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .order('ordered_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getByPatient(patientId: string): Promise<LabTest[]> {
    const { data, error } = await supabase
      .from('lab_tests')
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .eq('patient_id', patientId)
      .order('ordered_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(labTest: Omit<LabTest, 'id' | 'created_at' | 'updated_at'>): Promise<LabTest> {
    const { data, error } = await supabase
      .from('lab_tests')
      .insert([labTest])
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<LabTest>): Promise<LabTest> {
    const { data, error } = await supabase
      .from('lab_tests')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }
};

// Treatment Plans API
export const treatmentPlansAPI = {
  async getByPatient(patientId: string): Promise<TreatmentPlan[]> {
    const { data, error } = await supabase
      .from('treatment_plans')
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .eq('patient_id', patientId)
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(treatmentPlan: Omit<TreatmentPlan, 'id' | 'created_at' | 'updated_at'>): Promise<TreatmentPlan> {
    const { data, error } = await supabase
      .from('treatment_plans')
      .insert([treatmentPlan])
      .select(`
        *,
        patient:patients(*),
        doctor:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }
};

// Treatment Items API
export const treatmentItemsAPI = {
  async getByNurse(nurseId: string): Promise<TreatmentItem[]> {
    const { data, error } = await supabase
      .from('treatment_items')
      .select(`
        *,
        treatment_plan:treatment_plans(*),
        assigned_nurse:staff(*)
      `)
      .eq('assigned_nurse_id', nurseId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateStatus(id: string, status: string): Promise<TreatmentItem> {
    const { data, error } = await supabase
      .from('treatment_items')
      .update({ status })
      .eq('id', id)
      .select(`
        *,
        treatment_plan:treatment_plans(*),
        assigned_nurse:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }
};

// Payments API
export const paymentsAPI = {
  async getAll(): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        patient:patients(*),
        creator:staff(*)
      `)
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getByPatient(patientId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        patient:patients(*),
        creator:staff(*)
      `)
      .eq('patient_id', patientId)
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(payment: Omit<Payment, 'id' | 'created_at'>): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select(`
        *,
        patient:patients(*),
        creator:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }
};

// Notifications API
export const notificationsAPI = {
  async getByUser(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        recipient:staff(*)
      `)
      .eq('recipient_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  },

  async create(notification: Omit<Notification, 'id' | 'created_at' | 'read_at'>): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notification])
      .select(`
        *,
        recipient:staff(*)
      `)
      .single();

    if (error) throw error;
    return data;
  }
};

// Rooms API
export const roomsAPI = {
  async getAll(): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('room_number');

    if (error) throw error;
    return data || [];
  },

  async getAvailable(): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_occupied', false)
      .order('room_number');

    if (error) throw error;
    return data || [];
  },

  async update(id: string, updates: Partial<Room>): Promise<Room> {
    const { data, error } = await supabase
      .from('rooms')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// File Upload API
export const fileAPI = {
  async uploadFile(file: File, patientId?: string, labTestId?: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Save file record to database
    const { error: dbError } = await supabase
      .from('files')
      .insert([{
        file_name: fileName,
        original_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        patient_id: patientId,
        lab_test_id: labTestId
      }]);

    if (dbError) throw dbError;

    return filePath;
  },

  async getFileUrl(filePath: string): Promise<string> {
    const { data } = supabase.storage
      .from('files')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};
