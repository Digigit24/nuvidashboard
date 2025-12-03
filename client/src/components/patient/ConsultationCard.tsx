import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, FileText, User } from 'lucide-react';
import type { Consultation } from '@/types';
import { formatDateTime } from '@/lib/mockData';

interface ConsultationCardProps {
  consultation: Consultation;
}

function getStatusBadgeVariant(status: Consultation['status']) {
  switch (status) {
    case 'Scheduled':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    case 'Completed':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    case 'Cancelled':
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    default:
      return '';
  }
}

export function ConsultationCard({ consultation }: ConsultationCardProps) {
  const handleJoinMeeting = () => {
    if (consultation.meetingLink) {
      console.log('Joining meeting:', consultation.meetingLink);
      // todo: remove mock functionality - integrate with actual meeting link
    }
  };

  const handleViewReport = () => {
    console.log('Viewing report for consultation:', consultation.id);
    // todo: remove mock functionality - integrate with API
  };

  return (
    <Card data-testid={`consultation-card-${consultation.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{consultation.doctorName}</h3>
                {consultation.doctorSpecialization && (
                  <p className="text-sm text-muted-foreground">
                    {consultation.doctorSpecialization}
                  </p>
                )}
              </div>
              <Badge variant="secondary" className={getStatusBadgeVariant(consultation.status)}>
                {consultation.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDateTime(consultation.scheduledDate)}</span>
            </div>

            {consultation.notes && (
              <p className="text-sm text-muted-foreground border-t pt-2 mt-2">
                {consultation.notes}
              </p>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {consultation.status === 'Scheduled' && consultation.meetingLink && (
                <Button size="sm" onClick={handleJoinMeeting} data-testid={`button-join-${consultation.id}`}>
                  <Video className="h-4 w-4 mr-1" />
                  Join Meeting
                </Button>
              )}
              {consultation.status === 'Completed' && (
                <Button size="sm" variant="outline" onClick={handleViewReport} data-testid={`button-report-${consultation.id}`}>
                  <FileText className="h-4 w-4 mr-1" />
                  View Report
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
