import { useState, useEffect } from 'react';
import { SideDrawer, DrawerMode, DrawerActionButton } from '@/components/common/SideDrawer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Save, X } from 'lucide-react';
import type { PatientConfig, UpdatePatientConfigData } from '@/types';

interface PatientConfigDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DrawerMode;
  config: PatientConfig | null;
  onSave: (data: UpdatePatientConfigData) => Promise<void>;
  isLoading?: boolean;
}

export function PatientConfigDrawer({
  open,
  onOpenChange,
  mode,
  config,
  onSave,
  isLoading = false,
}: PatientConfigDrawerProps) {
  const [formData, setFormData] = useState<UpdatePatientConfigData>({
    height: null,
    weight: null,
    age: null,
    target_calories: null,
  });

  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data when config changes or mode changes
  useEffect(() => {
    if (config && open) {
      setFormData({
        height: config.height ?? null,
        weight: config.weight ?? null,
        age: config.age ?? null,
        target_calories: config.target_calories ?? null,
      });
    }
  }, [config, open]);

  const handleInputChange = (field: keyof UpdatePatientConfigData, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving patient config:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  // Define footer buttons based on mode
  const footerButtons: DrawerActionButton[] = [];

  if (mode === 'view') {
    footerButtons.push({
      label: 'Close',
      onClick: handleClose,
      variant: 'outline',
    });
  } else if (mode === 'edit' || mode === 'create') {
    footerButtons.push(
      {
        label: 'Cancel',
        onClick: handleClose,
        variant: 'outline',
        disabled: isSaving,
      },
      {
        label: mode === 'create' ? 'Create' : 'Save Changes',
        onClick: handleSave,
        variant: 'default',
        loading: isSaving,
        icon: Save,
        iconPosition: 'left',
      }
    );
  }

  const isReadOnly = mode === 'view';

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Patient Configuration"
      mode={mode}
      isLoading={isLoading}
      loadingText="Loading patient config..."
      footerButtons={footerButtons}
      footerAlignment="right"
      size="md"
    >
      <div className="space-y-6">
        {/* Height */}
        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm font-medium">
            Height (cm)
          </Label>
          <Input
            id="height"
            type="number"
            step="0.1"
            placeholder="Enter height in cm"
            value={formData.height ?? ''}
            onChange={(e) => handleInputChange('height', e.target.value)}
            disabled={isReadOnly || isSaving}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Your height in centimeters
          </p>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium">
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            placeholder="Enter weight in kg"
            value={formData.weight ?? ''}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            disabled={isReadOnly || isSaving}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Your current weight in kilograms
          </p>
        </div>

        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium">
            Age (years)
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter age"
            value={formData.age ?? ''}
            onChange={(e) => handleInputChange('age', e.target.value)}
            disabled={isReadOnly || isSaving}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Your age in years
          </p>
        </div>

        {/* Target Calories */}
        <div className="space-y-2">
          <Label htmlFor="target_calories" className="text-sm font-medium">
            Target Calories (kcal/day)
          </Label>
          <Input
            id="target_calories"
            type="number"
            placeholder="Enter target calories"
            value={formData.target_calories ?? ''}
            onChange={(e) => handleInputChange('target_calories', e.target.value)}
            disabled={isReadOnly || isSaving}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Your daily calorie target
          </p>
        </div>

        {/* Info Section (shown in view mode) */}
        {mode === 'view' && config && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Configuration Summary</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Height:</span>
                <span className="ml-2 font-medium">{config.height ? `${config.height} cm` : 'Not set'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Weight:</span>
                <span className="ml-2 font-medium">{config.weight ? `${config.weight} kg` : 'Not set'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Age:</span>
                <span className="ml-2 font-medium">{config.age ? `${config.age} years` : 'Not set'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Target Calories:</span>
                <span className="ml-2 font-medium">{config.target_calories ? `${config.target_calories} kcal` : 'Not set'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </SideDrawer>
  );
}
