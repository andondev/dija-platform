import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Lock, 
  Shield, 
  Trash, 
  User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

const StudentSettings = () => {
  const { user } = useAuth();
  const [activeSettingsTab, setActiveSettingsTab] = useState("notifications");
  
  // Mock data
  const [notificationSettings, setNotificationSettings] = useState({
    classReminders: true,
    homeworkDeadlines: true,
    newMessages: true,
    newMaterials: false,
    marketingEmails: false
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showProgressToTeachers: true,
    showProfileToClassmates: false
  });
  
  // Form state for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Form state for account preferences
  const [accountPreferences, setAccountPreferences] = useState({
    language: "english",
    timezone: "pacific",
    theme: "light",
    accessibility: {
      highContrast: false,
      largerText: false,
      screenReader: false
    }
  });
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleAccessibilityToggle = (key: keyof typeof accountPreferences.accessibility) => {
    setAccountPreferences(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [key]: !prev.accessibility[key]
      }
    }));
  };
  
  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const togglePrivacySetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const saveNotificationSettings = () => {
    // In a real app, this would send data to an API
    toast.success("Notification preferences updated!");
  };
  
  const savePrivacySettings = () => {
    // In a real app, this would send data to an API
    toast.success("Privacy settings updated!");
  };
  
  const savePasswordChanges = () => {
    // Validate password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    // In a real app, this would send data to an API
    toast.success("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  const saveAccountPreferences = () => {
    // In a real app, this would send data to an API
    toast.success("Account preferences updated!");
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                <button 
                  className={`p-4 text-left hover:bg-muted transition-colors ${activeSettingsTab === "notifications" ? "bg-muted/70 font-medium" : ""}`}
                  onClick={() => setActiveSettingsTab("notifications")}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Notifications</span>
                  </div>
                </button>
                
                <button 
                  className={`p-4 text-left hover:bg-muted transition-colors ${activeSettingsTab === "privacy" ? "bg-muted/70 font-medium" : ""}`}
                  onClick={() => setActiveSettingsTab("privacy")}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span>Privacy</span>
                  </div>
                </button>
                
                <button 
                  className={`p-4 text-left hover:bg-muted transition-colors ${activeSettingsTab === "security" ? "bg-muted/70 font-medium" : ""}`}
                  onClick={() => setActiveSettingsTab("security")}
                >
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <span>Security</span>
                  </div>
                </button>
                
                <button 
                  className={`p-4 text-left hover:bg-muted transition-colors ${activeSettingsTab === "preferences" ? "bg-muted/70 font-medium" : ""}`}
                  onClick={() => setActiveSettingsTab("preferences")}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>Preferences</span>
                  </div>
                </button>
                
                <button 
                  className={`p-4 text-left hover:bg-muted transition-colors ${activeSettingsTab === "dangerZone" ? "bg-muted/70 font-medium text-destructive" : ""}`}
                  onClick={() => setActiveSettingsTab("dangerZone")}
                >
                  <div className="flex items-center gap-3">
                    <Trash className="h-5 w-5 text-destructive" />
                    <span>Danger Zone</span>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-3 space-y-6">
            {/* Notification Settings */}
            {activeSettingsTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="classReminders">Class Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about upcoming classes
                        </p>
                      </div>
                      <Switch
                        id="classReminders"
                        checked={notificationSettings.classReminders}
                        onCheckedChange={() => toggleNotification('classReminders')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="homeworkDeadlines">Homework Deadlines</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts for upcoming assignment due dates
                        </p>
                      </div>
                      <Switch
                        id="homeworkDeadlines"
                        checked={notificationSettings.homeworkDeadlines}
                        onCheckedChange={() => toggleNotification('homeworkDeadlines')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newMessages">Message Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <Switch
                        id="newMessages"
                        checked={notificationSettings.newMessages}
                        onCheckedChange={() => toggleNotification('newMessages')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newMaterials">New Learning Materials</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new materials are available
                        </p>
                      </div>
                      <Switch
                        id="newMaterials"
                        checked={notificationSettings.newMaterials}
                        onCheckedChange={() => toggleNotification('newMaterials')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketingEmails">Marketing Communications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive special offers and updates
                        </p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={() => toggleNotification('marketingEmails')}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveNotificationSettings} className="w-full sm:w-auto">
                    Save Notification Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Privacy Settings */}
            {activeSettingsTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your privacy and visibility preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showOnlineStatus">Online Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you're online to teachers and classmates
                        </p>
                      </div>
                      <Switch
                        id="showOnlineStatus"
                        checked={privacySettings.showOnlineStatus}
                        onCheckedChange={() => togglePrivacySetting('showOnlineStatus')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showProgressToTeachers">Learning Progress</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow teachers to view your detailed learning progress
                        </p>
                      </div>
                      <Switch
                        id="showProgressToTeachers"
                        checked={privacySettings.showProgressToTeachers}
                        onCheckedChange={() => togglePrivacySetting('showProgressToTeachers')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showProfileToClassmates">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to other students in your classes
                        </p>
                      </div>
                      <Switch
                        id="showProfileToClassmates"
                        checked={privacySettings.showProfileToClassmates}
                        onCheckedChange={() => togglePrivacySetting('showProfileToClassmates')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Data & Privacy</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Control how your personal data is used and shared
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          Download My Data
                        </Button>
                        <Button variant="outline" size="sm">
                          Privacy Policy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={savePrivacySettings} className="w-full sm:w-auto">
                    Save Privacy Settings
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Security Settings */}
            {activeSettingsTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      type="password" 
                      id="currentPassword" 
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      type="password" 
                      id="newPassword" 
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••" 
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••" 
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <div className="flex flex-col p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Two-factor authentication is disabled</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch id="enable2fa" checked={false} />
                      </div>
                      <Button variant="outline" size="sm" className="w-fit" disabled>
                        Set Up Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Login Sessions</h3>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">
                            San Francisco, USA • Chrome on Windows
                          </p>
                        </div>
                        <Badge variant="outline">Active Now</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-fit mt-2">
                        Sign Out Of All Devices
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 items-start sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Button onClick={savePasswordChanges}>
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Last password change: Never
                    </p>
                  </div>
                </CardFooter>
              </Card>
            )}
            
            {/* Preferences Settings */}
            {activeSettingsTab === "preferences" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                  <CardDescription>
                    Customize your account experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="language">Interface Language</Label>
                    <select 
                      id="language" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={accountPreferences.language}
                      onChange={(e) => setAccountPreferences({...accountPreferences, language: e.target.value})}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="chinese">Chinese</option>
                    </select>
                    <p className="text-xs text-muted-foreground">
                      This will change the language of the interface, not your learning content
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <select 
                      id="timezone" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={accountPreferences.timezone}
                      onChange={(e) => setAccountPreferences({...accountPreferences, timezone: e.target.value})}
                    >
                      <option value="pacific">Pacific Time (UTC-8)</option>
                      <option value="mountain">Mountain Time (UTC-7)</option>
                      <option value="central">Central Time (UTC-6)</option>
                      <option value="eastern">Eastern Time (UTC-5)</option>
                      <option value="utc">UTC</option>
                      <option value="london">London (UTC+0)</option>
                      <option value="paris">Paris (UTC+1)</option>
                      <option value="tokyo">Tokyo (UTC+9)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="theme">Theme</Label>
                    <select 
                      id="theme" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={accountPreferences.theme}
                      onChange={(e) => setAccountPreferences({...accountPreferences, theme: e.target.value})}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Accessibility</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">High Contrast Mode</p>
                          <p className="text-xs text-muted-foreground">
                            Increase contrast for better readability
                          </p>
                        </div>
                        <Switch 
                          checked={accountPreferences.accessibility.highContrast}
                          onCheckedChange={() => handleAccessibilityToggle('highContrast')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Larger Text</p>
                          <p className="text-xs text-muted-foreground">
                            Increase text size throughout the application
                          </p>
                        </div>
                        <Switch 
                          checked={accountPreferences.accessibility.largerText}
                          onCheckedChange={() => handleAccessibilityToggle('largerText')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Screen Reader Support</p>
                          <p className="text-xs text-muted-foreground">
                            Optimize for screen readers
                          </p>
                        </div>
                        <Switch 
                          checked={accountPreferences.accessibility.screenReader}
                          onCheckedChange={() => handleAccessibilityToggle('screenReader')}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveAccountPreferences} className="w-full sm:w-auto">
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Danger Zone Settings */}
            {activeSettingsTab === "dangerZone" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible account actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-destructive/20 rounded-lg p-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-destructive">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <div className="mt-2 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="delete-confirm" className="text-destructive">Please type "DELETE" to confirm</Label>
                          <Input id="delete-confirm" placeholder="DELETE" />
                        </div>
                        <Button variant="destructive" size="sm" className="w-fit">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-destructive/20 rounded-lg p-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-amber-600">Reset Progress</h3>
                      <p className="text-sm text-muted-foreground">
                        Reset all your learning progress and start over. This will delete all your achievements, goals, and course completion data.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 w-fit text-amber-600 border-amber-600">
                        Reset All Progress
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-destructive/20 rounded-lg p-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-amber-600">Export Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Download all your data before deleting your account.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 w-fit">
                        Export My Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSettings;
