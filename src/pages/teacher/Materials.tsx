import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  BookOpen, 
  File, 
  FileText, 
  Video, 
  Upload, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Share2, 
  MoreHorizontal,
  Folder
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for teaching materials
const mockMaterials = [
  {
    id: 1,
    title: "Spanish Grammar Basics",
    type: "document",
    format: "PDF",
    uploadDate: "2023-12-10",
    size: "2.4 MB",
    shared: true,
    categories: ["grammar", "beginners"],
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 2,
    title: "Conversation Practice Audio",
    type: "audio",
    format: "MP3",
    uploadDate: "2024-01-15",
    size: "18.2 MB",
    shared: true,
    categories: ["conversation", "listening"],
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: 3,
    title: "Vocabulary Flashcards Set 1",
    type: "document",
    format: "PDF",
    uploadDate: "2024-02-01",
    size: "4.1 MB",
    shared: false,
    categories: ["vocabulary", "beginners"],
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    id: 4,
    title: "Spanish Culture Presentation",
    type: "presentation",
    format: "PPTX",
    uploadDate: "2024-02-12",
    size: "12.8 MB",
    shared: true,
    categories: ["culture", "intermediate"],
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    id: 5,
    title: "Verb Conjugation Workshop",
    type: "video",
    format: "MP4",
    uploadDate: "2024-03-05",
    size: "128.5 MB",
    shared: true,
    categories: ["grammar", "verbs", "intermediate"],
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  }
];

// Mock data for material collections
const mockCollections = [
  {
    id: 1,
    title: "Beginner Spanish Course",
    itemCount: 12,
    lastUpdated: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 2,
    title: "Intermediate Grammar",
    itemCount: 8,
    lastUpdated: "2024-02-28",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: 3,
    title: "Conversation Practice Materials",
    itemCount: 5,
    lastUpdated: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  }
];

const MaterialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "document":
      return <FileText className="h-10 w-10 text-blue-500" />;
    case "video":
      return <Video className="h-10 w-10 text-red-500" />;
    case "audio":
      return <File className="h-10 w-10 text-green-500" />;
    case "presentation":
      return <BookOpen className="h-10 w-10 text-amber-500" />;
    default:
      return <File className="h-10 w-10 text-gray-500" />;
  }
};

const TeacherMaterials = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredMaterials = mockMaterials.filter(material => 
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teaching Materials</h1>
            <p className="text-muted-foreground">
              Manage and organize your teaching resources
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar with filters and calendar */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">Categories</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      grammar
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      vocabulary
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      conversation
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      culture
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      + more
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">File Type</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Documents
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Videos
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Audio
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Presentations
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">Date Uploaded</div>
                  <Calendar 
                    selected={selectedDate} 
                    onSelect={setSelectedDate} 
                    className="border rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Used</span>
                    <span className="text-sm font-medium">8.2 GB</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "41%" }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    8.2 GB of 20 GB used (41%)
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Upgrade Storage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-3 space-y-6">
            {/* Search and view options */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search materials..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Tabs for different views */}
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Materials</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMaterials.map((material) => (
                    <Card key={material.id} className="overflow-hidden">
                      <div className="aspect-video relative bg-muted">
                        <img 
                          src={`${material.thumbnail}?w=600&h=400&fit=crop`} 
                          alt={material.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-base">{material.title}</CardTitle>
                            <CardDescription>
                              {material.format} • {material.size}
                            </CardDescription>
                          </div>
                          <MaterialIcon type={material.type} />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {material.categories.map((category, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Uploaded: {material.uploadDate}
                          </span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Move to</DropdownMenuItem>
                                <DropdownMenuItem>Add to collection</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="collections" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCollections.map((collection) => (
                    <Card key={collection.id} className="overflow-hidden">
                      <div className="aspect-video relative bg-muted">
                        <img 
                          src={`${collection.thumbnail}?w=600&h=400&fit=crop`} 
                          alt={collection.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm">
                            View Collection
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-base">{collection.title}</CardTitle>
                            <CardDescription>
                              {collection.itemCount} items
                            </CardDescription>
                          </div>
                          <Folder className="h-10 w-10 text-primary" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Updated: {collection.lastUpdated}
                          </span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* New collection card */}
                  <Card className="overflow-hidden border-dashed flex flex-col items-center justify-center p-6 h-full">
                    <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Create New Collection</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Organize your materials into themed collections
                    </p>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Collection
                    </Button>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="recent">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockMaterials.slice(0, 3).map((material) => (
                    <Card key={material.id} className="overflow-hidden">
                      <div className="aspect-video relative bg-muted">
                        <img 
                          src={`${material.thumbnail}?w=600&h=400&fit=crop`} 
                          alt={material.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-base">{material.title}</CardTitle>
                            <CardDescription>
                              {material.format} • {material.size}
                            </CardDescription>
                          </div>
                          <MaterialIcon type={material.type} />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {material.categories.map((category, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Uploaded: {material.uploadDate}
                          </span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Move to</DropdownMenuItem>
                                <DropdownMenuItem>Add to collection</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="shared">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockMaterials.filter(m => m.shared).map((material) => (
                    <Card key={material.id} className="overflow-hidden">
                      <div className="aspect-video relative bg-muted">
                        <img 
                          src={`${material.thumbnail}?w=600&h=400&fit=crop`} 
                          alt={material.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-base">{material.title}</CardTitle>
                            <CardDescription>
                              {material.format} • {material.size}
                            </CardDescription>
                          </div>
                          <MaterialIcon type={material.type} />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {material.categories.map((category, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Uploaded: {material.uploadDate}
                          </span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Move to</DropdownMenuItem>
                                <DropdownMenuItem>Add to collection</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherMaterials;
