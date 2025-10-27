import { useState } from "react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import DataFieldSelector from "@/components/DataFieldSelector";
import GenerationControls from "@/components/GenerationControls";
import DataTable from "@/components/DataTable";
import ExportButtons from "@/components/ExportButtons";
import { generateFakeData } from "@/utils/dataGenerator";
import { toast } from "sonner";

const Index = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "fullName",
    "email",
    "phone",
  ]);
  const [recordCount, setRecordCount] = useState<number>(10);
  const [locale, setLocale] = useState<string>("en");
  const [generatedData, setGeneratedData] = useState<Record<string, any>[]>([]);

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleGenerate = () => {
    if (selectedFields.length === 0) {
      toast.error("Please select at least one field");
      return;
    }

    if (recordCount < 1 || recordCount > 1000) {
      toast.error("Record count must be between 1 and 1000");
      return;
    }

    const data = generateFakeData(selectedFields, recordCount, locale);
    setGeneratedData(data);
    toast.success(`Generated ${recordCount} records successfully`);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-8">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Generate Realistic Test Data
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create fake data for testing, prototyping, and development. No backend required - everything runs in your browser.
            </p>
          </div>

          {/* Data Field Selector */}
          <DataFieldSelector
            selectedFields={selectedFields}
            onFieldToggle={handleFieldToggle}
          />

          {/* Generation Controls */}
          <GenerationControls
            recordCount={recordCount}
            onRecordCountChange={setRecordCount}
            locale={locale}
            onLocaleChange={setLocale}
            onGenerate={handleGenerate}
            disabled={selectedFields.length === 0}
          />

          {/* Data Table */}
          <DataTable data={generatedData} fields={selectedFields} />

          {/* Export Buttons */}
          <ExportButtons data={generatedData} disabled={generatedData.length === 0} />
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-16 py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>Built with React, TypeScript, and Faker.js</p>
            <p className="mt-2">All data generated is fake and for testing purposes only.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
