import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, LogOut, Save } from 'lucide-react';
import { mockPatient, mockProgramConfig, formatDate } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function PatientProfile() {
  const { toast } = useToast();
  // todo: remove mock functionality - replace with API calls
  const [profile, setProfile] = useState({
    fullName: mockPatient.fullName,
    email: mockPatient.email,
    phone: mockPatient.phone,
    dateOfBirth: mockPatient.dateOfBirth
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    // todo: remove mock functionality - PUT to API
    toast({
      title: "Profile updated!",
      description: "Your profile changes have been saved successfully.",
    });
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // todo: remove mock functionality - clear auth and redirect
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-page-title">
              Profile
            </h1>
            <p className="text-white/90 text-lg mt-1">
              Manage your account settings
            </p>
          </div>
        </div>
      </div>

      <Card data-testid="card-user-info" className="border-2 hover:shadow-xl transition-all">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
              <User className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-xl">User Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                data-testid="input-fullname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="bg-muted"
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                data-testid="input-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                value={formatDate(profile.dateOfBirth)}
                disabled
                className="bg-muted"
                data-testid="input-dob"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-program-config">
        <CardHeader>
          <CardTitle>Program Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Condition</p>
              <Badge variant="secondary" className="text-sm">
                {mockPatient.condition}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Program Duration</p>
              <p className="font-medium">{mockProgramConfig.programDuration} days</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">{formatDate(mockProgramConfig.startDate)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Days Remaining</p>
              <p className="font-medium">{mockProgramConfig.remainingDays} days</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Enabled Modules</p>
            <div className="flex flex-wrap gap-2">
              {mockProgramConfig.modules.map((module) => (
                <Badge key={module} variant="outline">
                  {module}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleSaveProfile} 
          className="flex-1"
          data-testid="button-save-profile"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Profile Changes
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
