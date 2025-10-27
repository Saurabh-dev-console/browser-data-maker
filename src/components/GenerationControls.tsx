import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

type GenerationControlsProps = {
  recordCount: number;
  onRecordCountChange: (count: number) => void;
  locale: string;
  onLocaleChange: (locale: string) => void;
  onGenerate: () => void;
  disabled: boolean;
};

const GenerationControls = ({
  recordCount,
  onRecordCountChange,
  locale,
  onLocaleChange,
  onGenerate,
  disabled,
}: GenerationControlsProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="recordCount">Number of Records</Label>
          <Input
            id="recordCount"
            type="number"
            min={1}
            max={1000}
            value={recordCount}
            onChange={(e) => onRecordCountChange(parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="locale">Locale</Label>
          <Select value={locale} onValueChange={onLocaleChange}>
            <SelectTrigger id="locale">
              <SelectValue placeholder="Select locale" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="en">English (US)</SelectItem>
              <SelectItem value="en_GB">English (UK)</SelectItem>
              <SelectItem value="en_IN">English (India)</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="zh_CN">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            onClick={onGenerate}
            disabled={disabled}
            className="w-full h-10 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerationControls;
