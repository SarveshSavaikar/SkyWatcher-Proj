import { User, MapPin, Bell, Shield, Palette, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and saved locations
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="locations">
            <MapPin className="mr-2 h-4 w-4" />
            Locations
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Palette className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-sky-gradient flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <Button variant="outline">Change Avatar</Button>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="America/New_York" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Security</h4>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Saved Locations</h3>
              <Button>Add Location</Button>
            </div>

            <div className="space-y-3">
              {[
                { name: "Home", address: "123 Main St, New York, NY", starred: true },
                { name: "Office", address: "456 Work Ave, New York, NY", starred: false },
                { name: "Vacation Spot", address: "Miami Beach, FL", starred: true },
              ].map((location, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {location.name}
                        {location.starred && (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {location.address}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weather Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified about significant weather changes
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Trip Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Receive reminders for upcoming trips
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Report Updates</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when reports are ready
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive updates via email
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Display Preferences</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Temperature Unit</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Fahrenheit (°F)</Button>
                  <Button variant="ghost" size="sm">Celsius (°C)</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Wind Speed Unit</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">mph</Button>
                  <Button variant="ghost" size="sm">km/h</Button>
                  <Button variant="ghost" size="sm">m/s</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Date Format</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">MM/DD/YYYY</Button>
                  <Button variant="ghost" size="sm">DD/MM/YYYY</Button>
                  <Button variant="ghost" size="sm">YYYY-MM-DD</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Default Activity</Label>
                <Input defaultValue="Beach Day" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Reports Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Active Trips</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Searches Made</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Saved Locations</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default Profile;
