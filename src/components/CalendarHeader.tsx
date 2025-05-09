
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon
} from "lucide-react";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  viewMode: "day" | "month";
  onViewModeChange: (mode: "day" | "month") => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevious,
  onNext,
  onToday,
  viewMode,
  onViewModeChange,
}) => {
  const formatTitle = () => {
    if (viewMode === "day") {
      return format(currentDate, "EEEE, MMMM d, yyyy");
    }
    return format(currentDate, "MMMM yyyy");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-6 w-6" />
        <h2 className="text-xl font-bold">{formatTitle()}</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex rounded-md overflow-hidden">
          <Button 
            variant={viewMode === "day" ? "secondary" : "ghost"}
            className="rounded-none rounded-l-md"
            onClick={() => onViewModeChange("day")}
          >
            Day
          </Button>
          <Button 
            variant={viewMode === "month" ? "secondary" : "ghost"}
            className="rounded-none rounded-r-md"
            onClick={() => onViewModeChange("month")}
          >
            Month
          </Button>
        </div>
        
        <div className="flex rounded-md overflow-hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost"
            onClick={onToday}
          >
            Today
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
