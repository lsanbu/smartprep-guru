
import { useState, useCallback } from 'react';
import { EnhancedChatMessage, SyllabusContext } from '@/types/syllabus';

export const useEnhancedAITutorState = () => {
  const [messages, setMessages] = useState<EnhancedChatMessage[]>([
    {
      id: '1',
      content: "Hi! I'm XmPrepNEETGuru, your enhanced AI tutor for NEET Biology. I can help you with any Biology doubts from Class 11 and 12 NCERT syllabus. You can ask questions in English or Tamil, upload images, or browse specific chapters. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      language: 'en',
      type: 'text'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [syllabusContext, setSyllabusContext] = useState<SyllabusContext>({
    current_class: "11",
    breadcrumb: []
  });

  const addMessage = useCallback((message: EnhancedChatMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const updateMessages = useCallback((updater: (prev: EnhancedChatMessage[]) => EnhancedChatMessage[]) => {
    setMessages(updater);
  }, []);

  return {
    messages,
    setMessages,
    addMessage,
    updateMessages,
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
  };
};
