import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Plus, Flame, TrendingUp, Target, Calendar } from 'lucide-react';
import { habitsAPI } from '@/lib/api';
import type { HabitTemplate, PatientHabit, HabitLogsData } from '@/types';

export default function HabitsPage() {
  const [templates, setTemplates] = useState<HabitTemplate[]>([]);
  const [myHabits, setMyHabits] = useState<PatientHabit[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLogsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [addHabitDialogOpen, setAddHabitDialogOpen] = useState(false);
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<PatientHabit | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [templatesRes, habitsRes, logsRes] = await Promise.all([
        habitsAPI.getTemplates(),
        habitsAPI.getHabits(),
        habitsAPI.getHabitLogs(),
      ]);
      setTemplates(templatesRes.data);
      setMyHabits(habitsRes.data);
      setHabitLogs(logsRes.data);
    } catch (error) {
      console.error('Error loading habits data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (templateId: number) => {
    try {
      await habitsAPI.addHabit({
        template_id: templateId,
        start_date: today,
      });
      loadData();
      setAddHabitDialogOpen(false);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const handleLogHabit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedHabit) return;

    const formData = new FormData(e.currentTarget);

    try {
      await habitsAPI.logHabit({
        habit_id: selectedHabit.habit_id,
        date: today,
        completed: true,
        value: Number(formData.get('value')),
        notes: formData.get('notes') as string || undefined,
      });

      loadData();
      setLogDialogOpen(false);
      setSelectedHabit(null);
    } catch (error) {
      console.error('Error logging habit:', error);
    }
  };

  const getHabitIcon = (icon?: string) => {
    return icon || '✓';
  };

  const totalCompletionRate = habitLogs?.habits_summary.length
    ? Math.round(
        habitLogs.habits_summary.reduce((sum, h) => sum + h.completion_rate, 0) /
          habitLogs.habits_summary.length
      )
    : 0;

  const totalStreaks = myHabits.reduce((sum, h) => sum + h.streak_days, 0);
  const longestStreak = Math.max(...myHabits.map((h) => h.streak_days), 0);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Habits</h1>
        <p className="text-muted-foreground">
          Build healthy habits for a better lifestyle
        </p>
      </div>

      {/* Weekly Summary */}
      <Card className="border-2 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              This Week's Overview
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalCompletionRate}%</p>
              <p className="text-xs text-muted-foreground">Completion</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-600 flex items-center justify-center gap-1">
                <Flame className="h-5 w-5" />
                {longestStreak}
              </p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{myHabits.length}</p>
              <p className="text-xs text-muted-foreground">Active Habits</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Dialog open={addHabitDialogOpen} onOpenChange={setAddHabitDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Add New Habit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Habit</DialogTitle>
              <DialogDescription>
                Choose a habit template to start tracking
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] group"
                  onClick={() => handleAddHabit(template.id)}
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{getHabitIcon(template.icon)}</div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="secondary">{template.condition}</Badge>
                      <span className="font-semibold">
                        {template.target_value} {template.unit} / {template.frequency}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* My Active Habits */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">My Active Habits</h2>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                  <div className="h-2 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : myHabits.length === 0 ? (
          <Card className="p-12 text-center">
            <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No active habits yet</p>
            <Button onClick={() => setAddHabitDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Habit
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {myHabits.map((habit) => {
              const habitData = habitLogs?.habits_summary.find(
                (h) => h.habit_name === habit.template_name
              );

              return (
                <Card
                  key={habit.id}
                  className="cursor-pointer transition-all hover:shadow-md group"
                  onClick={() => {
                    setSelectedHabit(habit);
                    setLogDialogOpen(true);
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{getHabitIcon(habit.icon)}</div>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {habit.template_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Target: {habit.target} {habit.unit} / {habit.frequency}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {habit.streak_days > 0 && (
                          <div className="flex items-center gap-1 text-orange-600 font-bold">
                            <Flame className="h-4 w-4" />
                            {habit.streak_days}
                          </div>
                        )}
                      </div>
                    </div>

                    {habitData && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>
                            {habitData.completed_days}/{habitData.total_days} days
                          </span>
                          <span>{habitData.completion_rate}%</span>
                        </div>
                        <Progress value={habitData.completion_rate} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Log Habit Dialog */}
      <Dialog open={logDialogOpen} onOpenChange={setLogDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log {selectedHabit?.template_name}</DialogTitle>
            <DialogDescription>
              Track your progress for today
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogHabit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="value">
                Value ({selectedHabit?.unit})
              </Label>
              <Input
                id="value"
                name="value"
                type="number"
                step="0.1"
                placeholder={selectedHabit?.target.toString()}
                defaultValue={selectedHabit?.target}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                name="notes"
                placeholder="How did it go?"
              />
            </div>
            <Button type="submit" className="w-full">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Log Habit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
