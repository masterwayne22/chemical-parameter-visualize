import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dataset, EquipmentData, EquipmentSummary } from '@/types/equipment';
import { calculateSummary } from '@/lib/csv-parser';
import { useToast } from '@/hooks/use-toast';

interface PDFReportButtonProps {
  dataset: Dataset | null;
  equipment: EquipmentData[];
}

export function PDFReportButton({ dataset, equipment }: PDFReportButtonProps) {
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const generatePDF = async () => {
    if (!dataset || equipment.length === 0) {
      toast({
        title: 'No Data',
        description: 'Upload equipment data to generate a report',
        variant: 'destructive',
      });
      return;
    }

    setGenerating(true);

    try {
      // Calculate summary
      const summary = calculateSummary(equipment);
      
      // Generate HTML content for the report
      const htmlContent = generateReportHTML(dataset, equipment, summary);
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 250);
      };

      toast({
        title: 'Report Generated',
        description: 'Print dialog opened. Save as PDF to download.',
      });
    } catch (error: any) {
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate PDF report',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={generating || !dataset}
      className="bg-accent text-accent-foreground hover:bg-accent/90"
    >
      {generating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Generating...
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4 mr-2" />
          Export PDF Report
        </>
      )}
    </Button>
  );
}

function generateReportHTML(
  dataset: Dataset,
  equipment: EquipmentData[],
  summary: EquipmentSummary
): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const typeDistributionRows = summary.typeDistribution
    .map(t => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${t.type}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${t.count}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">
          ${((t.count / summary.totalCount) * 100).toFixed(1)}%
        </td>
      </tr>
    `)
    .join('');

  const equipmentRows = equipment.slice(0, 50)
    .map(e => `
      <tr>
        <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; font-family: monospace;">${e.equipment_name}</td>
        <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0;">${e.equipment_type}</td>
        <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${e.flowrate?.toFixed(2) ?? '—'}</td>
        <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${e.pressure?.toFixed(2) ?? '—'}</td>
        <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${e.temperature?.toFixed(2) ?? '—'}</td>
      </tr>
    `)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Equipment Report - ${dataset.filename}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1a202c;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        h1 { color: #0891b2; margin-bottom: 8px; }
        h2 { color: #0891b2; margin-top: 32px; border-bottom: 2px solid #0891b2; padding-bottom: 8px; }
        .meta { color: #64748b; margin-bottom: 32px; }
        .summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0; }
        .summary-card { background: #f8fafc; border-radius: 8px; padding: 16px; border-left: 4px solid #0891b2; }
        .summary-card.flowrate { border-color: #06b6d4; }
        .summary-card.pressure { border-color: #f97316; }
        .summary-card.temperature { border-color: #22c55e; }
        .summary-label { font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
        .summary-value { font-size: 28px; font-weight: 700; font-family: monospace; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
        th { background: #f1f5f9; text-align: left; padding: 10px 8px; font-weight: 600; }
        .note { color: #64748b; font-size: 12px; font-style: italic; margin-top: 8px; }
        @media print {
          body { padding: 20px; }
          .page-break { page-break-before: always; }
        }
      </style>
    </head>
    <body>
      <h1>Chemical Equipment Parameter Report</h1>
      <p class="meta">
        <strong>File:</strong> ${dataset.filename}<br>
        <strong>Generated:</strong> ${date}
      </p>

      <h2>Summary Statistics</h2>
      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-label">Total Equipment</div>
          <div class="summary-value">${summary.totalCount}</div>
        </div>
        <div class="summary-card flowrate">
          <div class="summary-label">Average Flowrate</div>
          <div class="summary-value" style="color: #06b6d4;">${summary.avgFlowrate.toFixed(2)} m³/h</div>
        </div>
        <div class="summary-card pressure">
          <div class="summary-label">Average Pressure</div>
          <div class="summary-value" style="color: #f97316;">${summary.avgPressure.toFixed(2)} bar</div>
        </div>
        <div class="summary-card temperature">
          <div class="summary-label">Average Temperature</div>
          <div class="summary-value" style="color: #22c55e;">${summary.avgTemperature.toFixed(2)} °C</div>
        </div>
      </div>

      <h2>Equipment Type Distribution</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th style="text-align: right;">Count</th>
            <th style="text-align: right;">Percentage</th>
          </tr>
        </thead>
        <tbody>
          ${typeDistributionRows}
        </tbody>
      </table>

      <h2 class="page-break">Equipment Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th style="text-align: right;">Flowrate (m³/h)</th>
            <th style="text-align: right;">Pressure (bar)</th>
            <th style="text-align: right;">Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          ${equipmentRows}
        </tbody>
      </table>
      ${equipment.length > 50 ? '<p class="note">Note: Showing first 50 of ' + equipment.length + ' equipment items.</p>' : ''}
    </body>
    </html>
  `;
}
