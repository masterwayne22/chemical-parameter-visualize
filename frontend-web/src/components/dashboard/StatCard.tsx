import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  variant?: 'default' | 'flowrate' | 'pressure' | 'temperature' | 'count';
  className?: string;
}

const variantStyles = {
  default: 'border-border',
  flowrate: 'border-flowrate/30 [&_.stat-icon]:bg-flowrate/10 [&_.stat-icon]:text-flowrate [&_.stat-value]:text-flowrate',
  pressure: 'border-pressure/30 [&_.stat-icon]:bg-pressure/10 [&_.stat-icon]:text-pressure [&_.stat-value]:text-pressure',
  temperature: 'border-temperature/30 [&_.stat-icon]:bg-temperature/10 [&_.stat-icon]:text-temperature [&_.stat-value]:text-temperature',
  count: 'border-primary/30 [&_.stat-icon]:bg-primary/10 [&_.stat-icon]:text-primary [&_.stat-value]:text-primary',
};

export function StatCard({ 
  title, 
  value, 
  unit, 
  icon, 
  variant = 'default',
  className 
}: StatCardProps) {
  const formattedValue = typeof value === 'number' 
    ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
    : value;

  return (
    <div 
      className={cn(
        'card-industrial rounded-xl p-6 border-l-4 animate-slide-up',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="stat-label mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="stat-value">{formattedValue}</span>
            {unit && (
              <span className="text-sm text-muted-foreground font-mono">
                {unit}
              </span>
            )}
          </div>
        </div>
        <div className="stat-icon p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}
