import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { format, addDays, isToday, isPast, isFuture } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon, 
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
  ArrowRight,
  MessageSquare,
  UserCheck,
  CheckCircle2,
  ClipboardList,
  FileCheck
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface ScheduledClass {
  id: string;
  date: Date;
  duration: "45" | "60";
  studentCount: number;
  status: "scheduled" | "completed" | "cancelled";
  title: string;
  students?: string[];
}

interface Student {
  id: string;
  name: string;
  progress: number;
  attendance: number;
  lastActive: string;
  level: string;
}

// Mock data for the charts
const classAttendanceData = [
  { name: 'Monday', attendance: 12 },
  { name: 'Tuesday', attendance: 14 },
  { name: 'Wednesday', attendance: 10 },
  { name: 'Thursday', attendance: 15 },
  { name: 'Friday', attendance: 13 },
  { name: 'Saturday', attendance: 8 },
  { name: 'Sunday', attendance: 5 },
];

const studentProgressData = [
  { name: 'A1', value: 25 },
  { name: 'A2', value: 35 },
  { name: 'B1', value: 20 },
  { name: 'B2', value: 15 },
  { name: 'C1', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const TeacherDashboard = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>([
    {
      id: "1",
      date: new Date(),
      duration: "45",
      studentCount: 5,
      status: "scheduled",
      title: "Beginner Spanish Conversation",
      students: ["John Smith", "Emma Wang", "Carlos Mendez", "Sarah Johnson", "Michael Brown"]
    },
    {
      id: "2",
      date: addDays(new Date(), 1),
      duration: "60",
      studentCount: 3,
      status: "scheduled",
      title: "Intermediate Grammar Review",
      students: ["David Lee", "Maria Garcia", "Robert Johnson"]
    },
    {
      id: "3",
      date: addDays(new Date(), -1),
      duration: "45",
      studentCount: 4,
      status: "completed",
      title: "Vocabulary Building",
      students: ["Jennifer Kim", "Thomas Wilson", "Lisa Chen", "James Rodriguez"]
    }
  ]);
  const [selectedDuration, setSelectedDuration] = useState<"45" | "60">("45");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [classTitle, setClassTitle] = useState("");

  // Mock student data
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "John Smith", progress: 78, attendance: 90, lastActive: "Today", level: "B1" },
    { id: "2", name: "Emma Wang", progress: 92, attendance: 95, lastActive: "Yesterday", level: "B2" },
    { id: "3", name: "Carlos Mendez", progress: 65, attendance: 85, lastActive: "2 days ago", level: "A2" },
    { id: "4", name: "Sarah Johnson", progress: 88, attendance: 92, lastActive: "Today", level: "B2" },
    { id: "5", name: "Michael Brown", progress: 70, attendance: 80, lastActive: "3 days ago", level: "B1" },
    { id: "6", name: "Jennifer Kim", progress: 95, attendance: 98, lastActive: "Today", level: "C1" },
    { id: "7", name: "Thomas Wilson", progress: 60, attendance: 75, lastActive: "1 week ago", level: "A2" },
    { id: "8", name: "Lisa Chen", progress: 85, attendance: 88, lastActive: "Yesterday", level: "B1" },
  ]);

  const handleScheduleClass = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    if (!classTitle.trim()) {
      toast.error("Please enter a class title");
      return;
    }

    const newClass: ScheduledClass = {
      id: Math.random().toString(36).substr(2, 9),
      date: date,
      duration: selectedDuration,
      studentCount: 0,
      status: "scheduled",
      title: classTitle
    };

    setScheduledClasses((prev) => [...prev, newClass]);
    toast.success("Class scheduled successfully");
    setDate(null);
    setClassTitle("");
  };

  const markClassAsCompleted = (id: string) => {
    setScheduledClasses(classes => 
      classes.map(cls => 
        cls.id === id ? { ...cls, status: "completed" } : cls
      )
    );
    toast.success("Class marked as completed");
  };

  const cancelClass = (id: string) => {
    setScheduledClasses(classes => 
      classes.map(cls => 
        cls.id === id ? { ...cls, status: "cancelled" } : cls
      )
    );
    toast.success("Class cancelled");
  };

  const todaysClasses = scheduledClasses.filter(
    (cls) => format(cls.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") && cls.status !== "cancelled"
  );

  const upcomingClasses = scheduledClasses.filter(
    (cls) => isFuture(cls.date) && cls.status !== "cancelled"
  );

  const pastClasses = scheduledClasses.filter(
    (cls) => isPast(cls.date) && !isToday(cls.date)
  );

  const completedClasses = scheduledClasses.filter(
    (cls) => cls.status === "completed"
  );

  const totalStudents = students.length;
  const activeStudents = students.filter(student => 
    student.lastActive === "Today" || student.lastActive === "Yesterday"
  ).length;

  const totalHoursTaught = completedClasses.reduce(
    (total, cls) => total + (cls.duration === "45" ? 0.75 : 1), 
    0
  );

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Teacher Dashboard</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Students
            </Button>
            <Button>
              <ClipboardList className="mr-2 h-4 w-4" />
              Create Lesson Plan
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Today's Classes</h3>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{todaysClasses.length}</p>
                <p className="text-sm text-muted-foreground">
                  {todaysClasses.length === 1 ? "1 class" : `${todaysClasses.length} classes`} scheduled for today
                </p>
              </Card>
              
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Active Students</h3>
                  <div className="p-2 bg-green-100 rounded-full">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{activeStudents}</p>
                <p className="text-sm text-muted-foreground">
                  {activeStudents} of {totalStudents} students active recently
                </p>
              </Card>
              
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Hours Taught</h3>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{totalHoursTaught}</p>
                <p className="text-sm text-muted-foreground">
                  Total hours in {completedClasses.length} completed classes
                </p>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {todaysClasses.length === 0 ? (
                    <p className="text-muted-foreground">No classes scheduled for today</p>
                  ) : (
                    todaysClasses.map((cls) => (
                      <div 
                        key={cls.id}
                        className="p-4 rounded-lg border space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{cls.title}</h4>
                          <Badge status={cls.status} />
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>
                            {format(cls.date, "h:mm a")} ({cls.duration} min)
                          </span>
                          <Users className="ml-4 mr-2 h-4 w-4" />
                          <span>{cls.studentCount} students</span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" onClick={() => markClassAsCompleted(cls.id)}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Complete
                          </Button>
                          <Button size="sm" variant="outline">
                            Start Class
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                  {todaysClasses.length > 0 && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/teacher/schedule">
                        View Full Schedule
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Student Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {students.slice(0, 5).map((student) => (
                    <div key={student.id} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{student.name}</span>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/teacher/students">
                      View All Students
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex flex-col h-auto py-4">
                    <FileCheck className="mb-2 h-5 w-5" />
                    <span>Grade Assignments</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-4">
                    <BookOpen className="mb-2 h-5 w-5" />
                    <span>Create Materials</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-4">
                    <MessageSquare className="mb-2 h-5 w-5" />
                    <span>Send Message</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-4">
                    <BarChart3 className="mb-2 h-5 w-5" />
                    <span>View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Schedule a Class</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="class-title">Class Title</Label>
                    <Input 
                      id="class-title" 
                      placeholder="Enter class title" 
                      value={classTitle}
                      onChange={(e) => setClassTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Select
                        value={selectedDuration}
                        onValueChange={(value: "45" | "60") => setSelectedDuration(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <Clock className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button onClick={handleScheduleClass}>Schedule Class</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Upcoming Classes</h3>
                <div className="space-y-4">
                  {upcomingClasses.length === 0 ? (
                    <p className="text-muted-foreground">No upcoming classes scheduled</p>
                  ) : (
                    upcomingClasses
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((cls) => (
                        <div
                          key={cls.id}
                          className="flex items-center justify-between p-4 rounded-lg border"
                        >
                          <div>
                            <p className="font-medium">{cls.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(cls.date, "PPP")} • {cls.duration} minutes • {cls.studentCount} students
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => cancelClass(cls.id)}>
                              Cancel
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </Card>
            </div>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Past Classes</h3>
              <div className="space-y-4">
                {pastClasses.length === 0 ? (
                  <p className="text-muted-foreground">No past classes</p>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted/50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-gray-200">
                        {pastClasses
                          .sort((a, b) => b.date.getTime() - a.date.getTime())
                          .map((cls) => (
                            <tr key={cls.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{format(cls.date, "PP")}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{cls.title}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{cls.duration} min</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{cls.studentCount}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Badge status={cls.status} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                <Button variant="ghost" size="sm">View Details</Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Total Students</h3>
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{students.length}</p>
                <p className="text-sm text-muted-foreground">
                  Across all your classes
                </p>
              </Card>
              
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Average Progress</h3>
                  <div className="p-2 bg-green-100 rounded-full">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">
                  {Math.round(students.reduce((acc, student) => acc + student.progress, 0) / students.length)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Course completion average
                </p>
              </Card>
              
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Attendance Rate</h3>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">
                  {Math.round(students.reduce((acc, student) => acc + student.attendance, 0) / students.length)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Average class attendance
                </p>
              </Card>
            </div>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Student Management</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-8 w-[300px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <FileCheck className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Student
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <span className="text-sm font-medium">{student.name.charAt(0)}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium">{student.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10">
                              {student.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full max-w-[100px] bg-muted rounded-full h-2 mr-2">
                                <div 
                                  className="bg-primary rounded-full h-2" 
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                              <span className="text-sm">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.attendance}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.lastActive}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Message</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Weekly Class Attendance</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attendance" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Student Levels Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={studentProgressData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {studentProgressData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card className="p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl">Performance Reports</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Homework Completion</h4>
                    <div className="text-3xl font-bold mb-2">84%</div>
                    <p className="text-sm text-muted-foreground">Average homework submission rate</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Test Scores</h4>
                    <div className="text-3xl font-bold mb-2">78/100</div>
                    <p className="text-sm text-muted-foreground">Average test score across all classes</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Participation</h4>
                    <div className="text-3xl font-bold mb-2">92%</div>
                    <p className="text-sm text-muted-foreground">Student participation rate in discussions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Badge component for class status
const Badge = ({ status }: { status: string }) => {
  let bgColor = "bg-yellow-100 text-yellow-800";
  let statusDisplay = "Scheduled";
  
  if (status === "completed") {
    bgColor = "bg-green-100 text-green-800";
    statusDisplay = "Completed";
  } else if (status === "cancelled") {
    bgColor = "bg-red-100 text-red-800";
    statusDisplay = "Cancelled";
  }
  
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${bgColor}`}>
      {statusDisplay}
    </span>
  );
};

// Link component from react-router-dom for navigation
const Link = ({ children, to, ...props }: { children: React.ReactNode, to: string, [key: string]: any }) => {
  return <a href={to} {...props}>{children}</a>;
};

// Components required for the implementation
const Label = ({ children, htmlFor }: { children: React.ReactNode, htmlFor?: string }) => {
  return <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={htmlFor}>{children}</label>;
};

const Input = ({ ...props }) => {
  return <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" {...props} />;
};

// Additional icons needed
const Search = Clock;
const UserPlus = Users;

export default TeacherDashboard;
