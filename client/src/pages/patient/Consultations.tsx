import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Loader2, Plus, User } from 'lucide-react';
import { useConsultations } from '@/hooks/useConsultations';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTable, DataTableColumn } from '@/components/common/DataTable';
import { ConsultationDrawer } from '@/components/consultations/ConsultationDrawer';
import { Consultation, CreateConsultationData } from '@/lib/api-config';
import { useToast } from '@/hooks/use-toast';
import { DrawerMode } from '@/components/common/SideDrawer';

export default function PatientConsultations() {
  const { consultations, isLoading, error, fetchConsultations, createConsultation } = useConsultations();
  const { toast } = useToast();

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('create');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch consultations on component mount
  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  // Filter consultations by status
  const upcomingConsultations = Array.isArray(consultations)
    ? consultations.filter(c => c.status === 'Pending' || c.status === 'Approved')
    : [];
  const pastConsultations = Array.isArray(consultations)
    ? consultations.filter(c => c.status === 'Completed' || c.status === 'Cancelled')
    : [];

  // Handle create consultation
  const handleCreateClick = () => {
    setDrawerMode('create');
    setSelectedConsultation(undefined);
    setIsDrawerOpen(true);
  };

  // Handle view consultation
  const handleViewClick = (consultation: Consultation) => {
    setDrawerMode('view');
    setSelectedConsultation(consultation);
    setIsDrawerOpen(true);
  };

  // Handle edit consultation
  const handleEditClick = (consultation: Consultation) => {
    setDrawerMode('edit');
    setSelectedConsultation(consultation);
    setIsDrawerOpen(true);
  };

  // Handle submit (create/edit)
  const handleSubmit = async (data: CreateConsultationData) => {
    setIsSubmitting(true);
    try {
      if (drawerMode === 'create') {
        await createConsultation(data);
        toast({
          title: 'Success',
          description: 'Consultation created successfully',
        });
      }
      // TODO: Add update logic when updateConsultation is available

      setIsDrawerOpen(false);
      fetchConsultations(); // Refresh the list
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to save consultation',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define table columns for new DataTable API
  const columns: DataTableColumn<Consultation>[] = [
    {
      key: 'date',
      header: 'Date & Time',
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{new Date(item.date).toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'reason',
      header: 'Reason',
      cell: (item) => <span className="font-medium">{item.reason}</span>,
    },
    {
      key: 'doctor_email',
      header: 'Doctor',
      cell: (item) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{item.doctor_email || 'Not assigned'}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item) => (
        <Badge
          variant={
            item.status === 'Approved' ? 'default' :
            item.status === 'Pending' ? 'secondary' :
            item.status === 'Completed' ? 'outline' :
            'destructive'
          }
        >
          {item.status}
        </Badge>
      ),
    },
  ];

  // Mobile card renderer
  const renderMobileCard = (item: Consultation, actions: any) => (
    <>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{item.reason}</h3>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(item.date).toLocaleString()}
          </p>
          {item.doctor_email && (
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <User className="h-3 w-3" />
              {item.doctor_email}
            </p>
          )}
        </div>
        <Badge
          variant={
            item.status === 'Approved' ? 'default' :
            item.status === 'Pending' ? 'secondary' :
            item.status === 'Completed' ? 'outline' :
            'destructive'
          }
        >
          {item.status}
        </Badge>
      </div>
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-page-title">
                  Consultations
                </h1>
                <p className="text-white/90 text-lg mt-1">
                  Manage your appointments with healthcare providers
                </p>
              </div>
            </div>
            <Button
              onClick={handleCreateClick}
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Consultation
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">
                {upcomingConsultations.length} Upcoming
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">
                {pastConsultations.length} Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Consultations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Upcoming Consultations</h2>
            <Badge variant="secondary">{upcomingConsultations.length}</Badge>
          </div>
        </div>

        <DataTable<Consultation>
          rows={upcomingConsultations}
          isLoading={false}
          columns={columns}
          renderMobileCard={renderMobileCard}
          getRowId={(row) => row.id}
          getRowLabel={(row) => row.reason}
          onView={handleViewClick}
          onEdit={handleEditClick}
          emptyTitle="No upcoming consultations"
          emptySubtitle="Click 'New Consultation' to schedule one."
        />
      </div>

      {/* Past Consultations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Calendar className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold">Past Consultations</h2>
            <Badge variant="outline">{pastConsultations.length}</Badge>
          </div>
        </div>

        <DataTable<Consultation>
          rows={pastConsultations}
          isLoading={false}
          columns={columns}
          renderMobileCard={renderMobileCard}
          getRowId={(row) => row.id}
          getRowLabel={(row) => row.reason}
          onView={handleViewClick}
          onEdit={handleEditClick}
          emptyTitle="No past consultations"
          emptySubtitle="No completed or cancelled consultations yet"
        />
      </div>

      {/* Consultation Drawer */}
      <ConsultationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode={drawerMode}
        consultation={selectedConsultation}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
