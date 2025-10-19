-- Complete CRM Database Schema for NAJOT CLINIC

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Staff table (employees)
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  phone text,
  role text NOT NULL CHECK (role IN ('admin', 'shifokor', 'hamshira', 'duxtir')),
  specialization text,
  license_number text,
  hire_date date DEFAULT CURRENT_DATE,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  birth_date date,
  gender text CHECK (gender IN ('Erkak', 'Ayol')),
  address text,
  emergency_contact text,
  emergency_phone text,
  insurance_number text,
  allergies text,
  chronic_conditions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_number text UNIQUE NOT NULL,
  room_type text NOT NULL CHECK (room_type IN ('Oddiy palata', 'VIP xona', 'Muolaja xonasi', 'Ambulatoriya')),
  floor integer,
  bed_count integer DEFAULT 1,
  is_occupied boolean DEFAULT false,
  price_per_day decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Appointments table (enhanced)
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  service_type text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  notes text,
  created_by uuid REFERENCES staff(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Patient Admissions table
CREATE TABLE IF NOT EXISTS patient_admissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  room_id uuid REFERENCES rooms(id) ON DELETE SET NULL,
  admission_date timestamptz DEFAULT now(),
  discharge_date timestamptz,
  admission_reason text,
  assigned_doctor_id uuid REFERENCES staff(id),
  assigned_nurse_id uuid REFERENCES staff(id),
  status text DEFAULT 'active' CHECK (status IN ('active', 'discharged', 'transferred')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Diagnoses table
CREATE TABLE IF NOT EXISTS diagnoses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  diagnosis_name text NOT NULL,
  icd_code text,
  description text,
  diagnosis_date timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'chronic')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Treatment Plans table
CREATE TABLE IF NOT EXISTS treatment_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  diagnosis_id uuid REFERENCES diagnoses(id) ON DELETE SET NULL,
  plan_name text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_name text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  duration_days integer,
  instructions text,
  created_at timestamptz DEFAULT now()
);

-- Create Treatment Items table
CREATE TABLE IF NOT EXISTS treatment_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  treatment_plan_id uuid REFERENCES treatment_plans(id) ON DELETE CASCADE,
  medication_id uuid REFERENCES medications(id) ON DELETE SET NULL,
  item_type text NOT NULL CHECK (item_type IN ('medication', 'procedure', 'therapy')),
  item_name text NOT NULL,
  dosage text,
  frequency text,
  start_time time,
  end_time time,
  duration_days integer,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'missed')),
  assigned_nurse_id uuid REFERENCES staff(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Vitals table
CREATE TABLE IF NOT EXISTS vitals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  nurse_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  measurement_date date NOT NULL,
  measurement_time time NOT NULL,
  blood_pressure_systolic integer,
  blood_pressure_diastolic integer,
  heart_rate integer,
  temperature decimal(4,2),
  oxygen_saturation integer,
  respiratory_rate integer,
  weight decimal(5,2),
  height decimal(5,2),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create Lab Tests table
CREATE TABLE IF NOT EXISTS lab_tests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  test_name text NOT NULL,
  test_type text NOT NULL,
  ordered_date date DEFAULT CURRENT_DATE,
  sample_collected_date date,
  results_available_date date,
  status text DEFAULT 'ordered' CHECK (status IN ('ordered', 'sample_collected', 'in_progress', 'completed', 'cancelled')),
  results text,
  normal_range text,
  interpretation text,
  file_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  admission_id uuid REFERENCES patient_admissions(id) ON DELETE SET NULL,
  amount decimal(10,2) NOT NULL,
  payment_type text NOT NULL CHECK (payment_type IN ('cash', 'card', 'insurance', 'transfer')),
  payment_date timestamptz DEFAULT now(),
  description text,
  receipt_number text,
  created_by uuid REFERENCES staff(id),
  created_at timestamptz DEFAULT now()
);

-- Create Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id uuid REFERENCES staff(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('appointment', 'medication', 'vital', 'lab_result', 'payment', 'general')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  is_read boolean DEFAULT false,
  data jsonb,
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Create Files table for file storage
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name text NOT NULL,
  original_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer,
  mime_type text,
  uploaded_by uuid REFERENCES staff(id),
  patient_id uuid REFERENCES patients(id) ON DELETE SET NULL,
  lab_test_id uuid REFERENCES lab_tests(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_vitals_patient_date ON vitals(patient_id, measurement_date);
CREATE INDEX IF NOT EXISTS idx_treatment_items_status ON treatment_items(status);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id, is_read);

-- Enable Row Level Security
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Staff can view all data
CREATE POLICY "Staff can view all data" ON staff FOR SELECT USING (true);
CREATE POLICY "Staff can view all patients" ON patients FOR SELECT USING (true);
CREATE POLICY "Staff can view all appointments" ON appointments FOR SELECT USING (true);
CREATE POLICY "Staff can view all admissions" ON patient_admissions FOR SELECT USING (true);
CREATE POLICY "Staff can view all diagnoses" ON diagnoses FOR SELECT USING (true);
CREATE POLICY "Staff can view all treatment plans" ON treatment_plans FOR SELECT USING (true);
CREATE POLICY "Staff can view all treatment items" ON treatment_items FOR SELECT USING (true);
CREATE POLICY "Staff can view all vitals" ON vitals FOR SELECT USING (true);
CREATE POLICY "Staff can view all lab tests" ON lab_tests FOR SELECT USING (true);
CREATE POLICY "Staff can view all payments" ON payments FOR SELECT USING (true);
CREATE POLICY "Staff can view their notifications" ON notifications FOR SELECT USING (auth.uid()::text = recipient_id::text);
CREATE POLICY "Staff can view all files" ON files FOR SELECT USING (true);

-- Staff can insert/update data
CREATE POLICY "Staff can insert patients" ON patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update patients" ON patients FOR UPDATE USING (true);
CREATE POLICY "Staff can insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update appointments" ON appointments FOR UPDATE USING (true);
CREATE POLICY "Staff can insert admissions" ON patient_admissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update admissions" ON patient_admissions FOR UPDATE USING (true);
CREATE POLICY "Staff can insert diagnoses" ON diagnoses FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update diagnoses" ON diagnoses FOR UPDATE USING (true);
CREATE POLICY "Staff can insert treatment plans" ON treatment_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update treatment plans" ON treatment_plans FOR UPDATE USING (true);
CREATE POLICY "Staff can insert treatment items" ON treatment_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update treatment items" ON treatment_items FOR UPDATE USING (true);
CREATE POLICY "Staff can insert vitals" ON vitals FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can insert lab tests" ON lab_tests FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update lab tests" ON lab_tests FOR UPDATE USING (true);
CREATE POLICY "Staff can insert payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can insert notifications" ON notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update notifications" ON notifications FOR UPDATE USING (auth.uid()::text = recipient_id::text);
CREATE POLICY "Staff can insert files" ON files FOR INSERT WITH CHECK (true);

-- Public can create appointments
CREATE POLICY "Public can create appointments" ON appointments FOR INSERT WITH CHECK (true);

-- Insert initial data
INSERT INTO staff (email, password_hash, full_name, phone, role, specialization) VALUES
('admin@najotclinic.uz', '$2a$10$rQZ8K9vX7mN2pL1sT4uE6eH8fG3iJ5kM7nP9qR2sU4vW6xY8zA0bC2dE4fG6h', 'Administrator', '+998901234567', 'admin', 'System Administrator'),
('shifokor@najotclinic.uz', '$2a$10$rQZ8K9vX7mN2pL1sT4uE6eH8fG3iJ5kM7nP9qR2sU4vW6xY8zA0bC2dE4fG6h', 'Dr. Kamila Rahimova', '+998902345678', 'shifokor', 'Kardiolog'),
('hamshira@najotclinic.uz', '$2a$10$rQZ8K9vX7mN2pL1sT4uE6eH8fG3iJ5kM7nP9qR2sU4vW6xY8zA0bC2dE4fG6h', 'Gulnora Abdullayeva', '+998903456789', 'hamshira', 'Hamshira'),
('duxtir@najotclinic.uz', '$2a$10$rQZ8K9vX7mN2pL1sT4uE6eH8fG3iJ5kM7nP9qR2sU4vW6xY8zA0bC2dE4fG6h', 'Malika Toshmatova', '+998904567890', 'duxtir', 'Duxtir');

-- Insert sample rooms
INSERT INTO rooms (room_number, room_type, floor, bed_count, price_per_day) VALUES
('101', 'Oddiy palata', 1, 2, 150000),
('102', 'Oddiy palata', 1, 2, 150000),
('201', 'VIP xona', 2, 1, 300000),
('202', 'VIP xona', 2, 1, 300000),
('301', 'Muolaja xonasi', 3, 4, 200000),
('401', 'Ambulatoriya', 4, 1, 100000);

-- Insert sample medications
INSERT INTO medications (medication_name, dosage, frequency, duration_days, instructions) VALUES
('Metformin', '500mg', 'Kuniga 2 marta', 30, 'Ovqatdan keyin'),
('Insulin', '10 birlik', 'Kuniga 3 marta', 30, 'Ovqatdan oldin'),
('Paracetamol', '500mg', 'Zarur bo\'lganda', 7, 'Isitma uchun'),
('Amoxicillin', '250mg', 'Kuniga 3 marta', 10, 'Antibiotik kursi');
