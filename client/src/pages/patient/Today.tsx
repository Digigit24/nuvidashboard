import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, Clock, Smile, Meh, Frown, Weight, Moon, Zap, CheckCircle2, Circle } from 'lucide-react';
import { mockTodayHabits, mockVitals } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import type { DailyCheckIn, Habit } from '@/types';

export default function PatientToday() {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>(mockTodayHabits);
  const [checkIn, setCheckIn] = useState<DailyCheckIn>({
    weight: mockVitals.weight.value,
    energyLevel: mockVitals.energyScore.value,
    sleepHours: mockVitals.sleepHours.value,
    notes: '',
    lastCheckInDate: 'Dec 2, 2025 at 8:30 PM'
  });

  const handleHabitToggle = (id: number, completed: boolean) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed } : habit
    ));
  };

  const handleSaveCheckIn = () => {
    toast({
      title: "Check-in saved!",
      description: "Your daily check-in has been recorded successfully.",
    });
  };

  const getEnergyIcon = (level: number) => {
    if (level >= 8) return <Smile className="h-6 w-6 text-green-500" />;
    if (level >= 5) return <Meh className="h-6 w-6 text-yellow-500" />;
    return <Frown className="h-6 w-6 text-red-500" />;
  };

  const getEnergyColor = (level: number) => {
    if (level >= 8) return 'from-green-500 to-emerald-500';
    if (level >= 5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const habitProgress = (completedHabits / habits.length) * 100;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-secondary to-secondary/80 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3" data-testid="text-page-title">
              <CalendarCheck className="h-8 w-8" />
              Today's Check-in
            </h1>
            <p className="text-white/90">
              Track your daily wellness journey
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <p className="text-sm text-white/80">Today</p>
            <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Main Check-in Card */}
      <Card className="border-2 hover:shadow-xl transition-all" data-testid="card-daily-checkin">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Quick Health Check
            </CardTitle>
            {checkIn.lastCheckInDate && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {checkIn.lastCheckInDate}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Metrics Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Weight */}
            <div className="space-y-3">
              <Label htmlFor="weight" className="text-base font-semibold flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Weight className="h-5 w-5 text-primary" />
                </div>
                Weight
              </Label>
              <div className="relative">
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={checkIn.weight}
                  onChange={(e) => setCheckIn({ ...checkIn, weight: parseFloat(e.target.value) })}
                  data-testid="input-weight"
                  className="text-lg h-14 pr-12 border-2 focus:border-primary"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">kg</span>
              </div>
              <p className="text-xs text-muted-foreground">Previous: {mockVitals.weight.value} kg</p>
            </div>

            {/* Sleep */}
            <div className="space-y-3">
              <Label htmlFor="sleep" className="text-base font-semibold flex items-center gap-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Moon className="h-5 w-5 text-purple-600" />
                </div>
                Sleep
              </Label>
              <div className="relative">
                <Input
                  id="sleep"
                  type="number"
                  step="0.5"
                  value={checkIn.sleepHours}
                  onChange={(e) => setCheckIn({ ...checkIn, sleepHours: parseFloat(e.target.value) })}
                  data-testid="input-sleep"
                  className="text-lg h-14 pr-16 border-2 focus:border-purple-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">hours</span>
              </div>
              <p className="text-xs text-muted-foreground">Goal: 7-9 hours</p>
            </div>

            {/* Energy Level */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Zap className="h-5 w-5 text-secondary" />
                </div>
                Energy
              </Label>
              <div className="flex items-center justify-center h-14 border-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  {getEnergyIcon(checkIn.energyLevel)}
                  <span className="text-3xl font-bold">{checkIn.energyLevel}</span>
                  <span className="text-muted-foreground">/10</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {checkIn.energyLevel >= 8 ? 'Excellent!' : checkIn.energyLevel >= 5 ? 'Good' : 'Need rest'}
              </p>
            </div>
          </div>

          {/* Energy Slider */}
          <div className="space-y-4 p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Adjust Energy Level</Label>
              <Badge className={`bg-gradient-to-r ${getEnergyColor(checkIn.energyLevel)} border-0`}>
                Level {checkIn.energyLevel}
              </Badge>
            </div>
            <Slider
              value={[checkIn.energyLevel]}
              onValueChange={([value]) => setCheckIn({ ...checkIn, energyLevel: value })}
              max={10}
              min={1}
              step={1}
              className="w-full"
              data-testid="slider-energy"
            />
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1">
                <Frown className="h-4 w-4" />
                Low
              </span>
              <span className="flex items-center gap-1">
                <Meh className="h-4 w-4" />
                Medium
              </span>
              <span className="flex items-center gap-1">
                <Smile className="h-4 w-4" />
                High
              </span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label htmlFor="notes" className="text-base font-semibold">
              Notes & Observations
            </Label>
            <Textarea
              id="notes"
              placeholder="How are you feeling today? Any symptoms, achievements, or observations..."
              value={checkIn.notes}
              onChange={(e) => setCheckIn({ ...checkIn, notes: e.target.value })}
              rows={4}
              data-testid="textarea-notes"
              className="border-2 resize-none"
            />
          </div>

          <Button
            onClick={handleSaveCheckIn}
            className="w-full h-14 text-lg font-semibold"
            size="lg"
            data-testid="button-save-checkin"
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Save Today's Check-in
          </Button>
        </CardContent>
      </Card>

      {/* Habits Card */}
      <Card className="border-2 hover:shadow-xl transition-all" data-testid="card-daily-habits">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Today's Habits
            </CardTitle>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">{completedHabits}/{habits.length} completed</p>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${habitProgress}%` }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {habits.map((habit, index) => (
            <div
              key={habit.id}
              className="group flex items-center gap-4 p-5 rounded-xl border-2 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
              onClick={() => handleHabitToggle(habit.id, !habit.completed)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`flex-shrink-0 transition-all ${habit.completed ? 'scale-110' : ''}`}>
                {habit.completed ? (
                  <CheckCircle2 className="h-7 w-7 text-green-500" />
                ) : (
                  <Circle className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>

              <div className="flex-1">
                <p className={`font-semibold transition-all ${habit.completed ? 'line-through text-muted-foreground' : 'group-hover:text-primary'}`}>
                  {habit.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Target: {habit.target}
                </p>
              </div>

              {habit.completed && (
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-0">
                  Completed
                </Badge>
              )}
            </div>
          ))}

          {completedHabits === habits.length && (
            <div className="text-center py-6 px-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border-2 border-green-200 dark:border-green-900/30">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-semibold text-green-700 dark:text-green-400">All habits completed!</p>
              <p className="text-sm text-green-600 dark:text-green-500 mt-1">Keep up the amazing work!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
