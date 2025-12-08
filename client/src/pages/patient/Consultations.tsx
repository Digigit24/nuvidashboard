import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { ConsultationCard } from '@/components/patient/ConsultationCard';
import { Calendar, ChevronDown, ChevronUp, Video, Clock, Loader2 } from 'lucide-react';
import { useConsultations } from '@/hooks/useConsultations';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PatientConsultations() {
  const [pastOpen, setPastOpen] = useState(false);
  const { consultations, isLoading, error, fetchConsultations } = useConsultations();

  // Fetch consultations on component mount
  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  // Filter consultations by status
  const upcomingConsultations = Array.isArray(consultations)
    ? consultations.filter(c => c.status === 'Pending' || c.status === 'Approved')
    : [];
  const pastConsultations = Array.isArray(consultations)
    ? consultations.filter(c => c.status === 'Completed' || c.status === 'Cancelled')
    : [];

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-secondary to-secondary/80 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Video className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-page-title">
                Consultations
              </h1>
              <p className="text-white/90 text-lg mt-1">
                Manage your upcoming and past appointments
              </p>
            </div>
          </div>

          {upcomingConsultations.length > 0 && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {upcomingConsultations.length} Upcoming
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {pastConsultations.length} Completed
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Consultations Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Upcoming Consultations</h2>
        </div>
        
        {upcomingConsultations.length > 0 ? (
          <div className="space-y-4">
            {upcomingConsultations.map((consultation) => (
              <ConsultationCard 
                key={consultation.id} 
                consultation={consultation} 
              />
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium mb-1">No upcoming consultations</p>
              <p className="text-sm text-muted-foreground">Schedule a consultation with your healthcare provider</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Consultations Section */}
      <Collapsible open={pastOpen} onOpenChange={setPastOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-5 rounded-xl border-2 bg-card hover:border-primary/30 hover:shadow-lg transition-all group" data-testid="trigger-past-consultations">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
              <Calendar className="h-5 w-5 group-hover:text-primary transition-colors" />
            </div>
            <h2 className="text-xl font-bold">Past Consultations</h2>
            <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">
              {pastConsultations.length}
            </Badge>
          </div>
          <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
            {pastOpen ? (
              <ChevronUp className="h-5 w-5 group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 group-hover:text-primary transition-colors" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          {pastConsultations.length > 0 ? (
            pastConsultations.map((consultation) => (
              <ConsultationCard 
                key={consultation.id} 
                consultation={consultation} 
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No past consultations</p>
              </CardContent>
            </Card>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
