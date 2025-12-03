import { Link, useLocation } from 'wouter';
import { Home, CalendarCheck, Heart, Calendar, User } from 'lucide-react';

const navItems = [
  { title: 'Home', href: '/dashboard/home', icon: Home },
  { title: 'Today', href: '/dashboard/today', icon: CalendarCheck },
  { title: 'Vitals', href: '/dashboard/vitals', icon: Heart },
  { title: 'Consults', href: '/dashboard/consultations', icon: Calendar },
  { title: 'Profile', href: '/dashboard/profile', icon: User },
];

export function BottomTabNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden" data-testid="bottom-tab-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location === item.href || 
            (item.href === '/dashboard/home' && location === '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={`tab-${item.title.toLowerCase()}`}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
