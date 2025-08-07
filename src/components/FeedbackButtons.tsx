
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Flag,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { useEnhancedAITutorChat } from '@/hooks/useEnhancedAITutorChat';

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
  const { submitFeedback } = useEnhancedAITutorChat();

  const handleFeedback = async (type: 'helpful' | 'not_helpful' | 'reported') => {
    const success = await submitFeedback(messageId, type);
    if (success) {
      setFeedback(type);
      onFeedbackSubmit?.(type);
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
    <div className="flex items-center space-x-2 text-xs opacity-70 hover:opacity-100 transition-opacity">
      <button 
        onClick={copyMessage}
        className="hover:text-blue-600 transition-colors"
        title="Copy message"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      </button>
      
      <button 
        onClick={() => handleFeedback('helpful')}
        className={`hover:text-green-600 transition-colors ${
          feedback === 'helpful' ? 'text-green-600' : ''
        }`}
        title="This was helpful"
        disabled={!!feedback}
      >
        <ThumbsUp className="w-3 h-3" />
      </button>
      
      <button 
        onClick={() => handleFeedback('not_helpful')}
        className={`hover:text-red-600 transition-colors ${
          feedback === 'not_helpful' ? 'text-red-600' : ''
        }`}
        title="This was not helpful"
        disabled={!!feedback}
      >
        <ThumbsDown className="w-3 h-3" />
      </button>
      
      <button 
        onClick={() => handleFeedback('reported')}
        className={`hover:text-orange-600 transition-colors ${
          feedback === 'reported' ? 'text-orange-600' : ''
        }`}
        title="Report as incorrect"
        disabled={!!feedback}
      >
        <Flag className="w-3 h-3" />
      </button>
      
      {feedback && (
        <span className="text-gray-500 ml-2">
          {feedback === 'helpful' && '✓ Helpful'}
          {feedback === 'not_helpful' && '✗ Not helpful'}
          {feedback === 'reported' && '⚠ Reported'}
        </span>
      )}
    </div>
  );
};

export default FeedbackButtons;
