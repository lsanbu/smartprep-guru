
import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  image?: string;
  type?: 'text' | 'image' | 'solution' | 'error';
}

const useAITutorState = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm XmPrepNEETGuru, your personal AI tutor. I'm here to help you with any NEET-related doubts. You can ask me questions in text or upload images of problems you're stuck on. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const updateMessages = useCallback((updater: (prev: Message[]) => Message[]) => {
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
    setIsLoading
  };
};

export default useAITutorState;
