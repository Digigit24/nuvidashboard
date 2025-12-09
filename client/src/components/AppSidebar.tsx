import { Link, useLocation } from 'wouter';
import {
  Home,
  CalendarCheck,
  Heart,
  Calendar,
  User,
  LogOut,
  Apple,
  Dumbbell,
  Target,
  Brain,
  BookOpen,
  Users,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockPatient } from '@/lib/mockData';

const mainNavItems = [
  { title: 'Dashboard Home', href: '/dashboard/home', icon: Home },
  { title: "Today's Check-in", href: '/dashboard/today', icon: CalendarCheck },
  { title: 'Health Vitals', href: '/dashboard/vitals', icon: Heart },
  { title: 'Consultations', href: '/dashboard/consultations', icon: Calendar },
];

const wellnessNavItems = [
  { title: 'Nutrition', href: '/dashboard/nutrition', icon: Apple },
  { title: 'Fitness', href: '/dashboard/fitness', icon: Dumbbell },
  { title: 'Habits', href: '/dashboard/habits', icon: Target },
  { title: 'Meditation', href: '/dashboard/meditation', icon: Brain },
];

const communityNavItems = [
  { title: 'Resources', href: '/dashboard/resources', icon: BookOpen },
  { title: 'Community', href: '/dashboard/community', icon: Users },
];

const adminNavItems = [
  { title: 'All Patients', href: '/admin/patients', icon: Users },
];

const profileNavItems = [
  { title: 'Profile', href: '/dashboard/profile', icon: User },
  { title: 'Patient Config', href: '/dashboard/patient-config', icon: Settings },
];

export function AppSidebar() {
  const [location] = useLocation();

  const handleLogout = () => {
    console.log('Logging out...');
    // todo: remove mock functionality - clear auth and redirect
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Heart className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold" data-testid="text-app-name">Nakshatra</span>
            <span className="text-xs text-muted-foreground">Health Program</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.href || (item.href === '/dashboard/home' && location === '/')}
                  >
                    <Link href={item.href} data-testid={`link-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Wellness</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {wellnessNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.href}
                  >
                    <Link href={item.href} data-testid={`link-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Community</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.href}
                  >
                    <Link href={item.href} data-testid={`link-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.href}
                  >
                    <Link href={item.href} data-testid={`link-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.href}
                  >
                    <Link href={item.href} data-testid={`link-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarSeparator className="mb-4" />
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={mockPatient.fullName} />
            <AvatarFallback>
              {mockPatient.fullName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-medium" data-testid="text-user-name">
              {mockPatient.fullName}
            </span>
            <span className="truncate text-xs text-muted-foreground" data-testid="text-user-email">
              {mockPatient.email}
            </span>
          </div>
          <SidebarMenuButton
            asChild
            className="h-9 w-9 p-0"
          >
            <button onClick={handleLogout} data-testid="button-logout" aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
