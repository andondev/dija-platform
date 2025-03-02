import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Dija Connect",
    siteDescription: "Streamlined education platform",
    enableUserRegistration: true,
    requireEmailVerification: true,
    maxUserUploadSize: 50,
    maxClassSize: 30,
    systemEmailAddress: "admin@dijaconnect.com",
    maintenanceMode: false,
    dailyBackups: true,
    analyticsTracking: true,
    customCss: "",
    primaryColor: "#6366f1",
    logoUrl: "/logo.png",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleChange = (name: string) => {
    setSettings({
      ...settings,
      [name]: !settings[name as keyof typeof settings],
    });
  };

  const saveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground">
            Configure global settings for your Dija Connect platform
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic settings for your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="systemEmailAddress">System Email Address</Label>
                  <Input
                    id="systemEmailAddress"
                    name="systemEmailAddress"
                    value={settings.systemEmailAddress}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    This email will be used for system notifications and as the sender for automated emails.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableUserRegistration">Enable User Registration</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow new users to register accounts
                    </p>
                  </div>
                  <Switch
                    id="enableUserRegistration"
                    checked={settings.enableUserRegistration}
                    onCheckedChange={() => handleToggleChange("enableUserRegistration")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Put the site in maintenance mode (only admins can access)
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={() => handleToggleChange("maintenanceMode")}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Class Settings</CardTitle>
                <CardDescription>
                  Configure class-related settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="maxClassSize">Maximum Class Size</Label>
                  <Input
                    id="maxClassSize"
                    name="maxClassSize"
                    type="number"
                    min="1"
                    max="100"
                    value={settings.maxClassSize}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of students allowed in a class
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireEmailVerification">Email Verification</Label>
                    <p className="text-xs text-muted-foreground">
                      Require email verification before account activation
                    </p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={settings.requireEmailVerification}
                    onCheckedChange={() => handleToggleChange("requireEmailVerification")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analyticsTracking">Analytics Tracking</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable analytics to track platform usage
                    </p>
                  </div>
                  <Switch
                    id="analyticsTracking"
                    checked={settings.analyticsTracking}
                    onCheckedChange={() => handleToggleChange("analyticsTracking")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Configure the look and feel of your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    name="logoUrl"
                    value={settings.logoUrl}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      value={settings.primaryColor}
                      onChange={handleInputChange}
                    />
                    <div
                      className="h-10 w-10 rounded-md border"
                      style={{ backgroundColor: settings.primaryColor }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="customCss">Custom CSS</Label>
                  <Textarea
                    id="customCss"
                    name="customCss"
                    value={settings.customCss}
                    onChange={handleInputChange}
                    className="font-mono text-sm h-32"
                    placeholder="/* Add your custom CSS here */"
                  />
                  <p className="text-xs text-muted-foreground">
                    Custom CSS will be applied to the entire platform. Use with caution.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  System-level configuration options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="maxUserUploadSize">Max Upload Size (MB)</Label>
                  <Input
                    id="maxUserUploadSize"
                    name="maxUserUploadSize"
                    type="number"
                    min="1"
                    max="1000"
                    value={settings.maxUserUploadSize}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dailyBackups">Daily Backups</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable automatic daily backups of all platform data
                    </p>
                  </div>
                  <Switch
                    id="dailyBackups"
                    checked={settings.dailyBackups}
                    onCheckedChange={() => handleToggleChange("dailyBackups")}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700">Danger Zone</CardTitle>
                <CardDescription className="text-red-600">
                  These actions are irreversible, proceed with caution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    Reset All Settings
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    Purge All Cache
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    Delete All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={saveSettings}>Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
