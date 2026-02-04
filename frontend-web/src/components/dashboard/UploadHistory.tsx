import { Dataset } from '@/types/equipment';
import { History, FileText, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface UploadHistoryProps {
  datasets: Dataset[];
  currentDatasetId?: string;
  onSelect: (datasetId: string) => void;
  onDelete: (datasetId: string) => void;
}

export function UploadHistory({ 
  datasets, 
  currentDatasetId, 
  onSelect, 
  onDelete 
}: UploadHistoryProps) {
  if (datasets.length === 0) {
    return (
      <div className="card-industrial rounded-xl p-6 animate-slide-up">
        <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Upload History
        </h3>
        <div className="text-center py-8">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No datasets uploaded yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-industrial rounded-xl p-6 animate-slide-up">
      <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
        <History className="w-5 h-5 text-primary" />
        Upload History
        <span className="text-sm text-muted-foreground font-normal">
          (Last 5)
        </span>
      </h3>

      <div className="space-y-2">
        {datasets.map((dataset) => (
          <div
            key={dataset.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer',
              currentDatasetId === dataset.id
                ? 'border-primary/50 bg-primary/5'
                : 'border-border hover:border-primary/30 hover:bg-muted/30'
            )}
            onClick={() => onSelect(dataset.id)}
          >
            <div className={cn(
              'p-2 rounded-lg',
              currentDatasetId === dataset.id 
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            )}>
              {currentDatasetId === dataset.id ? (
                <Check className="w-4 h-4" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm truncate">
                {dataset.filename}
              </p>
              <p className="text-xs text-muted-foreground">
                {dataset.total_equipment} items • {format(new Date(dataset.created_at), 'MMM d, h:mm a')}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(dataset.id);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
