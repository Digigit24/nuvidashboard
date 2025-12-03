import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { HabitCheckbox } from '@/components/patient/HabitCheckbox';
import { CalendarCheck, Clock } from 'lucide-react';
import { mockTodayHabits, mockVitals } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import type { DailyCheckIn, Habit } from '@/types';

export default function PatientToday() {
  const { toast } = useToast();
  // todo: remove mock functionality - replace with API calls
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
    console.log('Habit toggled:', id, completed);
    // todo: remove mock functionality - sync with API
  };

  const handleSaveCheckIn = () => {
    console.log('Saving check-in:', checkIn);
    // todo: remove mock functionality - POST to API
    toast({
      title: "Check-in saved!",
      description: "Your daily check-in has been recorded successfully.",
    });
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-page-title">
          Today's Check-in
        </h1>
        <p className="text-muted-foreground">
          Log your daily health metrics and habits
        </p>
      </div>

      <Card data-testid="card-daily-checkin">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>Daily Check-in</CardTitle>
              <p className="text-sm text-muted-foreground">
                How are you feeling today?
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={checkIn.weight}
                onChange={(e) => setCheckIn({ ...checkIn, weight: parseFloat(e.target.value) })}
                data-testid="input-weight"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep">Sleep Hours</Label>
              <Input
                id="sleep"
                type="number"
                step="0.5"
                value={checkIn.sleepHours}
                onChange={(e) => setCheckIn({ ...checkIn, sleepHours: parseFloat(e.target.value) })}
                data-testid="input-sleep"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Energy Level: {checkIn.energyLevel}/10</Label>
            <Slider
              value={[checkIn.energyLevel]}
              onValueChange={([value]) => setCheckIn({ ...checkIn, energyLevel: value })}
              max={10}
              min={1}
              step={1}
              className="w-full"
              data-testid="slider-energy"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="How are you feeling today? Any symptoms or observations..."
              value={checkIn.notes}
              onChange={(e) => setCheckIn({ ...checkIn, notes: e.target.value })}
              rows={3}
              data-testid="textarea-notes"
            />
          </div>

          <Button 
            onClick={handleSaveCheckIn} 
            className="w-full"
            data-testid="button-save-checkin"
          >
            Save Check-in
          </Button>

          {checkIn.lastCheckInDate && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last check-in: {checkIn.lastCheckInDate}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card data-testid="card-daily-habits">
        <CardHeader>
          <CardTitle className="text-lg">Today's Habits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {habits.map((habit) => (
            <HabitCheckbox
              key={habit.id}
              habit={habit}
              onToggle={handleHabitToggle}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
