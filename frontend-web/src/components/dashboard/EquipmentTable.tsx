import { useState, useMemo } from 'react';
import { EquipmentData } from '@/types/equipment';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ChevronUp, ChevronDown, Search, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EquipmentTableProps {
  equipment: EquipmentData[];
}

type SortKey = 'equipment_name' | 'equipment_type' | 'flowrate' | 'pressure' | 'temperature';
type SortDirection = 'asc' | 'desc';

export function EquipmentTable({ equipment }: EquipmentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('equipment_name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...equipment];

    // Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        item =>
          item.equipment_name.toLowerCase().includes(term) ||
          item.equipment_type.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      // Handle null values
      if (aVal === null) return sortDirection === 'asc' ? 1 : -1;
      if (bVal === null) return sortDirection === 'asc' ? -1 : 1;

      // Compare
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [equipment, searchTerm, sortKey, sortDirection]);

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  const formatValue = (value: number | null, decimals = 2) => {
    if (value === null) return '—';
    return value.toFixed(decimals);
  };

  if (equipment.length === 0) {
    return (
      <div className="card-industrial rounded-xl p-8 text-center animate-slide-up">
        <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No equipment data available</p>
        <p className="text-sm text-muted-foreground mt-2">
          Upload a CSV file to see equipment details
        </p>
      </div>
    );
  }

  return (
    <div className="card-industrial rounded-xl overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between gap-4">
        <h3 className="text-lg font-mono font-semibold flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Equipment Data
          <span className="text-sm text-muted-foreground font-normal ml-2">
            ({filteredAndSorted.length} of {equipment.length})
          </span>
        </h3>
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('equipment_name')}
              >
                Equipment Name <SortIcon columnKey="equipment_name" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('equipment_type')}
              >
                Type <SortIcon columnKey="equipment_type" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors text-right"
                onClick={() => handleSort('flowrate')}
              >
                Flowrate <SortIcon columnKey="flowrate" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors text-right"
                onClick={() => handleSort('pressure')}
              >
                Pressure <SortIcon columnKey="pressure" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-primary transition-colors text-right"
                onClick={() => handleSort('temperature')}
              >
                Temperature <SortIcon columnKey="temperature" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.map((item, index) => (
              <TableRow 
                key={item.id || index} 
                className="border-border hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-mono font-medium">
                  {item.equipment_name}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {item.equipment_type}
                  </span>
                </TableCell>
                <TableCell className={cn(
                  "text-right font-mono",
                  item.flowrate !== null && "text-flowrate"
                )}>
                  {formatValue(item.flowrate)} {item.flowrate !== null && <span className="text-muted-foreground text-xs">m³/h</span>}
                </TableCell>
                <TableCell className={cn(
                  "text-right font-mono",
                  item.pressure !== null && "text-pressure"
                )}>
                  {formatValue(item.pressure)} {item.pressure !== null && <span className="text-muted-foreground text-xs">bar</span>}
                </TableCell>
                <TableCell className={cn(
                  "text-right font-mono",
                  item.temperature !== null && "text-temperature"
                )}>
                  {formatValue(item.temperature)} {item.temperature !== null && <span className="text-muted-foreground text-xs">°C</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
