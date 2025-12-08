import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export interface DataTableColumn<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  width?: string;
}

export interface DataTableAction<T> {
  label: string;
  icon?: ReactNode;
  onClick: (item: T) => void;
  variant?: 'default' | 'destructive';
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  actions?: DataTableAction<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  loading?: boolean;
}

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
  actions,
  onRowClick,
  emptyMessage = 'No data available',
  loading = false,
}: DataTableProps<T>) {
  const defaultActions: DataTableAction<T>[] = actions || [
    {
      label: 'View',
      icon: <Eye className="mr-2 h-4 w-4" />,
      onClick: (item) => console.log('View', item),
    },
    {
      label: 'Edit',
      icon: <Edit className="mr-2 h-4 w-4" />,
      onClick: (item) => console.log('Edit', item),
    },
    {
      label: 'Delete',
      icon: <Trash2 className="mr-2 h-4 w-4" />,
      onClick: (item) => console.log('Delete', item),
      variant: 'destructive',
    },
  ];

  if (loading) {
    return (
      <Card>
        <div className="p-8 text-center">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <div className="p-12 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} style={{ width: column.width }}>
                  {column.label}
                </TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="w-[70px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(item)
                      : String((item as any)[column.key] ?? '-')}
                  </TableCell>
                ))}
                {actions && actions.length > 0 && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {actions.map((action, index) => (
                          <DropdownMenuItem
                            key={index}
                            onClick={() => action.onClick(item)}
                            className={
                              action.variant === 'destructive'
                                ? 'text-destructive focus:text-destructive'
                                : ''
                            }
                          >
                            {action.icon}
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
