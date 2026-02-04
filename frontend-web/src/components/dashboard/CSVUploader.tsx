import { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parseCSV } from '@/lib/csv-parser';
import { useDatasets } from '@/hooks/useDatasets';
import { cn } from '@/lib/utils';

export function CSVUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { uploadDataset } = useDatasets();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    setError(null);
    
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const text = await selectedFile.text();
      const parsed = parseCSV(text, selectedFile.name);
      await uploadDataset(parsed);
      setSelectedFile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to parse CSV file');
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="card-industrial rounded-xl p-6 animate-slide-up">
      <h3 className="text-lg font-mono font-semibold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-primary" />
        Upload Equipment Data
      </h3>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200',
          dragActive 
            ? 'border-primary bg-primary/5 glow-primary' 
            : 'border-border hover:border-primary/50',
          selectedFile && 'border-primary/30'
        )}
      >
        {selectedFile ? (
          <div className="flex items-center justify-center gap-4">
            <FileText className="w-10 h-10 text-primary" />
            <div className="text-left">
              <p className="font-mono font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
              className="ml-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Drag & drop your CSV file here, or
            </p>
            <label className="cursor-pointer">
              <span className="text-primary hover:text-primary/80 underline">
                browse files
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-muted-foreground mt-4">
              Expected columns: Equipment Name, Type, Flowrate, Pressure, Temperature
            </p>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2 text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && (
        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full mt-4 bg-primary text-primary-foreground"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload & Analyze
            </>
          )}
        </Button>
      )}
    </div>
  );
}
