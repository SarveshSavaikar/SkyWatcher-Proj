import { useState } from "react";
import { Sparkles, MapPin, Calendar, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Recommendation {
  location: string;
  score: number;
  dateRange: string;
  conditions: string[];
  reason: string;
}

const Recommender = () => {
  const [preferences, setPreferences] = useState({
    activity: "",
    month: "",
    region: "",
  });

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecommendations([
        {
          location: "San Diego, CA",
          score: 95,
          dateRange: "May 15-22, 2025",
          conditions: ["Sunny", "Warm", "Low Wind"],
          reason: "Perfect beach weather with minimal rainfall probability",
        },
        {
          location: "Portland, OR",
          score: 88,
          dateRange: "July 10-17, 2025",
          conditions: ["Mild", "Clear", "Low Humidity"],
          reason: "Ideal hiking conditions with comfortable temperatures",
        },
        {
          location: "Austin, TX",
          score: 82,
          dateRange: "March 20-27, 2025",
          conditions: ["Warm", "Partly Cloudy", "Low Precipitation"],
          reason: "Spring weather with pleasant outdoor conditions",
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Weather Recommender</h1>
        <p className="text-muted-foreground">
          Get AI-powered recommendations for the best times and places for your activities
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Type</Label>
              <Select
                value={preferences.activity}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, activity: value })
                }
              >
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beach">Beach Day</SelectItem>
                  <SelectItem value="hiking">Hiking</SelectItem>
                  <SelectItem value="skiing">Skiing</SelectItem>
                  <SelectItem value="camping">Camping</SelectItem>
                  <SelectItem value="city">City Tour</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Preferred Month</Label>
              <Select
                value={preferences.month}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, month: value })
                }
              >
                <SelectTrigger id="month">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                placeholder="e.g., West Coast"
                value={preferences.region}
                onChange={(e) =>
                  setPreferences({ ...preferences, region: e.target.value })
                }
              />
            </div>
          </div>

          <Button
            onClick={handleGetRecommendations}
            disabled={loading}
            className="w-full"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Analyzing..." : "Get Recommendations"}
          </Button>
        </div>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Top Recommendations</h2>
          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((rec, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold">{rec.location}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      {rec.dateRange}
                    </div>
                    <p className="text-muted-foreground mb-3">{rec.reason}</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.conditions.map((condition, condIdx) => (
                        <Badge key={condIdx} variant="secondary">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-3xl font-bold text-primary">
                      {rec.score}
                    </div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Create Trip
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommender;
