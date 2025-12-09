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

// =============================================================================
// NUTRITION TYPES
// =============================================================================

export interface Meal {
  id: number;
  name: string;
  description: string;
  calories: number;
  condition: string;
  ingredients: string[] | MealIngredient[];
  preparation_time: number;
  servings: number;
  image_url: string;
  created_at: string;
  instructions?: string[];
  nutrition_info?: NutritionInfo;
}

export interface MealIngredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface NutritionInfo {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface MealLog {
  id: number;
  patient_id: number;
  meal_id: number;
  meal_name: string;
  date: string;
  time: string;
  calories: number;
  logged_at: string;
}

export interface DailyMealLog {
  date: string;
  total_calories: number;
  meals: {
    id: number;
    meal_name: string;
    time: string;
    calories: number;
  }[];
}

export interface CalorieEntry {
  id: number;
  patient_id: number;
  food_description: string;
  calories: number;
  date: string;
  time: string;
}

// =============================================================================
// FITNESS TYPES
// =============================================================================

export interface YogaSession {
  id: number;
  title: string;
  description: string;
  duration_mins: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  condition: string;
  video_url: string;
  thumbnail: string;
  instructor: string;
  created_at: string;
}

export interface Workout {
  id: number;
  title: string;
  description: string;
  duration_mins: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  condition: string;
  video_url: string;
  thumbnail: string;
  created_at: string;
}

export interface YogaLog {
  id: number;
  patient_id: number;
  yoga_id: number;
  yoga_title: string;
  date: string;
  completed: boolean;
  duration_actual: number;
  logged_at: string;
}

export interface WorkoutLog {
  id: number;
  patient_id: number;
  workout_id: number;
  workout_title: string;
  date: string;
  completed: boolean;
  intensity_level: number;
  duration: number;
}

export interface YogaLogsData {
  week_of: string;
  completed_sessions: number;
  target_sessions: number;
  completion_rate: number;
  logs: {
    id: number;
    date: string;
    yoga_title: string;
    duration: number;
    completed: boolean;
  }[];
}

// =============================================================================
// HEALTH METRICS TYPES
// =============================================================================

export interface VitalType {
  id: number;
  name: string;
  unit: string;
  normal_range_min: number;
  normal_range_max: number;
  description: string;
}

export interface VitalLog {
  id: number;
  date: string;
  value: number;
  status: 'Normal' | 'Warning' | 'Alert';
}

export interface VitalLogsData {
  vital_type: string;
  unit: string;
  logs: VitalLog[];
  trend: 'Increasing' | 'Decreasing' | 'Stable';
  average: number;
  min: number;
  max: number;
}

// =============================================================================
// HABITS TYPES
// =============================================================================

export interface HabitTemplate {
  id: number;
  name: string;
  description: string;
  target_value: number;
  unit: string;
  frequency: string;
  condition: string;
  icon?: string;
}

export interface PatientHabit {
  id: number;
  habit_id: number;
  template_id: number;
  template_name: string;
  target: number;
  unit: string;
  frequency: string;
  start_date: string;
  is_active: boolean;
  streak_days: number;
  icon?: string;
}

export interface HabitLog {
  id: number;
  habit_id: number;
  date: string;
  completed: boolean;
  value: number;
  habit_name: string;
  streak_days: number;
}

export interface HabitSummary {
  habit_name: string;
  target: number;
  completed_days: number;
  total_days: number;
  completion_rate: number;
  current_streak: number;
  logs: {
    date: string;
    value: number;
    completed: boolean;
  }[];
}

export interface HabitLogsData {
  week_of: string;
  habits_summary: HabitSummary[];
}

// =============================================================================
// MEDITATION TYPES
// =============================================================================

export interface MeditationSession {
  id: number;
  title: string;
  description: string;
  duration_mins: number;
  condition: string;
  audio_url: string;
  thumbnail: string;
  instructor: string;
  created_at: string;
}

export interface MeditationLog {
  id: number;
  patient_id: number;
  session_id: number;
  session_title: string;
  date: string;
  completed: boolean;
  time_spent: number;
}

export interface MeditationLogsData {
  total_sessions: number;
  total_minutes: number;
  last_30_days_completion: number;
  logs: {
    id: number;
    date: string;
    session_title: string;
    duration: number;
    time_spent: number;
    completed: boolean;
  }[];
}

// =============================================================================
// RESOURCES TYPES
// =============================================================================

export interface Resource {
  id: number;
  title: string;
  category: string;
  condition: string;
  content_preview: string;
  thumbnail: string;
  read_time_mins: number;
  created_at: string;
  content?: string;
  author?: string;
  updated_at?: string;
}

// =============================================================================
// COMMUNITY TYPES
// =============================================================================

export interface ProgressStory {
  id: number;
  patient_name: string;
  title: string;
  description: string;
  before_after_image: string;
  condition: string;
  days_in_program: number;
  created_at: string;
}

export interface ForumPost {
  id: number;
  patient_name: string;
  title: string;
  content: string;
  category: string;
  replies_count: number;
  is_pinned: boolean;
  created_at: string;
}

// =============================================================================
// PATIENT CONFIG TYPES
// =============================================================================

export interface Template {
  id: number;
  name: string;
  description: string;
  default_modules: string[];
  created_at: string;
}

// =============================================================================
// NEW PATIENT CONFIG, VITALS & TEMPLATES TYPES
// =============================================================================

export interface PatientConfig {
  id?: number;
  user?: number;
  height?: number | null;
  weight?: number | null;
  age?: number | null;
  target_calories?: number | null;
}

export interface HealthTemplate {
  id: number;
  title: string;
  description: string;
}

export interface VitalRecord {
  id: number;
  user: number;
  vital_type: string;
  value: string;
  timestamp: string;
}

export interface CreateVitalRecordData {
  vital_type: string;
  value: string;
}

export interface UpdatePatientConfigData {
  height?: number | null;
  weight?: number | null;
  age?: number | null;
  target_calories?: number | null;
}

// =============================================================================
// PAGINATION
// =============================================================================

export interface Pagination {
  total: number;
  page: number;
  page_size: number;
  total_pages?: number;
}
