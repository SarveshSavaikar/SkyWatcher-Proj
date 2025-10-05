import { Button } from "@/components/ui/button";
import { Download, Calendar, Share2 } from "lucide-react";

export function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download CSV
      </Button>
      <Button variant="outline">
        <Calendar className="mr-2 h-4 w-4" />
        Add to Calendar
      </Button>
      <Button variant="outline">
        <Share2 className="mr-2 h-4 w-4" />
        Share Report
      </Button>
    </div>
  );
}
