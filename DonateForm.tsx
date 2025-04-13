
import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface DonateFormProps {
  onSuccess?: () => void;
}

const DonateForm: React.FC<DonateFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    unit: 'kg',
    quality: '5',
    expiryTime: '6-hours',
    address: '',
    contactInfo: ''
  });
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('food-', '')]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError('Image too large. Please select an image under 5MB.');
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        setImageError('Please select a valid image file.');
        return;
      }
      
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      
      // In a real app with AI image recognition, you would upload the image to a server here
      // Simulate AI image processing
      setTimeout(() => {
        toast({
          title: "Image processed",
          description: "Your food image has been analyzed successfully.",
        });
      }, 1000);
    }
  };
  
  const handleTakePhoto = () => {
    // Create an input element for capturing photos directly
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // This triggers the camera on mobile devices
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
        
        // Simulate AI processing
        setTimeout(() => {
          toast({
            title: "Image processed",
            description: "Your food image has been analyzed by AI.",
          });
        }, 1000);
      }
    };
    
    input.click();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      setImageError('Please upload a food image');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with a delay to mimic network request
    setTimeout(() => {
      toast({
        title: "Donation listing created!",
        description: "Your food donation has been listed successfully.",
      });
      
      // Reset form or navigate as needed
      setIsSubmitting(false);
      setImageUrl(null);
      setFormData({
        title: '',
        description: '',
        quantity: '',
        unit: 'kg',
        quality: '5',
        expiryTime: '6-hours',
        address: '',
        contactInfo: ''
      });
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="food-image">Food Image</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {imageUrl ? (
            <div className="relative">
              <img 
                src={imageUrl} 
                alt="Food" 
                className="mx-auto max-h-64 rounded-lg"
              />
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => setImageUrl(null)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="py-8">
              <Camera size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">Take a photo or upload an image of the food</p>
              <div className="flex justify-center gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleTakePhoto}
                >
                  <Camera size={16} />
                  <span>Take Photo</span>
                </Button>
                
                <label htmlFor="food-image-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 bg-mm-green-50 text-mm-green-600 px-4 py-2 rounded-md hover:bg-mm-green-100 transition-colors">
                    <Upload size={16} />
                    <span>Upload Image</span>
                  </div>
                  <input
                    id="food-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          )}
          {imageError && <p className="text-red-500 text-sm mt-2">{imageError}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="food-title">Food Title</Label>
        <Input 
          id="food-title" 
          placeholder="e.g., Fresh Vegetables, Cooked Pasta" 
          value={formData.title}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="food-description">Description</Label>
        <Textarea 
          id="food-description" 
          placeholder="Describe the food items, how they were stored, when they were prepared, etc."
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="food-quantity">Quantity</Label>
          <div className="flex gap-2">
            <Input 
              id="food-quantity" 
              type="number" 
              min="1" 
              placeholder="Amount" 
              value={formData.quantity}
              onChange={handleChange}
              required 
            />
            <Select 
              value={formData.unit} 
              onValueChange={(value) => handleSelectChange('unit', value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="servings">Servings</SelectItem>
                <SelectItem value="items">Items</SelectItem>
                <SelectItem value="boxes">Boxes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="food-quality">Food Quality (1-5)</Label>
          <Select 
            value={formData.quality} 
            onValueChange={(value) => handleSelectChange('quality', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 - Excellent (Fresh)</SelectItem>
              <SelectItem value="4">4 - Very Good</SelectItem>
              <SelectItem value="3">3 - Good</SelectItem>
              <SelectItem value="2">2 - Acceptable</SelectItem>
              <SelectItem value="1">1 - Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expiry-time">Best Consumed Within</Label>
        <Select 
          value={formData.expiryTime} 
          onValueChange={(value) => handleSelectChange('expiryTime', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2-hours">2 Hours</SelectItem>
            <SelectItem value="6-hours">6 Hours</SelectItem>
            <SelectItem value="12-hours">12 Hours</SelectItem>
            <SelectItem value="24-hours">24 Hours</SelectItem>
            <SelectItem value="48-hours">2 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="food-address">Pickup Address</Label>
        <Textarea 
          id="food-address" 
          placeholder="Enter the address where the food can be picked up"
          value={formData.address}
          onChange={handleChange}
          rows={2}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="food-contactInfo">Contact Information</Label>
        <Input 
          id="food-contactInfo" 
          placeholder="Phone number or email" 
          value={formData.contactInfo}
          onChange={handleChange}
          required 
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-mm-green-600 hover:bg-mm-green-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Create Donation Listing"}
      </Button>
    </form>
  );
};

export default DonateForm;
