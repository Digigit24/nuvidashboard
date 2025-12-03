import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from './ThemeToggle';
import { mockPatient, mockProgramConfig } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        <div className="hidden md:block">
          <Badge variant="secondary" className="text-xs">
            {mockProgramConfig.templateName} Program
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:block text-sm text-muted-foreground">
          {mockPatient.fullName}
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
