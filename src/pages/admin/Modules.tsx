import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { ModuleConfig } from "@/lib/types";
import { Search, Filter, Download, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

// Mock module data
const initialModules: ModuleConfig[] = [
  {
    id: "core-dashboard",
    name: "Dashboard",
    description: "Main dashboard and activity overview",
    enabled: true,
    isCore: true,
    category: "administrative",
  },
  {
    id: "class-management",
    name: "Class Management",
    description: "Create and manage classes, attendance, and schedules",
    enabled: true,
    isCore: true,
    category: "learning",
  },
  {
    id: "video-conferencing",
    name: "Video Conferencing",
    description: "Real-time video classes with screen sharing",
    enabled: true,
    isCore: false,
    category: "communication",
  },
  {
    id: "assignments",
    name: "Assignments",
    description: "Create, distribute, and grade assignments",
    enabled: true,
    isCore: false,
    category: "assessment",
  },
  {
    id: "messaging",
    name: "Messaging System",
    description: "Instant messaging between teachers and students",
    enabled: true,
    isCore: false,
    category: "communication",
  },
  {
    id: "progress-tracking",
    name: "Progress Tracking",
    description: "Track and visualize student progress over time",
    enabled: true,
    isCore: false,
    category: "assessment",
  },
  {
    id: "file-management",
    name: "File Management",
    description: "Upload and share learning materials",
    enabled: true,
    isCore: true,
    category: "learning",
  },
  {
    id: "user-management",
    name: "User Management",
    description: "Manage users, roles, and permissions",
    enabled: true,
    isCore: true,
    category: "administrative",
  },
  {
    id: "reports",
    name: "Advanced Reports",
    description: "Generate detailed reports on platform usage and performance",
    enabled: false,
    isCore: false,
    category: "administrative",
  },
  {
    id: "ai-assistant",
    name: "AI Learning Assistant",
    description: "AI-powered learning assistance and content generation",
    enabled: false,
    isCore: false,
    category: "learning",
  },
];

const AdminModules = () => {
  const [modules, setModules] = useState<ModuleConfig[]>(initialModules);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleModule = (id: string) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, enabled: !module.enabled } : module
      )
    );
    
    const module = modules.find((m) => m.id === id);
    if (module) {
      toast.success(`${module.enabled ? "Disabled" : "Enabled"} ${module.name} module`);
    }
  };

  const filteredModules = (category: string) => {
    return modules
      .filter((module) => 
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === "all" || module.category === category)
      );
  };

  const exportModuleConfig = () => {
    const dataStr = JSON.stringify(modules, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `dija-connect-modules-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Module configuration exported successfully");
  };

  const ModuleCard = ({ module }: { module: ModuleConfig }) => (
    <Card className={`border-l-4 ${module.enabled ? 'border-l-green-500' : 'border-l-gray-300'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{module.name}</CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor={`toggle-${module.id}`} className="sr-only">
              Toggle {module.name}
            </Label>
            <Switch 
              id={`toggle-${module.id}`}
              checked={module.enabled}
              onCheckedChange={() => handleToggleModule(module.id)}
              disabled={module.isCore}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex space-x-2">
            <span className={`px-2 py-1 rounded-full ${getCategoryColor(module.category)}`}>
              {module.category}
            </span>
            {module.isCore && (
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                Core
              </span>
            )}
          </div>
          
          <Button variant="ghost" size="sm" className="text-xs">
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "learning":
        return "bg-green-100 text-green-800";
      case "communication":
        return "bg-purple-100 text-purple-800";
      case "assessment":
        return "bg-orange-100 text-orange-800";
      case "administrative":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Module Management</h1>
            <p className="text-muted-foreground">
              Configure which modules are available in your Dija Connect installation
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={exportModuleConfig}>
              <Download className="mr-2 h-4 w-4" />
              Export Configuration
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Custom Module
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search modules..."
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

        <div className="space-y-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Modules</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="administrative">Administrative</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredModules("all").map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="learning" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredModules("learning").map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="communication" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredModules("communication").map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredModules("assessment").map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="administrative" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredModules("administrative").map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminModules;
