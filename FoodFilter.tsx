
import React, { useState } from 'react';
import { Filter, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';

interface FilterOptions {
  distance: number;
  timeFrame: string;
  quality: number;
  types: string[];
}

interface FoodFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const FoodFilter: React.FC<FoodFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    distance: 10,
    timeFrame: 'any',
    quality: 3,
    types: [],
  });

  const foodTypes = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'meat', label: 'Meat Dishes' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'grains', label: 'Grains & Bread' },
    { id: 'fruits', label: 'Fruits & Vegetables' },
    { id: 'prepared', label: 'Prepared Meals' },
  ];

  const handleTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => {
      const newTypes = checked 
        ? [...prev.types, type]
        : prev.types.filter(t => t !== type);
      
      return { ...prev, types: newTypes };
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Available Donations</h3>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Food Donations</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Distance</Label>
                  <span className="text-sm font-medium">{filters.distance} km</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin size={16} className="text-gray-400" />
                  <Slider
                    value={[filters.distance]}
                    min={1}
                    max={50}
                    step={1}
                    onValueChange={(value) => setFilters({ ...filters, distance: value[0] })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Time Frame</Label>
                <Select 
                  value={filters.timeFrame}
                  onValueChange={(value) => setFilters({ ...filters, timeFrame: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="2-hours">Within 2 hours</SelectItem>
                    <SelectItem value="6-hours">Within 6 hours</SelectItem>
                    <SelectItem value="12-hours">Within 12 hours</SelectItem>
                    <SelectItem value="24-hours">Within 24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Minimum Quality</Label>
                  <span className="text-sm font-medium">{filters.quality}/5</span>
                </div>
                <Slider
                  value={[filters.quality]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => setFilters({ ...filters, quality: value[0] })}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Food Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {foodTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={type.id} 
                        checked={filters.types.includes(type.id)}
                        onCheckedChange={(checked) => 
                          handleTypeChange(type.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={type.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={applyFilters} 
                className="w-full bg-mm-green-600 hover:bg-mm-green-700"
              >
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FoodFilter;
