import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download } from "lucide-react";

const weatherConditions = [
  "Sunny",
  "Cloudy",
  "Rainy",
  "Snowy",
  "Windy",
  "Hot",
  "Cold",
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function ConditionsPanel() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [activityProfile, setActivityProfile] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label>Month</Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month} value={month.toLowerCase()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Day</Label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <SelectItem key={day} value={day.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label>Activity Profile</Label>
          <Select value={activityProfile} onValueChange={setActivityProfile}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hiking">Hiking</SelectItem>
              <SelectItem value="skiing">Skiing</SelectItem>
              <SelectItem value="beach">Beach Day</SelectItem>
              <SelectItem value="camping">Camping</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Conditions</Label>
          {weatherConditions.map(condition => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={condition}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => handleConditionToggle(condition)}
              />
              <Label htmlFor={condition} className="cursor-pointer font-normal">
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
          Advanced Filters
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          <div className="text-sm text-muted-foreground">
            Additional filter options will appear here
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="space-y-2 pt-4 border-t">
        <Button className="w-full" size="lg">
          Get Weather Probability
        </Button>
        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Raw Data
        </Button>
      </div>
    </Card>
  );
}
