import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, DataTableColumn } from '@/components/common/DataTable';
import { usePatients } from '@/hooks/usePatients';
import { useToast } from '@/hooks/use-toast';
import { Users, Mail, Phone, Calendar, User } from 'lucide-react';
import type { PatientUser } from '@/types';

export default function AdminPatients() {
  const {
    patients,
    isLoading,
    error,
    fetchPatients,
  } = usePatients();

  const { toast } = useToast();

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Show error toast if API error occurs
  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
    }
  }, [error, toast]);

  // Handle view patient
  const handleViewPatient = (patient: PatientUser) => {
    toast({
      title: 'View Patient',
      description: `Viewing details for ${patient.full_name}`,
    });
    // TODO: Open patient details drawer or navigate to detail page
  };

  // Handle edit patient
  const handleEditPatient = (patient: PatientUser) => {
    toast({
      title: 'Edit Patient',
      description: `Editing ${patient.full_name}`,
    });
    // TODO: Open edit drawer
  };

  // Define columns for desktop table
  const columns: DataTableColumn<PatientUser>[] = [
    {
      header: 'Patient',
      key: 'full_name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">{row.full_name}</p>
            <p className="text-sm text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      key: 'phone',
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.phone ? (
            <>
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{row.phone}</span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">No phone</span>
          )}
        </div>
      ),
    },
    {
      header: 'Role',
      key: 'role',
      cell: (row) => (
        <Badge variant={row.role === 'admin' ? 'default' : 'secondary'}>
          {row.role}
        </Badge>
      ),
    },
    {
      header: 'Joined',
      key: 'date_joined',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {row.date_joined
              ? new Date(row.date_joined).toLocaleDateString()
              : 'N/A'}
          </span>
        </div>
      ),
    },
  ];

  // Mobile card renderer
  const renderMobileCard = (row: PatientUser, actions: any) => (
    <>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{row.full_name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Mail className="h-3 w-3" />
              {row.email}
            </p>
          </div>
        </div>
        <Badge variant={row.role === 'admin' ? 'default' : 'secondary'}>
          {row.role}
        </Badge>
      </div>

      {row.phone && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          {row.phone}
        </div>
      )}

      {row.date_joined && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Joined {new Date(row.date_joined).toLocaleDateString()}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        {actions.view && (
          <Button onClick={actions.view} variant="outline" size="sm" className="flex-1">
            View
          </Button>
        )}
        {actions.edit && (
          <Button onClick={actions.edit} variant="outline" size="sm" className="flex-1">
            Edit
          </Button>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Users className="h-8 w-8" />
              All Patients
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage all patient accounts
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
              <p className="text-xs text-muted-foreground">
                Registered in the system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">
                Coming soon
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">
                Coming soon
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>
              All registered patients in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable<PatientUser>
              rows={patients}
              isLoading={isLoading}
              columns={columns}
              renderMobileCard={renderMobileCard}
              getRowId={(row) => row.id}
              getRowLabel={(row) => row.full_name}
              onView={handleViewPatient}
              onEdit={handleEditPatient}
              emptyTitle="No patients found"
              emptySubtitle="No patients are registered in the system"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
