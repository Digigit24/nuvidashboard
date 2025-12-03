import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Plus, Search, TrendingUp, Apple, Flame, ChevronRight, CheckCircle2 } from 'lucide-react';
import { nutritionAPI } from '@/lib/api';
import type { Meal, DailyMealLog } from '@/types';

export default function NutritionPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyMealLog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCondition, setFilterCondition] = useState('All');
  const [loading, setLoading] = useState(true);
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [customCalorieDialogOpen, setCustomCalorieDialogOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadMeals();
    loadDailyLog();
  }, []);

  const loadMeals = async () => {
    try {
      setLoading(true);
      const response = await nutritionAPI.getMeals();
      setMeals(response.data);
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDailyLog = async () => {
    try {
      const response = await nutritionAPI.getMealLogs({ date: today });
      setDailyLog(response.data);
    } catch (error) {
      console.error('Error loading daily log:', error);
    }
  };

  const handleLogMeal = async (mealId: number) => {
    try {
      const now = new Date();
      const time = now.toTimeString().split(' ')[0].substring(0, 5);

      await nutritionAPI.logMeal({
        meal_id: mealId,
        date: today,
        time: time,
        quantity: 1.0,
      });

      loadDailyLog();
      setLogDialogOpen(false);
    } catch (error) {
      console.error('Error logging meal:', error);
    }
  };

  const handleCustomCalorieEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await nutritionAPI.addCalorieEntry({
        food_description: formData.get('food_description') as string,
        calories: Number(formData.get('calories')),
        date: today,
        time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      });

      loadDailyLog();
      setCustomCalorieDialogOpen(false);
    } catch (error) {
      console.error('Error adding calorie entry:', error);
    }
  };

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCondition === 'All' || meal.condition === filterCondition;
    return matchesSearch && matchesFilter;
  });

  const calorieGoal = 1800;
  const calorieProgress = dailyLog ? (dailyLog.total_calories / calorieGoal) * 100 : 0;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Nutrition</h1>
        <p className="text-muted-foreground">
          Track your meals and maintain a healthy diet
        </p>
      </div>

      {/* Daily Calorie Summary */}
      <Card className="border-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Today's Calories
            </span>
            <span className="text-2xl font-bold">
              {dailyLog?.total_calories || 0} / {calorieGoal}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${Math.min(calorieProgress, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">{dailyLog?.meals.length || 0}</p>
              <p className="text-xs text-muted-foreground">Meals</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{Math.round(calorieProgress)}%</p>
              <p className="text-xs text-muted-foreground">of Goal</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">
                {calorieGoal - (dailyLog?.total_calories || 0)}
              </p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Dialog open={customCalorieDialogOpen} onOpenChange={setCustomCalorieDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex-1" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Quick Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Calorie Entry</DialogTitle>
              <DialogDescription>
                Add a meal that's not in our database
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCustomCalorieEntry} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food_description">Food Description</Label>
                <Input
                  id="food_description"
                  name="food_description"
                  placeholder="e.g., 2 Chapati with Dal"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  placeholder="320"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Entry
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Button className="flex-1" onClick={() => loadDailyLog()}>
          <TrendingUp className="h-4 w-4 mr-2" />
          View History
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meals..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {['All', 'PCOD', 'Fertility', 'General'].map((condition) => (
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
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-muted" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : filteredMeals.length === 0 ? (
          <Card className="col-span-full p-12 text-center">
            <Apple className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No meals found</p>
          </Card>
        ) : (
          filteredMeals.map((meal) => (
            <Card
              key={meal.id}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] group"
              onClick={() => setSelectedMeal(meal)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={meal.image_url}
                  alt={meal.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/90 text-black">
                    {meal.calories} cal
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-black/60 text-white">
                    {meal.condition}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {meal.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {meal.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {meal.preparation_time} mins
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMeal(meal);
                      setLogDialogOpen(true);
                    }}
                    className="h-8"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Meal Detail Dialog */}
      <Dialog open={!!selectedMeal && !logDialogOpen} onOpenChange={(open) => !open && setSelectedMeal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedMeal && (
            <>
              <div className="relative h-64 -mx-6 -mt-6 mb-4 overflow-hidden">
                <img
                  src={selectedMeal.image_url}
                  alt={selectedMeal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedMeal.name}
                  </h2>
                  <div className="flex gap-2">
                    <Badge className="bg-white/90 text-black">
                      {selectedMeal.calories} calories
                    </Badge>
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      {selectedMeal.condition}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedMeal.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Prep Time</p>
                    <p className="font-semibold">{selectedMeal.preparation_time} mins</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Servings</p>
                    <p className="font-semibold">{selectedMeal.servings}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Ingredients</h3>
                  <ul className="space-y-1">
                    {selectedMeal.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        {typeof ingredient === 'string' ? ingredient : `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    handleLogMeal(selectedMeal.id);
                    setSelectedMeal(null);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Log This Meal
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
