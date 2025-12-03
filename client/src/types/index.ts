export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Patient {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  condition: string;
}

export interface ProgramConfig {
  patientId: number;
  templateName: string;
  modules: string[];
  consultationCount: number;
  programDuration: number;
  startDate: string;
  remainingDays: number;
  progressPercentage: number;
}

export interface VitalData {
  value: number;
  unit: string;
  normalRange: string;
  status: 'Normal' | 'Good' | 'Warning' | 'Alert';
  lastUpdated: string;
}

export interface Vitals {
  weight: VitalData;
  bloodSugar: VitalData;
  hormoneLevel: VitalData;
  energyScore: VitalData;
  sleepHours: VitalData;
}

export interface Consultation {
  id: number;
  doctorName: string;
  doctorSpecialization?: string;
  scheduledDate: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  durationMinutes: number;
  meetingLink?: string;
  notes?: string;
}

export interface Habit {
  id: number;
  name: string;
  target: string;
  completed: boolean;
}

export interface WeightTrendData {
  date: string;
  weight: number;
}

export interface DailyCheckIn {
  weight: number;
  energyLevel: number;
  sleepHours: number;
  notes: string;
  lastCheckInDate?: string;
}

export interface DashboardStats {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
}
