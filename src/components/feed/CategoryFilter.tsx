import { useState } from "react";

export interface CategoryOption {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  onCategoryChange?: (categoryId: string) => void;
  defaultSelected?: string;
}

export default function CategoryFilter({
  categories,
  onCategoryChange,
  defaultSelected = "All",
}: CategoryFilterProps) {
  const [selected, setSelected] = useState(defaultSelected);

  const handleSelect = (categoryId: string) => {
    setSelected(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="flex items-center justify-start rounded-md bg-muted p-1 gap-1">
      {categories.map((category) => (
        <label
          key={category.id}
          className="relative flex cursor-pointer h-8 flex-1 items-center justify-center rounded-sm px-3 text-sm font-medium transition-all has-checked:bg-background has-checked:text-foreground has-checked:shadow-sm text-muted-foreground"
        >
          <span className="truncate">{category.label}</span>
          <input
            type="radio"
            name="category-filter"
            value={category.id}
            checked={selected === category.id}
            onChange={() => handleSelect(category.id)}
            className="sr-only"
          />
        </label>
      ))}
    </div>
  );
}
