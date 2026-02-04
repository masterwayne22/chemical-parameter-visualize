import { EquipmentData, EquipmentSummary, ParsedCSVResult } from "@/types/equipment";

export function parseCSV(csvText: string, filename: string): ParsedCSVResult {
  const lines = csvText.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV file must have a header row and at least one data row');
  }

  // Parse header - normalize column names
  const header = lines[0].split(',').map(col => 
    col.trim().toLowerCase().replace(/\s+/g, '_')
  );

  // Map expected columns
  const colMap = {
    name: header.findIndex(h => h.includes('name') || h.includes('equipment')),
    type: header.findIndex(h => h.includes('type')),
    flowrate: header.findIndex(h => h.includes('flow')),
    pressure: header.findIndex(h => h.includes('pressure')),
    temperature: header.findIndex(h => h.includes('temp')),
  };

  // Validate required columns
  if (colMap.name === -1) throw new Error('Missing "Equipment Name" column');
  if (colMap.type === -1) throw new Error('Missing "Type" column');

  // Parse data rows
  const data: EquipmentData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    
    if (values.length < header.length) continue;

    const equipment: EquipmentData = {
      equipment_name: values[colMap.name]?.trim() || `Equipment ${i}`,
      equipment_type: values[colMap.type]?.trim() || 'Unknown',
      flowrate: colMap.flowrate >= 0 ? parseFloat(values[colMap.flowrate]) || null : null,
      pressure: colMap.pressure >= 0 ? parseFloat(values[colMap.pressure]) || null : null,
      temperature: colMap.temperature >= 0 ? parseFloat(values[colMap.temperature]) || null : null,
    };

    data.push(equipment);
  }

  if (data.length === 0) {
    throw new Error('No valid equipment data found in CSV');
  }

  // Calculate summary
  const summary = calculateSummary(data);

  return { data, summary, filename };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

export function calculateSummary(data: EquipmentData[]): EquipmentSummary {
  const totalCount = data.length;

  // Calculate averages (ignoring null values)
  const flowrates = data.filter(d => d.flowrate !== null).map(d => d.flowrate!);
  const pressures = data.filter(d => d.pressure !== null).map(d => d.pressure!);
  const temperatures = data.filter(d => d.temperature !== null).map(d => d.temperature!);

  const avgFlowrate = flowrates.length > 0 
    ? flowrates.reduce((a, b) => a + b, 0) / flowrates.length 
    : 0;
  const avgPressure = pressures.length > 0 
    ? pressures.reduce((a, b) => a + b, 0) / pressures.length 
    : 0;
  const avgTemperature = temperatures.length > 0 
    ? temperatures.reduce((a, b) => a + b, 0) / temperatures.length 
    : 0;

  // Calculate type distribution
  const typeCounts = data.reduce((acc, item) => {
    const type = item.equipment_type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeDistribution = Object.entries(typeCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalCount,
    avgFlowrate,
    avgPressure,
    avgTemperature,
    typeDistribution,
  };
}
