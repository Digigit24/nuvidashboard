import { ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export type DrawerMode = 'create' | 'edit' | 'view';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: DrawerMode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl';
}

const widthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function SideDrawer({
  isOpen,
  onClose,
  mode,
  title,
  description,
  children,
  footer,
  width = 'lg',
}: SideDrawerProps) {
  const getModeColor = () => {
    switch (mode) {
      case 'create':
        return 'text-green-600';
      case 'edit':
        return 'text-blue-600';
      case 'view':
        return 'text-gray-600';
      default:
        return '';
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'create':
        return 'New';
      case 'edit':
        return 'Edit';
      case 'view':
        return 'View';
      default:
        return '';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className={`${widthClasses[width]} overflow-y-auto`} side="right">
        <SheetHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold uppercase tracking-wide ${getModeColor()}`}>
                {getModeLabel()}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetTitle className="text-2xl">{title}</SheetTitle>
          {description && (
            <SheetDescription className="text-muted-foreground">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {children}
        </div>

        {footer && (
          <SheetFooter className="mt-6">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
