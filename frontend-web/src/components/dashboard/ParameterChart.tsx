import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { EquipmentData } from '@/types/equipment';

interface ParameterChartProps {
  equipment: EquipmentData[];
}

export function ParameterChart({ equipment }: ParameterChartProps) {
  if (!equipment || equipment.length === 0) {
    return (
      <div className="card-industrial rounded-xl p-6 animate-slide-up h-[400px] flex flex-col items-center justify-center">
        <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No parameter data available</p>
      </div>
    );
  }

  // Prepare data - show first 10 items for readability
  const chartData = equipment.slice(0, 10).map(item => ({
    name: item.equipment_name.length > 12 
      ? item.equipment_name.slice(0, 12) + '...' 
      : item.equipment_name,
    fullName: item.equipment_name,
    flowrate: item.flowrate ?? 0,
    pressure: item.pressure ?? 0,
    temperature: item.temperature ?? 0,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const item = payload[0]?.payload;
    
    return (
      <div className="bg-popover border border-border rounded-lg p-4 shadow-lg">
        <p className="font-mono font-semibold mb-2">{item.fullName}</p>
        <div className="space-y-1 text-sm">
          <p className="text-flowrate">
            Flowrate: {item.flowrate.toFixed(2)} m³/h
          </p>
          <p className="text-pressure">
            Pressure: {item.pressure.toFixed(2)} bar
          </p>
          <p className="text-temperature">
            Temperature: {item.temperature.toFixed(2)} °C
          </p>
        </div>
      </div>
    );
  };

  const renderLegend = () => (
    <div className="flex justify-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-flowrate" />
        <span className="text-sm text-muted-foreground">Flowrate</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-pressure" />
        <span className="text-sm text-muted-foreground">Pressure</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-temperature" />
        <span className="text-sm text-muted-foreground">Temperature</span>
      </div>
    </div>
  );

  return (
    <div className="card-industrial rounded-xl p-6 animate-slide-up">
      <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        Equipment Parameters
        <span className="text-sm text-muted-foreground font-normal ml-2">
          (Top 10)
        </span>
      </h3>
      
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(220, 15%, 22%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(220, 15%, 22%)' }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(220, 15%, 22%)' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(220, 15%, 18%)' }} />
            <Bar 
              dataKey="flowrate" 
              fill="hsl(190, 95%, 50%)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar 
              dataKey="pressure" 
              fill="hsl(25, 95%, 55%)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar 
              dataKey="temperature" 
              fill="hsl(145, 70%, 50%)" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {renderLegend()}
    </div>
  );
}
