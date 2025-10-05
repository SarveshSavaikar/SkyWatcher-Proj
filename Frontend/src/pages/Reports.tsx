import { useState } from "react";
import { FileText, Download, Calendar, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Report {
  id: string;
  title: string;
  location: string;
  date: string;
  type: string;
  weatherScore: number;
  status: "completed" | "pending" | "archived";
}

const Reports = () => {
  const [filterType, setFilterType] = useState("all");
  const [reports] = useState<Report[]>([
    {
      id: "1",
      title: "Summer Beach Analysis",
      location: "Miami, FL",
      date: "2025-07-15",
      type: "Historical Analysis",
      weatherScore: 85,
      status: "completed",
    },
    {
      id: "2",
      title: "Mountain Hiking Forecast",
      location: "Denver, CO",
      date: "2025-08-10",
      type: "Probability Report",
      weatherScore: 72,
      status: "completed",
    },
    {
      id: "3",
      title: "Winter Skiing Conditions",
      location: "Aspen, CO",
      date: "2025-12-20",
      type: "Seasonal Trends",
      weatherScore: 91,
      status: "pending",
    },
    {
      id: "4",
      title: "Spring City Tour",
      location: "Portland, OR",
      date: "2025-04-15",
      type: "Historical Analysis",
      weatherScore: 78,
      status: "completed",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "archived":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
      default:
        return "";
    }
  };

  const filteredReports =
    filterType === "all"
      ? reports
      : reports.filter((report) => report.status === filterType);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Weather Reports</h1>
          <p className="text-muted-foreground">
            View and manage your historical weather analyses
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground">
            Showing {filteredReports.length} of {reports.length} reports
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{report.title}</h3>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(report.status)}
                  >
                    {report.status}
                  </Badge>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {report.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(report.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    {report.type}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Weather Score
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {report.weatherScore}%
                    </div>
                  </div>
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-gradient"
                      style={{ width: `${report.weatherScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <Button>View Report</Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
