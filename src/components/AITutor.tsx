
import { useRef } from 'react';
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
  MessageCircle,
  User,
  Bot,
  X,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Clock,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import QuickQuestions from "./QuickQuestions";
import { useAITutorContext } from "../contexts/AITutorContext";
import type { Message } from "../hooks/useAITutorState";

const AITutor = () => {
  const {
    messages,
    addMessage,
    inputMessage,
    setInputMessage,
    isRecording,
    setIsRecording,
    selectedImage,
    setSelectedImage,
    isLoading,
    setIsLoading
  } = useAITutorContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Updated API Configuration
  const API_BASE_URL = 'http://localhost:5000';
  const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat/ask`;

  const recentTopics = [
    { topic: "Thermodynamics", subject: "Physics", time: "2 hours ago" },
    { topic: "Organic Reactions", subject: "Chemistry", time: "Yesterday" },
    { topic: "Cell Division", subject: "Biology", time: "2 days ago" },
    { topic: "Wave Optics", subject: "Physics", time: "3 days ago" },
  ];

  const callAITutorAPI = async (question: string): Promise<string> => {
    console.log('=== API Call Debug Info ===');
    console.log('Question:', question);
    console.log('API Endpoint:', CHAT_ENDPOINT);
    console.log('Request method: POST');
    console.log('Content-Type: application/json');
    
    try {
      // First, let's try to check if the server is running
      console.log('Checking server connectivity...');
      
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          question: question
        })
      });

      console.log('Response received:');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorText = await response.text();
          console.log('Error response body:', errorText);
          
          // Try to parse as JSON if possible
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.error || errorMessage;
          } catch {
            errorMessage = errorText || errorMessage;
          }
        } catch (textError) {
          console.log('Could not read error response body:', textError);
        }
        
        if (response.status === 404) {
          throw new Error('API endpoint not found. Please check if the Flask server is running and the route is correctly registered.');
        } else if (response.status === 500) {
          throw new Error(`Server error: ${errorMessage}`);
        } else if (response.status === 400) {
          throw new Error(`Bad request: ${errorMessage}`);
        } else {
          throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log('Success response data:', data);
      
      if (data.error) {
        throw new Error(`API Error: ${data.error}`);
      }

      return data.answer || "I received your question but couldn't generate a response. Please try again.";
      
    } catch (error) {
      console.error('=== API Error Details ===');
      console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Full error:', error);
      
      if (error instanceof TypeError) {
        if (error.message.includes('fetch')) {
          throw new Error(`Network Error: Cannot connect to Flask server at ${API_BASE_URL}. Please ensure:
1. Flask server is running on port 5000
2. CORS is properly configured
3. The /chat/ask endpoint is registered
4. No firewall is blocking the connection`);
        }
      }
      
      // Re-throw the error to be handled by the calling function
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;

    let questionText = inputMessage.trim();
    
    // If there's an image, add context about it
    if (selectedImage) {
      questionText = `${questionText} [Image uploaded: ${selectedImage.name}]`;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      type: selectedImage ? 'image' : 'text'
    };

    addMessage(userMessage);
    setInputMessage('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      console.log('Sending message to AI Tutor:', questionText);
      
      const aiResponse = await callAITutorAPI(questionText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'solution'
      };
      
      addMessage(aiMessage);
      toast.success("AI Tutor responded successfully!");
      
    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      let errorMessage = "I'm having trouble connecting to the server right now. ";
      
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += "An unknown error occurred. Please try again.";
      }
      
      const aiErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        sender: 'ai',
        timestamp: new Date(),
        type: 'error'
      };
      
      addMessage(aiErrorMessage);
      toast.error("Failed to get AI response. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'solution':
        return <Brain className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bot className="w-4 h-4 text-white" />;
    }
  };

  const getMessageBgColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'solution':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-100';
    }
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
                    getMessageIcon(message.type || 'text')
                  )}
                </div>
                
                <div className={`p-3 rounded-2xl border ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : getMessageBgColor(message.type || 'text')
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
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                disabled={isLoading}
              />
              <div className="absolute right-2 top-2 flex items-center space-x-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1 hover:bg-gray-100 rounded"
                  disabled={isLoading}
                >
                  <Paperclip className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={toggleRecording}
                  className={`p-1 rounded ${isRecording ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-500'}`}
                  disabled={isLoading}
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
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
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
        {/* Enhanced Quick Questions */}
        <QuickQuestions 
          onQuestionSelect={handleQuickQuestion}
          isLoading={isLoading}
        />

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
