import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  FileText, 
  Upload,
  Briefcase,
  GraduationCap,
  Languages
} from "lucide-react";

const TeacherProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  
  // Mock teacher data
  const teacherData = {
    id: "t123456",
    name: "Sarah Johnson",
    email: user?.email || "sarah.johnson@example.com",
    avatar: "/placeholder.svg",
    phone: "+1 (555) 123-4567",
    address: "123 Education St, Teaching City, TC 12345",
    dateOfBirth: "1985-06-15",
    bio: "Passionate language teacher with over 10 years of experience teaching Spanish and French. I specialize in conversational language learning and cultural immersion techniques.",
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Fluent" },
      { name: "French", level: "Fluent" },
      { name: "Portuguese", level: "Intermediate" }
    ],
    education: [
      {
        degree: "Master of Arts in Language Education",
        institution: "University of Linguistics",
        year: "2010-2012"
      },
      {
        degree: "Bachelor of Arts in Spanish and French",
        institution: "State University",
        year: "2006-2010"
      }
    ],
    certifications: [
      {
        name: "TEFL Certification",
        issuer: "International TEFL Academy",
        year: "2013"
      },
      {
        name: "Advanced Spanish Language Proficiency",
        issuer: "Instituto Cervantes",
        year: "2011"
      }
    ],
    experience: [
      {
        position: "Senior Language Teacher",
        organization: "Global Language Institute",
        period: "2015-Present"
      },
      {
        position: "Spanish Teacher",
        organization: "International High School",
        period: "2012-2015"
      }
    ],
    specializations: ["Conversational Spanish", "Business French", "Cultural Immersion", "Language Assessment"]
  };
  
  const [formData, setFormData] = useState({
    name: teacherData.name,
    email: teacherData.email,
    phone: teacherData.phone,
    address: teacherData.address,
    bio: teacherData.bio
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSavePersonal = () => {
    // In a real app, this would send data to an API
    toast.success("Personal information updated successfully");
  };
  
  const handleUploadAvatar = () => {
    // In a real app, this would open a file picker
    toast.info("Avatar upload functionality would be implemented here");
  };
  
  const handleUploadDocument = () => {
    toast.info("Document upload functionality would be implemented here");
  };
  
  const handleAddLanguage = () => {
    toast.info("Add language functionality would be implemented here");
  };
  
  const handleAddEducation = () => {
    toast.info("Add education functionality would be implemented here");
  };
  
  const handleAddCertification = () => {
    toast.info("Add certification functionality would be implemented here");
  };
  
  const handleAddExperience = () => {
    toast.info("Add experience functionality would be implemented here");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={teacherData.avatar} alt={teacherData.name} />
            <AvatarFallback>{teacherData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{teacherData.name}</h1>
            <div className="flex items-center text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" />
              <span>{teacherData.email}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Teacher ID: {teacherData.id}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {teacherData.specializations.map((spec, i) => (
                <Badge key={i} variant="secondary">{spec}</Badge>
              ))}
            </div>
          </div>
          <div className="md:ml-auto">
            <Button onClick={handleUploadAvatar}>
              <Upload className="mr-2 h-4 w-4" />
              Change Photo
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    rows={4} 
                    value={formData.bio} 
                    onChange={handleInputChange} 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePersonal}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
                <CardDescription>
                  Languages you speak and your proficiency level.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherData.languages.map((lang, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Languages className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{lang.name}</span>
                      </div>
                      <Badge variant="outline">{lang.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={handleAddLanguage}>
                  Add Language
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="qualifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Your academic background and qualifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teacherData.education.map((edu, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{edu.degree}</h4>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{edu.year}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={handleAddEducation}>
                  Add Education
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>
                  Professional certifications and credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teacherData.certifications.map((cert, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Award className="mr-2 h-4 w-4" />
                          <span>{cert.issuer}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{cert.year}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={handleAddCertification}>
                  Add Certification
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Your professional teaching experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teacherData.experience.map((exp, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{exp.position}</h4>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Briefcase className="mr-2 h-4 w-4" />
                          <span>{exp.organization}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={handleAddExperience}>
                  Add Experience
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Upload and manage your professional documents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Teaching Certificate</p>
                        <p className="text-sm text-muted-foreground">PDF • Uploaded 3 months ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Resume / CV</p>
                        <p className="text-sm text-muted-foreground">PDF • Uploaded 6 months ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Language Proficiency Certificate</p>
                        <p className="text-sm text-muted-foreground">PDF • Uploaded 1 year ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUploadDocument}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Email Notifications</h3>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-messages" className="rounded" defaultChecked />
                    <Label htmlFor="notify-messages">New messages</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-classes" className="rounded" defaultChecked />
                    <Label htmlFor="notify-classes">Class updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-system" className="rounded" defaultChecked />
                    <Label htmlFor="notify-system">System announcements</Label>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Password</h3>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Account Deletion</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherProfile;
