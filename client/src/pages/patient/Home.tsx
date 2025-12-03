import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { StatCard } from '@/components/patient/StatCard';
import { ProgressRing } from '@/components/patient/ProgressRing';
import { 
  Calendar, 
  TrendingUp, 
  Flame, 
  CheckCircle2,
  Activity,
  Apple,
  Dumbbell
} from 'lucide-react';
import { 
  mockPatient, 
  mockProgramConfig, 
  mockTodayTasks, 
  getGreeting 
} from '@/lib/mockData';

export default function PatientHome() {
  // todo: remove mock functionality - replace with API call
  const [tasks, setTasks] = useState(mockTodayTasks);
  const daysCompleted = mockProgramConfig.programDuration - mockProgramConfig.remainingDays;
  
  const handleTaskToggle = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // todo: remove mock functionality - navigate to respective page
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-greeting">
          {getGreeting()}, {mockPatient.fullName.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground" data-testid="text-subtitle">
          Track your health journey progress
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1" data-testid="card-progress">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <ProgressRing 
              progress={mockProgramConfig.progressPercentage}
              current={daysCompleted}
              total={mockProgramConfig.programDuration}
            />
            <p className="mt-4 text-sm text-muted-foreground text-center">
              {mockProgramConfig.templateName} Program Progress
            </p>
          </CardContent>
        </Card>

        <div className="flex-1 grid grid-cols-2 gap-4">
          <StatCard 
            title="Days Completed" 
            value={`${daysCompleted}/${mockProgramConfig.programDuration}`}
            subtitle="Keep going!"
            icon={Calendar}
          />
          <StatCard 
            title="Progress" 
            value={`${mockProgramConfig.progressPercentage}%`}
            subtitle="On track"
            icon={TrendingUp}
          />
          <StatCard 
            title="Consultations" 
            value={`2/${mockProgramConfig.consultationCount}`}
            subtitle="Booked"
            icon={CheckCircle2}
          />
          <StatCard 
            title="Current Streak" 
            value="5 days"
            subtitle="Personal best!"
            icon={Flame}
          />
        </div>
      </div>

      <Card data-testid="card-today-tasks">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center gap-3 p-3 rounded-lg border bg-card"
              data-testid={`task-item-${task.id}`}
            >
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => handleTaskToggle(task.id)}
                data-testid={`checkbox-task-${task.id}`}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-1 text-sm cursor-pointer ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {task.title}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            className="h-auto flex-col gap-2 py-4"
            onClick={() => handleQuickAction('vitals')}
            data-testid="button-quick-vitals"
          >
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xs">Check Vitals</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto flex-col gap-2 py-4"
            onClick={() => handleQuickAction('meal')}
            data-testid="button-quick-meal"
          >
            <Apple className="h-6 w-6 text-primary" />
            <span className="text-xs">Log Meal</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto flex-col gap-2 py-4"
            onClick={() => handleQuickAction('yoga')}
            data-testid="button-quick-yoga"
          >
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-xs">Start Yoga</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
