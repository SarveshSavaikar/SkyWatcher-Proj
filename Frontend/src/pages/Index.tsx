import { MapSearchPanel } from "@/components/dashboard/MapSearchPanel";
import { ConditionsPanel } from "@/components/dashboard/ConditionsPanel";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { GraphCards } from "@/components/dashboard/GraphCards";
import { ActionButtons } from "@/components/dashboard/ActionButtons";
import { UserReportsSection } from "@/components/dashboard/UserReportsSection";

const Index = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Weather Probability Dashboard</h1>
        <p className="text-muted-foreground">
          Analyze historical weather patterns for your location and dates
        </p>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MapSearchPanel />
        <ConditionsPanel />
      </div>

      {/* Results area */}
      <div className="space-y-6">
        <SummaryCard />
        <GraphCards />
        <ActionButtons />
        <UserReportsSection />
      </div>
    </div>
  );
};

export default Index;
