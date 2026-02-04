export interface EquipmentData {
  id?: string;
  equipment_name: string;
  equipment_type: string;
  flowrate: number | null;
  pressure: number | null;
  temperature: number | null;
}

export interface Dataset {
  id: string;
  user_id: string;
  filename: string;
  total_equipment: number;
  avg_flowrate: number | null;
  avg_pressure: number | null;
  avg_temperature: number | null;
  created_at: string;
}

export interface DatasetWithEquipment extends Dataset {
  equipment: EquipmentData[];
}

export interface EquipmentSummary {
  totalCount: number;
  avgFlowrate: number;
  avgPressure: number;
  avgTemperature: number;
  typeDistribution: { type: string; count: number }[];
}

export interface ParsedCSVResult {
  data: EquipmentData[];
  summary: EquipmentSummary;
  filename: string;
}
