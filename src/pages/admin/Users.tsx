import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, Filter, Download, Plus, MoreHorizontal, UserPlus, Trash2, Edit } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-06-15T10:30:00",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "teacher",
    status: "active",
    lastActive: "2023-06-14T16:45:00",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@example.com",
    role: "teacher",
    status: "inactive",
    lastActive: "2023-05-28T09:15:00",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "student",
    status: "active",
    lastActive: "2023-06-15T08:20:00",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "student",
    status: "active",
    lastActive: "2023-06-14T14:10:00",
  },
  {
    id: "6",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    role: "student",
    status: "active",
    lastActive: "2023-06-13T11:30:00",
  },
  {
    id: "7",
    name: "William Davis",
    email: "william@example.com",
    role: "teacher",
    status: "active",
    lastActive: "2023-06-15T09:45:00",
  },
  {
    id: "8",
    name: "Olivia Taylor",
    email: "olivia@example.com",
    role: "student",
    status: "inactive",
    lastActive: "2023-05-20T15:25:00",
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = (role: string) => {
    return users.filter(
      (user) =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (role === "all" || user.role === role)
    );
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully");
  };

  const exportUsers = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `dija-connect-users-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("User data exported successfully");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "teacher":
        return "bg-blue-100 text-blue-800";
      case "student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const UserRow = ({ user }: { user: typeof mockUsers[0] }) => (
    <tr className="border-b">
      <td className="px-4 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-lg font-medium text-gray-600">{user.name.charAt(0)}</span>
          </div>
          <div className="ml-4">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeClass(user.role)}`}>
          {user.role}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(user.status)}`}>
          {user.status}
        </span>
      </td>
      <td className="px-4 py-4 text-sm text-muted-foreground">
        {formatDate(user.lastActive)}
      </td>
      <td className="px-4 py-4 text-right">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0" align="end">
            <div className="flex flex-col">
              <Button variant="ghost" size="sm" className="justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <UserPlus className="mr-2 h-4 w-4" />
                Change Role
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                onClick={() => handleDeleteUser(user.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage users, roles, and permissions across the platform
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={exportUsers}>
              <Download className="mr-2 h-4 w-4" />
              Export Users
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex-shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="admin">Admins</TabsTrigger>
                <TabsTrigger value="teacher">Teachers</TabsTrigger>
                <TabsTrigger value="student">Students</TabsTrigger>
              </TabsList>

              <div className="rounded-md border">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">User</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Last Active</th>
                        <th className="px-4 py-3 font-medium sr-only">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers(
                        TabsContent.displayName === "all" ? "all" : TabsContent.displayName || "all"
                      ).map((user) => (
                        <UserRow key={user.id} user={user} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
