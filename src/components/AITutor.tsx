
import { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  AlertTriangle,
  Target,
  BookOpen,
  Languages
} from "lucide-react";
import { toast } from "sonner";
import QuickQuestions from "./QuickQuestions";
import QuestionGenerator from "./QuestionGenerator";
import SyllabusNavigation from "./SyllabusNavigation";
import FeedbackButtons from "./FeedbackButtons";
import { useEnhancedAITutorContext } from "../contexts/EnhancedAITutorContext";
import { useEnhancedAITutorChat } from "../hooks/useEnhancedAITutorChat";
import type { EnhancedChatMessage } from "../types/syllabus";

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
    setIsLoading,
    syllabusContext,
    setSyllabusContext,
    language,
    setLanguage
  } = useEnhancedAITutorContext();

  const { askQuestion, submitFeedback } = useEnhancedAITutorChat();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("chat");

  const recentTopics = [
    { topic: "Thermodynamics", subject: "Physics", time: "2 hours ago" },
    { topic: "Organic Reactions", subject: "Chemistry", time: "Yesterday" },
    { topic: "Cell Division", subject: "Biology", time: "2 days ago" },
    { topic: "Wave Optics", subject: "Physics", time: "3 days ago" },
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;

    const userMessage: EnhancedChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      language,
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      type: selectedImage ? 'image' : 'text',
      syllabus_context: syllabusContext.selected_chapter ? {
        class: syllabusContext.current_class,
        chapter: syllabusContext.selected_chapter,
        topic: syllabusContext.active_topic || ''
      } : undefined
    };

    addMessage(userMessage);
    setInputMessage('');
    const imageToSend = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await askQuestion(inputMessage, {
        language,
        syllabus_context: syllabusContext.selected_chapter ? {
          class: syllabusContext.current_class,
          chapter: syllabusContext.selected_chapter,
          topic: syllabusContext.active_topic
        } : undefined,
        image: imageToSend
      });

      if (response.success && response.data) {
        const aiMessage: EnhancedChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response.data.answer,
          sender: 'ai',
          timestamp: new Date(),
          language: response.data.language || language,
          confidence_score: response.data.confidence,
          sources: response.data.sources,
          syllabus_context: response.data.syllabus_ref ? {
            class: syllabusContext.current_class,
            chapter: response.data.syllabus_ref.chapter,
            topic: response.data.syllabus_ref.topic
          } : undefined,
          type: 'solution'
        };
        
        addMessage(aiMessage);
        toast.success("AI Tutor responded successfully!");
      } else {
        const aiErrorMessage: EnhancedChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response.error || "I'm having trouble connecting to the server right now. Please try again later.",
          sender: 'ai',
          timestamp: new Date(),
          language,
          type: 'error'
        };
        
        addMessage(aiErrorMessage);
        toast.error("Failed to get AI response");
      }
      
    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      const aiErrorMessage: EnhancedChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting to the server right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
        language,
        type: 'error'
      };
      
      addMessage(aiErrorMessage);
      toast.error("Failed to get AI response");
    } finally {
      setIsLoading(false);
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToChat = (message: string, type: 'question' | 'result') => {
    const chatMessage: EnhancedChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'ai',
      timestamp: new Date(),
      language,
      type: type === 'question' ? 'text' : 'solution'
    };
    addMessage(chatMessage);
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

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ta' : 'en';
    setLanguage(newLanguage);
    toast.success(`Language switched to ${newLanguage === 'en' ? 'English' : 'Tamil'}`);
  };

  return (
    <div className="h-[calc(100vh-200px)] flex space-x-6">
      {/* Syllabus Navigation Sidebar */}
      <div className="w-80">
        <SyllabusNavigation 
          onTopicSelect={setSyllabusContext}
          currentContext={syllabusContext}
        />
      </div>

      {/* Main Content Area with Tabs */}
      <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        {/* Header with Tabs */}
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-600 to-green-500 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">XmPrepNEETGuru</h3>
                <p className="text-sm opacity-90">Your Enhanced AI NEET Tutor</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-white hover:bg-white/20"
              >
                <Languages className="w-4 h-4 mr-2" />
                {language === 'en' ? 'EN' : 'தமிழ்'}
              </Button>
              <Badge className="bg-green-500 text-white">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>

          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="bg-white/20 border-0">
              <TabsTrigger value="chat" className="data-[state=active]:bg-white/30 data-[state=active]:text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="practice" className="data-[state=active]:bg-white/30 data-[state=active]:text-white">
                <Target className="w-4 h-4 mr-2" />
                Practice
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
            {/* Chat Messages */}
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
                      
                      {/* Confidence and Sources */}
                      {message.sender === 'ai' && message.confidence_score && (
                        <div className="mt-2 text-xs opacity-70">
                          <div className="flex items-center space-x-2">
                            <span>Confidence: {Math.round(message.confidence_score * 100)}%</span>
                            {message.sources && message.sources.length > 0 && (
                              <span>• Sources: {message.sources.length}</span>
                            )}
                          </div>
                        </div>
                      )}
                      
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
                            <FeedbackButtons 
                              messageId={message.id}
                              onFeedback={(feedback, details) => submitFeedback(message.id, feedback, details)}
                            />
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

            {/* Chat Input Area */}
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
                    placeholder={language === 'en' ? "Ask your NEET doubt here..." : "உங்கள் NEET சந்தேகத்தை இங்கே கேளுங்கள்..."}
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
          </TabsContent>

          <TabsContent value="practice" className="flex-1 flex flex-col mt-0 p-4">
            <QuestionGenerator />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-4">
        {activeTab === "chat" && (
          <>
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
          </>
        )}

        {activeTab === "practice" && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-600">
                <BookOpen className="w-5 h-5" />
                <span>Practice Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <span>Choose your preferred subject and class level</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <span>MCQs provide instant feedback with explanations</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <span>Explanation questions test your detailed understanding</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span>All questions are generated dynamically for fresh practice</span>
              </div>
            </CardContent>
          </Card>
        )}

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
              <div className="flex justify-between">
                <span className="opacity-90">Language</span>
                <span className="font-bold">{language === 'en' ? 'English' : 'Tamil'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITutor;
