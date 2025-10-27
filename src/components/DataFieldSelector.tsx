import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export type DataField = {
  id: string;
  label: string;
  description: string;
};

const dataFields: DataField[] = [
  { id: "fullName", label: "Full Name", description: "First and last name" },
  { id: "email", label: "Email Address", description: "Valid email format" },
  { id: "phone", label: "Phone Number", description: "With country code" },
  { id: "address", label: "Address", description: "Street, city, country" },
  { id: "username", label: "Username", description: "Unique username" },
  { id: "password", label: "Password", description: "Secure password" },
  { id: "company", label: "Company Name", description: "Business name" },
  { id: "jobTitle", label: "Job Title", description: "Professional role" },
  { id: "dateOfBirth", label: "Date of Birth", description: "DD/MM/YYYY format" },
  { id: "uuid", label: "UUID", description: "Unique identifier" },
  { id: "ipAddress", label: "IP Address", description: "IPv4 address" },
];

type DataFieldSelectorProps = {
  selectedFields: string[];
  onFieldToggle: (fieldId: string) => void;
};

const DataFieldSelector = ({ selectedFields, onFieldToggle }: DataFieldSelectorProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full"></span>
        Select Data Fields
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataFields.map((field) => (
          <div key={field.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id={field.id}
              checked={selectedFields.includes(field.id)}
              onCheckedChange={() => onFieldToggle(field.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor={field.id}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {field.label}
              </Label>
              <p className="text-xs text-muted-foreground mt-1">{field.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataFieldSelector;
export { dataFields };
