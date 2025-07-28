
import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Send, 
  Image, 
  Paperclip, 
  Mic, 
  MicOff, 
  Zap, 
  MessageCircle,
  User,
  Bot,
  Camera,
  Upload,
  X,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Clock,
  BookOpen,
  Lightbulb,
  Target,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  image?: string;
  type?: 'text' | 'image' | 'solution';
}

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi Arjun! I'm XmPrepNEETGuru, your personal AI tutor. I'm here to help you with any NEET-related doubts. You can ask me questions in text or upload images of problems you're stuck on. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { text: "Explain photosynthesis mechanism", subject: "Biology", icon: BookOpen },
    { text: "Solve this organic chemistry reaction", subject: "Chemistry", icon: Lightbulb },
    { text: "Help with projectile motion", subject: "Physics", icon: Target },
    { text: "Practice stoichiometry problems", subject: "Chemistry", icon: TrendingUp },
  ];

  const recentTopics = [
    { topic: "Thermodynamics", subject: "Physics", time: "2 hours ago" },
    { topic: "Organic Reactions", subject: "Chemistry", time: "Yesterday" },
    { topic: "Cell Division", subject: "Biology", time: "2 days ago" },
    { topic: "Wave Optics", subject: "Physics", time: "3 days ago" },
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      type: selectedImage ? 'image' : 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setSelectedImage(null);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(userMessage.content, !!selectedImage),
        sender: 'ai',
        timestamp: new Date(),
        type: 'solution'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      toast.success("AI Tutor responded!");
    }, 1500);

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = (question: string, hasImage: boolean): string => {
    if (hasImage) {
      return "I can see the problem in your image! Let me break down the solution step by step:\n\n1. First, identify the given parameters\n2. Apply the relevant formula or concept\n3. Solve systematically\n4. Verify the answer\n\nThis appears to be related to [specific topic]. Here's the detailed explanation...\n\n💡 **Quick Tip**: Always double-check your units in physics problems!";
    } else {
      return `Great question about "${question}"! Let me explain this concept clearly:\n\n**Key Points:**\n• Fundamental principle explanation\n• Step-by-step approach\n• Common mistakes to avoid\n\n**Example:** Here's a similar problem to help you understand better...\n\n🎯 **Remember**: This concept often appears in NEET questions, so make sure you understand the underlying theory!`;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large. Please upload an image under 5MB.");
        return;
      }
      setSelectedImage(file);
      toast.success("Image selected! Add your question and send.");
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast.info(isRecording ? "Stopped recording" : "Started recording");
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-[calc(100vh-200px)] flex space-x-6">
      {/* Chat Interface */}
      <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-600 to-green-500 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">XmPrepNEETGuru</h3>
              <p className="text-sm opacity-90">Your AI NEET Tutor - Always Online</p>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <Badge className="bg-green-500 text-white">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-purple-600' 
                    : 'bg-gradient-to-r from-purple-600 to-green-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className={`p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {message.image && (
                    <img 
                      src={message.image} 
                      alt="Uploaded" 
                      className="max-w-xs rounded-lg mb-2"
                    />
                  )}
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  
                  {/* Message actions */}
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => copyMessage(message.content)}
                          className="hover:opacity-100 transition-opacity"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button className="hover:opacity-100 transition-opacity">
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button className="hover:opacity-100 transition-opacity">
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-green-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">XmPrepNEETGuru is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100">
          {selectedImage && (
            <div className="mb-3 p-3 bg-purple-50 rounded-lg flex items-center space-x-3">
              <Image className="w-5 h-5 text-purple-600" />
              <span className="flex-1 text-sm text-purple-700">{selectedImage.name}</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-purple-600 hover:text-purple-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask your NEET doubt here..."
                className="pr-20 border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <div className="absolute right-2 top-2 flex items-center space-x-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Paperclip className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={toggleRecording}
                  className={`p-1 rounded ${isRecording ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || (!inputMessage.trim() && !selectedImage)}
              className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 space-y-4">
        {/* Quick Questions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-600">
              <Zap className="w-5 h-5" />
              <span>Quick Questions</span>
            </CardTitle>
            <CardDescription>Popular NEET topics to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question.text)}
                  className="w-full p-3 text-left bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <question.icon className="w-4 h-4 text-purple-600" />
                    <Badge variant="outline" className="text-xs">
                      {question.subject}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-700">{question.text}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Topics */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <Clock className="w-5 h-5" />
              <span>Recent Topics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm text-gray-800">{topic.topic}</div>
                    <div className="text-xs text-gray-500">{topic.subject}</div>
                  </div>
                  <div className="text-xs text-gray-400">{topic.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Stats */}
        <Card className="bg-gradient-to-br from-purple-600 to-green-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Your AI Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-90">Doubts Cleared</span>
                <span className="font-bold">247</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Study Streak</span>
                <span className="font-bold">15 days</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">AI Accuracy</span>
                <span className="font-bold">96.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITutor;
