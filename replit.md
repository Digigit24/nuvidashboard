# Nakshatra Health Program - Patient Dashboard Application

## Overview

This is a React-based patient dashboard application for a 90-day health program (PCOD, Fertility, General Wellness, Hormonal Balance). The application provides a patient-centric interface for tracking health metrics, managing consultations, monitoring daily habits, and viewing program progress. It's designed mobile-first with responsive layouts and supports both light and dark themes.

The application is currently configured with mock data while the API integration is being developed. The architecture is designed to seamlessly transition from mock data to real API calls without major refactoring.

## User Preferences

Preferred communication style: Simple, everyday language.

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
  - `/dashboard/home` - Main dashboard overview
  - `/dashboard/today` - Daily check-in and quick actions
  - `/dashboard/vitals` - Health metrics tracking
  - `/dashboard/consultations` - Consultation management
  - `/dashboard/profile` - Patient profile settings
- Admin routes under `/admin/*` (structure defined, UI pending)

**Design System**
- Consistent spacing using Tailwind units (2, 4, 6, 8, 12, 16)
- Typography scale with Inter or similar sans-serif font
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
- Logging middleware for request tracking and performance monitoring
- Static file serving for production builds

**Data Access Layer**
- Storage interface (`IStorage`) for CRUD operations
- In-memory storage implementation (`MemStorage`) for development
- Designed to be swapped with database implementation (PostgreSQL via Drizzle ORM)
- User model defined in shared schema

**Build Process**
- Separate client and server builds
- Client built with Vite to `dist/public`
- Server bundled with esbuild to `dist/index.cjs`
- Selective bundling of dependencies to reduce cold start times
- Development mode uses Vite middleware for HMR

### Data Storage Solutions

**Database (Configured but not yet connected)**
- PostgreSQL as the primary database
- Neon Database serverless driver (`@neondatabase/serverless`)
- Drizzle ORM for type-safe database queries
- Schema defined in `shared/schema.ts`
- Migrations stored in `./migrations` directory
- Currently using in-memory storage for development

**Schema Design**
- Shared type definitions between client and server
- Zod schemas for runtime validation using `drizzle-zod`
- User table with UUID primary keys
- Schema designed to prevent duplication across client/server boundaries

### Authentication and Authorization

**Planned Architecture** (not yet implemented)
- JWT-based authentication (indicated by `jsonwebtoken` dependency)
- Passport.js with local strategy for credential validation
- Express sessions with connect-pg-simple for PostgreSQL session store
- Role-based access control with Patient, Doctor, and Admin roles
- Session persistence in PostgreSQL

### External Dependencies

**UI Component Libraries**
- Radix UI primitives for accessible, unstyled components
- Embla Carousel for image/content carousels
- React Hook Form with Zod resolvers for form validation
- Class Variance Authority (CVA) for component variant management
- CMDK for command palette functionality

**Utility Libraries**
- date-fns for date manipulation and formatting
- clsx and tailwind-merge for conditional class composition
- nanoid for generating unique IDs
- zod for schema validation

**Development Tools**
- Replit-specific plugins for enhanced development experience
  - Runtime error modal overlay
  - Cartographer for code navigation
  - Development banner
- TypeScript with strict mode enabled
- ESBuild and Vite for fast builds

**Planned Integrations** (dependencies present)
- Stripe for payment processing
- Nodemailer for email notifications
- OpenAI and Google Generative AI for potential AI features
- WebSocket (ws) for real-time features
- XLSX for spreadsheet export/import
- Express Rate Limit for API protection

**Third-Party Services**
- Neon Database (serverless PostgreSQL)
- Google Fonts (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)

### Key Architectural Decisions

**Mock Data Strategy**
- All API calls are currently commented out or not implemented
- Mock data structured in `lib/mockData.ts` to match expected API response format
- Components designed to consume data from React Query hooks
- Transition path: implement API endpoints, uncomment fetch calls, remove mock data layer

**Type Safety Approach**
- Shared types between client and server in `shared/` directory
- Drizzle Zod for automatic schema-to-type generation
- TypeScript path aliases for clean imports (`@/`, `@shared/`, `@assets/`)
- Strict TypeScript configuration to catch errors early

**Responsive Design Pattern**
- Mobile-first approach with progressive enhancement
- Sidebar collapses to sheet/drawer on mobile using `use-mobile` hook
- Grid layouts with responsive breakpoints (md, lg, xl)
- Touch-friendly interactions for mobile devices

**Theme System**
- CSS custom properties for all theme colors
- Class-based theme switching (`.light`, `.dark`)
- localStorage persistence of user preference
- System preference detection as fallback
- Consistent elevation and shadow system across themes

**Session Management Design**
- Express session with PostgreSQL store for production
- Memory store available for development
- Connect-pg-simple for session persistence
- Cookie-based session tracking

**Error Handling**
- Client: React Query error boundaries and toast notifications
- Server: Centralized error logging with request context
- Development: Replit runtime error overlay for immediate feedback