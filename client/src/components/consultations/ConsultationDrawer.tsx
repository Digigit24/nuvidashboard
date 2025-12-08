import { useState, useEffect } from 'react';
import { SideDrawer, DrawerMode } from '@/components/common/SideDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Consultation, CreateConsultationData } from '@/lib/api-config';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ConsultationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: DrawerMode;
  consultation?: Consultation;
  onSubmit: (data: CreateConsultationData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ConsultationDrawer({
  isOpen,
  onClose,
  mode,
  consultation,
  onSubmit,
  isSubmitting = false,
}: ConsultationDrawerProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<CreateConsultationData>({
    patient: 0,
    doctor: null,
    reason: '',
    date: '',
    notes: '',
  });

  // Initialize form data when consultation changes
  useEffect(() => {
    if (consultation && (mode === 'edit' || mode === 'view')) {
      setFormData({
        patient: consultation.patient,
        doctor: consultation.doctor,
        reason: consultation.reason,
        date: consultation.date,
        notes: consultation.notes || '',
      });
    } else if (mode === 'create') {
      // Reset form for create mode
      setFormData({
        patient: user?.id ? parseInt(user.id) : 0,
        doctor: null,
        reason: '',
        date: '',
        notes: '',
      });
    }
  }, [consultation, mode, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: keyof CreateConsultationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isViewMode = mode === 'view';

  const getTitle = () => {
    switch (mode) {
      case 'create':
        return 'Schedule New Consultation';
      case 'edit':
        return 'Edit Consultation';
      case 'view':
        return 'Consultation Details';
      default:
        return 'Consultation';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'create':
        return 'Schedule a new consultation appointment with your healthcare provider';
      case 'edit':
        return 'Update consultation details';
      case 'view':
        return 'View consultation information';
      default:
        return '';
    }
  };

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      mode={mode}
      title={getTitle()}
      description={getDescription()}
      width="lg"
      footer={
        !isViewMode && (
          <div className="flex gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === 'create' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                mode === 'create' ? 'Create Consultation' : 'Update Consultation'
              )}
            </Button>
          </div>
        )
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Reason Field */}
        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Consultation *</Label>
          <Textarea
            id="reason"
            placeholder="Enter the reason for consultation"
            value={formData.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
            disabled={isViewMode}
            required
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Date & Time Field */}
        <div className="space-y-2">
          <Label htmlFor="date">Date & Time *</Label>
          <Input
            id="date"
            type="datetime-local"
            value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleChange('date', new Date(e.target.value).toISOString())}
            disabled={isViewMode}
            required
          />
        </div>

        {/* Doctor Field (if available) */}
        {consultation?.doctor_email && (
          <div className="space-y-2">
            <Label>Doctor</Label>
            <Input
              value={consultation.doctor_email}
              disabled
              className="bg-muted"
            />
          </div>
        )}

        {/* Status Field (view/edit mode only) */}
        {consultation && (
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="px-3 py-2 rounded-md bg-muted text-sm">
              <span className={`font-medium ${
                consultation.status === 'Approved' ? 'text-green-600' :
                consultation.status === 'Pending' ? 'text-yellow-600' :
                consultation.status === 'Completed' ? 'text-blue-600' :
                'text-red-600'
              }`}>
                {consultation.status}
              </span>
            </div>
          </div>
        )}

        {/* Notes Field */}
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add any additional notes or information"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            disabled={isViewMode}
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Patient Email (view mode) */}
        {consultation?.patient_email && isViewMode && (
          <div className="space-y-2">
            <Label>Patient</Label>
            <Input
              value={consultation.patient_email}
              disabled
              className="bg-muted"
            />
          </div>
        )}
      </form>
    </SideDrawer>
  );
}
