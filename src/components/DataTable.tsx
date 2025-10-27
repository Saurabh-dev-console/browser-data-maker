import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type DataTableProps = {
  data: Record<string, any>[];
  fields: string[];
};

const DataTable = ({ data, fields }: DataTableProps) => {
  if (data.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <p className="text-muted-foreground">No data generated yet. Select fields and click "Generate Data" to begin.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader className="sticky top-0 bg-muted z-10">
            <TableRow>
              <TableHead className="w-12 font-semibold">#</TableHead>
              {fields.map((field) => (
                <TableHead key={field} className="font-semibold whitespace-nowrap">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                {fields.map((field) => (
                  <TableCell key={field} className="max-w-xs truncate">
                    {row[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default DataTable;
