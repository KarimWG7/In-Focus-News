import { Search, Calendar as CalendarIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
}: SearchFiltersProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleClearDates = () => {
    onDateRangeChange?.(undefined);
    setIsDatePickerOpen(false);
  };

  return (
    <Card className="p-6 sticky top-20 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        {/* Search Input */}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <label
            className="text-sm font-medium text-muted-foreground"
            htmlFor="search"
          >
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              id="search"
              placeholder="Search articles, topics, keywords..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-muted-foreground"
            htmlFor="categories"
          >
            Category
          </label>
          <select
            id="categories"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option>All Categories</option>
            <option>Technology</option>
            <option>Business</option>
            <option>Politics</option>
            <option>World</option>
            <option>Sports</option>
            <option>Entertainment</option>
            <option>Science</option>
            <option>Health</option>
          </select>
        </div>

        {/* Date Range Picker */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-muted-foreground"
            htmlFor="date-range"
          >
            Date Range
          </label>
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-range"
                variant="outline"
                className="w-full justify-between text-left font-normal"
              >
                <span className="truncate">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd")} -{" "}
                        {format(dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    "Pick a date range"
                  )}
                </span>
                {dateRange?.from ? (
                  <X
                    className="size-4 text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearDates();
                    }}
                  />
                ) : (
                  <CalendarIcon className="size-4 text-muted-foreground" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={onDateRangeChange}
              />
              <div className="p-3 border-t flex justify-between">
                <Button variant="outline" size="sm" onClick={handleClearDates}>
                  Clear
                </Button>
                <Button size="sm" onClick={() => setIsDatePickerOpen(false)}>
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}
