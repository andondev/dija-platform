import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Video, 
  MessageSquare, 
  ChevronRight,
  Star,
  Filter,
  Plus,
  Download,
  Search,
  ArrowUpDown,
  UserPlus,
  Users,
  FileEdit,
  RotateCcw
} from "lucide-react";
import { format, isPast, isFuture, addDays, parseISO } from "date-fns";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Mock data for the classes page
const mockClasses = [
  {
    id: "1",
    subject: "Conversation Practice",
    date: new Date(Date.now() + 86400000), // tomorrow
    duration: 45,
    studentsCount: 8,
    maxStudents: 10,
    level: "Intermediate",
    description: "Help students practice everyday conversations focusing on fluency and natural expression.",
    materials: true,
    recordings: false,
    status: "upcoming"
  },
  {
    id: "2",
    subject: "Grammar Review",
    date: new Date(Date.now() + 86400000 * 3), // in 3 days
    duration: 60,
    studentsCount: 12,
    maxStudents: 15,
    level: "Beginner",
    description: "Review basic grammar rules and help students with common mistakes.",
    materials: true,
    recordings: false,
    status: "upcoming"
  },
  {
    id: "3",
    subject: "Vocabulary Building",
    date: new Date(), // today
    duration: 45,
    studentsCount: 6,
    maxStudents: 12,
    level: "Intermediate",
    description: "Expand students' vocabulary and practice using new words in context.",
    materials: true,
    recordings: false,
    status: "active"
  },
  {
    id: "4",
    subject: "Reading Comprehension",
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago
    duration: 60,
    studentsCount: 15,
    maxStudents: 15,
    level: "Advanced",
    description: "Analyze complex texts and improve comprehension strategies.",
    materials: true,
    recordings: true,
    status: "completed",
    feedbackSent: true,
    attendance: 13
  },
  {
    id: "5",
    subject: "Writing Workshop",
    date: new Date(Date.now() - 86400000 * 5), // 5 days ago
    duration: 90,
    studentsCount: 8,
    maxStudents: 10,
    level: "Intermediate",
    description: "Guide students through the writing process and provide personalized feedback.",
    materials: true,
    recordings: false,
    status: "completed",
    feedbackSent: true,
    attendance: 7
  },
  {
    id: "6",
    subject: "Pronunciation Practice",
    date: new Date(Date.now() - 86400000 * 8), // 8 days ago
    duration: 45,
    studentsCount: 5,
    maxStudents: 8,
    level: "Beginner",
    description: "Focus on correct pronunciation of difficult sounds through targeted exercises.",
    materials: true,
    recordings: true,
    status: "completed",
    feedbackSent: false,
    attendance: 5
  },
  {
    id: "7",
    subject: "Cultural Discussion",
    date: new Date(Date.now() + 86400000 * 5), // in 5 days
    duration: 60,
    studentsCount: 7,
    maxStudents: 12,
    level: "Advanced",
    description: "Facilitate discussions about cultural differences and similarities.",
    materials: false,
    recordings: false,
    status: "upcoming"
  },
  {
    id: "8",
    subject: "Listening Comprehension",
    date: new Date(Date.now() + 86400000 * 7), // in 7 days
    duration: 45,
    studentsCount: 10,
    maxStudents: 15,
    level: "Intermediate",
    description: "Improve listening skills with varied audio materials and structured activities.",
    materials: false,
    recordings: false,
    status: "upcoming"
  }
];

const ClassCard = ({ classItem }: { classItem: any }) => {
  const isPastClass = isPast(new Date(classItem.date)) && classItem.date.getDate() !== new Date().getDate();
  const isUpcoming = isFuture(new Date(classItem.date)) || classItem.date.getDate() === new Date().getDate();
  
  const handleSendFeedback = () => {
    toast.success("Feedback request sent to all students");
  };

  const handleReschedule = () => {
    toast.success("Class rescheduling options sent to students");
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{classItem.subject}</h3>
              <p className="text-sm text-muted-foreground">
                {format(classItem.date, "EEEE, MMMM d, yyyy")} • {format(classItem.date, "h:mm a")}
              </p>
            </div>
            <Badge variant={isPastClass ? "outline" : "default"}>
              {isPastClass ? "Completed" : isUpcoming ? "Upcoming" : "Active"}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>Duration: {classItem.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>Students: {classItem.studentsCount}/{classItem.maxStudents}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Level: {classItem.level}</span>
            </div>
          </div>
          
          <p className="mt-4 text-sm">{classItem.description}</p>
          
          {isPastClass && (
            <div className="mt-4 p-3 bg-muted/50 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-sm">Class Summary:</p>
                {classItem.feedbackSent ? (
                  <Badge variant="outline" className="text-xs">Feedback Sent</Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 text-xs">Feedback Pending</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Attendance: {classItem.attendance}/{classItem.studentsCount} students</p>
            </div>
          )}
        </div>
        
        <CardFooter className="bg-muted/20 p-4 flex flex-wrap gap-2 justify-between">
          {isPastClass ? (
            <>
              {!classItem.feedbackSent && (
                <Button variant="outline" size="sm" onClick={handleSendFeedback}>
                  <Star className="mr-2 h-4 w-4" /> Send Feedback
                </Button>
              )}
              {classItem.materials && (
                <Button variant="outline" size="sm">
                  <FileEdit className="mr-2 h-4 w-4" /> Edit Materials
                </Button>
              )}
              {classItem.recordings && (
                <Button variant="outline" size="sm">
                  <Video className="mr-2 h-4 w-4" /> View Recording
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleReschedule}>
                <RotateCcw className="mr-2 h-4 w-4" /> Reschedule
              </Button>
              <Button variant="outline" size="sm">
                <UserPlus className="mr-2 h-4 w-4" /> Manage Students
              </Button>
              <Button variant="outline" size="sm">
                <FileEdit className="mr-2 h-4 w-4" /> Edit Materials
              </Button>
              {classItem.date.getDate() === new Date().getDate() && (
                <Button size="sm">
                  <Video className="mr-2 h-4 w-4" /> Start Class
                </Button>
              )}
            </>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

const TeacherClasses = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  
  // Logic to filter classes based on search query and selected tab
  const filterClasses = () => {
    let filtered = [...mockClasses];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        cls => 
          cls.subject.toLowerCase().includes(query) || 
          cls.level.toLowerCase().includes(query) ||
          cls.description.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter
    if (selectedTab === "upcoming") {
      filtered = filtered.filter(cls => isFuture(new Date(cls.date)));
    } else if (selectedTab === "completed") {
      filtered = filtered.filter(cls => isPast(new Date(cls.date)) && cls.date.getDate() !== new Date().getDate());
    } else if (selectedTab === "today") {
      filtered = filtered.filter(cls => 
        cls.date.getDate() === new Date().getDate() &&
        cls.date.getMonth() === new Date().getMonth() &&
        cls.date.getFullYear() === new Date().getFullYear()
      );
    }
    
    return filtered;
  };
  
  const filteredClasses = filterClasses();
  
  // Calculate the next class
  const now = new Date();
  const upcomingClasses = mockClasses
    .filter(cls => isFuture(new Date(cls.date)))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
    
  const nextClass = upcomingClasses.length > 0 ? upcomingClasses[0] : null;
  
  // Find today's classes
  const todayClasses = mockClasses.filter(cls => 
    cls.date.getDate() === new Date().getDate() &&
    cls.date.getMonth() === new Date().getMonth() &&
    cls.date.getFullYear() === new Date().getFullYear()
  );

  const handleCreateClass = () => {
    toast.success("New class form opened");
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold">My Classes</h2>
            <p className="text-muted-foreground">Manage and track your teaching sessions</p>
          </div>
          <Button onClick={handleCreateClass}>
            <Plus className="mr-2 h-4 w-4" /> Create New Class
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Total Classes</h3>
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{mockClasses.length}</p>
            <p className="text-xs text-muted-foreground">This semester</p>
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Classes Today</h3>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{todayClasses.length}</p>
            <p className="text-xs text-muted-foreground">
              {todayClasses.length > 0 
                ? `Next at ${format(todayClasses[0].date, "h:mm a")}`
                : "No classes today"}
            </p>
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Total Students</h3>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">
              {mockClasses.reduce((acc, cls) => acc + cls.studentsCount, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Pending Feedback</h3>
              <Star className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">
              {mockClasses.filter(cls => 
                isPast(new Date(cls.date)) && 
                cls.date.getDate() !== new Date().getDate() && 
                !cls.feedbackSent
              ).length}
            </p>
            <p className="text-xs text-muted-foreground">Needs your attention</p>
          </Card>
        </div>
        
        {/* Next Class Card (if any) */}
        {nextClass && (
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> 
                Your Next Class
              </CardTitle>
              <CardDescription>
                Coming up {format(nextClass.date, "EEEE, MMMM d")} at {format(nextClass.date, "h:mm a")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{nextClass.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    {nextClass.duration} minutes • {nextClass.level} level
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{nextClass.studentsCount} students enrolled</span>
                  </div>
                  <p className="mt-2 text-sm">{nextClass.description}</p>
                </div>
                
                <div className="flex flex-col gap-3 sm:min-w-32">
                  {nextClass.date.getDate() === new Date().getDate() ? (
                    <Button className="w-full">
                      <Video className="mr-2 h-4 w-4" /> Start Class
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline">
                      <FileEdit className="mr-2 h-4 w-4" /> Prepare Materials
                    </Button>
                  )}
                  <Button variant="outline" className="w-full">
                    <Users className="mr-2 h-4 w-4" /> View Students
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Class List */}
        <div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by class, level or description..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Classes</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((classItem) => (
                    <ClassCard key={classItem.id} classItem={classItem} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground">No classes found matching your search criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((classItem) => (
                    <ClassCard key={classItem.id} classItem={classItem} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground">No upcoming classes found.</p>
                    <Button className="mt-4" onClick={handleCreateClass}>
                      <Plus className="mr-2 h-4 w-4" /> Create New Class
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="today" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((classItem) => (
                    <ClassCard key={classItem.id} classItem={classItem} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground">No classes scheduled for today.</p>
                    <Button className="mt-4" onClick={handleCreateClass}>
                      <Plus className="mr-2 h-4 w-4" /> Create New Class
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((classItem) => (
                    <ClassCard key={classItem.id} classItem={classItem} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground">No completed classes found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherClasses;
