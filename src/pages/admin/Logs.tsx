import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, RefreshCw } from "lucide-react";

const logsData = [
  { id: 1, timestamp: "2023-06-15T14:30:25", level: "info", source: "system", message: "Daily backup completed successfully" },
  { id: 2, timestamp: "2023-06-15T13:45:12", level: "error", source: "auth", message: "Failed login attempt from IP 192.168.0.1" },
  { id: 3, timestamp: "2023-06-15T12:30:05", level: "warning", source: "module", message: "Video conferencing module resource usage at 80%" },
  { id: 4, timestamp: "2023-06-15T11:20:18", level: "info", source: "user", message: "User alex@example.com updated system settings" },
  { id: 5, timestamp: "2023-06-15T10:15:45", level: "error", source: "database", message: "Connection timeout with primary database" },
  { id: 6, timestamp: "2023-06-15T09:05:33", level: "info", source: "class", message: "New class 'Advanced English' created by teacher maria@example.com" },
  { id: 7, timestamp: "2023-06-14T18:45:22", level: "warning", source: "storage", message: "File storage usage above 75% threshold" },
  { id: 8, timestamp: "2023-06-14T16:30:11", level: "info", source: "system", message: "Scheduled system update completed" },
  { id: 9, timestamp: "2023-06-14T15:20:40", level: "error", source: "module", message: "Assignment module failed to generate report" },
  { id: 10, timestamp: "2023-06-14T14:10:05", level: "info", source: "user", message: "New admin user created: william@example.com" },
];

const AdminLogs = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
            <p className="text-muted-foreground">
              Monitor system activities and events
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
          />
        </div>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle>Recent Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Timestamp</th>
                      <th className="px-4 py-3 font-medium">Level</th>
                      <th className="px-4 py-3 font-medium">Source</th>
                      <th className="px-4 py-3 font-medium">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logsData.map((log) => (
                      <tr key={log.id} className="border-b">
                        <td className="px-4 py-3 font-mono text-xs">
                          {formatDate(log.timestamp)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getLevelBadgeClass(log.level)}`}>
                            {log.level}
                          </span>
                        </td>
                        <td className="px-4 py-3">{log.source}</td>
                        <td className="px-4 py-3 max-w-md truncate">{log.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminLogs;
