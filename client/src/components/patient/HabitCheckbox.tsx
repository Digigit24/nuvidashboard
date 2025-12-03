import { Checkbox } from '@/components/ui/checkbox';
import type { Habit } from '@/types';

interface HabitCheckboxProps {
  habit: Habit;
  onToggle: (id: number, completed: boolean) => void;
}

export function HabitCheckbox({ habit, onToggle }: HabitCheckboxProps) {
  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg border bg-card"
      data-testid={`habit-checkbox-${habit.id}`}
    >
      <Checkbox
        id={`habit-${habit.id}`}
        checked={habit.completed}
        onCheckedChange={(checked) => onToggle(habit.id, checked as boolean)}
        data-testid={`checkbox-habit-${habit.id}`}
      />
      <div className="flex-1">
        <label
          htmlFor={`habit-${habit.id}`}
          className={`text-sm font-medium cursor-pointer ${
            habit.completed ? 'line-through text-muted-foreground' : ''
          }`}
        >
          {habit.name}
        </label>
        <p className="text-xs text-muted-foreground">{habit.target}</p>
      </div>
    </div>
  );
}
