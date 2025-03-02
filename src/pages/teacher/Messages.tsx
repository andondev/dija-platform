import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Search,
  MessageSquare,
  Send,
  UserPlus,
  Users,
  Star,
  Clock,
  Filter,
  MoreVertical,
  Paperclip,
  ChevronDown,
  CheckCheck,
  Phone,
  Video,
  Info,
  Smile,
  Image,
  FileText,
  Trash,
  Archive,
  Flag
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: "teacher" | "student";
  read: boolean;
}

interface Conversation {
  id: string;
  studentName: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
  messages: Message[];
  starred: boolean;
}

const TeacherMessages = () => {
  const [selectedTab, setSelectedTab] = useState("direct");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      studentName: "John Smith",
      lastMessage: "I have a question about the homework assignment",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unreadCount: 2,
      online: true,
      starred: false,
      messages: [
        {
          id: "m1",
          content: "Hello Ms. Johnson, I hope you're doing well.",
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          sender: "student",
          read: true
        },
        {
          id: "m2",
          content: "I have a question about the homework assignment you gave us yesterday.",
          timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
          sender: "student",
          read: true
        },
        {
          id: "m3",
          content: "Hi John, I'm doing well. What question do you have about the homework?",
          timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
          sender: "teacher",
          read: true
        },
        {
          id: "m4",
          content: "For question 3, I'm not sure if we need to use the formula from chapter 4 or chapter 5.",
          timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
          sender: "student",
          read: true
        },
        {
          id: "m5",
          content: "You should use the formula from chapter 5, as it's more appropriate for this type of problem.",
          timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
          sender: "teacher",
          read: true
        },
        {
          id: "m6",
          content: "Thank you! One more thing - do we need to show all our work or just the final answer?",
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          sender: "student",
          read: false
        },
      ]
    },
    {
      id: "2",
      studentName: "Emma Wang",
      lastMessage: "Thank you for the feedback on my essay",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 0,
      online: false,
      starred: true,
      messages: [
        {
          id: "m1",
          content: "Hi Ms. Johnson, I just wanted to thank you for the detailed feedback on my essay.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          sender: "student",
          read: true
        },
        {
          id: "m2",
          content: "You're welcome, Emma! Your essay was very well-structured, and I appreciated your thoughtful analysis.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
          sender: "teacher",
          read: true
        },
        {
          id: "m3",
          content: "I'll incorporate your suggestions in my next draft. Thank you for the feedback on my essay!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          sender: "student",
          read: true
        },
      ]
    },
    {
      id: "3",
      studentName: "Carlos Mendez",
      lastMessage: "Will we have a review session before the exam?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      unreadCount: 1,
      online: true,
      starred: false,
      messages: [
        {
          id: "m1",
          content: "Hello Ms. Johnson, I was wondering if we will have a review session before the exam next week?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          sender: "student",
          read: false
        },
      ]
    },
    {
      id: "4",
      studentName: "Sarah Johnson",
      lastMessage: "I've submitted my project on the portal",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
      online: false,
      starred: false,
      messages: [
        {
          id: "m1",
          content: "Hi Ms. Johnson, I just wanted to let you know that I've submitted my project on the portal.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 hours ago
          sender: "student",
          read: true
        },
        {
          id: "m2",
          content: "Great, Sarah! I'll take a look at it soon and provide feedback.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
          sender: "teacher",
          read: true
        },
      ]
    },
    {
      id: "5",
      studentName: "Michael Brown",
      lastMessage: "Can I schedule a meeting to discuss my progress?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      unreadCount: 0,
      online: true,
      starred: true,
      messages: [
        {
          id: "m1",
          content: "Hello Ms. Johnson, I was hoping to schedule a meeting to discuss my progress in the course.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50), // 50 hours ago
          sender: "student",
          read: true
        },
        {
          id: "m2",
          content: "Hi Michael, I'd be happy to meet. How about Thursday at 3pm?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49), // 49 hours ago
          sender: "teacher",
          read: true
        },
        {
          id: "m3",
          content: "That works for me. Can I schedule a meeting to discuss my progress? Thank you!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
          sender: "student",
          read: true
        },
      ]
    },
  ]);

  // Group chat mock data
  const [groupChats, setGroupChats] = useState([
    {
      id: "g1",
      name: "Spanish 101 - Morning Class",
      members: 15,
      lastMessage: "Remember to submit your assignments by Friday",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 3,
    },
    {
      id: "g2",
      name: "Advanced Grammar Group",
      members: 8,
      lastMessage: "Here are the additional resources we discussed",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      unreadCount: 0,
    },
    {
      id: "g3",
      name: "Conversation Practice",
      members: 12,
      lastMessage: "Great session today everyone!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
    },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation) {
        const newMsg: Message = {
          id: `m${conv.messages.length + 1}`,
          content: newMessage,
          timestamp: new Date(),
          sender: "teacher",
          read: true
        };
        
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: new Date()
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage("");
  };

  const handleStarConversation = (id: string) => {
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, starred: !conv.starred } : conv
    ));
  };

  const markAsRead = (id: string) => {
    setConversations(conversations.map(conv => 
      conv.id === id ? { 
        ...conv, 
        unreadCount: 0,
        messages: conv.messages.map(msg => ({ ...msg, read: true }))
      } : conv
    ));
  };

  const filteredConversations = conversations.filter(conv => 
    conv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroupChats = groupChats.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const selectedChat = conversations.find(conv => conv.id === selectedConversation);

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Messages</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left sidebar - Conversations list */}
          <Card className="md:col-span-1 flex flex-col">
            <CardHeader className="p-4 pb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <Tabs defaultValue="direct" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
                
                <TabsContent value="direct" className="flex-1">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-1 p-2">
                      {filteredConversations.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No conversations found</p>
                      ) : (
                        filteredConversations
                          .sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime())
                          .map((conv) => (
                            <div
                              key={conv.id}
                              className={cn(
                                "flex items-center space-x-4 rounded-md p-2 cursor-pointer",
                                selectedConversation === conv.id ? "bg-muted" : "hover:bg-muted/50"
                              )}
                              onClick={() => {
                                setSelectedConversation(conv.id);
                                if (conv.unreadCount > 0) {
                                  markAsRead(conv.id);
                                }
                              }}
                            >
                              <div className="relative">
                                <Avatar>
                                  <AvatarFallback>{conv.studentName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {conv.online && (
                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium">{conv.studentName}</h4>
                                  <div className="flex items-center">
                                    {conv.starred && <Star className="h-3 w-3 text-yellow-500 mr-1" />}
                                    <span className="text-xs text-muted-foreground">
                                      {formatMessageTime(conv.lastMessageTime)}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">
                                  {conv.lastMessage}
                                </p>
                                <div className="flex items-center justify-between mt-1">
                                  <div className="flex items-center">
                                    {conv.messages.length > 0 && conv.messages[conv.messages.length - 1].sender === "teacher" && (
                                      <span className="text-xs text-muted-foreground flex items-center">
                                        <CheckCheck className="h-3 w-3 mr-1" />
                                        {conv.messages[conv.messages.length - 1].read ? "Read" : "Sent"}
                                      </span>
                                    )}
                                  </div>
                                  {conv.unreadCount > 0 && (
                                    <Badge variant="default" className="text-xs">
                                      {conv.unreadCount}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="groups" className="flex-1">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-1 p-2">
                      {filteredGroupChats.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No group chats found</p>
                      ) : (
                        filteredGroupChats
                          .sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime())
                          .map((group) => (
                            <div
                              key={group.id}
                              className="flex items-center space-x-4 rounded-md p-2 cursor-pointer hover:bg-muted/50"
                            >
                              <Avatar>
                                <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium">{group.name}</h4>
                                  <span className="text-xs text-muted-foreground">
                                    {formatMessageTime(group.lastMessageTime)}
                                  </span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{group.members} members</span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">
                                  {group.lastMessage}
                                </p>
                                {group.unreadCount > 0 && (
                                  <div className="flex justify-end mt-1">
                                    <Badge variant="default" className="text-xs">
                                      {group.unreadCount}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Right side - Chat area */}
          <Card className="md:col-span-2 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{selectedChat.studentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedChat.studentName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedChat.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleStarConversation(selectedChat.id)}>
                      <Star className={cn("h-4 w-4", selectedChat.starred ? "fill-yellow-500 text-yellow-500" : "")} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Chat messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender === "teacher" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[70%] rounded-lg p-3",
                            message.sender === "teacher"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={cn(
                              "flex items-center justify-end mt-1 text-xs",
                              message.sender === "teacher"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            {formatMessageTime(message.timestamp)}
                            {message.sender === "teacher" && (
                              <CheckCheck className={cn(
                                "h-3 w-3 ml-1",
                                message.read ? "text-blue-400" : ""
                              )} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message input */}
                <div className="p-4 border-t">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type a message..."
                        className="min-h-[80px] resize-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon">
                            <Smile className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Image className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                        <Select defaultValue="normal">
                          <SelectTrigger className="w-[130px] h-8">
                            <SelectValue placeholder="Message type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="announcement">Announcement</SelectItem>
                            <SelectItem value="reminder">Reminder</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button 
                      className="h-10 px-4" 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                <p className="text-muted-foreground mb-6">
                  Select a conversation from the list to start messaging
                </p>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Start New Conversation
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherMessages;
