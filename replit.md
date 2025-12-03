# Nakshatra Health Program - Patient Dashboard Application

## Overview

This is a React-based patient dashboard application for a 90-day health program (PCOD, Fertility, General Wellness, Hormonal Balance). The application provides a patient-centric interface for tracking health metrics, managing consultations, monitoring daily habits, and viewing program progress. It's designed mobile-first with responsive layouts and supports both light and dark themes.

The application is currently configured with mock data while the API integration is being developed. The architecture is designed to seamlessly transition from mock data to real API calls without major refactoring.

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Structure

```
client/src/
├── components/
│   ├── patient/           # Patient-specific components
│   │   ├── BottomTabNav.tsx
│   │   ├── ConsultationCard.tsx
│   │   ├── HabitCheckbox.tsx
│   │   ├── ProgressRing.tsx
│   │   ├── StatCard.tsx
│   │   └── VitalCard.tsx
│   ├── ui/                # Shadcn UI components
│   ├── AppSidebar.tsx
│   ├── DashboardLayout.tsx
│   ├── Header.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-theme.ts
│   └── use-toast.ts
├── lib/
│   ├── apiConfig.ts       # API configuration for future integration
│   ├── mockData.ts        # Mock data for development
│   ├── queryClient.ts
│   └── utils.ts
├── pages/
│   ├── patient/           # Patient dashboard pages
│   │   ├── Consultations.tsx
│   │   ├── Home.tsx
│   │   ├── Profile.tsx
│   │   ├── Today.tsx
│   │   └── Vitals.tsx
│   └── not-found.tsx
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx
├── index.css
└── main.tsx
```

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for data fetching and state management

**Component Library**
- Shadcn UI components built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Components follow the "New York" style variant
- Complete UI component library including forms, dialogs, cards, navigation, and data display components

**State Management Pattern**
- React Query for server state management
- React Context for theme management (light/dark mode)
- Local component state for UI interactions
- Mock data layer (`lib/mockData.ts`) structured to mirror future API responses

**Routing Structure**
- Patient dashboard routes under `/dashboard/*`
  - `/dashboard/home` - Main dashboard overview with progress ring and stats
  - `/dashboard/today` - Daily check-in and habit tracking
  - `/dashboard/vitals` - Health metrics tracking with charts
  - `/dashboard/consultations` - Upcoming and past consultation management
  - `/dashboard/profile` - Patient profile and program settings
- Root `/` redirects to `/dashboard/home`
- Admin routes under `/admin/*` (structure defined, UI pending)

**Navigation Components**
- Desktop: Sidebar navigation with patient menu items
- Mobile: Bottom tab navigation (5 tabs) visible on screens < 768px
- Theme toggle in header for dark/light mode switching

**Design System**
- Consistent spacing using Tailwind units (2, 4, 6, 8, 12, 16)
- Typography scale with Inter/Open Sans font
- Responsive grid system with mobile-first breakpoints
- Custom CSS variables for theming in both light and dark modes
- Elevation system using subtle shadows and overlays

### Backend Architecture

**Server Framework**
- Express.js REST API server
- TypeScript for type safety across the stack
- HTTP server created with Node's `http` module for potential WebSocket upgrades

**API Organization**
- Routes registered in `server/routes.ts`
- All API endpoints prefixed with `/api`
- API configuration in `client/src/lib/apiConfig.ts` for future integration
- Logging middleware for request tracking and performance monitoring

**Data Access Layer**
- Storage interface (`IStorage`) for CRUD operations
- In-memory storage implementation (`MemStorage`) for development
- Designed to be swapped with database implementation (PostgreSQL via Drizzle ORM)
- Patient domain models defined in shared schema

### Data Models (shared/schema.ts)

- **Users**: Authentication and role management
- **Patients**: Patient profile information
- **ProgramConfigs**: Health program configuration
- **Vitals**: Health metrics tracking
- **Consultations**: Doctor appointments
- **Habits**: Daily habit tracking
- **DailyCheckIns**: Daily health check-ins

### Mock Data Structure

Located in `client/src/lib/mockData.ts`:
- `mockPatient`: Patient profile data (Sarah Khan)
- `mockProgramConfig`: PCOD program with 90-day duration
- `mockVitals`: Weight, blood sugar, hormone level, energy, sleep
- `mockConsultations`: Scheduled and completed consultations
- `mockTodayHabits`: Daily habits (water, yoga, meals, meditation)
- `mockWeightTrend`: 30-day weight history for charts
- `mockTodayTasks`: Daily task checklist

## Key Features

### Dashboard Home
- Personalized greeting with time-of-day awareness
- Circular progress ring showing program completion (45/90 days)
- 4 stat cards: Days Completed, Progress %, Consultations, Current Streak
- Today's Tasks checklist with interactive checkboxes
- Quick action buttons: Check Vitals, Log Meal, Start Yoga

### Today's Check-in
- Daily health metrics input (weight, energy, sleep, notes)
- Energy level slider (1-10)
- Habit tracking with checkboxes
- Save functionality with toast notifications

### Health Vitals
- 5 vital cards with status badges (Normal/Good/Warning/Alert)
- Weight trend line chart using Recharts
- Update Vitals button for data entry

### Consultations
- Upcoming consultations with "Join Meeting" buttons
- Past consultations in collapsible section
- Consultation cards with doctor info, date/time, status
- View Report functionality for completed consultations

### Profile
- Editable patient information (name, phone)
- Read-only fields (email, date of birth)
- Program configuration display
- Enabled modules badges
- Save Profile and Logout actions

## Development Notes

### Mock Data Transition
All mock data files include `// todo: remove mock functionality` comments for easy identification when switching to real API calls.

### Responsive Breakpoints
- Mobile: < 768px (bottom tab nav, stacked layout)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (sidebar nav, multi-column layout)

### Theme Support
- Light/dark mode toggle in header
- Theme persisted in localStorage
- CSS variables for consistent theming
- Automatic system preference detection

## Next Steps (Future Development)

**Step 2**: Add Nutrition, Fitness, Yoga, Habits, Meditation, Resources pages
**Step 3**: Integrate API calls, add Admin Dashboard, Authentication flow
