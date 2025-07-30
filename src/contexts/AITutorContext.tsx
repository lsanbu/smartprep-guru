
import React, { createContext, useContext, ReactNode } from 'react';
import useAITutorState, { Message } from '../hooks/useAITutorState';

interface AITutorContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Message) => void;
  updateMessages: (updater: (prev: Message[]) => Message[]) => void;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AITutorContext = createContext<AITutorContextType | undefined>(undefined);

export const useAITutorContext = () => {
  const context = useContext(AITutorContext);
  if (!context) {
    throw new Error('useAITutorContext must be used within an AITutorProvider');
  }
  return context;
};

interface AITutorProviderProps {
  children: ReactNode;
}

export const AITutorProvider: React.FC<AITutorProviderProps> = ({ children }) => {
  const aiTutorState = useAITutorState();

  return (
    <AITutorContext.Provider value={aiTutorState}>
      {children}
    </AITutorContext.Provider>
  );
};
