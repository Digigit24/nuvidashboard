import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  TrendingUp,
  Flame,
  CheckCircle2,
  Activity,
  Apple,
  Dumbbell,
  Heart,
  Sparkles,
  Target,
  Award,
  ArrowRight
} from 'lucide-react';
import {
  mockPatient,
  mockProgramConfig,
  mockTodayTasks,
  getGreeting
} from '@/lib/mockData';
import { useLocation } from 'wouter';

export default function PatientHome() {
  const [, setLocation] = useLocation();
  const [tasks, setTasks] = useState(mockTodayTasks);
  const daysCompleted = mockProgramConfig.programDuration - mockProgramConfig.remainingDays;

  const handleTaskToggle = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const taskProgress = (completedTasks / tasks.length) * 100;

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
      {/* Hero Section with Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-secondary animate-pulse" />
            <span className="text-sm font-medium text-secondary">Nakshatra Health Program</span>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in-up" data-testid="text-greeting">
              {getGreeting()}, {mockPatient.fullName.split(' ')[0]}! 👋
            </h1>
            <p className="text-white/90 text-lg" data-testid="text-subtitle">
              You're making amazing progress on your wellness journey
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 transition-all">
              <Heart className="h-3 w-3 mr-1" />
              {mockProgramConfig.templateName} Program
            </Badge>
            <Badge className="bg-secondary text-white border-0 hover:bg-secondary/90 transition-all">
              <Flame className="h-3 w-3 mr-1" />
              5 Day Streak
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
        <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Days Completed</p>
            <p className="text-3xl font-bold text-primary">{daysCompleted}</p>
            <p className="text-xs text-muted-foreground mt-1">of {mockProgramConfig.programDuration} days</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-xl group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-secondary">{mockProgramConfig.progressPercentage}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Program Progress</p>
            <Progress value={mockProgramConfig.progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">Keep up the great work!</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Consultations</p>
            <p className="text-3xl font-bold">2<span className="text-xl text-muted-foreground">/4</span></p>
            <p className="text-xs text-muted-foreground mt-1">Sessions completed</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-orange-500/50 transition-all hover:shadow-lg group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl group-hover:scale-110 transition-transform">
                <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
              </div>
              <Award className="h-4 w-4 text-orange-500" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-orange-500">5</p>
            <p className="text-xs text-muted-foreground mt-1">days • Personal best!</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks - Takes 2 columns */}
        <Card className="lg:col-span-2 border-2 hover:shadow-lg transition-all" data-testid="card-today-tasks">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  Today's Tasks
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {completedTasks} of {tasks.length} completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{Math.round(taskProgress)}%</p>
                <Progress value={taskProgress} className="h-2 w-24 mt-1" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-4 rounded-xl border-2 bg-card hover:border-primary/30 hover:shadow-md transition-all group"
                data-testid={`task-item-${task.id}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  data-testid={`checkbox-task-${task.id}`}
                  className="h-5 w-5"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`flex-1 text-sm font-medium cursor-pointer transition-all ${
                    task.completed ? 'line-through text-muted-foreground' : 'group-hover:text-primary'
                  }`}
                >
                  {task.title}
                </label>
                {task.completed && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Program Progress Circle */}
        <Card className="border-2 hover:shadow-lg transition-all" data-testid="card-progress">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-6">
              {/* Outer Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - mockProgramConfig.progressPercentage / 100)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#20296E" />
                    <stop offset="100%" stopColor="#FF70A3" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-5xl font-bold text-primary">{mockProgramConfig.progressPercentage}%</p>
                <p className="text-sm text-muted-foreground mt-1">Complete</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-semibold">{mockProgramConfig.templateName} Program</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{daysCompleted} / {mockProgramConfig.programDuration} days</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                {mockProgramConfig.remainingDays} days remaining
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col items-start gap-3 hover:border-primary hover:bg-primary/5 transition-all group"
            onClick={() => setLocation('/dashboard/vitals')}
            data-testid="button-quick-vitals"
          >
            <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Check Vitals</p>
              <p className="text-xs text-muted-foreground">Track your health metrics</p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col items-start gap-3 hover:border-secondary hover:bg-secondary/5 transition-all group"
            onClick={() => setLocation('/dashboard/nutrition')}
            data-testid="button-quick-meal"
          >
            <div className="p-3 bg-secondary/10 rounded-xl group-hover:scale-110 transition-transform">
              <Apple className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Log Meal</p>
              <p className="text-xs text-muted-foreground">Track your nutrition</p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col items-start gap-3 hover:border-purple-500 hover:bg-purple-500/5 transition-all group"
            onClick={() => setLocation('/dashboard/fitness')}
            data-testid="button-quick-yoga"
          >
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl group-hover:scale-110 transition-transform">
              <Dumbbell className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Start Yoga</p>
              <p className="text-xs text-muted-foreground">Begin your session</p>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
