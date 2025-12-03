import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

// todo: remove mock functionality
const mockStats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Sales',
    value: '12,234',
    change: '+19%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
  },
  {
    title: 'Active Now',
    value: '573',
    change: '-2%',
    changeType: 'negative' as const,
    icon: Activity,
  },
];

export function DashboardContent() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Dashboard</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Welcome back! Here's an overview of your application.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat, index) => (
          <Card key={stat.title} data-testid={`card-stat-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}
                  data-testid={`text-stat-change-${index}`}
                >
                  {stat.change}
                </span>
                <span>from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4" data-testid="card-overview">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Monthly revenue overview for this year.</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Activity className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Chart placeholder</p>
              <p className="text-sm">Connect your data to see analytics</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3" data-testid="card-recent-activity">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your application.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* todo: remove mock functionality */}
              {[
                { user: 'Sarah Johnson', action: 'Created a new project', time: '2 min ago' },
                { user: 'Michael Chen', action: 'Updated settings', time: '5 min ago' },
                { user: 'Emily Davis', action: 'Completed task #142', time: '12 min ago' },
                { user: 'James Wilson', action: 'Added new team member', time: '25 min ago' },
                { user: 'Amanda Lee', action: 'Generated report', time: '1 hour ago' },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                  data-testid={`activity-item-${index}`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-medium">
                      {activity.user.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
