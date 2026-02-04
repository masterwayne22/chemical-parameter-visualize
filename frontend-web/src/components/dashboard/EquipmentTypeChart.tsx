import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

interface EquipmentTypeChartProps {
  data: { type: string; count: number }[];
}

const COLORS = [
  'hsl(190, 95%, 50%)',  // cyan - primary
  'hsl(25, 95%, 55%)',   // orange - accent
  'hsl(145, 70%, 50%)',  // green - temperature
  'hsl(265, 85%, 60%)',  // purple - pump
  'hsl(340, 85%, 60%)',  // pink - valve
  'hsl(45, 95%, 55%)',   // yellow - vessel
  'hsl(200, 85%, 55%)',  // blue
  'hsl(280, 75%, 55%)',  // violet
];

export function EquipmentTypeChart({ data }: EquipmentTypeChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="card-industrial rounded-xl p-6 animate-slide-up h-[400px] flex flex-col items-center justify-center">
        <PieChartIcon className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No type data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.count, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    const item = payload[0].payload;
    const percentage = ((item.count / total) * 100).toFixed(1);
    
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="font-mono font-semibold">{item.type}</p>
        <p className="text-muted-foreground text-sm">
          {item.count} units ({percentage}%)
        </p>
      </div>
    );
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="card-industrial rounded-xl p-6 animate-slide-up">
      <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
        <PieChartIcon className="w-5 h-5 text-primary" />
        Equipment Type Distribution
      </h3>
      
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="count"
              nameKey="type"
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-200 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
