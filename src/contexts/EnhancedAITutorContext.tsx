
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { EnhancedChatMessage, SyllabusContext } from '@/types/syllabus';
import { useEnhancedAITutorState } from '../hooks/useEnhancedAITutorState';

interface EnhancedAITutorContextType {
  messages: EnhancedChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<EnhancedChatMessage[]>>;
  addMessage: (message: EnhancedChatMessage) => void;
  updateMessages: (updater: (prev: EnhancedChatMessage[]) => EnhancedChatMessage[]) => void;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  syllabusContext: SyllabusContext;
  setSyllabusContext: React.Dispatch<React.SetStateAction<SyllabusContext>>;
  language: 'en' | 'ta';
  setLanguage: React.Dispatch<React.SetStateAction<'en' | 'ta'>>;
}

const EnhancedAITutorContext = createContext<EnhancedAITutorContextType | undefined>(undefined);

export const useEnhancedAITutorContext = () => {
  const context = useContext(EnhancedAITutorContext);
  if (!context) {
    throw new Error('useEnhancedAITutorContext must be used within an EnhancedAITutorProvider');
  }
  return context;
};

interface EnhancedAITutorProviderProps {
  children: ReactNode;
}

export const EnhancedAITutorProvider: React.FC<EnhancedAITutorProviderProps> = ({ children }) => {
  const aiTutorState = useEnhancedAITutorState();

  return (
    <EnhancedAITutorContext.Provider value={aiTutorState}>
      {children}
    </EnhancedAITutorContext.Provider>
  );
};
