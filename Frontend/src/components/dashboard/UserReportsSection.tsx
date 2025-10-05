import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockReports = [
  {
    id: 1,
    user: "John D.",
    date: "June 15, 2024",
    comment: "Perfect weather for hiking! Clear skies all day.",
    initials: "JD"
  },
  {
    id: 2,
    user: "Sarah M.",
    date: "June 14, 2024",
    comment: "Conditions were great, just a bit windy in the afternoon.",
    initials: "SM"
  }
];

export function UserReportsSection() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="p-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">User Reports</h3>
            <span className="text-sm text-muted-foreground">
              ({mockReports.length})
            </span>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-6 space-y-4">
          {mockReports.map(report => (
            <div key={report.id} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
              <Avatar>
                <AvatarFallback>{report.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{report.user}</span>
                  <span className="text-xs text-muted-foreground">{report.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{report.comment}</p>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            Add Your Report
          </Button>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
