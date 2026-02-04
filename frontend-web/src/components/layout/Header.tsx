import { Beaker, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { PDFReportButton } from '@/components/dashboard/PDFReportButton';
import { Dataset, EquipmentData } from '@/types/equipment';

interface HeaderProps {
  dataset: Dataset | null;
  equipment: EquipmentData[];
}

export function Header({ dataset, equipment }: HeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 glow-primary">
            <Beaker className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-mono font-bold text-foreground">
              CEPV
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Chemical Equipment Parameter Visualizer
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <PDFReportButton dataset={dataset} equipment={equipment} />
          
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="max-w-[150px] truncate">{user?.email}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
