import type { Patient, ProgramConfig, Vitals, Consultation, Habit, WeightTrendData } from '@/types';

// todo: remove mock functionality - replace with API calls

export const mockPatient: Patient = {
  id: 1,
  fullName: "Sarah Khan",
  email: "sarah@example.com",
  phone: "+91-9876543210",
  dateOfBirth: "1990-05-15",
  gender: "Female",
  condition: "PCOD"
};

export const mockProgramConfig: ProgramConfig = {
  patientId: 1,
  templateName: "PCOD",
  modules: ["Nutrition", "Fitness", "Health Metrics", "Consultations"],
  consultationCount: 4,
  programDuration: 90,
  startDate: "2025-12-03",
  remainingDays: 45,
  progressPercentage: 50
};

export const mockVitals: Vitals = {
  weight: {
    value: 67.5,
    unit: "kg",
    normalRange: "55-70",
    status: "Normal",
    lastUpdated: "2025-12-02"
  },
  bloodSugar: {
    value: 92,
    unit: "mg/dL",
    normalRange: "70-100",
    status: "Normal",
    lastUpdated: "2025-12-02"
  },
  hormoneLevel: {
    value: 11.8,
    unit: "mIU/ml",
    normalRange: "5-25",
    status: "Normal",
    lastUpdated: "2025-11-28"
  },
  energyScore: {
    value: 9,
    unit: "/10",
    normalRange: "7-10",
    status: "Good",
    lastUpdated: "2025-12-02"
  },
  sleepHours: {
    value: 7.5,
    unit: "hours",
    normalRange: "7-9",
    status: "Good",
    lastUpdated: "2025-12-02"
  }
};

export const mockConsultations: Consultation[] = [
  {
    id: 1,
    doctorName: "Dr. Priya Singh",
    doctorSpecialization: "Gynecology & PCOD",
    scheduledDate: "2025-12-10T14:00:00Z",
    status: "Scheduled",
    durationMinutes: 30,
    meetingLink: "https://meet.google.com/abc-defg"
  },
  {
    id: 2,
    doctorName: "Dr. Amit Sharma",
    doctorSpecialization: "Wellness Coach",
    scheduledDate: "2025-12-17T15:00:00Z",
    status: "Scheduled",
    durationMinutes: 30,
    meetingLink: "https://meet.google.com/xyz-uvwx"
  },
  {
    id: 3,
    doctorName: "Dr. Priya Singh",
    doctorSpecialization: "Gynecology & PCOD",
    scheduledDate: "2025-12-05T10:00:00Z",
    status: "Completed",
    durationMinutes: 30,
    notes: "PCOD management plan discussed. Continue current diet and exercise routine."
  }
];

export const mockTodayHabits: Habit[] = [
  { id: 1, name: "Drink Water", target: "3L", completed: true },
  { id: 2, name: "Take Yoga", target: "20 mins", completed: true },
  { id: 3, name: "Log Meal", target: "3 meals", completed: false },
  { id: 4, name: "Meditation", target: "10 mins", completed: true }
];

export const mockWeightTrend: WeightTrendData[] = [
  { date: "2025-11-03", weight: 68.5 },
  { date: "2025-11-06", weight: 68.2 },
  { date: "2025-11-09", weight: 68.0 },
  { date: "2025-11-12", weight: 67.8 },
  { date: "2025-11-15", weight: 67.5 },
  { date: "2025-11-18", weight: 67.3 },
  { date: "2025-11-21", weight: 67.1 },
  { date: "2025-11-24", weight: 66.9 },
  { date: "2025-11-27", weight: 66.7 },
  { date: "2025-11-30", weight: 66.5 },
  { date: "2025-12-03", weight: 67.5 }
];

export const mockTodayTasks = [
  { id: 1, title: "Complete morning yoga session", completed: true },
  { id: 2, title: "Log breakfast and lunch meals", completed: false },
  { id: 3, title: "Check today's vitals", completed: false },
  { id: 4, title: "Evening meditation (10 mins)", completed: false }
];

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
