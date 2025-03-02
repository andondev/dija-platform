import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, 
  Home, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  User, 
  Settings,
  Bell,
  Menu,
  X,
  Check,
  Clock,
  Users,
  BarChart3,
  FileText,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    title: "New Assignment Posted",
    message: "Your teacher posted a new writing assignment due in 5 days.",
    time: "5 minutes ago",
    read: false,
    type: "assignment"
  },
  {
    id: 2,
    title: "Upcoming Class Reminder",
    message: "Don't forget your Conversation Practice class tomorrow at 3:00 PM.",
    time: "1 hour ago",
    read: false,
    type: "reminder"
  },
  {
    id: 3,
    title: "Assignment Graded",
    message: "Your Spanish Vocabulary Quiz has been graded. You scored 92%!",
    time: "2 hours ago",
    read: true,
    type: "grade"
  },
  {
    id: 4,
    title: "New Message",
    message: "You have a new message from Mrs. Johnson about your latest homework.",
    time: "Yesterday",
    read: true,
    type: "message"
  },
  {
    id: 5,
    title: "Learning Material Available",
    message: "New learning materials for Intermediate Spanish are now available.",
    time: "2 days ago",
    read: true,
    type: "material"
  }
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notification removed");
  };

  // Determine route prefix based on user role
  const routePrefix = user?.role === "admin" ? "/admin" : user?.role === "teacher" ? "/teacher" : "/student";

  // Get the correct role display text
  const getRoleDisplayText = () => {
    switch (user?.role) {
      case "admin":
        return "Administrator";
      case "teacher":
        return "Teacher";
      case "student":
        return "Student";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 z-30 bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-semibold">Dija Connect</h1>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {getRoleDisplayText()} Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <p className="font-medium">Notifications</p>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-80">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 border-b last:border-0 ${!notification.read ? 'bg-muted/40' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground">{notification.message}</p>
                              <p className="text-xs flex items-center mt-1 text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {notification.time}
                              </p>
                            </div>
                            <div className="flex">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  )}
                </ScrollArea>
                <div className="p-2 border-t">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`${routePrefix}/notifications`}>View all notifications</Link>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <span className="text-sm hidden sm:inline">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-20 
          w-64 shrink-0 border-r bg-card/50 backdrop-blur-sm
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex flex-col h-full p-4">
            <div className="space-y-1 py-4">
              {/* Admin Navigation Links */}
              {user?.role === "admin" && (
                <>
                  <Link to="/admin/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/admin/users">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      User Management
                    </Button>
                  </Link>
                  <Link to="/admin/modules">
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Modules
                    </Button>
                  </Link>
                  <Link to="/admin/reports">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Reports
                    </Button>
                  </Link>
                  <Link to="/admin/logs">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      System Logs
                    </Button>
                  </Link>
                  <Link to="/admin/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </>
              )}
              
              {/* Teacher Navigation Links */}
              {user?.role === "teacher" && (
                <>
                  <Link to="/teacher/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/teacher/classes">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      My Classes
                    </Button>
                  </Link>
                  <Link to="/teacher/materials">
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Teaching Materials
                    </Button>
                  </Link>
                  <Link to="/teacher/messages">
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Button>
                  </Link>
                  <Link to="/teacher/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Link to="/teacher/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </>
              )}
              
              {/* Student Navigation Links */}
              {user?.role === "student" && (
                <>
                  <Link to="/student/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/student/classes">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      My Classes
                    </Button>
                  </Link>
                  <Link to="/student/materials">
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Learning Materials
                    </Button>
                  </Link>
                  <Link to="/student/messages">
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Button>
                  </Link>
                  <Link to="/student/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Link to="/student/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <div className="mt-auto">
              <div className="border-t pt-4">
                <Button variant="outline" className="w-full" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
