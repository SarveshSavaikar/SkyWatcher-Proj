import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Cloud, Droplets, Wind } from "lucide-react";

export function SummaryCard() {
  return (
    <Card className="p-6 bg-data-gradient">
      <h3 className="text-lg font-semibold mb-4">Weather Summary</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold text-primary mb-2">
            75% chance of favorable conditions
          </p>
          <p className="text-muted-foreground">
            Based on historical data for this location and date
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sun className="h-3 w-3" />
            Mostly Sunny
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Cloud className="h-3 w-3" />
            Low Cloud Cover
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            10% Rain Chance
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            Moderate Winds
          </Badge>
        </div>

        <div className="pt-4 border-t grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">72°F</p>
            <p className="text-sm text-muted-foreground">Avg. Temp</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">15mph</p>
            <p className="text-sm text-muted-foreground">Wind Speed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">45%</p>
            <p className="text-sm text-muted-foreground">Humidity</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
