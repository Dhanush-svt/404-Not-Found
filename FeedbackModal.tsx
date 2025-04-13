
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'donor' | 'receiver';
  itemTitle?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ 
  open, 
  onOpenChange, 
  type, 
  itemTitle 
}) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback helps us improve the platform."
      });
      
      setIsSubmitting(false);
      setRating(5);
      setFeedback('');
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {itemTitle && (
            <div className="pb-2 border-b">
              <p className="text-sm font-medium text-gray-500">
                {type === 'donor' ? 'Donation:' : 'Received:'} {itemTitle}
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Rate your experience</p>
            <div className="flex items-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`p-1 rounded-full ${
                    rating >= value ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star size={24} fill={rating >= value ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">What went well or could be improved?</p>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback helps us improve the platform..."
              rows={4}
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {
                setFeedback(prev => prev + " The process was smooth and efficient.");
              }}
            >
              <ThumbsUp size={16} />
              <span>Smooth Process</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {
                setFeedback(prev => prev + " There were some issues that could be improved.");
              }}
            >
              <ThumbsDown size={16} />
              <span>Had Issues</span>
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-mm-green-600 hover:bg-mm-green-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
