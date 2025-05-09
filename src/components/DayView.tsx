
import React from "react";
import { format, addHours, startOfDay, eachHourOfInterval } from "date-fns";
import { CalendarEvent } from "@/types/event";
import { useEvents } from "@/contexts/EventContext";
import { cn } from "@/lib/utils";

interface DayViewProps {
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void;
}

const DayView: React.FC<DayViewProps> = ({ currentDate, onEventClick }) => {
  const { getEventsByDate } = useEvents();
  const dayEvents = getEventsByDate(currentDate);
  
  const dayStart = startOfDay(currentDate);
  const hours = eachHourOfInterval({
    start: dayStart,
    end: addHours(dayStart, 23),
  });

  const getEventsForHour = (hour: Date) => {
    return dayEvents.filter((event) => {
      const eventHour = event.startTime.getHours();
      return eventHour === hour.getHours();
    });
  };

  return (
    <div className="bg-white rounded-b-lg shadow-md overflow-auto max-h-[calc(100vh-12rem)]">
      {hours.map((hour) => {
        const hourEvents = getEventsForHour(hour);
        
        return (
          <div key={hour.toString()} className="flex border-b border-border">
            <div className="w-20 p-2 text-sm text-muted-foreground border-r border-border flex-shrink-0">
              {format(hour, "h aa")}
            </div>
            
            <div className="flex-grow min-h-[4rem] p-1 relative">
              {hourEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "calendar-event mb-1",
                    "hover:opacity-90"
                  )}
                  style={{
                    backgroundColor: event.color || 'hsl(var(--calendar-event))'
                  }}
                  onClick={() => onEventClick(event)}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs">
                    {format(event.startTime, "h:mm")} - {format(event.endTime, "h:mm aa")}
                  </div>
                  {event.location && (
                    <div className="text-xs">{event.location}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayView;
