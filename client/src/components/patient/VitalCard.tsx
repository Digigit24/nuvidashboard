import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { VitalData } from '@/types';

interface VitalCardProps {
  title: string;
  vital: VitalData;
}

function getStatusColor(status: VitalData['status']): string {
  switch (status) {
    case 'Normal':
    case 'Good':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    case 'Warning':
      return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
    case 'Alert':
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function VitalCard({ title, vital }: VitalCardProps) {
  return (
    <Card data-testid={`vital-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Badge variant="secondary" className={getStatusColor(vital.status)}>
            {vital.status}
          </Badge>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{vital.value}</span>
          <span className="text-sm text-muted-foreground">{vital.unit}</span>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Normal: {vital.normalRange}</p>
          <p>Updated: {vital.lastUpdated}</p>
        </div>
      </CardContent>
    </Card>
  );
}
