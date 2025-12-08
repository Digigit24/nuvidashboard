import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import TestConnection from "@/pages/auth/TestConnection";
import PatientHome from "@/pages/patient/Home";
import PatientToday from "@/pages/patient/Today";
import PatientVitals from "@/pages/patient/Vitals";
import PatientConsultations from "@/pages/patient/Consultations";
import PatientNutrition from "@/pages/patient/Nutrition";
import PatientFitness from "@/pages/patient/Fitness";
import PatientHabits from "@/pages/patient/Habits";
import PatientMeditation from "@/pages/patient/Meditation";
import PatientResources from "@/pages/patient/Resources";
import PatientCommunity from "@/pages/patient/Community";
import PatientProfile from "@/pages/patient/Profile";
import NotFound from "@/pages/not-found";

function AuthenticatedRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/dashboard/home" /> : <Login />}
      </Route>
      <Route path="/register">
        {isAuthenticated ? <Redirect to="/dashboard/home" /> : <Register />}
      </Route>
      <Route path="/test-connection" component={TestConnection} />

      {/* Protected routes - require authentication */}
      <Route path="/">
        {isAuthenticated ? <Redirect to="/dashboard/home" /> : <Redirect to="/login" />}
      </Route>

      <Route path="/dashboard/home">
        <ProtectedRoute>
          <PatientHome />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/today">
        <ProtectedRoute>
          <PatientToday />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/vitals">
        <ProtectedRoute>
          <PatientVitals />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/consultations">
        <ProtectedRoute>
          <PatientConsultations />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/nutrition">
        <ProtectedRoute>
          <PatientNutrition />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/fitness">
        <ProtectedRoute>
          <PatientFitness />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/habits">
        <ProtectedRoute>
          <PatientHabits />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/meditation">
        <ProtectedRoute>
          <PatientMeditation />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/resources">
        <ProtectedRoute>
          <PatientResources />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/community">
        <ProtectedRoute>
          <PatientCommunity />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/profile">
        <ProtectedRoute>
          <PatientProfile />
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <DashboardLayout>
          <AuthenticatedRouter />
        </DashboardLayout>
      ) : (
        <AuthenticatedRouter />
      )}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
