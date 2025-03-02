import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Send, 
  MoreHorizontal, 
  Plus,
  ChevronRight,
  File,
  Image,
  Paperclip,
  Clock,
  Check,
  Star,
  UserCircle,
  Users,
  Trash,
  Archive,
  Bell,
  BellOff,
  Filter,
  CalendarDays
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

// Mock data for messages
const teachers = [
  {
    id: "1",
    name: "Mrs. Johnson",
    avatar: "/avatars/teacher1.jpg",
    subject: "Conversation Practice",
    status: "online",
    lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    name: "Mr. Davis",
    avatar: "/avatars/teacher2.jpg",
    subject: "Grammar",
    status: "offline",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: "3",
    name: "Ms. Anderson",
    avatar: "/avatars/teacher3.jpg",
    subject: "Vocabulary",
    status: "online",
    lastActive: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
  },
  {
    id: "4",
    name: "Mr. Wilson",
    avatar: "/avatars/teacher4.jpg",
    subject: "Reading Comprehension",
    status: "offline",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "5", 
    name: "Mrs. Taylor",
    avatar: "/avatars/teacher5.jpg",
    subject: "Writing",
    status: "online",
    lastActive: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
  }
];

const conversationThreads = [
  {
    id: "1",
    teacherId: "1",
    unreadCount: 2,
    isPinned: true,
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isGroup: false,
    messages: [
      {
        id: "m1",
        senderId: "1", // teacher
        content: "Hello! How are you progressing with your homework from our last class?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        status: "read",
        type: "text"
      },
      {
        id: "m2",
        senderId: "student1", // current student
        content: "I've completed most of it, but I'm having trouble with exercise 3.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30), // 2 days ago + 30 minutes
        status: "read",
        type: "text"
      },
      {
        id: "m3",
        senderId: "1",
        content: "Let me help you with that. Exercise 3 focuses on conditional sentences.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
        status: "read",
        type: "text"
      },
      {
        id: "m4",
        senderId: "1",
        content: "Here's an explanation sheet that might help.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1 + 1000 * 60 * 5), // 1 day ago + 5 minutes
        status: "read",
        type: "text"
      },
      {
        id: "m5",
        senderId: "1",
        content: "conditionals-explained.pdf",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1 + 1000 * 60 * 6), // 1 day ago + 6 minutes
        status: "read",
        type: "file",
        fileType: "pdf",
        fileSize: "520 KB"
      },
      {
        id: "m6",
        senderId: "student1",
        content: "Thank you! This is very helpful. I'll review it and complete the exercise.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1 + 1000 * 60 * 50), // 1 day ago + 50 minutes
        status: "read",
        type: "text"
      },
      {
        id: "m7",
        senderId: "1",
        content: "Great! Let me know if you need any more help. Don't forget we have our next class tomorrow.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        status: "read",
        type: "text"
      },
      {
        id: "m8",
        senderId: "1",
        content: "Also, I've shared some additional practice materials in the learning portal.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        status: "unread",
        type: "text"
      },
    ]
  },
  {
    id: "2",
    teacherId: "3",
    unreadCount: 0,
    isPinned: false,
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    isGroup: false,
    messages: [
      {
        id: "m9",
        senderId: "3", // teacher
        content: "Hi there! I noticed you did very well on your vocabulary quiz.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
        status: "read",
        type: "text"
      },
      {
        id: "m10",
        senderId: "student1", // current student
        content: "Thank you! I've been studying the new words every day.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
        status: "read",
        type: "text"
      },
      {
        id: "m11",
        senderId: "3",
        content: "It really shows! I've prepared some advanced vocabulary for you to challenge yourself.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        status: "read",
        type: "text"
      },
      {
        id: "m12",
        senderId: "student1",
        content: "That sounds great! I'm always looking to improve.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        status: "read",
        type: "text"
      }
    ]
  },
  {
    id: "3",
    teacherId: "5",
    unreadCount: 1,
    isPinned: false,
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
    isGroup: true,
    groupName: "Writing Workshop Group",
    participants: ["student1", "student2", "student3", "5"],
    messages: [
      {
        id: "m13",
        senderId: "5", // teacher
        content: "Hello everyone! I've created this group for our writing workshop discussions.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        status: "read",
        type: "text"
      },
      {
        id: "m14",
        senderId: "student2",
        content: "Thanks for creating this group, Mrs. Taylor!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 30), // 3 days ago + 30 minutes
        status: "read",
        type: "text"
      },
      {
        id: "m15",
        senderId: "student3",
        content: "I'm looking forward to improving my essay writing skills.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 45), // 3 days ago + 45 minutes
        status: "read",
        type: "text"
      },
      {
        id: "m16",
        senderId: "5",
        content: "Don't forget to submit your essay drafts by Friday.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: "read",
        type: "text"
      },
      {
        id: "m17",
        senderId: "5",
        content: "Here's the writing prompt and rubric for your reference.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
        status: "unread",
        type: "text"
      }
    ]
  }
];

// Helper components
const ChatMessage = ({ message, isOwn }: { message: any, isOwn: boolean }) => {
  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} mb-4`}>
      <div className={`${isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg px-4 py-2 max-w-[75%]`}>
        {message.type === 'text' ? (
          <p className="text-sm">{message.content}</p>
        ) : message.type === 'file' ? (
          <div className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span className="text-sm">{message.content}</span>
            <span className="text-xs opacity-70">{message.fileSize}</span>
          </div>
        ) : message.type === 'image' ? (
          <div className="relative">
            <img src={message.content} alt="Shared image" className="rounded w-full max-w-md" />
          </div>
        ) : null}
      </div>
      <div className="flex items-center mt-1">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </p>
        {isOwn && (
          <span className="ml-1">
            {message.status === 'sent' ? (
              <Clock className="h-3 w-3 text-muted-foreground" />
            ) : message.status === 'delivered' ? (
              <Check className="h-3 w-3 text-muted-foreground" />
            ) : (
              <Check className="h-3 w-3 text-primary" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

const ConversationItem = ({ 
  conversation, 
  isActive, 
  onClick, 
  teachers 
}: { 
  conversation: any, 
  isActive: boolean, 
  onClick: () => void, 
  teachers: any[] 
}) => {
  const teacher = teachers.find(t => t.id === conversation.teacherId);
  
  return (
    <div 
      className={`p-3 border-b cursor-pointer hover:bg-muted/50 flex gap-3 items-center ${isActive ? 'bg-muted' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={teacher?.avatar} alt={teacher?.name} />
          <AvatarFallback>{teacher?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {teacher?.status === "online" && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm truncate">
            {conversation.isGroup ? conversation.groupName : teacher?.name}
          </h4>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: false })}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground truncate">
            {conversation.messages[conversation.messages.length - 1].content.length > 30
              ? conversation.messages[conversation.messages.length - 1].content.substring(0, 30) + '...'
              : conversation.messages[conversation.messages.length - 1].content}
          </p>
          
          {conversation.unreadCount > 0 && (
            <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>
      
      {conversation.isPinned && (
        <Star className="h-3 w-3 text-primary fill-primary" />
      )}
    </div>
  );
};

const TeacherItem = ({ 
  teacher, 
  onClick 
}: { 
  teacher: any, 
  onClick: () => void
}) => {
  return (
    <div 
      className="p-3 border-b cursor-pointer hover:bg-muted/50 flex gap-3 items-center"
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={teacher.avatar} alt={teacher.name} />
          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {teacher.status === "online" && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-sm">{teacher.name}</h4>
        <div className="flex justify-between">
          <p className="text-xs text-muted-foreground">{teacher.subject}</p>
          <p className="text-xs text-muted-foreground">
            {teacher.status === "online" 
              ? "Online" 
              : `Last seen ${formatDistanceToNow(teacher.lastActive, { addSuffix: true })}`}
          </p>
        </div>
      </div>
      
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
};

const StudentMessages = () => {
  const [activeConversation, setActiveConversation] = useState(conversationThreads[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const sendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, you would send this to an API
    console.log("Sending message:", messageText);
    
    // Add message to the conversation (for demo purposes)
    const newMessage = {
      id: `new-${Date.now()}`,
      senderId: "student1", // current user
      content: messageText,
      timestamp: new Date(),
      status: "sent",
      type: "text"
    };
    
    // Update the active conversation with the new message
    setActiveConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessageTime: new Date()
    }));
    
    // Clear the input
    setMessageText("");
  };
  
  // Filter conversations based on search query
  const filteredConversations = conversationThreads.filter(conv => {
    if (!searchQuery) return true;
    
    const teacher = teachers.find(t => t.id === conv.teacherId);
    const teacherName = teacher?.name.toLowerCase() || "";
    const lastMessage = conv.messages[conv.messages.length - 1].content.toLowerCase();
    
    return teacherName.includes(searchQuery.toLowerCase()) || 
           lastMessage.includes(searchQuery.toLowerCase()) ||
           (conv.isGroup && conv.groupName.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-none p-4 border-b">
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-muted-foreground">
            Communicate with your teachers and classmates
          </p>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full sm:w-80 lg:w-96 border-r h-full flex flex-col">
            <Tabs defaultValue="chats" className="flex flex-col h-full">
              <div className="p-2 border-b">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="chats">Chats</TabsTrigger>
                  <TabsTrigger value="teachers">Teachers</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <TabsContent value="chats" className="flex-1 overflow-hidden flex flex-col m-0 outline-none">
                <div className="p-2 border-b flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {filteredConversations.length} Conversations
                  </span>
                  <Button size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" /> New Chat
                  </Button>
                </div>
                
                <ScrollArea className="flex-1">
                  {filteredConversations.map(conversation => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isActive={activeConversation.id === conversation.id}
                      onClick={() => setActiveConversation(conversation)}
                      teachers={teachers}
                    />
                  ))}
                  
                  {filteredConversations.length === 0 && (
                    <div className="p-4 text-center">
                      <p className="text-muted-foreground text-sm">No conversations found</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="teachers" className="flex-1 overflow-hidden flex flex-col m-0 outline-none">
                <div className="p-2 border-b flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {teachers.length} Teachers Available
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Filter className="h-3 w-3 mr-1" /> Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>All Teachers</DropdownMenuItem>
                      <DropdownMenuItem>Online Now</DropdownMenuItem>
                      <DropdownMenuItem>My Teachers</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <ScrollArea className="flex-1">
                  {teachers
                    .filter(teacher => 
                      !searchQuery || 
                      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(teacher => (
                      <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        onClick={() => {
                          // Find existing conversation or create new one
                          const existingConv = conversationThreads.find(c => c.teacherId === teacher.id && !c.isGroup);
                          if (existingConv) {
                            setActiveConversation(existingConv);
                          } else {
                            // In a real app, you would create a new conversation here
                            console.log("Would create a new conversation with", teacher.name);
                          }
                        }}
                      />
                    ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Chat Area */}
          <div className="hidden sm:flex flex-col flex-1 overflow-hidden">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage 
                        src={activeConversation.isGroup 
                          ? undefined 
                          : teachers.find(t => t.id === activeConversation.teacherId)?.avatar
                        } 
                        alt={activeConversation.isGroup 
                          ? activeConversation.groupName 
                          : teachers.find(t => t.id === activeConversation.teacherId)?.name
                        } 
                      />
                      <AvatarFallback>
                        {activeConversation.isGroup 
                          ? <Users className="h-4 w-4" /> 
                          : teachers.find(t => t.id === activeConversation.teacherId)?.name.charAt(0)
                        }
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-semibold">
                        {activeConversation.isGroup 
                          ? activeConversation.groupName 
                          : teachers.find(t => t.id === activeConversation.teacherId)?.name
                        }
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {activeConversation.isGroup 
                          ? `${activeConversation.participants.length} participants` 
                          : teachers.find(t => t.id === activeConversation.teacherId)?.status === "online"
                            ? "Online"
                            : `Last seen ${formatDistanceToNow(
                                teachers.find(t => t.id === activeConversation.teacherId)?.lastActive || new Date(),
                                { addSuffix: true }
                              )}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <CalendarDays className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      {activeConversation.isPinned ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" /> Archive Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" /> {activeConversation.isPinned ? "Unpin" : "Pin"} Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCircle className="h-4 w-4 mr-2" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="h-4 w-4 mr-2" /> Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  {activeConversation.messages.map(message => (
                    <ChatMessage 
                      key={message.id} 
                      message={message} 
                      isOwn={message.senderId === "student1"} 
                    />
                  ))}
                </ScrollArea>
                
                {/* Message Input */}
                <div className="p-3 border-t">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Type a message..."
                        className="min-h-[80px] resize-none pr-10"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                      />
                      <div className="absolute right-2 bottom-2 flex">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      size="icon" 
                      disabled={!messageText.trim()}
                      onClick={sendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg">Your Messages</h3>
                  <p className="text-muted-foreground mb-4">
                    Select a conversation or start a new one
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Start New Conversation
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile View Placeholder */}
          <div className="flex sm:hidden items-center justify-center flex-1">
            <div className="text-center p-4">
              <p>Please select a conversation from the sidebar to view messages.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentMessages;
