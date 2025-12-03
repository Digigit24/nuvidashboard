import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VitalCard } from '@/components/patient/VitalCard';
import { Activity, RefreshCw } from 'lucide-react';
import { mockVitals, mockWeightTrend } from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PatientVitals() {
  // todo: remove mock functionality - replace with API call

  const handleUpdateVitals = () => {
    console.log('Update vitals clicked');
    // todo: remove mock functionality - navigate to vitals input or open modal
  };

  const chartData = mockWeightTrend.map(item => ({
    ...item,
    date: item.date.slice(5) // Format as MM-DD
  }));

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-page-title">
            Health Vitals
          </h1>
          <p className="text-muted-foreground">
            Track and monitor your health metrics
          </p>
        </div>
        <Button onClick={handleUpdateVitals} data-testid="button-update-vitals">
          <RefreshCw className="h-4 w-4 mr-2" />
          Update Vitals
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <VitalCard title="Weight" vital={mockVitals.weight} />
        <VitalCard title="Blood Sugar" vital={mockVitals.bloodSugar} />
        <VitalCard title="Hormone Level" vital={mockVitals.hormoneLevel} />
        <VitalCard title="Energy Score" vital={mockVitals.energyScore} />
        <VitalCard title="Sleep Hours" vital={mockVitals.sleepHours} />
      </div>

      <Card data-testid="card-weight-trend">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">Weight Trend</CardTitle>
              <CardDescription>Last 30 days progress</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
