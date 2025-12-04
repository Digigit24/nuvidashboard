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
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0';
    case 'Completed':
      return 'bg-green-500/10 text-green-600 dark:text-green-400 border-0';
    case 'Cancelled':
      return 'bg-red-500/10 text-red-600 dark:text-red-400 border-0';
    default:
      return 'border-0';
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
    <Card
      data-testid={`consultation-card-${consultation.id}`}
      className="border-2 hover:border-primary/30 hover:shadow-lg transition-all group"
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold">{consultation.doctorName}</h3>
                {consultation.doctorSpecialization && (
                  <p className="text-sm text-muted-foreground font-medium mt-0.5">
                    {consultation.doctorSpecialization}
                  </p>
                )}
              </div>
              <Badge className={getStatusBadgeVariant(consultation.status)}>
                {consultation.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{formatDateTime(consultation.scheduledDate)}</span>
            </div>

            {consultation.notes && (
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-sm text-foreground/80">
                  {consultation.notes}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              {consultation.status === 'Scheduled' && consultation.meetingLink && (
                <Button
                  size="default"
                  onClick={handleJoinMeeting}
                  data-testid={`button-join-${consultation.id}`}
                  className="shadow-md hover:shadow-lg transition-all"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Join Meeting
                </Button>
              )}
              {consultation.status === 'Completed' && (
                <Button
                  size="default"
                  variant="outline"
                  onClick={handleViewReport}
                  data-testid={`button-report-${consultation.id}`}
                  className="border-2 hover:border-primary/30"
                >
                  <FileText className="h-4 w-4 mr-2" />
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
