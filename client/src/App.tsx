import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import PatientHome from "@/pages/patient/Home";
import PatientToday from "@/pages/patient/Today";
import PatientVitals from "@/pages/patient/Vitals";
import PatientConsultations from "@/pages/patient/Consultations";
import PatientProfile from "@/pages/patient/Profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/dashboard/home" />
      </Route>
      <Route path="/dashboard/home" component={PatientHome} />
      <Route path="/dashboard/today" component={PatientToday} />
      <Route path="/dashboard/vitals" component={PatientVitals} />
      <Route path="/dashboard/consultations" component={PatientConsultations} />
      <Route path="/dashboard/profile" component={PatientProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DashboardLayout>
          <Router />
        </DashboardLayout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
