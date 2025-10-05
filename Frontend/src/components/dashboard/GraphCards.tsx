import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Activity } from "lucide-react";

export function GraphCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Probability Distribution</h4>
        </div>
        <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Bar Chart</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Temperature Range</h4>
        </div>
        <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Bell Curve</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Historical Trends</h4>
        </div>
        <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Time Series</p>
        </div>
      </Card>
    </div>
  );
}
