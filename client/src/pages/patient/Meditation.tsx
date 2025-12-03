import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, Brain, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { meditationAPI } from '@/lib/api';
import type { MeditationSession, MeditationLogsData } from '@/types';

export default function MeditationPage() {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [meditationLogs, setMeditationLogs] = useState<MeditationLogsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterCondition, setFilterCondition] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sessionsRes, logsRes] = await Promise.all([
        meditationAPI.getSessions(),
        meditationAPI.getLogs({ days: 30 }),
      ]);
      setSessions(sessionsRes.data);
      setMeditationLogs(logsRes.data);
    } catch (error) {
      console.error('Error loading meditation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSession = async (sessionId: number, duration: number) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await meditationAPI.logSession({
        session_id: sessionId,
        date: today,
        completed: true,
        time_spent: duration,
        notes: 'Completed successfully',
      });

      loadData();
      setSelectedSession(null);
    } catch (error) {
      console.error('Error logging meditation:', error);
    }
  };

  const filteredSessions = sessions.filter((session) =>
    filterCondition === 'All' || session.condition === filterCondition
  );

  const monthlyGoal = 300; // 300 minutes per month
  const monthlyProgress = meditationLogs ? (meditationLogs.total_minutes / monthlyGoal) * 100 : 0;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Meditation</h1>
        <p className="text-muted-foreground">
          Find peace and clarity through guided meditation
        </p>
      </div>

      {/* Monthly Progress */}
      <Card className="border-2 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-violet-500" />
              This Month's Progress
            </span>
            <span className="text-2xl font-bold">
              {meditationLogs?.total_minutes || 0} / {monthlyGoal} mins
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={monthlyProgress} className="h-3" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-violet-600">
                {meditationLogs?.total_sessions || 0}
              </p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {meditationLogs?.total_minutes || 0}
              </p>
              <p className="text-xs text-muted-foreground">Minutes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">
                {meditationLogs?.last_30_days_completion || 0}%
              </p>
              <p className="text-xs text-muted-foreground">Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto">
        {['All', 'General', 'PCOD', 'Fertility'].map((condition) => (
          <Badge
            key={condition}
            variant={filterCondition === condition ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setFilterCondition(condition)}
          >
            {condition}
          </Badge>
        ))}
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-muted" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
              </CardContent>
            </Card>
          ))
        ) : filteredSessions.length === 0 ? (
          <Card className="col-span-full p-12 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No meditation sessions found</p>
          </Card>
        ) : (
          filteredSessions.map((session) => (
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
                  <Badge variant="secondary" className="bg-black/60 text-white">
                    {session.condition}
                  </Badge>
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
                    <Play className="h-6 w-6 text-violet-600 fill-violet-600" />
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
          ))
        )}
      </div>

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
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      {selectedSession.duration_mins} mins
                    </Badge>
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      {selectedSession.condition}
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
                    <p className="text-xs text-muted-foreground">Instructor</p>
                    <p className="font-semibold">{selectedSession.instructor}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Start Session
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleCompleteSession(selectedSession.id, selectedSession.duration_mins)}
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
