/**
 * Nakshatra Health API Service Layer
 * Complete implementation with mock data for all 48 endpoints
 *
 * TODO: Uncomment actual API calls when backend is ready
 * Currently using mock data for frontend development
 */

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ success: boolean; data: T; message?: string }> {
  // TODO: Uncomment when backend is ready
  // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     ...options?.headers,
  //   },
  //   ...options,
  // });
  //
  // if (!response.ok) {
  //   throw new Error(`API Error: ${response.statusText}`);
  // }
  //
  // return response.json();

  // Mock response - remove this when backend is ready
  console.log(`[MOCK API] ${options?.method || 'GET'} ${endpoint}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: {} as T });
    }, 300);
  });
}

// =============================================================================
// 1. AUTHENTICATION ENDPOINTS
// =============================================================================

export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    full_name: string;
    phone: string;
    role: string;
  }) => {
    // return apiRequest('/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        id: 1,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        token: 'mock_token_12345',
      },
    };
  },

  login: async (email: string, password: string) => {
    // return apiRequest('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    // });

    return {
      success: true,
      message: 'Login successful',
      data: {
        id: 1,
        email: 'sarah@example.com',
        full_name: 'Sarah Khan',
        role: 'Patient',
        token: 'mock_token_12345',
      },
    };
  },

  logout: async () => {
    // return apiRequest('/auth/logout', { method: 'POST' });
    return { success: true, message: 'Logged out successfully' };
  },

  getUser: async () => {
    // return apiRequest('/auth/user', { method: 'GET' });
    return {
      success: true,
      data: {
        id: 1,
        email: 'sarah@example.com',
        full_name: 'Sarah Khan',
        phone: '+91-9876543210',
        role: 'Patient',
        created_at: '2025-12-03T10:00:00Z',
      },
    };
  },

  updateUser: async (data: { full_name?: string; phone?: string }) => {
    // return apiRequest('/auth/user', {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: 1,
        email: 'sarah@example.com',
        full_name: data.full_name || 'Sarah Khan',
        phone: data.phone || '+91-9876543210',
        role: 'Patient',
      },
    };
  },
};

// =============================================================================
// 2. PATIENT ENDPOINTS
// =============================================================================

export const patientAPI = {
  getMe: async () => {
    // return apiRequest('/patients/me', { method: 'GET' });
    return {
      success: true,
      data: {
        id: 1,
        user_id: 1,
        full_name: 'Sarah Khan',
        email: 'sarah@example.com',
        date_of_birth: '1990-05-15',
        gender: 'Female',
        medical_history: 'PCOD, irregular periods',
        program_start_date: '2025-12-03',
        created_at: '2025-12-03T10:00:00Z',
      },
    };
  },

  getTemplates: async () => {
    // return apiRequest('/patients/templates', { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'PCOD',
          description: 'Polycystic Ovary Disease treatment program',
          default_modules: ['Nutrition', 'Fitness', 'Health Metrics', 'Consultations'],
          created_at: '2025-12-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'Fertility',
          description: 'Fertility enhancement program',
          default_modules: ['Nutrition', 'Meditation', 'Yoga', 'Health Metrics', 'Consultations'],
          created_at: '2025-12-01T00:00:00Z',
        },
        {
          id: 3,
          name: 'General Wellness',
          description: 'General health and wellness',
          default_modules: ['Nutrition', 'Fitness', 'Meditation', 'Consultations'],
          created_at: '2025-12-01T00:00:00Z',
        },
        {
          id: 4,
          name: 'Hormonal Balance',
          description: 'Hormonal health restoration',
          default_modules: ['Nutrition', 'Health Metrics', 'Consultations', 'Resources'],
          created_at: '2025-12-01T00:00:00Z',
        },
      ],
    };
  },

  getConfig: async () => {
    // return apiRequest('/patients/me/config', { method: 'GET' });
    return {
      success: true,
      data: {
        id: 1,
        patient_id: 1,
        template_id: 1,
        template_name: 'PCOD',
        condition: 'PCOD',
        modules: ['Nutrition', 'Fitness', 'Health Metrics', 'Consultations'],
        consultation_count: 4,
        program_duration: 90,
        remaining_days: 45,
        progress_percentage: 50,
        is_active: true,
        created_at: '2025-12-03T10:00:00Z',
      },
    };
  },

  updateConfig: async (data: {
    patient_id: number;
    template_id: number;
    modules: string[];
    consultation_count: number;
    program_duration: number;
  }) => {
    // return apiRequest('/patients/me/config', {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Patient config updated successfully',
      data: {
        id: 1,
        patient_id: data.patient_id,
        template_name: 'PCOD',
        modules: data.modules,
        consultation_count: data.consultation_count,
        program_duration: data.program_duration,
      },
    };
  },

  getVitals: async () => {
    // return apiRequest('/patients/me/vitals', { method: 'GET' });
    return {
      success: true,
      data: {
        patient_id: 1,
        vitals: {
          weight: {
            value: 68,
            unit: 'kg',
            normal_range: '55-70',
            last_updated: '2025-12-02T14:30:00Z',
            status: 'Normal',
          },
          blood_sugar: {
            value: 95,
            unit: 'mg/dL',
            normal_range: '70-100',
            last_updated: '2025-12-02T09:00:00Z',
            status: 'Normal',
          },
          hormone_level: {
            value: 12.5,
            unit: 'mIU/ml',
            normal_range: '5-25',
            last_updated: '2025-11-28T10:00:00Z',
            status: 'Normal',
          },
          energy_score: {
            value: 8,
            unit: 'score',
            normal_range: '7-10',
            last_updated: '2025-12-02T20:00:00Z',
            status: 'Good',
          },
          sleep_hours: {
            value: 7.5,
            unit: 'hours',
            normal_range: '7-9',
            last_updated: '2025-12-02T08:00:00Z',
            status: 'Good',
          },
        },
      },
    };
  },

  addVitals: async (data: {
    weight?: number;
    blood_sugar?: number;
    hormone_level?: number;
    energy_score?: number;
    sleep_hours?: number;
    notes?: string;
  }) => {
    // return apiRequest('/patients/me/vitals', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Vitals recorded successfully',
      data: {
        id: 5,
        patient_id: 1,
        ...data,
        updated_at: new Date().toISOString(),
      },
    };
  },
};

// =============================================================================
// 3. CONSULTATION ENDPOINTS
// =============================================================================

export const consultationAPI = {
  getAll: async (params?: { status?: string; patient_id?: number; doctor_id?: number }) => {
    // return apiRequest(`/consultations?${new URLSearchParams(params).toString()}`, {
    //   method: 'GET',
    // });
    return {
      success: true,
      data: [
        {
          id: 1,
          patient_id: 1,
          patient_name: 'Sarah Khan',
          doctor_id: 2,
          doctor_name: 'Dr. Priya Singh',
          scheduled_date: '2025-12-10T14:00:00Z',
          status: 'Scheduled',
          duration_minutes: 30,
          notes: null,
          created_at: '2025-12-03T10:00:00Z',
        },
        {
          id: 2,
          patient_id: 1,
          patient_name: 'Sarah Khan',
          doctor_id: 2,
          doctor_name: 'Dr. Priya Singh',
          scheduled_date: '2025-12-17T15:00:00Z',
          status: 'Scheduled',
          duration_minutes: 30,
          notes: null,
          created_at: '2025-12-03T10:00:00Z',
        },
        {
          id: 3,
          patient_id: 1,
          patient_name: 'Sarah Khan',
          doctor_id: 3,
          doctor_name: 'Dr. Amit Sharma',
          scheduled_date: '2025-12-05T10:00:00Z',
          status: 'Completed',
          duration_minutes: 30,
          notes: 'PCOD management plan discussed. Continue current diet.',
          created_at: '2025-12-01T10:00:00Z',
        },
      ],
      pagination: {
        total: 3,
        page: 1,
        page_size: 10,
      },
    };
  },

  getById: async (id: number) => {
    // return apiRequest(`/consultations/${id}`, { method: 'GET' });
    return {
      success: true,
      data: {
        id,
        patient_id: 1,
        patient_name: 'Sarah Khan',
        patient_email: 'sarah@example.com',
        doctor_id: 2,
        doctor_name: 'Dr. Priya Singh',
        doctor_license: 'License #12345',
        doctor_specialization: 'Gynecology & PCOD',
        scheduled_date: '2025-12-10T14:00:00Z',
        status: 'Scheduled',
        duration_minutes: 30,
        meeting_link: 'https://meet.google.com/abc-defg-hij',
        notes: null,
        created_at: '2025-12-03T10:00:00Z',
        consultation_report: null,
      },
    };
  },

  create: async (data: {
    patient_id: number;
    doctor_id: number;
    scheduled_date: string;
    duration_minutes: number;
    notes?: string;
  }) => {
    // return apiRequest('/consultations', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Consultation scheduled successfully',
      data: {
        id: 4,
        patient_id: data.patient_id,
        doctor_id: data.doctor_id,
        scheduled_date: data.scheduled_date,
        status: 'Scheduled',
        duration_minutes: data.duration_minutes,
        meeting_link: 'https://meet.google.com/xyz-uvwx-yzab',
        created_at: new Date().toISOString(),
      },
    };
  },

  updateStatus: async (id: number, data: { status: string; notes?: string }) => {
    // return apiRequest(`/consultations/${id}/status`, {
    //   method: 'PATCH',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Consultation status updated',
      data: {
        id,
        status: data.status,
        notes: data.notes,
        updated_at: new Date().toISOString(),
      },
    };
  },

  getReport: async (id: number) => {
    // return apiRequest(`/consultations/${id}/report`, { method: 'GET' });
    return {
      success: true,
      data: {
        id: 1,
        consultation_id: id,
        doctor_name: 'Dr. Priya Singh',
        report_date: '2025-12-05T10:30:00Z',
        report_text: 'Patient showing good progress. Hormonal levels stable. Continue current treatment plan.',
        recommendations: 'Maintain current diet and exercise routine. Increase water intake to 3L daily. Schedule next follow-up in 2 weeks.',
        next_followup_date: '2025-12-19T10:00:00Z',
        created_at: '2025-12-05T10:30:00Z',
      },
    };
  },
};

// =============================================================================
// 4. NUTRITION ENDPOINTS
// =============================================================================

export const nutritionAPI = {
  getMeals: async (params?: { condition?: string; page?: number; limit?: number }) => {
    // return apiRequest(`/meals?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Quinoa Buddha Bowl',
          description: 'High-protein, low-glycemic bowl with quinoa, roasted vegetables, and tahini dressing',
          calories: 450,
          condition: 'PCOD',
          ingredients: ['Quinoa', 'Spinach', 'Bell Pepper', 'Chickpeas', 'Tahini', 'Lemon'],
          preparation_time: 20,
          servings: 1,
          image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
          created_at: '2025-11-20T00:00:00Z',
        },
        {
          id: 2,
          name: 'Grilled Salmon with Broccoli',
          description: 'Omega-3 rich salmon with steamed broccoli and olive oil drizzle',
          calories: 520,
          condition: 'PCOD',
          ingredients: ['Salmon Fillet', 'Broccoli', 'Olive Oil', 'Garlic', 'Lemon'],
          preparation_time: 25,
          servings: 1,
          image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
          created_at: '2025-11-20T00:00:00Z',
        },
        {
          id: 3,
          name: 'Vegetable Stir-Fry with Tofu',
          description: 'Low-calorie, high-protein vegetable stir-fry with tofu',
          calories: 380,
          condition: 'Fertility',
          ingredients: ['Tofu', 'Carrot', 'Broccoli', 'Soy Sauce', 'Sesame Oil', 'Ginger'],
          preparation_time: 15,
          servings: 1,
          image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
          created_at: '2025-11-20T00:00:00Z',
        },
        {
          id: 4,
          name: 'Greek Yogurt Parfait',
          description: 'Protein-rich parfait with berries and nuts',
          calories: 320,
          condition: 'General',
          ingredients: ['Greek Yogurt', 'Blueberries', 'Strawberries', 'Almonds', 'Honey'],
          preparation_time: 5,
          servings: 1,
          image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
          created_at: '2025-11-20T00:00:00Z',
        },
        {
          id: 5,
          name: 'Lentil Soup',
          description: 'Warming lentil soup with vegetables',
          calories: 290,
          condition: 'PCOD',
          ingredients: ['Red Lentils', 'Tomatoes', 'Carrots', 'Onion', 'Cumin', 'Turmeric'],
          preparation_time: 30,
          servings: 2,
          image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
          created_at: '2025-11-20T00:00:00Z',
        },
        {
          id: 6,
          name: 'Avocado Toast with Eggs',
          description: 'Whole grain toast topped with avocado and poached eggs',
          calories: 420,
          condition: 'General',
          ingredients: ['Whole Grain Bread', 'Avocado', 'Eggs', 'Cherry Tomatoes', 'Black Pepper'],
          preparation_time: 10,
          servings: 1,
          image_url: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
          created_at: '2025-11-20T00:00:00Z',
        },
      ],
      pagination: {
        total: 45,
        page: 1,
        page_size: 10,
      },
    };
  },

  getMealById: async (id: number) => {
    // return apiRequest(`/meals/${id}`, { method: 'GET' });
    return {
      success: true,
      data: {
        id,
        name: 'Quinoa Buddha Bowl',
        description: 'High-protein, low-glycemic bowl',
        calories: 450,
        condition: 'PCOD',
        ingredients: [
          { name: 'Quinoa', quantity: '1', unit: 'cup' },
          { name: 'Spinach', quantity: '2', unit: 'cups' },
          { name: 'Bell Pepper', quantity: '1', unit: 'piece' },
          { name: 'Chickpeas', quantity: '0.5', unit: 'cup' },
          { name: 'Tahini', quantity: '2', unit: 'tbsp' },
        ],
        instructions: [
          'Cook quinoa as per package instructions',
          'Roast vegetables at 200°C for 20 minutes',
          'Mix tahini with lemon juice and water',
          'Assemble bowl and drizzle with dressing',
        ],
        nutrition_info: {
          protein: 18,
          carbs: 65,
          fat: 12,
          fiber: 12,
        },
        preparation_time: 20,
        servings: 1,
      },
    };
  },

  logMeal: async (data: {
    meal_id: number;
    date: string;
    time: string;
    quantity: number;
    custom_calories?: number;
  }) => {
    // return apiRequest('/meal-logs', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Meal logged successfully',
      data: {
        id: 1,
        patient_id: 1,
        meal_id: data.meal_id,
        meal_name: 'Quinoa Buddha Bowl',
        date: data.date,
        time: data.time,
        calories: 450,
        logged_at: new Date().toISOString(),
      },
    };
  },

  getMealLogs: async (params?: { date?: string; start_date?: string; end_date?: string }) => {
    // return apiRequest(`/meal-logs?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: {
        date: params?.date || '2025-12-03',
        total_calories: 1350,
        meals: [
          {
            id: 1,
            meal_name: 'Greek Yogurt Parfait',
            time: '08:30',
            calories: 320,
          },
          {
            id: 2,
            meal_name: 'Grilled Salmon with Broccoli',
            time: '12:30',
            calories: 520,
          },
          {
            id: 3,
            meal_name: 'Quinoa Buddha Bowl',
            time: '18:00',
            calories: 450,
          },
        ],
      },
    };
  },

  addCalorieEntry: async (data: {
    food_description: string;
    calories: number;
    date: string;
    time: string;
  }) => {
    // return apiRequest('/calorie-entry', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Calorie entry logged',
      data: {
        id: 1,
        patient_id: 1,
        ...data,
      },
    };
  },
};

// =============================================================================
// 5. FITNESS ENDPOINTS
// =============================================================================

export const fitnessAPI = {
  getYogaSessions: async (params?: { condition?: string; difficulty?: string; page?: number }) => {
    // return apiRequest(`/yoga-sessions?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          title: 'Morning Yoga for PCOD',
          description: 'Gentle yoga sequence focusing on hormone balance and pelvic health',
          duration_mins: 20,
          difficulty: 'Easy',
          condition: 'PCOD',
          video_url: 'https://cdn.example.com/yoga/morning-pcod.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
          instructor: 'Priya Yoga Master',
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Evening Relaxation Yoga',
          description: 'Wind-down yoga for stress relief and better sleep',
          duration_mins: 15,
          difficulty: 'Easy',
          condition: 'General',
          video_url: 'https://cdn.example.com/yoga/evening-relax.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
          instructor: 'Amit Yoga Trainer',
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 3,
          title: 'Fertility-Boosting Yoga',
          description: 'Yoga poses designed to improve fertility and reproductive health',
          duration_mins: 25,
          difficulty: 'Medium',
          condition: 'Fertility',
          video_url: 'https://cdn.example.com/yoga/fertility.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
          instructor: 'Dr. Yoga Specialist',
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 4,
          title: 'Power Yoga Flow',
          description: 'Dynamic flow for strength and flexibility',
          duration_mins: 30,
          difficulty: 'Hard',
          condition: 'General',
          video_url: 'https://cdn.example.com/yoga/power-flow.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
          instructor: 'Fitness Guru',
          created_at: '2025-11-01T00:00:00Z',
        },
      ],
      pagination: {
        total: 25,
        page: 1,
        page_size: 10,
      },
    };
  },

  logYoga: async (data: {
    yoga_id: number;
    date: string;
    completed: boolean;
    duration_actual: number;
    notes?: string;
  }) => {
    // return apiRequest('/yoga-logs', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Yoga session logged successfully',
      data: {
        id: 1,
        patient_id: 1,
        yoga_id: data.yoga_id,
        yoga_title: 'Morning Yoga for PCOD',
        date: data.date,
        completed: data.completed,
        duration_actual: data.duration_actual,
        logged_at: new Date().toISOString(),
      },
    };
  },

  getYogaLogs: async (params?: { date?: string; start_date?: string }) => {
    // return apiRequest(`/yoga-logs?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: {
        week_of: '2025-11-27 to 2025-12-03',
        completed_sessions: 5,
        target_sessions: 6,
        completion_rate: 83,
        logs: [
          {
            id: 1,
            date: '2025-12-03',
            yoga_title: 'Morning Yoga for PCOD',
            duration: 20,
            completed: true,
          },
          {
            id: 2,
            date: '2025-12-02',
            yoga_title: 'Evening Relaxation Yoga',
            duration: 15,
            completed: true,
          },
          {
            id: 3,
            date: '2025-12-01',
            yoga_title: 'Morning Yoga for PCOD',
            duration: 20,
            completed: true,
          },
        ],
      },
    };
  },

  getWorkouts: async (params?: { condition?: string; difficulty?: string }) => {
    // return apiRequest(`/workouts?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          title: 'Low-Impact Cardio',
          description: 'Walking and cycling exercises for cardiovascular health',
          duration_mins: 30,
          difficulty: 'Medium',
          condition: 'PCOD',
          video_url: 'https://cdn.example.com/workouts/cardio.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Strength Training for Women',
          description: 'Light weight training focusing on core and lower body',
          duration_mins: 25,
          difficulty: 'Medium',
          condition: 'General',
          video_url: 'https://cdn.example.com/workouts/strength.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 3,
          title: 'HIIT for Beginners',
          description: 'High-intensity interval training adapted for beginners',
          duration_mins: 20,
          difficulty: 'Easy',
          condition: 'General',
          video_url: 'https://cdn.example.com/workouts/hiit.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=400',
          created_at: '2025-11-01T00:00:00Z',
        },
      ],
      pagination: {
        total: 18,
        page: 1,
        page_size: 10,
      },
    };
  },

  logWorkout: async (data: {
    workout_id: number;
    date: string;
    completed: boolean;
    intensity_level: number;
    notes?: string;
  }) => {
    // return apiRequest('/workout-logs', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Workout logged successfully',
      data: {
        id: 1,
        patient_id: 1,
        workout_id: data.workout_id,
        workout_title: 'Low-Impact Cardio',
        date: data.date,
        completed: data.completed,
        intensity_level: data.intensity_level,
        duration: 30,
      },
    };
  },
};

// =============================================================================
// 6. HEALTH METRICS ENDPOINTS
// =============================================================================

export const healthMetricsAPI = {
  getVitalTypes: async () => {
    // return apiRequest('/vital-types', { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Weight',
          unit: 'kg',
          normal_range_min: 50,
          normal_range_max: 75,
          description: 'Body weight measurement',
        },
        {
          id: 2,
          name: 'Blood Sugar',
          unit: 'mg/dL',
          normal_range_min: 70,
          normal_range_max: 100,
          description: 'Fasting blood glucose level',
        },
        {
          id: 3,
          name: 'Hormone Level',
          unit: 'mIU/ml',
          normal_range_min: 5,
          normal_range_max: 25,
          description: 'FSH hormone level',
        },
        {
          id: 4,
          name: 'Energy Score',
          unit: 'score',
          normal_range_min: 7,
          normal_range_max: 10,
          description: 'Daily energy level (1-10)',
        },
        {
          id: 5,
          name: 'Sleep Hours',
          unit: 'hours',
          normal_range_min: 7,
          normal_range_max: 9,
          description: 'Hours of sleep per night',
        },
      ],
    };
  },

  getVitalLogs: async (params?: { vital_type_id?: number; days?: number }) => {
    // return apiRequest(`/vital-logs?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: {
        vital_type: 'Weight',
        unit: 'kg',
        logs: [
          { id: 1, date: '2025-12-03', value: 67.5, status: 'Normal' },
          { id: 2, date: '2025-12-01', value: 67.8, status: 'Normal' },
          { id: 3, date: '2025-11-29', value: 68, status: 'Normal' },
          { id: 4, date: '2025-11-27', value: 68.2, status: 'Normal' },
          { id: 5, date: '2025-11-25', value: 68.5, status: 'Normal' },
        ],
        trend: 'Decreasing',
        average: 68.0,
        min: 67.5,
        max: 68.5,
      },
    };
  },

  addVitalLog: async (data: {
    vital_type_id: number;
    value: number;
    date: string;
    time: string;
    notes?: string;
  }) => {
    // return apiRequest('/vital-logs', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Vital logged successfully',
      data: {
        id: 6,
        patient_id: 1,
        vital_type: 'Weight',
        value: data.value,
        unit: 'kg',
        status: 'Normal',
        date: data.date,
        time: data.time,
      },
    };
  },
};

// =============================================================================
// 7. HABITS ENDPOINTS
// =============================================================================

export const habitsAPI = {
  getTemplates: async (params?: { condition?: string }) => {
    // return apiRequest(`/habit-templates?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Drink Water',
          description: 'Drink 3 liters of water daily',
          target_value: 3,
          unit: 'liters',
          frequency: 'Daily',
          condition: 'General',
          icon: '💧',
        },
        {
          id: 2,
          name: 'Sleep 8 Hours',
          description: 'Get 8 hours of quality sleep',
          target_value: 8,
          unit: 'hours',
          frequency: 'Daily',
          condition: 'PCOD',
          icon: '😴',
        },
        {
          id: 3,
          name: 'Take Medications',
          description: 'Take prescribed medications on time',
          target_value: 1,
          unit: 'times',
          frequency: 'Daily',
          condition: 'PCOD',
          icon: '💊',
        },
        {
          id: 4,
          name: 'Meditation',
          description: 'Meditate for 10 minutes',
          target_value: 10,
          unit: 'minutes',
          frequency: 'Daily',
          condition: 'Fertility',
          icon: '🧘‍♀️',
        },
        {
          id: 5,
          name: 'Avoid Processed Foods',
          description: 'Avoid processed foods and sugary drinks',
          target_value: 1,
          unit: 'day',
          frequency: 'Daily',
          condition: 'PCOD',
          icon: '🥗',
        },
        {
          id: 6,
          name: 'Walk 10,000 Steps',
          description: 'Walk at least 10,000 steps daily',
          target_value: 10000,
          unit: 'steps',
          frequency: 'Daily',
          condition: 'General',
          icon: '🚶‍♀️',
        },
      ],
    };
  },

  getHabits: async () => {
    // return apiRequest('/habits', { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          habit_id: 1,
          template_id: 1,
          template_name: 'Drink Water',
          target: 3,
          unit: 'liters',
          frequency: 'Daily',
          start_date: '2025-12-03',
          is_active: true,
          streak_days: 0,
          icon: '💧',
        },
        {
          id: 2,
          habit_id: 2,
          template_id: 2,
          template_name: 'Sleep 8 Hours',
          target: 8,
          unit: 'hours',
          frequency: 'Daily',
          start_date: '2025-12-01',
          is_active: true,
          streak_days: 3,
          icon: '😴',
        },
        {
          id: 3,
          habit_id: 3,
          template_id: 5,
          template_name: 'Avoid Processed Foods',
          target: 1,
          unit: 'day',
          frequency: 'Daily',
          start_date: '2025-11-20',
          is_active: true,
          streak_days: 14,
          icon: '🥗',
        },
      ],
    };
  },

  addHabit: async (data: { template_id: number; start_date: string }) => {
    // return apiRequest('/habits', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Habit added successfully',
      data: {
        id: 4,
        patient_id: 1,
        template_id: data.template_id,
        habit_name: 'Drink Water',
        start_date: data.start_date,
        is_active: true,
      },
    };
  },

  logHabit: async (data: {
    habit_id: number;
    date: string;
    completed: boolean;
    value: number;
    notes?: string;
  }) => {
    // return apiRequest('/habit-logs', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Habit logged successfully',
      data: {
        id: 1,
        habit_id: data.habit_id,
        date: data.date,
        completed: data.completed,
        value: data.value,
        habit_name: 'Drink Water',
        streak_days: 1,
      },
    };
  },

  getHabitLogs: async (params?: { start_date?: string; end_date?: string }) => {
    // return apiRequest(`/habit-logs?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: {
        week_of: '2025-11-27 to 2025-12-03',
        habits_summary: [
          {
            habit_name: 'Sleep 8 Hours',
            target: 8,
            completed_days: 6,
            total_days: 7,
            completion_rate: 86,
            current_streak: 3,
            logs: [
              { date: '2025-12-03', value: 8, completed: true },
              { date: '2025-12-02', value: 7.5, completed: true },
              { date: '2025-12-01', value: 8, completed: true },
            ],
          },
          {
            habit_name: 'Drink Water',
            target: 3,
            completed_days: 5,
            total_days: 7,
            completion_rate: 71,
            current_streak: 0,
            logs: [
              { date: '2025-12-03', value: 3, completed: true },
              { date: '2025-12-02', value: 2.5, completed: false },
              { date: '2025-12-01', value: 3, completed: true },
            ],
          },
        ],
      },
    };
  },
};

// =============================================================================
// 8. MEDITATION ENDPOINTS
// =============================================================================

export const meditationAPI = {
  getSessions: async (params?: { condition?: string; duration?: number }) => {
    // return apiRequest(`/meditation-sessions?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          title: 'Stress Relief Meditation',
          description: 'Guided meditation for reducing stress and anxiety',
          duration_mins: 10,
          condition: 'General',
          audio_url: 'https://cdn.example.com/meditation/stress-relief.mp3',
          thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
          instructor: 'Mindfulness Expert',
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Fertility & Positive Energy',
          description: 'Meditation focused on fertility enhancement and positive mindset',
          duration_mins: 15,
          condition: 'Fertility',
          audio_url: 'https://cdn.example.com/meditation/fertility-energy.mp3',
          thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
          instructor: 'Wellness Coach',
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 3,
          title: 'Sleep Meditation',
          description: 'Relaxing meditation to improve sleep quality',
          duration_mins: 20,
          condition: 'General',
          audio_url: 'https://cdn.example.com/meditation/sleep.mp3',
          thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
          instructor: 'Sleep Specialist',
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 4,
          title: 'Morning Mindfulness',
          description: 'Start your day with clarity and focus',
          duration_mins: 10,
          condition: 'General',
          audio_url: 'https://cdn.example.com/meditation/morning.mp3',
          thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400',
          instructor: 'Mindfulness Expert',
          created_at: '2025-11-01T00:00:00Z',
        },
      ],
      pagination: {
        total: 12,
        page: 1,
        page_size: 10,
      },
    };
  },

  logSession: async (data: {
    session_id: number;
    date: string;
    completed: boolean;
    time_spent: number;
    notes?: string;
  }) => {
    // return apiRequest('/meditation-logs', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Meditation logged successfully',
      data: {
        id: 1,
        patient_id: 1,
        session_id: data.session_id,
        session_title: 'Stress Relief Meditation',
        date: data.date,
        completed: data.completed,
        time_spent: data.time_spent,
      },
    };
  },

  getLogs: async (params?: { days?: number }) => {
    // return apiRequest(`/meditation-logs?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: {
        total_sessions: 12,
        total_minutes: 145,
        last_30_days_completion: 45,
        logs: [
          {
            id: 1,
            date: '2025-12-03',
            session_title: 'Stress Relief Meditation',
            duration: 10,
            time_spent: 10,
            completed: true,
          },
          {
            id: 2,
            date: '2025-12-01',
            session_title: 'Fertility & Positive Energy',
            duration: 15,
            time_spent: 15,
            completed: true,
          },
        ],
      },
    };
  },
};

// =============================================================================
// 9. RESOURCES ENDPOINTS
// =============================================================================

export const resourcesAPI = {
  getAll: async (params?: { category?: string; condition?: string; page?: number }) => {
    // return apiRequest(`/resources?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          title: 'Understanding PCOD: Complete Guide',
          category: 'Articles',
          condition: 'PCOD',
          content_preview: 'PCOD is a hormonal disorder that affects women of reproductive age...',
          thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
          read_time_mins: 8,
          created_at: '2025-11-15T00:00:00Z',
        },
        {
          id: 2,
          title: 'PCOD & Nutrition: Foods to Avoid',
          category: 'Guides',
          condition: 'PCOD',
          content_preview: 'Processed foods and refined sugars worsen PCOD symptoms...',
          thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
          read_time_mins: 6,
          created_at: '2025-11-12T00:00:00Z',
        },
        {
          id: 3,
          title: 'Fertility Myths Debunked',
          category: 'Articles',
          condition: 'Fertility',
          content_preview: 'Not all common fertility myths are true. Let\'s explore the facts...',
          thumbnail: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=400',
          read_time_mins: 7,
          created_at: '2025-11-10T00:00:00Z',
        },
        {
          id: 4,
          title: 'Yoga for Hormonal Balance',
          category: 'Guides',
          condition: 'PCOD',
          content_preview: 'Specific yoga poses can help regulate hormones naturally...',
          thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
          read_time_mins: 10,
          created_at: '2025-11-08T00:00:00Z',
        },
      ],
      pagination: {
        total: 42,
        page: 1,
        page_size: 10,
      },
    };
  },

  getById: async (id: number) => {
    // return apiRequest(`/resources/${id}`, { method: 'GET' });
    return {
      success: true,
      data: {
        id,
        title: 'Understanding PCOD: Complete Guide',
        category: 'Articles',
        condition: 'PCOD',
        thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
        content: `
# Understanding PCOD: A Complete Guide

Polycystic Ovary Disease (PCOD) is a hormonal disorder affecting women of reproductive age. It's characterized by irregular menstrual cycles, excess androgen levels, and polycystic ovaries.

## Symptoms
- Irregular periods
- Weight gain
- Acne
- Excessive hair growth
- Difficulty conceiving

## Management
1. **Lifestyle Changes**: Regular exercise and a balanced diet
2. **Medication**: As prescribed by your doctor
3. **Stress Management**: Yoga and meditation
4. **Regular Monitoring**: Keep track of your symptoms

## Diet Recommendations
- Focus on low-glycemic foods
- Increase fiber intake
- Reduce processed foods and sugar
- Stay hydrated

With the right approach, PCOD can be managed effectively. Work closely with your healthcare team for the best results.
        `,
        read_time_mins: 8,
        author: 'Dr. Priya Singh',
        created_at: '2025-11-15T00:00:00Z',
        updated_at: '2025-11-15T00:00:00Z',
      },
    };
  },
};

// =============================================================================
// 10. COMMUNITY ENDPOINTS
// =============================================================================

export const communityAPI = {
  getProgressStories: async (params?: { condition?: string; page?: number }) => {
    // return apiRequest(`/progress-stories?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          patient_name: 'Priya M.',
          title: 'My PCOD Journey: From Diagnosis to Wellness',
          description: 'After 3 months of the program, my hormone levels stabilized and I lost 5kg!',
          before_after_image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          condition: 'PCOD',
          days_in_program: 90,
          created_at: '2025-11-01T00:00:00Z',
        },
        {
          id: 2,
          patient_name: 'Anjali R.',
          title: 'How I Regained My Energy with Nakshatra',
          description: 'The yoga and nutrition plan helped me sleep better and feel more energetic',
          before_after_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          condition: 'General',
          days_in_program: 60,
          created_at: '2025-10-28T00:00:00Z',
        },
        {
          id: 3,
          patient_name: 'Deepa S.',
          title: 'Fertility Program Success: Pregnancy After PCOD',
          description: 'After completing the fertility program, I found out I\'m pregnant!',
          before_after_image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
          condition: 'Fertility',
          days_in_program: 90,
          created_at: '2025-10-15T00:00:00Z',
        },
      ],
      pagination: {
        total: 18,
        page: 1,
        page_size: 10,
      },
    };
  },

  submitStory: async (data: {
    title: string;
    description: string;
    before_after_image?: string;
  }) => {
    // return apiRequest('/progress-stories', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Story submitted successfully. Pending admin approval.',
      data: {
        id: 20,
        patient_id: 1,
        patient_name: 'Sarah Khan',
        title: data.title,
        status: 'Pending',
        created_at: new Date().toISOString(),
      },
    };
  },

  getForumPosts: async (params?: { category?: string; sort?: string; page?: number }) => {
    // return apiRequest(`/forum-posts?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          patient_name: 'Sarah K.',
          title: 'Tips for managing PCOD symptoms naturally?',
          content: 'I\'m 2 months into the program and looking for additional tips...',
          category: 'PCOD',
          replies_count: 8,
          is_pinned: false,
          created_at: '2025-12-02T10:00:00Z',
        },
        {
          id: 2,
          patient_name: 'Zara P.',
          title: 'Best yoga poses for fertility enhancement',
          content: 'Has anyone found specific yoga poses helpful for fertility?',
          category: 'Fertility',
          replies_count: 12,
          is_pinned: true,
          created_at: '2025-12-01T15:00:00Z',
        },
        {
          id: 3,
          patient_name: 'Neha S.',
          title: 'Dealing with medication side effects',
          content: 'Is anyone experiencing side effects from the medication?',
          category: 'General',
          replies_count: 5,
          is_pinned: false,
          created_at: '2025-11-30T09:00:00Z',
        },
      ],
      pagination: {
        total: 87,
        page: 1,
        page_size: 10,
      },
    };
  },

  createForumPost: async (data: { title: string; content: string; category: string }) => {
    // return apiRequest('/forum-posts', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    return {
      success: true,
      message: 'Post created successfully',
      data: {
        id: 50,
        patient_id: 1,
        patient_name: 'Sarah Khan',
        title: data.title,
        category: data.category,
        created_at: new Date().toISOString(),
      },
    };
  },
};

// =============================================================================
// ADMIN ENDPOINTS
// =============================================================================

export const adminAPI = {
  getPatients: async (params?: { status?: string; condition?: string; page?: number }) => {
    // return apiRequest(`/admin/patients?${new URLSearchParams(params).toString()}`, { method: 'GET' });
    return {
      success: true,
      data: [
        {
          id: 1,
          patient_name: 'Sarah Khan',
          email: 'sarah@example.com',
          condition: 'PCOD',
          program_start_date: '2025-12-03',
          days_completed: 0,
          progress_percentage: 0,
          status: 'Active',
          last_login: '2025-12-03T14:00:00Z',
        },
        {
          id: 2,
          patient_name: 'Priya Sharma',
          email: 'priya@example.com',
          condition: 'Fertility',
          program_start_date: '2025-11-15',
          days_completed: 18,
          progress_percentage: 20,
          status: 'Active',
          last_login: '2025-12-02T10:30:00Z',
        },
      ],
      pagination: {
        total: 24,
        page: 1,
        page_size: 10,
      },
      summary: {
        total_patients: 24,
        active_patients: 20,
        completed_program: 4,
        dropout_risk: 2,
      },
    };
  },

  getDashboard: async () => {
    // return apiRequest('/admin/dashboard', { method: 'GET' });
    return {
      success: true,
      data: {
        summary: {
          total_patients: 24,
          active_patients: 20,
          completed_program: 4,
          dropout_risk: 2,
        },
        by_condition: {
          PCOD: 10,
          Fertility: 8,
          General: 4,
          Hormonal: 2,
        },
        program_progress: {
          '0-30_days': 8,
          '30-60_days': 9,
          '60-90_days': 4,
          completed: 3,
        },
        consultation_stats: {
          total_scheduled: 45,
          completed: 32,
          pending: 13,
          cancelled: 0,
        },
        compliance_rate: 78,
      },
    };
  },

  getPatientDetails: async (id: number) => {
    // return apiRequest(`/admin/patients/${id}/details`, { method: 'GET' });
    return {
      success: true,
      data: {
        patient: {
          id,
          full_name: 'Sarah Khan',
          email: 'sarah@example.com',
          phone: '+91-9876543210',
          date_of_birth: '1990-05-15',
          gender: 'Female',
          medical_history: 'PCOD, irregular periods',
        },
        program: {
          condition: 'PCOD',
          template: 'PCOD',
          modules: ['Nutrition', 'Fitness', 'Health Metrics', 'Consultations'],
          consultation_count: 4,
          program_duration: 90,
          start_date: '2025-12-03',
          days_completed: 0,
          progress_percentage: 0,
        },
        latest_vitals: {
          weight: 68,
          blood_sugar: 95,
          hormone_level: 12.5,
          energy_score: 8,
          sleep_hours: 7.5,
        },
        consultations: [
          {
            id: 1,
            doctor: 'Dr. Priya Singh',
            scheduled: '2025-12-10T14:00:00Z',
            status: 'Scheduled',
          },
        ],
      },
    };
  },
};
