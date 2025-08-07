
export interface SyllabusTopic {
  id: string;
  class: "11" | "12";
  unit: string;
  chapters: {
    id: string;
    title: string;
    ncert_ref: string[];
    topics: string[];
  }[];
}

export interface ChatResponse {
  answer: string;
  confidence: number;
  syllabus_ref: {
    chapter: string;
    topic: string;
    ncert_page?: string;
  };
  sources: string[];
  language?: 'en' | 'ta';
}

export interface EnhancedChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  language: 'en' | 'ta';
  image?: string;
  syllabus_context?: {
    class: "11" | "12";
    chapter: string;
    topic: string;
  };
  confidence_score?: number;
  sources?: string[];
  feedback?: 'helpful' | 'not_helpful' | 'reported';
  type?: 'text' | 'image' | 'solution' | 'error';
}

export interface SyllabusContext {
  current_class: "11" | "12";
  selected_chapter?: string;
  active_topic?: string;
  breadcrumb: string[];
}
