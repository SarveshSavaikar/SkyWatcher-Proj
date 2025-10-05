import { useState } from "react";
import { Plus, MapPin, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Trip {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  weatherScore: number;
  conditions: string[];
}

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: "1",
      name: "Summer Beach Vacation",
      location: "Miami, FL",
      startDate: "2025-07-15",
      endDate: "2025-07-22",
      weatherScore: 85,
      conditions: ["Sunny", "Warm", "Low Humidity"],
    },
    {
      id: "2",
      name: "Mountain Hiking Trip",
      location: "Denver, CO",
      startDate: "2025-08-10",
      endDate: "2025-08-17",
      weatherScore: 72,
      conditions: ["Clear", "Moderate Temp", "Low Precipitation"],
    },
  ]);

  const [newTrip, setNewTrip] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleCreateTrip = () => {
    if (newTrip.name && newTrip.location && newTrip.startDate && newTrip.endDate) {
      const trip: Trip = {
        id: Date.now().toString(),
        ...newTrip,
        weatherScore: Math.floor(Math.random() * 30) + 70,
        conditions: ["Pending Analysis"],
      };
      setTrips([...trips, trip]);
      setNewTrip({ name: "", location: "", startDate: "", endDate: "" });
      setIsOpen(false);
    }
  };

  const handleDeleteTrip = (id: string) => {
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trip Boards</h1>
          <p className="text-muted-foreground">
            Plan and track weather conditions for your upcoming trips
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Trip
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Trip</DialogTitle>
              <DialogDescription>
                Add details for your trip to track weather conditions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Trip Name</Label>
                <Input
                  id="name"
                  placeholder="Summer Vacation"
                  value={newTrip.name}
                  onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Miami, FL"
                  value={newTrip.location}
                  onChange={(e) => setNewTrip({ ...newTrip, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start">Start Date</Label>
                  <Input
                    id="start"
                    type="date"
                    value={newTrip.startDate}
                    onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Date</Label>
                  <Input
                    id="end"
                    type="date"
                    value={newTrip.endDate}
                    onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTrip}>Create Trip</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map((trip) => (
          <Card key={trip.id} className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">{trip.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4" />
                  {trip.location}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTrip(trip.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(trip.startDate).toLocaleDateString()} -{" "}
                {new Date(trip.endDate).toLocaleDateString()}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Weather Score</span>
                <span className="text-2xl font-bold text-primary">
                  {trip.weatherScore}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-gradient"
                  style={{ width: `${trip.weatherScore}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {trip.conditions.map((condition, idx) => (
                <Badge key={idx} variant="secondary">
                  {condition}
                </Badge>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trips;
