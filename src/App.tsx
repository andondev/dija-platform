import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherClasses from "./pages/teacher/Classes";
import TeacherMaterials from "./pages/teacher/Materials";
import TeacherMessages from "./pages/teacher/Messages";
import TeacherProfile from "./pages/teacher/Profile";
import TeacherSettings from "./pages/teacher/Settings";
import StudentDashboard from "./pages/student/Dashboard";
import StudentClasses from "./pages/student/Classes";
import StudentMaterials from "./pages/student/Materials";
import StudentMessages from "./pages/student/Messages";
import StudentProfile from "./pages/student/Profile";
import StudentSettings from "./pages/student/Settings";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminModules from "./pages/admin/Modules";
import AdminUsers from "./pages/admin/Users";
import AdminLogs from "./pages/admin/Logs";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

// Create placeholder components for routes that don't exist yet
const TeacherNotifications = () => <div>Teacher Notifications Page (Coming Soon)</div>;
const StudentNotifications = () => <div>Student Notifications Page (Coming Soon)</div>;
const AdminNotifications = () => <div>Admin Notifications Page (Coming Soon)</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/classes" element={<TeacherClasses />} />
            <Route path="/teacher/materials" element={<TeacherMaterials />} />
            <Route path="/teacher/messages" element={<TeacherMessages />} />
            <Route path="/teacher/profile" element={<TeacherProfile />} />
            <Route path="/teacher/settings" element={<TeacherSettings />} />
            <Route path="/teacher/notifications" element={<TeacherNotifications />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/classes" element={<StudentClasses />} />
            <Route path="/student/materials" element={<StudentMaterials />} />
            <Route path="/student/messages" element={<StudentMessages />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/settings" element={<StudentSettings />} />
            <Route path="/student/notifications" element={<StudentNotifications />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/modules" element={<AdminModules />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/logs" element={<AdminLogs />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
