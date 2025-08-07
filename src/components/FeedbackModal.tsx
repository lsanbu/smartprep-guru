
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Flag,
  AlertTriangle,
  MessageSquare,
  Star
} from "lucide-react";
import { toast } from "sonner";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string;
  messageContent: string;
  feedbackType: 'helpful' | 'not_helpful' | 'report' | null;
  onSubmit: (feedback: any) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  messageId,
  messageContent,
  feedbackType,
  onSubmit
}) => {
  const [rating, setRating] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const helpfulCategories = [
    { id: 'accurate', label: 'Accurate information', icon: '✓' },
    { id: 'clear', label: 'Clear explanation', icon: '💡' },
    { id: 'comprehensive', label: 'Comprehensive answer', icon: '📚' },
    { id: 'relevant', label: 'Relevant to my question', icon: '🎯' }
  ];

  const notHelpfulCategories = [
    { id: 'incorrect', label: 'Incorrect information', icon: '❌' },
    { id: 'unclear', label: 'Unclear explanation', icon: '❓' },
    { id: 'incomplete', label: 'Incomplete answer', icon: '⚠️' },
    { id: 'irrelevant', label: 'Not relevant to my question', icon: '🔄' }
  ];

  const reportCategories = [
    { id: 'misinformation', label: 'Misinformation/Wrong facts', icon: '🚫' },
    { id: 'inappropriate', label: 'Inappropriate content', icon: '⚠️' },
    { id: 'spam', label: 'Spam or irrelevant', icon: '🗑️' },
    { id: 'bias', label: 'Biased or unfair content', icon: '⚖️' },
    { id: 'other', label: 'Other issue', icon: '❓' }
  ];

  const getCurrentCategories = () => {
    switch (feedbackType) {
      case 'helpful':
        return helpfulCategories;
      case 'not_helpful':
        return notHelpfulCategories;
      case 'report':
        return reportCategories;
      default:
        return [];
    }
  };

  const getModalTitle = () => {
    switch (feedbackType) {
      case 'helpful':
        return 'Thank you for your feedback!';
      case 'not_helpful':
        return 'Help us improve';
      case 'report':
        return 'Report an issue';
      default:
        return 'Feedback';
    }
  };

  const getModalDescription = () => {
    switch (feedbackType) {
      case 'helpful':
        return 'What made this answer helpful? Your feedback helps us improve our AI tutor.';
      case 'not_helpful':
        return 'What went wrong? Your feedback helps us provide better answers.';
      case 'report':
        return 'Please let us know what issue you found so we can review and improve our content.';
      default:
        return 'Please provide your feedback';
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const feedbackData = {
      messageId,
      type: feedbackType,
      rating,
      category,
      details,
      timestamp: new Date().toISOString()
    };

    try {
      await onSubmit(feedbackData);
      toast.success('Thank you for your feedback!');
      onClose();
      
      // Reset form
      setRating('');
      setCategory('');
      setDetails('');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {feedbackType === 'helpful' && <ThumbsUp className="w-5 h-5 text-green-600" />}
            {feedbackType === 'not_helpful' && <ThumbsDown className="w-5 h-5 text-red-600" />}
            {feedbackType === 'report' && <Flag className="w-5 h-5 text-orange-600" />}
            <span>{getModalTitle()}</span>
          </DialogTitle>
          <DialogDescription>
            {getModalDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Rating Section (for helpful/not helpful) */}
          {(feedbackType === 'helpful' || feedbackType === 'not_helpful') && (
            <div className="space-y-3">
              <Label className="text-sm font-bold">Rate this response:</Label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star.toString())}
                    className={`transition-colors ${
                      parseInt(rating) >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-bold">
              {feedbackType === 'report' ? 'What\'s the issue?' : 'What applies?'}
            </Label>
            <RadioGroup value={category} onValueChange={setCategory}>
              <div className="grid grid-cols-1 gap-2">
                {getCurrentCategories().map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={cat.id} id={cat.id} />
                    <Label htmlFor={cat.id} className="flex items-center space-x-2 cursor-pointer flex-1">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm">{cat.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="details" className="text-sm font-bold">
              Additional details (optional):
            </Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={
                feedbackType === 'report' 
                  ? "Please describe the issue in detail..."
                  : "Any additional feedback you'd like to share..."
              }
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Priority Indicator for Reports */}
          {feedbackType === 'report' && category && (
            <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div className="text-sm">
                <div className="font-medium text-orange-800">
                  {category === 'misinformation' || category === 'inappropriate' ? 'High Priority' : 'Normal Priority'}
                </div>
                <div className="text-orange-600">
                  Our team will review this report within 24-48 hours.
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !category}
              className="bg-gradient-to-r from-purple-600 to-green-500"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
