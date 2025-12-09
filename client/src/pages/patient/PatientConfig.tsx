import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, DataTableColumn } from '@/components/common/DataTable';
import { PatientConfigDrawer } from '@/components/patient-config/PatientConfigDrawer';
import { usePatientConfig } from '@/hooks/usePatientConfig';
import { useToast } from '@/hooks/use-toast';
import { Settings, Plus, Activity, TrendingUp } from 'lucide-react';
import type { VitalRecord, DrawerMode, UpdatePatientConfigData } from '@/types';

export default function PatientConfig() {
  const {
    config,
    vitals,
    isLoading,
    error,
    fetchConfig,
    updateConfig,
    fetchVitals,
  } = usePatientConfig();

  const { toast } = useToast();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('view');

  // Fetch data on component mount
  useEffect(() => {
    fetchConfig();
    fetchVitals();
  }, [fetchConfig, fetchVitals]);

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

  // Handle save config
  const handleSaveConfig = async (data: UpdatePatientConfigData) => {
    const success = await updateConfig(data);
    if (success) {
      toast({
        title: 'Success',
        description: 'Patient configuration updated successfully',
      });
      await fetchConfig(); // Refresh config
    }
  };

  // Handle opening drawer in different modes
  const handleViewConfig = () => {
    setDrawerMode('view');
    setDrawerOpen(true);
  };

  const handleEditConfig = () => {
    setDrawerMode('edit');
    setDrawerOpen(true);
  };

  // Define columns for vitals table
  const vitalColumns: DataTableColumn<VitalRecord>[] = [
    {
      header: 'Vital Type',
      key: 'vital_type',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <span className="font-medium capitalize">{row.vital_type.replace(/_/g, ' ')}</span>
        </div>
      ),
    },
    {
      header: 'Value',
      key: 'value',
      cell: (row) => (
        <span className="font-semibold text-foreground">{row.value}</span>
      ),
    },
    {
      header: 'Recorded At',
      key: 'timestamp',
      cell: (row) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.timestamp).toLocaleString()}
        </span>
      ),
    },
  ];

  // Mobile card renderer for vitals
  const renderVitalMobileCard = (row: VitalRecord) => (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold capitalize">
              {row.vital_type.replace(/_/g, ' ')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {new Date(row.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">{row.value}</p>
        </div>
      </div>
    </>
  );

  // Calculate BMI if height and weight are available
  const bmi = config?.height && config?.weight
    ? (config.weight / Math.pow(config.height / 100, 2)).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Patient Configuration
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your health profile and track vital signs
            </p>
          </div>
          <Button onClick={handleEditConfig} size="lg">
            <Settings className="h-4 w-4 mr-2" />
            Edit Config
          </Button>
        </div>

        {/* Config Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Height</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {config?.height ? `${config.height} cm` : 'Not set'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weight</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {config?.weight ? `${config.weight} kg` : 'Not set'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Age</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {config?.age ? `${config.age} years` : 'Not set'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Target Calories</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {config?.target_calories ? `${config.target_calories} kcal` : 'Not set'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BMI Card (if applicable) */}
        {bmi && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Body Mass Index (BMI)</CardTitle>
              <CardDescription>Calculated from your height and weight</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-primary">{bmi}</div>
                <div className="text-sm text-muted-foreground">
                  {parseFloat(bmi) < 18.5 && 'Underweight'}
                  {parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 25 && 'Normal weight'}
                  {parseFloat(bmi) >= 25 && parseFloat(bmi) < 30 && 'Overweight'}
                  {parseFloat(bmi) >= 30 && 'Obese'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vitals Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Vital Records</CardTitle>
                <CardDescription className="mt-1">
                  Track your health vitals over time
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Vital
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable<VitalRecord>
              rows={vitals}
              isLoading={isLoading}
              columns={vitalColumns}
              renderMobileCard={renderVitalMobileCard}
              getRowId={(row) => row.id}
              getRowLabel={(row) => row.vital_type}
              emptyTitle="No vital records found"
              emptySubtitle="Start tracking your health by adding vital records"
            />
          </CardContent>
        </Card>
      </div>

      {/* Config Drawer */}
      <PatientConfigDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        mode={drawerMode}
        config={config}
        onSave={handleSaveConfig}
        isLoading={isLoading}
      />
    </div>
  );
}
