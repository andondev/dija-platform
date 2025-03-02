import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Headphones, 
  File, 
  Download, 
  Search, 
  Filter,
  Play,
  ExternalLink, 
  BookMarked,
  Star,
  Plus,
  Check,
  Bookmark,
  Eye,
  EyeOff
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for learning materials
const mockMaterials = [
  {
    id: "1",
    title: "Beginner's Guide to Grammar",
    type: "ebook",
    format: "PDF",
    category: "Grammar",
    level: "Beginner",
    dateAdded: new Date(2023, 10, 5),
    progress: 65,
    isFavorite: true,
    isNew: false,
    description: "A comprehensive guide to basic grammar rules and structures.",
    size: "15 MB",
    pages: 120,
    thumbnailColor: "bg-blue-100"
  },
  {
    id: "2",
    title: "Everyday Conversations",
    type: "audio",
    format: "MP3",
    category: "Speaking",
    level: "Intermediate",
    dateAdded: new Date(2023, 11, 10),
    progress: 40,
    isFavorite: false,
    isNew: false,
    description: "Audio recordings of common conversations for practice.",
    duration: "45 minutes",
    size: "65 MB",
    thumbnailColor: "bg-green-100"
  },
  {
    id: "3",
    title: "Advanced Vocabulary Workbook",
    type: "ebook",
    format: "PDF",
    category: "Vocabulary",
    level: "Advanced",
    dateAdded: new Date(2024, 0, 15),
    progress: 20,
    isFavorite: true,
    isNew: false,
    description: "Expand your vocabulary with advanced words and phrases.",
    size: "8 MB",
    pages: 85,
    thumbnailColor: "bg-purple-100"
  },
  {
    id: "4",
    title: "Pronunciation Workshop",
    type: "video",
    format: "MP4",
    category: "Pronunciation",
    level: "All Levels",
    dateAdded: new Date(2024, 1, 20),
    progress: 100,
    isFavorite: false,
    isNew: false,
    description: "Video tutorials on correct pronunciation of difficult sounds.",
    duration: "60 minutes",
    size: "250 MB",
    thumbnailColor: "bg-red-100"
  },
  {
    id: "5",
    title: "Writing Essentials",
    type: "ebook",
    format: "PDF",
    category: "Writing",
    level: "Intermediate",
    dateAdded: new Date(2024, 2, 5),
    progress: 0,
    isFavorite: false,
    isNew: true,
    description: "Learn essential writing skills for clear communication.",
    size: "12 MB",
    pages: 95,
    thumbnailColor: "bg-yellow-100"
  },
  {
    id: "6",
    title: "Cultural Insights",
    type: "video",
    format: "MP4",
    category: "Culture",
    level: "Intermediate",
    dateAdded: new Date(2024, 2, 10),
    progress: 15,
    isFavorite: false,
    isNew: true,
    description: "Videos exploring cultural aspects of language learning.",
    duration: "90 minutes",
    size: "320 MB",
    thumbnailColor: "bg-orange-100"
  },
  {
    id: "7",
    title: "Business Language",
    type: "ebook",
    format: "PDF",
    category: "Business",
    level: "Advanced",
    dateAdded: new Date(2024, 2, 15),
    progress: 0,
    isFavorite: false,
    isNew: true,
    description: "Professional language for business contexts.",
    size: "18 MB",
    pages: 140,
    thumbnailColor: "bg-gray-100"
  },
  {
    id: "8",
    title: "Listening Exercises",
    type: "audio",
    format: "MP3",
    category: "Listening",
    level: "Beginner",
    dateAdded: new Date(2024, 2, 20),
    progress: 50,
    isFavorite: true,
    isNew: true,
    description: "Audio exercises to improve listening comprehension.",
    duration: "120 minutes",
    size: "95 MB",
    thumbnailColor: "bg-teal-100"
  }
];

// Categories for filtering
const categories = ["All", "Grammar", "Vocabulary", "Speaking", "Listening", "Writing", "Culture", "Business", "Pronunciation"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const types = ["All Types", "ebook", "audio", "video"];

const getMaterialIcon = (type: string) => {
  switch (type) {
    case "ebook":
      return <BookOpen className="h-5 w-5" />;
    case "audio":
      return <Headphones className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    default:
      return <File className="h-5 w-5" />;
  }
};

const MaterialCard = ({ material, onToggleFavorite }: { material: any, onToggleFavorite: (id: string) => void }) => {
  const icon = getMaterialIcon(material.type);
  
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className={`h-24 flex items-center justify-center ${material.thumbnailColor}`}>
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full">
            {icon}
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-base line-clamp-1">{material.title}</h3>
              <p className="text-sm text-muted-foreground">{material.category} • {material.level}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onToggleFavorite(material.id)}
            >
              <Star className={`h-4 w-4 ${material.isFavorite ? "fill-primary text-primary" : ""}`} />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{material.description}</p>
          
          {material.progress > 0 && (
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span>Progress</span>
                <span>{material.progress}%</span>
              </div>
              <Progress value={material.progress} className="h-1" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="text-xs">
              {material.format}
            </Badge>
            {material.duration && (
              <Badge variant="outline" className="text-xs">
                {material.duration}
              </Badge>
            )}
            {material.pages && (
              <Badge variant="outline" className="text-xs">
                {material.pages} pages
              </Badge>
            )}
            {material.isNew && (
              <Badge className="text-xs bg-primary">
                New
              </Badge>
            )}
          </div>
        </CardContent>
      </div>
      
      <CardFooter className="border-t p-3 gap-2 flex-wrap">
        {material.type === "ebook" && (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="mr-1 h-3 w-3" /> Read
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="mr-1 h-3 w-3" /> Download
            </Button>
          </>
        )}
        
        {material.type === "audio" && (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              <Play className="mr-1 h-3 w-3" /> Play
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="mr-1 h-3 w-3" /> Download
            </Button>
          </>
        )}
        
        {material.type === "video" && (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              <Play className="mr-1 h-3 w-3" /> Watch
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="mr-1 h-3 w-3" /> Download
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

const StudentMaterials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedTab, setSelectedTab] = useState("all");
  const [materials, setMaterials] = useState(mockMaterials);
  
  const toggleFavorite = (id: string) => {
    setMaterials(prevMaterials => 
      prevMaterials.map(material => 
        material.id === id 
          ? { ...material, isFavorite: !material.isFavorite } 
          : material
      )
    );
  };
  
  // Filter materials based on search query, category, level, type, and tab
  const filterMaterials = () => {
    let filtered = [...materials];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        material => 
          material.title.toLowerCase().includes(query) || 
          material.description.toLowerCase().includes(query) ||
          material.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(material => material.category === selectedCategory);
    }
    
    // Apply level filter
    if (selectedLevel !== "All Levels") {
      filtered = filtered.filter(material => material.level === selectedLevel);
    }
    
    // Apply type filter
    if (selectedType !== "All Types") {
      filtered = filtered.filter(material => material.type === selectedType);
    }
    
    // Apply tab filter
    if (selectedTab === "favorites") {
      filtered = filtered.filter(material => material.isFavorite);
    } else if (selectedTab === "recent") {
      // Sort by date and get most recent
      filtered = [...filtered].sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()).slice(0, 5);
    } else if (selectedTab === "inprogress") {
      filtered = filtered.filter(material => material.progress > 0 && material.progress < 100);
    } else if (selectedTab === "new") {
      filtered = filtered.filter(material => material.isNew);
    }
    
    return filtered;
  };
  
  const filteredMaterials = filterMaterials();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold">Learning Materials</h2>
            <p className="text-muted-foreground">Access all your learning resources in one place</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Request Materials
            </Button>
          </div>
        </div>
        
        {/* Quick Stats Cards */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">{materials.filter(m => m.type === "ebook").length}</p>
              <p className="text-sm text-muted-foreground">E-Books</p>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Headphones className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">{materials.filter(m => m.type === "audio").length}</p>
              <p className="text-sm text-muted-foreground">Audio Files</p>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Video className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">{materials.filter(m => m.type === "video").length}</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Check className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">{materials.filter(m => m.progress === 100).length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </Card>
        </div>
        
        {/* Recently Added Featured Content */}
        {materials.filter(m => m.isNew).length > 0 && (
          <Card className="border-primary/20 overflow-hidden">
            <div className="sm:flex">
              <div className={`sm:w-1/3 h-32 sm:h-auto flex items-center justify-center ${materials.find(m => m.isNew)?.thumbnailColor || 'bg-blue-100'}`}>
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full">
                  <BookMarked className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div className="p-6 sm:w-2/3">
                <Badge className="mb-3">New Material</Badge>
                <h3 className="text-xl font-semibold mb-2">{materials.find(m => m.isNew)?.title}</h3>
                <p className="text-muted-foreground mb-4">{materials.find(m => m.isNew)?.description}</p>
                <div className="flex gap-3">
                  <Button>
                    <Eye className="mr-2 h-4 w-4" /> View Now
                  </Button>
                  <Button variant="outline">
                    <Bookmark className="mr-2 h-4 w-4" /> Save for Later
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search materials..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select 
              className="border rounded-md px-2 py-2 bg-transparent text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select 
              className="border rounded-md px-2 py-2 bg-transparent text-sm"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            
            <select 
              className="border rounded-md px-2 py-2 bg-transparent text-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Materials List with Tabs */}
        <Tabs defaultValue="all" onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="inprogress">In Progress</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredMaterials.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMaterials.map(material => (
                  <MaterialCard 
                    key={material.id} 
                    material={material} 
                    onToggleFavorite={toggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No materials found matching your criteria.</p>
                <Button className="mt-4">Request New Materials</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            {filteredMaterials.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMaterials.map(material => (
                  <MaterialCard 
                    key={material.id} 
                    material={material} 
                    onToggleFavorite={toggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">You haven't added any favorites yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Click the star icon on any material to add it to your favorites.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            {filteredMaterials.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMaterials.map(material => (
                  <MaterialCard 
                    key={material.id} 
                    material={material} 
                    onToggleFavorite={toggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No recently added materials found.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="inprogress" className="mt-0">
            {filteredMaterials.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMaterials.map(material => (
                  <MaterialCard 
                    key={material.id} 
                    material={material} 
                    onToggleFavorite={toggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">You don't have any materials in progress.</p>
                <Button className="mt-4">
                  <Eye className="mr-2 h-4 w-4" /> Start Learning
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            {filteredMaterials.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMaterials.map(material => (
                  <MaterialCard 
                    key={material.id} 
                    material={material} 
                    onToggleFavorite={toggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No new materials available.</p>
                <Button className="mt-4">Request New Materials</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentMaterials;
