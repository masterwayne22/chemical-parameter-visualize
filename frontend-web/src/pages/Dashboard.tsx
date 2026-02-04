import { Droplets, Gauge, Thermometer, Package } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { CSVUploader } from '@/components/dashboard/CSVUploader';
import { EquipmentTable } from '@/components/dashboard/EquipmentTable';
import { EquipmentTypeChart } from '@/components/dashboard/EquipmentTypeChart';
import { ParameterChart } from '@/components/dashboard/ParameterChart';
import { UploadHistory } from '@/components/dashboard/UploadHistory';
import { useDatasets } from '@/hooks/useDatasets';
import { calculateSummary } from '@/lib/csv-parser';
import { Skeleton } from '@/components/ui/skeleton';

export function Dashboard() {
  const { 
    datasets, 
    currentDataset, 
    equipment, 
    loading,
    loadDataset,
    deleteDataset 
  } = useDatasets();

  // Calculate summary from current equipment
  const summary = equipment.length > 0 
    ? calculateSummary(equipment) 
    : { totalCount: 0, avgFlowrate: 0, avgPressure: 0, avgTemperature: 0, typeDistribution: [] };

  if (loading && datasets.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header dataset={null} equipment={[]} />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[120px] rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-[400px] rounded-xl lg:col-span-2" />
            <Skeleton className="h-[400px] rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header dataset={currentDataset} equipment={equipment} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Equipment"
            value={summary.totalCount}
            icon={<Package className="w-6 h-6" />}
            variant="count"
          />
          <StatCard
            title="Avg Flowrate"
            value={summary.avgFlowrate}
            unit="m³/h"
            icon={<Droplets className="w-6 h-6" />}
            variant="flowrate"
          />
          <StatCard
            title="Avg Pressure"
            value={summary.avgPressure}
            unit="bar"
            icon={<Gauge className="w-6 h-6" />}
            variant="pressure"
          />
          <StatCard
            title="Avg Temperature"
            value={summary.avgTemperature}
            unit="°C"
            icon={<Thermometer className="w-6 h-6" />}
            variant="temperature"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Upload & History */}
          <div className="space-y-6">
            <CSVUploader />
            <UploadHistory
              datasets={datasets}
              currentDatasetId={currentDataset?.id}
              onSelect={loadDataset}
              onDelete={deleteDataset}
            />
          </div>

          {/* Right Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EquipmentTypeChart data={summary.typeDistribution} />
              <ParameterChart equipment={equipment} />
            </div>
          </div>
        </div>

        {/* Equipment Table */}
        <EquipmentTable equipment={equipment} />
      </main>
    </div>
  );
}
