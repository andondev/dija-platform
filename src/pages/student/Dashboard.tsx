import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BookOpen, 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  Video, 
  CheckCircle, 
  Target, 
  MessageSquare, 
  FileText,
  BookMarked,
  GraduationCap,
  Award
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

// Mock data for the dashboard
const upcomingClasses = [
  {
    id: "1",
    subject: "Conversation Practice",
    date: new Date(Date.now() + 86400000), // tomorrow
    duration: 45,
    teacher: "Mrs. Johnson",
  },
  {
    id: "2",
    subject: "Grammar Review",
    date: new Date(Date.now() + 86400000 * 3), // in 3 days
    duration: 60,
    teacher: "Mr. Davis",
  },
];

const recentActivities = [
  {
    id: "1",
    type: "class",
    title: "Vocabulary Expansion",
    date: new Date(Date.now() - 86400000), // 1 day ago
    duration: 45,
    teacher: "Ms. Anderson",
  },
  {
    id: "2",
    type: "homework",
    title: "Reading Comprehension",
    date: new Date(Date.now() - 86400000 * 3), // 3 days ago
    completed: true,
  },
  {
    id: "3",
    type: "assessment",
    title: "Speaking Assessment",
    date: new Date(Date.now() - 86400000 * 5), // 5 days ago
    score: 85,
  },
];

const assignments = [
  {
    id: "1",
    title: "Write a Short Essay",
    dueDate: new Date(Date.now() + 86400000 * 2), // in 2 days
    subject: "Writing",
    completed: false,
  },
  {
    id: "2",
    title: "Grammar Exercises",
    dueDate: new Date(Date.now() + 86400000 * 4), // in 4 days
    subject: "Grammar",
    completed: false,
  },
  {
    id: "3",
    title: "Vocabulary Quiz",
    dueDate: new Date(Date.now() - 86400000), // 1 day ago
    subject: "Vocabulary",
    completed: true,
  },
];

const learningMaterials = [
  {
    id: "1",
    title: "Beginner's Textbook",
    type: "Book",
    access: "Online",
  },
  {
    id: "2",
    title: "Conversation Recordings",
    type: "Audio",
    access: "Download",
  },
  {
    id: "3",
    title: "Grammar Worksheets",
    type: "PDF",
    access: "Download",
  },
];

const learningGoals = [
  {
    id: "1",
    title: "Complete 20 hours of learning",
    progress: 75,
    target: "20 hours",
    current: "15 hours",
  },
  {
    id: "2",
    title: "Master 500 vocabulary words",
    progress: 60,
    target: "500 words",
    current: "300 words",
  },
  {
    id: "3",
    title: "Complete conversation course",
    progress: 30,
    target: "12 lessons",
    current: "4 lessons",
  },
];

const StudentDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { user } = useAuth();
  const [overallProgress, setOverallProgress] = useState(68); // Mock progress percentage

  // Find if there are any classes on the selected date
  const getClassesOnDate = (date: Date | null) => {
    if (!date) return [];
    return upcomingClasses.filter(
      (cls) => format(cls.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const classesOnSelectedDate = selectedDate ? getClassesOnDate(selectedDate) : [];

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, {user?.name || "Student"}</h2>
            <p className="text-muted-foreground">Here's an overview of your learning journey</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Video className="mr-2 h-4 w-4" /> Join Next Class
          </Button>
        </div>
        
        {/* Overall Progress Section */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> 
                Overall Learning Progress
              </h3>
              <div className="mt-2">
                <Progress value={overallProgress} className="h-2" />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-muted-foreground">Beginner</span>
                <span className="text-sm font-medium">{overallProgress}%</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/10">Level 3</Badge>
              <Badge variant="outline" className="bg-primary/10">68 Points</Badge>
              <Badge variant="outline" className="bg-primary/10">8 Classes</Badge>
            </div>
          </div>
        </Card>

        {/* Quick Stats Section */}
        <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Upcoming Classes</h3>
              <CalendarIcon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{upcomingClasses.length}</p>
            <p className="text-xs text-muted-foreground">Next: {format(upcomingClasses[0].date, "MMM d, h:mm a")}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Classes Attended</h3>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Hours of Learning</h3>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">16</p>
            <p className="text-xs text-muted-foreground">Out of 20 hours goal</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Assignments</h3>
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{assignments.filter(a => !a.completed).length}</p>
            <p className="text-xs text-muted-foreground">Pending completion</p>
          </Card>
        </div>

        {/* Main Content Sections */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Column 1: Calendar and Classes */}
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" /> 
                  Class Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border shadow-sm"
                />

                {selectedDate && (
                  <div className="mt-4 space-y-3">
                    <h4 className="font-medium text-sm">
                      Classes on {format(selectedDate, "MMMM d, yyyy")}
                    </h4>
                    {classesOnSelectedDate.length > 0 ? (
                      classesOnSelectedDate.map((cls) => (
                        <div key={cls.id} className="p-3 border rounded-md bg-card/50">
                          <div className="font-medium">{cls.subject}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(cls.date, "h:mm a")} • {cls.duration} min • {cls.teacher}
                          </div>
                          <Button size="sm" className="mt-2 w-full">
                            <Video className="mr-2 h-3 w-3" /> Join Class
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No classes scheduled</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" /> 
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningGoals.map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.title}</span>
                      <span>{goal.current} / {goal.target}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Set New Goal
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Column 2: Upcoming Classes and Recent Activity */}
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Video className="h-5 w-5" /> 
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="flex flex-col p-3 border rounded-md bg-card/50">
                    <div className="font-medium">{cls.subject}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(cls.date, "MMMM d, h:mm a")} • {cls.duration} min
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Teacher: {cls.teacher}
                    </div>
                    <div className="flex justify-between mt-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm">Join Class</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Book a Class
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" /> 
                  Assignments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-md bg-card/50">
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Due: {format(assignment.dueDate, "MMM d")} • {assignment.subject}
                      </div>
                    </div>
                    <div>
                      {assignment.completed ? (
                        <Badge>Completed</Badge>
                      ) : (
                        <Button size="sm" variant="outline">Submit</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link to="/student/assignments" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Assignments
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Column 3: Learning Materials and Recent Activity */}
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5" /> 
                  Learning Materials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {learningMaterials.map((material) => (
                  <div key={material.id} className="flex justify-between p-3 border rounded-md bg-card/50">
                    <div>
                      <div className="font-medium">{material.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {material.type} • {material.access}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Access
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link to="/student/materials" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Materials
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookMarked className="h-5 w-5" /> 
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    {activity.type === "class" && <Video className="h-5 w-5 mt-0.5 text-primary" />}
                    {activity.type === "homework" && <FileText className="h-5 w-5 mt-0.5 text-primary" />}
                    {activity.type === "assessment" && <GraduationCap className="h-5 w-5 mt-0.5 text-primary" />}
                    
                    <div className="flex-1">
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(activity.date, "MMM d")}
                        {activity.type === "class" && ` • ${activity.duration} min • ${activity.teacher}`}
                        {activity.type === "assessment" && ` • Score: ${activity.score}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link to="/student/activity" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
