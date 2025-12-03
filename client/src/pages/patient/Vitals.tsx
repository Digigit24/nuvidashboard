import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VitalCard } from '@/components/patient/VitalCard';
import { Activity, RefreshCw, TrendingUp, Heart } from 'lucide-react';
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
    <div className="flex-1 space-y-6 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3" data-testid="text-page-title">
              <Heart className="h-8 w-8" />
              Health Vitals
            </h1>
            <p className="text-white/90 text-lg">
              Track and monitor your health metrics
            </p>
          </div>
          <Button
            onClick={handleUpdateVitals}
            data-testid="button-update-vitals"
            variant="secondary"
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Vitals
          </Button>
        </div>
      </div>

      {/* Vital Cards Grid */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <VitalCard title="Weight" vital={mockVitals.weight} />
        <VitalCard title="Blood Sugar" vital={mockVitals.bloodSugar} />
        <VitalCard title="Hormone Level" vital={mockVitals.hormoneLevel} />
        <VitalCard title="Energy Score" vital={mockVitals.energyScore} />
        <VitalCard title="Sleep Hours" vital={mockVitals.sleepHours} />
      </div>

      {/* Weight Trend Chart */}
      <Card className="border-2 hover:shadow-xl transition-all" data-testid="card-weight-trend">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Weight Trend</CardTitle>
                <CardDescription className="mt-1">Last 30 days progress tracking</CardDescription>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Tracking</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-4 border-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
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
                    border: '2px solid hsl(var(--primary))',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  labelStyle={{
                    color: 'hsl(var(--foreground))',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  dot={{
                    fill: 'hsl(var(--primary))',
                    strokeWidth: 2,
                    r: 5,
                    stroke: 'hsl(var(--card))'
                  }}
                  activeDot={{
                    r: 8,
                    fill: 'hsl(var(--secondary))',
                    stroke: 'hsl(var(--card))',
                    strokeWidth: 3
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
