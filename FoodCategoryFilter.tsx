
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FoodCategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: { value: string; label: string }[];
  className?: string;
}

const FoodCategoryFilter: React.FC<FoodCategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
  categories,
  className,
}) => {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange} className={className}>
      <TabsList className="w-full overflow-x-auto flex">
        {categories.map((category) => (
          <TabsTrigger key={category.value} value={category.value} className="min-w-max">
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default FoodCategoryFilter;
