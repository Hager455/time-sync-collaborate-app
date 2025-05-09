
import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isToday,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { CalendarEvent } from "@/types/event";
import { useEvents } from "@/contexts/EventContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MonthViewProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  onSelectDate,
  onEventClick,
}) => {
  const { getEventsByDate } = useEvents();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
      <div className="calendar-grid bg-muted">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center font-semibold bg-calendar-header text-primary-foreground">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day) => {
          const dayEvents = getEventsByDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={day.toString()}
              className={cn(
                "calendar-day",
                isToday(day) && "calendar-day-today",
                !isCurrentMonth && "text-gray-400"
              )}
              onClick={() => onSelectDate(day)}
            >
              <div className="calendar-day-number">
                {format(day, "d")}
              </div>
              
              <div className="mt-auto overflow-hidden flex-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <TooltipProvider key={event.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className="calendar-event" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                          }}
                        >
                          {event.title}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <div className="font-bold">{event.title}</div>
                          <div>{format(event.startTime, "h:mm a")}</div>
                          {event.location && <div>{event.location}</div>}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
                
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
