import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Weight, Droplets, Activity, Zap, Moon } from 'lucide-react';
import type { VitalData } from '@/types';

interface VitalCardProps {
  title: string;
  vital: VitalData;
}

function getStatusColor(status: VitalData['status']): string {
  switch (status) {
    case 'Normal':
    case 'Good':
      return 'bg-green-500/10 text-green-600 dark:text-green-400 border-0';
    case 'Warning':
      return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-0';
    case 'Alert':
      return 'bg-red-500/10 text-red-600 dark:text-red-400 border-0';
    default:
      return 'bg-muted text-muted-foreground border-0';
  }
}

function getVitalIcon(title: string) {
  switch (title.toLowerCase()) {
    case 'weight':
      return <Weight className="h-5 w-5" />;
    case 'blood sugar':
      return <Droplets className="h-5 w-5" />;
    case 'hormone level':
      return <Activity className="h-5 w-5" />;
    case 'energy score':
      return <Zap className="h-5 w-5" />;
    case 'sleep hours':
      return <Moon className="h-5 w-5" />;
    default:
      return <Activity className="h-5 w-5" />;
  }
}

export function VitalCard({ title, vital }: VitalCardProps) {
  return (
    <Card
      data-testid={`vital-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="border-2 hover:border-primary/50 hover:shadow-lg transition-all group"
    >
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
              {getVitalIcon(title)}
            </div>
            <p className="text-sm font-semibold">{title}</p>
          </div>
          <Badge className={getStatusColor(vital.status)}>
            {vital.status}
          </Badge>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {vital.value}
          </span>
          <span className="text-base text-muted-foreground font-medium">{vital.unit}</span>
        </div>
        <div className="space-y-1.5 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Normal Range</span>
            <span className="font-medium">{vital.normalRange}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">{vital.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
