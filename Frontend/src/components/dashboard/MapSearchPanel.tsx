import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MapSearchPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleUseLocation = () => {
    // TODO: Implement geolocation
    console.log("Using current location");
  };

  return (
    <Card className="p-6 h-full flex flex-col gap-4">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={handleUseLocation}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Use My Location
        </Button>
      </div>

      {/* Map placeholder - will integrate Google Maps API */}
      <div className="flex-1 bg-muted rounded-lg flex items-center justify-center min-h-[400px]">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Map will appear here</p>
          <p className="text-sm mt-1">Google Maps integration pending</p>
        </div>
      </div>
    </Card>
  );
}
