import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, PieChart, LineChart, UserCheck, Download as DownloadIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// In a real application, we would use a charting library like recharts
// Here we're just showing placeholders for the report visuals

const AdminReports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
            <p className="text-muted-foreground">
              View detailed analytics and generate reports
            </p>
          </div>
          <Button>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export All Reports
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage Statistics</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
            <TabsTrigger value="performance">System Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Platform Usage</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                    Platform Usage Chart Placeholder
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">User Growth</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                    User Growth Chart Placeholder
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Module Usage Distribution</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                    Module Usage Chart Placeholder
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Summary Report</CardTitle>
                <CardDescription>Quick overview of platform metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-muted/20 p-4 rounded-md">
                    <div className="text-muted-foreground text-sm mb-1">Active Users</div>
                    <div className="text-2xl font-bold">1,245</div>
                    <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-md">
                    <div className="text-muted-foreground text-sm mb-1">Classes Created</div>
                    <div className="text-2xl font-bold">342</div>
                    <div className="text-xs text-green-600 mt-1">↑ 8% from last month</div>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-md">
                    <div className="text-muted-foreground text-sm mb-1">Storage Used</div>
                    <div className="text-2xl font-bold">256 GB</div>
                    <div className="text-xs text-yellow-600 mt-1">↑ 18% from last month</div>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-md">
                    <div className="text-muted-foreground text-sm mb-1">Avg. Daily Active</div>
                    <div className="text-2xl font-bold">523</div>
                    <div className="text-xs text-green-600 mt-1">↑ 5% from last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Module Usage Statistics</CardTitle>
                <CardDescription>
                  Track which modules are most popular
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  Module Usage Chart Placeholder - Would show usage metrics for each platform module
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Consumption</CardTitle>
                <CardDescription>
                  Monitor system resource usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  Resource Usage Chart Placeholder - Would show CPU, memory, storage usage over time
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>
                  Analyze user distribution by role and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  User Demographics Chart Placeholder - Would show breakdown of users by role, activity level, etc.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>
                  Track how users interact with the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  User Engagement Chart Placeholder - Would show metrics on user activity, retention, etc.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Performance Metrics</CardTitle>
                <CardDescription>
                  Monitor platform performance and response times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  Performance Metrics Chart Placeholder - Would show page load times, API response times, etc.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Rates</CardTitle>
                <CardDescription>
                  Track system errors and exceptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  Error Rates Chart Placeholder - Would show error frequency and types over time
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
