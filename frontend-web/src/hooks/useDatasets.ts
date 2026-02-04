import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dataset, EquipmentData, ParsedCSVResult } from '@/types/equipment';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export function useDatasets() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [currentDataset, setCurrentDataset] = useState<Dataset | null>(null);
  const [equipment, setEquipment] = useState<EquipmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user's datasets (history)
  const fetchDatasets = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('datasets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching datasets:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch upload history',
        variant: 'destructive',
      });
    } else {
      setDatasets(data as Dataset[]);
      if (data && data.length > 0 && !currentDataset) {
        loadDataset(data[0].id);
      }
    }
    setLoading(false);
  };

  // Load a specific dataset with its equipment
  const loadDataset = async (datasetId: string) => {
    setLoading(true);
    
    // Fetch dataset
    const { data: datasetData, error: datasetError } = await supabase
      .from('datasets')
      .select('*')
      .eq('id', datasetId)
      .maybeSingle();

    if (datasetError || !datasetData) {
      console.error('Error loading dataset:', datasetError);
      setLoading(false);
      return;
    }

    // Fetch equipment for this dataset
    const { data: equipmentData, error: equipmentError } = await supabase
      .from('equipment')
      .select('*')
      .eq('dataset_id', datasetId);

    if (equipmentError) {
      console.error('Error loading equipment:', equipmentError);
    }

    setCurrentDataset(datasetData as Dataset);
    setEquipment((equipmentData || []) as EquipmentData[]);
    setLoading(false);
  };

  // Upload new dataset
  const uploadDataset = async (parsed: ParsedCSVResult) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to upload data',
        variant: 'destructive',
      });
      return null;
    }

    setLoading(true);

    try {
      // Create dataset record
      const { data: newDataset, error: datasetError } = await supabase
        .from('datasets')
        .insert({
          user_id: user.id,
          filename: parsed.filename,
          total_equipment: parsed.summary.totalCount,
          avg_flowrate: parsed.summary.avgFlowrate,
          avg_pressure: parsed.summary.avgPressure,
          avg_temperature: parsed.summary.avgTemperature,
        })
        .select()
        .single();

      if (datasetError) throw datasetError;

      // Insert equipment records
      const equipmentRecords = parsed.data.map(item => ({
        dataset_id: newDataset.id,
        equipment_name: item.equipment_name,
        equipment_type: item.equipment_type,
        flowrate: item.flowrate,
        pressure: item.pressure,
        temperature: item.temperature,
      }));

      const { error: equipmentError } = await supabase
        .from('equipment')
        .insert(equipmentRecords);

      if (equipmentError) throw equipmentError;

      toast({
        title: 'Success',
        description: `Uploaded ${parsed.summary.totalCount} equipment records`,
      });

      // Refresh data
      await fetchDatasets();
      loadDataset(newDataset.id);

      return newDataset as Dataset;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload dataset',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a dataset
  const deleteDataset = async (datasetId: string) => {
    const { error } = await supabase
      .from('datasets')
      .delete()
      .eq('id', datasetId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete dataset',
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: 'Deleted',
      description: 'Dataset removed successfully',
    });

    // If we deleted the current dataset, clear it
    if (currentDataset?.id === datasetId) {
      setCurrentDataset(null);
      setEquipment([]);
    }

    fetchDatasets();
    return true;
  };

  useEffect(() => {
    fetchDatasets();
  }, [user]);

  return {
    datasets,
    currentDataset,
    equipment,
    loading,
    fetchDatasets,
    loadDataset,
    uploadDataset,
    deleteDataset,
  };
}
