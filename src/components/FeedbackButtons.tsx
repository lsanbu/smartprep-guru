
import { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Flag,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { useEnhancedAITutorChat } from '@/hooks/useEnhancedAITutorChat';
import FeedbackModal from './FeedbackModal';

interface FeedbackButtonsProps {
  messageId: string;
  messageContent: string;
  onFeedbackSubmit?: (feedback: 'helpful' | 'not_helpful' | 'reported') => void;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ 
  messageId, 
  messageContent, 
  onFeedbackSubmit 
}) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'helpful' | 'not_helpful' | 'report' | null>(null);
  const { submitFeedback } = useEnhancedAITutorChat();

  const handleFeedbackClick = (type: 'helpful' | 'not_helpful' | 'report') => {
    if (feedback) return; // Already submitted feedback
    
    setModalType(type);
    setModalOpen(true);
  };

  const handleFeedbackSubmit = async (feedbackData: any) => {
    const success = await submitFeedback(messageId, feedbackData.type, feedbackData.details);
    if (success) {
      setFeedback(feedbackData.type);
      onFeedbackSubmit?.(feedbackData.type);
      setModalOpen(false);
      
      // Store detailed feedback data locally or send to analytics
      console.log('Detailed feedback submitted:', feedbackData);
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageContent);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy message");
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2 text-xs opacity-70 hover:opacity-100 transition-opacity">
        <button 
          onClick={copyMessage}
          className="hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50"
          title="Copy message"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </button>
        
        <button 
          onClick={() => handleFeedbackClick('helpful')}
          className={`hover:text-green-600 transition-colors p-1 rounded hover:bg-green-50 ${
            feedback === 'helpful' ? 'text-green-600 bg-green-50' : ''
          }`}
          title="This was helpful"
          disabled={!!feedback}
        >
          <ThumbsUp className="w-3 h-3" />
        </button>
        
        <button 
          onClick={() => handleFeedbackClick('not_helpful')}
          className={`hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50 ${
            feedback === 'not_helpful' ? 'text-red-600 bg-red-50' : ''
          }`}
          title="This was not helpful"
          disabled={!!feedback}
        >
          <ThumbsDown className="w-3 h-3" />
        </button>
        
        <button 
          onClick={() => handleFeedbackClick('report')}
          className={`hover:text-orange-600 transition-colors p-1 rounded hover:bg-orange-50 ${
            feedback === 'reported' ? 'text-orange-600 bg-orange-50' : ''
          }`}
          title="Report as incorrect"
          disabled={!!feedback}
        >
          <Flag className="w-3 h-3" />
        </button>
        
        {feedback && (
          <div className="flex items-center space-x-1 ml-2 px-2 py-1 bg-gray-100 rounded-full">
            {feedback === 'helpful' && (
              <>
                <Check className="w-3 h-3 text-green-600" />
                <span className="text-green-600 font-medium">Helpful</span>
              </>
            )}
            {feedback === 'not_helpful' && (
              <>
                <ThumbsDown className="w-3 h-3 text-red-600" />
                <span className="text-red-600 font-medium">Not helpful</span>
              </>
            )}
            {feedback === 'reported' && (
              <>
                <Flag className="w-3 h-3 text-orange-600" />
                <span className="text-orange-600 font-medium">Reported</span>
              </>
            )}
          </div>
        )}
      </div>

      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        messageId={messageId}
        messageContent={messageContent}
        feedbackType={modalType}
        onSubmit={handleFeedbackSubmit}
      />
    </>
  );
};

export default FeedbackButtons;
