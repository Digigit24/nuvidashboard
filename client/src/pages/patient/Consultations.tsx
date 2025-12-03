import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ConsultationCard } from '@/components/patient/ConsultationCard';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { mockConsultations } from '@/lib/mockData';

export default function PatientConsultations() {
  const [pastOpen, setPastOpen] = useState(false);
  
  // todo: remove mock functionality - replace with API call
  const upcomingConsultations = mockConsultations.filter(c => c.status === 'Scheduled');
  const pastConsultations = mockConsultations.filter(c => c.status === 'Completed');

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-page-title">
          Consultations
        </h1>
        <p className="text-muted-foreground">
          Manage your upcoming and past appointments
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Upcoming Consultations</h2>
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
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No upcoming consultations</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Collapsible open={pastOpen} onOpenChange={setPastOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border bg-card hover-elevate" data-testid="trigger-past-consultations">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Past Consultations</h2>
            <span className="text-sm text-muted-foreground">
              ({pastConsultations.length})
            </span>
          </div>
          {pastOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
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
