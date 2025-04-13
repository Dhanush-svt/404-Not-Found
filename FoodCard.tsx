
import React from 'react';
import { Clock, MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface FoodItem {
  id: string;
  title: string;
  description: string;
  image: string;
  donor: {
    name: string;
    type: string;
  };
  location: string;
  distance: string;
  expiresIn: string;
  quantity: string;
  quality: number;
}

interface FoodCardProps {
  item: FoodItem;
  isReceiver?: boolean;
  onAction?: (item: FoodItem) => void;
  actionText?: string;
}

const FoodCard: React.FC<FoodCardProps> = ({ 
  item, 
  isReceiver = false, 
  onAction,
  actionText = isReceiver ? "Request" : "Edit" 
}) => {
  return (
    <Card className="overflow-hidden food-card">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <Clock size={12} className="mr-1 text-mm-orange-500" />
          {item.expiresIn}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{item.title}</h3>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < item.quality ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-1">
          <span className="font-medium mr-1">From:</span> {item.donor.name} ({item.donor.type})
        </div>
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            {item.distance} away
          </div>
          <div>Qty: {item.quantity}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onAction && onAction(item)} 
          className={isReceiver ? "w-full bg-mm-green-600 hover:bg-mm-green-700" : "w-full"}
          variant={isReceiver ? "default" : "outline"}
        >
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
