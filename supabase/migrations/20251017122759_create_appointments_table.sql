/*
  # Create appointments table for NAJOT CLINIC

  ## Overview
  This migration creates the appointments table to manage patient appointment bookings
  for the NAJOT CLINIC system.

  ## New Tables
  
  ### `appointments`
  Stores all patient appointment bookings with the following columns:
  - `id` (uuid, primary key) - Unique identifier for each appointment
  - `patient_name` (text) - Full name of the patient
  - `phone` (text) - Contact phone number
  - `email` (text, optional) - Patient's email address
  - `service` (text) - Type of service requested (Laboratory, UZI, Pediatrics, etc.)
  - `doctor` (text, optional) - Preferred doctor name
  - `appointment_date` (date) - Requested date for appointment
  - `appointment_time` (text) - Requested time slot
  - `notes` (text, optional) - Additional notes or comments from patient
  - `status` (text) - Appointment status (pending, confirmed, cancelled, completed)
  - `created_at` (timestamptz) - Timestamp when appointment was created

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `appointments` table
  - Public can insert new appointments (for booking)
  - Only authenticated staff can view and update appointments
  
  ### Policies
  1. "Anyone can create appointments" - Allows public to book appointments
  2. "Authenticated users can view all appointments" - Staff access to view bookings
  3. "Authenticated users can update appointments" - Staff can manage appointment status
*/

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  service text NOT NULL,
  doctor text,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  notes text,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create appointments (for public booking)
CREATE POLICY "Anyone can create appointments"
  ON appointments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users (staff) can view all appointments
CREATE POLICY "Authenticated users can view all appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users (staff) can update appointments
CREATE POLICY "Authenticated users can update appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries on appointment date
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);

-- Create index for status queries
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);