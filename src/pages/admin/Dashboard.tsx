import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Users, BookOpen, MessageSquare, Settings, LucideIcon, BarChart3, School } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for overview stats
const statsData = [
  {
    title: "Total Users 3",
    value: "1,245",
    change: "+12%",
    icon: Users,
    description: "Active users across all roles",
  },
  {
    title: "Teachers",
    value: "156",
    change: "+5%",
    icon: School,
    description: "Registered teachers",
  },
  {
    title: "Students",
    value: "1,089",
    change: "+14%",
    icon: Users,
    description: "Registered students",
  },
  {
    title: "Classes",
    value: "342",
    change: "+8%",
    icon: BookOpen,
    description: "Total classes created",
  },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "enabled the Video Conferencing module",
    time: "10 minutes ago",
    role: "admin",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "created a new class for Advanced English",
    time: "2 hours ago",
    role: "teacher",
  },
  {
    id: 3,
    user: "Admin System",
    action: "performed monthly backup",
    time: "Yesterday",
    role: "system",
  },
  {
    id: 4,
    user: "Mike Johnson",
    action: "disabled the Assessment module for trial users",
    time: "2 days ago",
    role: "admin",
  },
];

const StatsCard = ({ 
  title, 
  value, 
  change, 
  description, 
  icon: Icon 
}: { 
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className={`mt-2 text-xs ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change} from last month
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  if (user?.role !== "admin") {
    navigate("/");
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <Button onClick={() => navigate("/admin/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Platform Settings
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statsData.map((stat) => (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  description={stat.description}
                  icon={stat.icon}
                />
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Quick Access</CardTitle>
                  <CardDescription>
                    Navigate to commonly used admin sections
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate("/admin/modules")}>
                    <Settings className="h-6 w-6 mb-2" />
                    <span>Manage Modules</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate("/admin/users")}>
                    <Users className="h-6 w-6 mb-2" />
                    <span>User Management</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate("/admin/reports")}>
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span>Reports</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => navigate("/admin/logs")}>
                    <MessageSquare className="h-6 w-6 mb-2" />
                    <span>System Logs</span>
                  </Button>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest admin actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 text-sm">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-muted-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            activity.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : activity.role === 'teacher' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Modules</CardTitle>
                <CardDescription>
                  Configure which modules are enabled for your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For detailed module configuration, please visit the{" "}
                  <Button variant="link" className="h-auto p-0" onClick={() => navigate("/admin/modules")}>
                    Module Management
                  </Button>{" "}
                  page.
                </p>
                <Button onClick={() => navigate("/admin/modules")}>
                  Go to Module Management
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>
                  Review all admin actions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For a complete activity history, please visit the{" "}
                  <Button variant="link" className="h-auto p-0" onClick={() => navigate("/admin/logs")}>
                    System Logs
                  </Button>{" "}
                  page.
                </p>
                <Button onClick={() => navigate("/admin/logs")}>
                  View All Logs
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
