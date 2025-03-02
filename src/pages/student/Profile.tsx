import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Book, 
  GraduationCap, 
  Award, 
  Clock, 
  Calendar, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  Globe, 
  Bell, 
  Lock, 
  Shield, 
  FileText, 
  Edit,
  Save,
  Trash,
  CheckCircle,
  XCircle,
  UserCircle,
  Check,
  Languages,
  BookOpen,
  Plus
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

// Mock student data
const studentData = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  profilePicture: "/avatars/student1.jpg",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  timezone: "GMT-7 (Pacific Time)",
  bio: "Learning languages has always been my passion. I'm currently focused on improving my speaking and writing skills.",
  joinedDate: "August 2023",
  primaryLanguage: "English",
  learningLanguage: "Spanish",
  proficiencyLevel: "Intermediate",
  goals: [
    { id: "g1", title: "Complete B1 certification", progress: 65, deadline: "December 2024" },
    { id: "g2", title: "Master 1000 vocabulary words", progress: 80, deadline: "October 2024" },
    { id: "g3", title: "Have a 30-minute conversation", progress: 40, deadline: "November 2024" }
  ],
  achievements: [
    { id: "a1", title: "Perfect Attendance", description: "Attended 10 consecutive classes without absence", date: "September 2023", icon: "award" },
    { id: "a2", title: "Vocabulary Master", description: "Learned 500 new words", date: "November 2023", icon: "book" },
    { id: "a3", title: "Grammar Expert", description: "Scored 95% on the Advanced Grammar Test", date: "January 2024", icon: "check" }
  ],
  statistics: {
    hoursStudied: 87,
    classesAttended: 24,
    tasksCompleted: 148,
    averageScore: 91
  },
  subscriptionPlan: "Premium",
  subscriptionRenewal: "August 15, 2024",
  preferredTeachers: [
    { id: "t1", name: "Mrs. Johnson", subject: "Conversation" },
    { id: "t2", name: "Mr. Davis", subject: "Grammar" }
  ],
  notifications: {
    classReminders: true,
    homeworkDeadlines: true,
    newMessages: true,
    newMaterials: false,
    marketingEmails: false
  },
  privacySettings: {
    showOnlineStatus: true,
    showProgressToTeachers: true,
    showProfileToClassmates: false
  }
};

const StudentProfile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(studentData);
  const [notificationSettings, setNotificationSettings] = useState(studentData.notifications);
  const [privacySettings, setPrivacySettings] = useState(studentData.privacySettings);
  const [activeSettingsTab, setActiveSettingsTab] = useState("notifications");
  
  // Form state for profile editing
  const [formData, setFormData] = useState({
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
    location: profileData.location,
    bio: profileData.bio
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
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
  
  const saveProfileChanges = () => {
    // In a real app, this would send data to an API
    setProfileData(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio
    }));
    
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };
  
  const saveNotificationSettings = () => {
    // In a real app, this would send data to an API
    setProfileData(prev => ({
      ...prev,
      notifications: notificationSettings
    }));
    
    toast.success("Notification preferences updated!");
  };
  
  const savePrivacySettings = () => {
    // In a real app, this would send data to an API
    setProfileData(prev => ({
      ...prev,
      privacySettings: privacySettings
    }));
    
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
          <div>
            {editMode ? (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setEditMode(false);
                    setFormData({
                      name: profileData.name,
                      email: profileData.email,
                      phone: profileData.phone,
                      location: profileData.location,
                      bio: profileData.bio
                    });
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={saveProfileChanges}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setEditMode(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 sm:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Card */}
              <Card className="md:col-span-1">
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline">{profileData.proficiencyLevel}</Badge>
                  </div>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-2">
                      <AvatarImage src={profileData.profilePicture} />
                      <AvatarFallback className="text-xl">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {editMode ? (
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="text-center font-semibold text-xl w-full"
                      />
                    ) : (
                      <CardTitle className="text-center">{profileData.name}</CardTitle>
                    )}
                    {editMode ? (
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="text-center text-muted-foreground mt-1 w-full"
                      />
                    ) : (
                      <CardDescription className="text-center">
                        {profileData.email}
                      </CardDescription>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="flex items-center">
                      <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Learning</span>
                    </div>
                    <span className="text-sm font-medium">{profileData.learningLanguage}</span>
                    
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Native</span>
                    </div>
                    <span className="text-sm font-medium">{profileData.primaryLanguage}</span>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Joined</span>
                    </div>
                    <span className="text-sm font-medium">{profileData.joinedDate}</span>
                    
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Plan</span>
                    </div>
                    <span className="text-sm font-medium">{profileData.subscriptionPlan}</span>
                  </div>
                  
                  <Separator />
                  
                  {editMode ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{profileData.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{profileData.timezone}</span>
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    {editMode ? (
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="text-sm">{profileData.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Statistics Card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>My Progress</CardTitle>
                  <CardDescription>
                    Track your learning journey and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{profileData.statistics.hoursStudied}</p>
                      <p className="text-xs text-muted-foreground">Hours Studied</p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <GraduationCap className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{profileData.statistics.classesAttended}</p>
                      <p className="text-xs text-muted-foreground">Classes Attended</p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <CheckCircle className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{profileData.statistics.tasksCompleted}</p>
                      <p className="text-xs text-muted-foreground">Tasks Completed</p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Award className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{profileData.statistics.averageScore}%</p>
                      <p className="text-xs text-muted-foreground">Average Score</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 text-sm">Recent Goals</h3>
                    <div className="space-y-4">
                      {profileData.goals.slice(0, 2).map(goal => (
                        <div key={goal.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{goal.title}</span>
                            <span className="text-sm">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Deadline: {goal.deadline}</span>
                            {goal.progress >= 100 ? (
                              <Badge variant="outline" className="text-xs">
                                <Check className="h-3 w-3 mr-1" /> Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">In Progress</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 text-sm">Recent Achievements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {profileData.achievements.slice(0, 3).map(achievement => (
                        <div key={achievement.id} className="border rounded-lg p-3 bg-muted/30">
                          <div className="flex items-center gap-2 mb-2">
                            {achievement.icon === 'award' && <Award className="h-4 w-4 text-primary" />}
                            {achievement.icon === 'book' && <Book className="h-4 w-4 text-primary" />}
                            {achievement.icon === 'check' && <Check className="h-4 w-4 text-primary" />}
                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {achievement.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Detailed Progress Report
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Preferred Teachers */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Preferred Teachers</CardTitle>
                  <CardDescription>
                    Your favorite instructors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profileData.preferredTeachers.map(teacher => (
                      <div key={teacher.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{teacher.name}</p>
                            <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Find More Teachers
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Subscription Details */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>
                    Your current plan and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold">{profileData.subscriptionPlan} Plan</p>
                      <p className="text-sm text-muted-foreground">Renews on {profileData.subscriptionRenewal}</p>
                    </div>
                    <Badge className="bg-primary">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">Plan Features</h4>
                      <ul className="space-y-1">
                        <li className="text-xs flex items-center">
                          <Check className="h-3 w-3 mr-1 text-primary" />
                          Unlimited language learning
                        </li>
                        <li className="text-xs flex items-center">
                          <Check className="h-3 w-3 mr-1 text-primary" />
                          4 live classes per month
                        </li>
                        <li className="text-xs flex items-center">
                          <Check className="h-3 w-3 mr-1 text-primary" />
                          Full access to resources
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">Payment Method</h4>
                      <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
                      <Button variant="link" className="text-xs h-6 px-0">
                        Update payment method
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">Billing History</h4>
                      <p className="text-xs text-muted-foreground mb-1">Last payment: Aug 15, 2023</p>
                      <Button variant="link" className="text-xs h-6 px-0">
                        View all invoices
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Upgrade Plan
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Cancel Subscription
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Learning Goals</CardTitle>
                    <CardDescription>
                      Track and manage your language learning objectives
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Goal
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profileData.goals.map(goal => (
                    <div key={goal.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <Badge variant="outline">{goal.deadline}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{goal.progress}% Complete</span>
                          {goal.progress >= 100 ? (
                            <Badge className="bg-primary">
                              <Check className="h-3 w-3 mr-1" /> Completed
                            </Badge>
                          ) : (
                            <Badge variant="outline">In Progress</Badge>
                          )}
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Goals</CardTitle>
                <CardDescription>
                  Goals suggested based on your learning progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-8 w-8 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Read 5 Short Stories</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Improve reading comprehension by completing 5 short stories in your target language.
                        </p>
                        <Button size="sm">Add to Goals</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Languages className="h-8 w-8 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">30-Day Speaking Challenge</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Practice speaking for at least 10 minutes every day for a month.
                        </p>
                        <Button size="sm">Add to Goals</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Achievements</CardTitle>
                <CardDescription>
                  Badges and awards you've earned on your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-4">
                    {profileData.achievements.concat(
                      [
                        { id: "a4", title: "Writing Champion", description: "Wrote 10,000 words in your target language", date: "February 2024", icon: "book" },
                        { id: "a5", title: "First Quiz Ace", description: "Scored 100% on a quiz for the first time", date: "October 2023", icon: "award" },
                        { id: "a6", title: "Consistent Learner", description: "Studied for 7 consecutive days", date: "September 2023", icon: "check" },
                        { id: "a7", title: "Communication Star", description: "Participated actively in 5 class discussions", date: "November 2023", icon: "check" },
                        { id: "a8", title: "Pronunciation Master", description: "Perfected pronunciation of difficult sounds", date: "December 2023", icon: "award" },
                        { id: "a9", title: "Goal Crusher", description: "Completed 5 learning goals", date: "January 2024", icon: "check" }
                      ]
                    ).map(achievement => (
                      <div key={achievement.id} className="border rounded-lg p-4 bg-muted/30">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 bg-primary/10 rounded-full">
                            {achievement.icon === 'award' && <Award className="h-6 w-6 text-primary" />}
                            {achievement.icon === 'book' && <Book className="h-6 w-6 text-primary" />}
                            {achievement.icon === 'check' && <Check className="h-6 w-6 text-primary" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                        </div>
                        <p className="text-sm mb-3">
                          {achievement.description}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Share Achievement
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
