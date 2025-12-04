import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, TrendingUp, Dumbbell, Heart, Target, CheckCircle2, Calendar } from 'lucide-react';
import { fitnessAPI } from '@/lib/api';
import type { YogaSession, Workout, YogaLogsData } from '@/types';

export default function FitnessPage() {
  const [yogaSessions, setYogaSessions] = useState<YogaSession[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedSession, setSelectedSession] = useState<YogaSession | Workout | null>(null);
  const [yogaLogs, setYogaLogs] = useState<YogaLogsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('yoga');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [yogaResponse, workoutResponse, logsResponse] = await Promise.all([
        fitnessAPI.getYogaSessions(),
        fitnessAPI.getWorkouts(),
        fitnessAPI.getYogaLogs(),
      ]);
      setYogaSessions(yogaResponse.data);
      setWorkouts(workoutResponse.data);
      setYogaLogs(logsResponse.data);
    } catch (error) {
      console.error('Error loading fitness data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSession = async (sessionId: number, type: 'yoga' | 'workout') => {
    try {
      const today = new Date().toISOString().split('T')[0];

      if (type === 'yoga') {
        const session = yogaSessions.find((s) => s.id === sessionId);
        if (session) {
          await fitnessAPI.logYoga({
            yoga_id: sessionId,
            date: today,
            completed: true,
            duration_actual: session.duration_mins,
            notes: 'Completed successfully',
          });
        }
      } else {
        await fitnessAPI.logWorkout({
          workout_id: sessionId,
          date: today,
          completed: true,
          intensity_level: 7,
          notes: 'Completed successfully',
        });
      }

      loadData();
      setSelectedSession(null);
    } catch (error) {
      console.error('Error logging session:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredYoga = yogaSessions.filter((session) =>
    difficultyFilter === 'All' || session.difficulty === difficultyFilter
  );

  const filteredWorkouts = workouts.filter((workout) =>
    difficultyFilter === 'All' || workout.difficulty === difficultyFilter
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-secondary to-secondary/80 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Dumbbell className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Fitness</h1>
            <p className="text-white/90 text-lg mt-1">
              Stay active with yoga and workout sessions
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <Card className="border-2 hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xl">This Week's Progress</span>
            </span>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {yogaLogs?.completed_sessions || 0} / {yogaLogs?.target_sessions || 6}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted border-2">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${yogaLogs?.completion_rate || 0}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {yogaLogs?.completed_sessions || 0}
              </p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-pink-600">
                {yogaLogs?.completion_rate || 0}%
              </p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-violet-600">
                {(yogaLogs?.target_sessions || 6) - (yogaLogs?.completed_sessions || 0)}
              </p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Filter */}
      <div className="flex gap-2 overflow-x-auto">
        {['All', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
          <Badge
            key={difficulty}
            variant={difficultyFilter === difficulty ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setDifficultyFilter(difficulty)}
          >
            {difficulty}
          </Badge>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="yoga" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Yoga
          </TabsTrigger>
          <TabsTrigger value="workouts" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            Workouts
          </TabsTrigger>
        </TabsList>

        {/* Yoga Tab */}
        <TabsContent value="yoga" className="space-y-4 mt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredYoga.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No yoga sessions found</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredYoga.map((session) => (
                <Card
                  key={session.id}
                  className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] group"
                  onClick={() => setSelectedSession(session)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={session.thumbnail}
                      alt={session.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-semibold text-lg text-white mb-2">
                        {session.title}
                      </h3>
                      <div className="flex gap-2">
                        <Badge className={getDifficultyColor(session.difficulty)}>
                          {session.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="bg-black/60 text-white">
                          {session.condition}
                        </Badge>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-12 w-12 rounded-full bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSession(session);
                        }}
                      >
                        <Play className="h-6 w-6 text-purple-600 fill-purple-600" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {session.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.duration_mins} mins
                      </span>
                      <span>by {session.instructor}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Workouts Tab */}
        <TabsContent value="workouts" className="space-y-4 mt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredWorkouts.length === 0 ? (
            <Card className="p-12 text-center">
              <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No workouts found</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWorkouts.map((workout) => (
                <Card
                  key={workout.id}
                  className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] group"
                  onClick={() => setSelectedSession(workout)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={workout.thumbnail}
                      alt={workout.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-semibold text-lg text-white mb-2">
                        {workout.title}
                      </h3>
                      <div className="flex gap-2">
                        <Badge className={getDifficultyColor(workout.difficulty)}>
                          {workout.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="bg-black/60 text-white">
                          {workout.condition}
                        </Badge>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-12 w-12 rounded-full bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSession(workout);
                        }}
                      >
                        <Play className="h-6 w-6 text-pink-600 fill-pink-600" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {workout.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {workout.duration_mins} mins
                      </span>
                      <span>{workout.condition}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Session Detail Dialog */}
      <Dialog open={!!selectedSession} onOpenChange={(open) => !open && setSelectedSession(null)}>
        <DialogContent className="max-w-2xl">
          {selectedSession && (
            <>
              <div className="relative h-64 -mx-6 -mt-6 mb-4 overflow-hidden">
                <img
                  src={selectedSession.thumbnail}
                  alt={selectedSession.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedSession.title}
                  </h2>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(selectedSession.difficulty)}>
                      {selectedSession.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      {selectedSession.duration_mins} mins
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedSession.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-semibold">{selectedSession.duration_mins} mins</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <p className="font-semibold">{selectedSession.difficulty}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Start Session
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleCompleteSession(
                      selectedSession.id,
                      'yoga_id' in selectedSession ? 'yoga' : 'workout'
                    )}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
