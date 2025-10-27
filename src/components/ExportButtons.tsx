import { Button } from "@/components/ui/button";
import { Download, Copy, FileJson, FileText } from "lucide-react";
import { toast } from "sonner";

type ExportButtonsProps = {
  data: Record<string, any>[];
  disabled: boolean;
};

const ExportButtons = ({ data, disabled }: ExportButtonsProps) => {
  const exportToJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fake-data-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded successfully");
  };

  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((header) => `"${String(row[header]).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fake-data-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("CSV file downloaded successfully");
  };

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString);
    toast.success("Data copied to clipboard");
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full"></span>
        Export Data
      </h2>
      <div className="flex flex-wrap gap-3">
        <Button onClick={exportToJSON} disabled={disabled} variant="outline" className="gap-2">
          <FileJson className="w-4 h-4" />
          Export as JSON
        </Button>
        <Button onClick={exportToCSV} disabled={disabled} variant="outline" className="gap-2">
          <FileText className="w-4 h-4" />
          Export as CSV
        </Button>
        <Button onClick={copyToClipboard} disabled={disabled} variant="outline" className="gap-2">
          <Copy className="w-4 h-4" />
          Copy to Clipboard
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        💡 All data generated is fake and for testing purposes only.
      </p>
    </div>
  );
};

export default ExportButtons;
