
import React from "react";
import { useEvents } from "@/contexts/EventContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Plus } from "lucide-react";

interface EventsSidebarProps {
  onAddEvent: () => void;
  onEventClick: (eventId: string) => void;
}

const EventsSidebar: React.FC<EventsSidebarProps> = ({
  onAddEvent,
  onEventClick,
}) => {
  const { getUpcomingEvents } = useEvents();
  const upcomingEvents = getUpcomingEvents(5);

  return (
    <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-l border-border bg-card">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-semibold text-lg">Upcoming Events</h3>
        <Button onClick={onAddEvent} size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Event
        </Button>
      </div>

      <div className="p-4 space-y-4 max-h-[calc(100vh-10rem)] overflow-auto">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <Card 
              key={event.id} 
              className="cursor-pointer hover:shadow-md transition-shadow animate-fade-in"
              onClick={() => onEventClick(event.id)}
            >
              <CardContent className="p-4">
                <div className="mb-1 text-sm text-muted-foreground">
                  {format(event.startTime, "EEE, MMM d")} · {format(event.startTime, "h:mm a")}
                </div>
                <h4 className="font-medium">{event.title}</h4>
                {event.location && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {event.location}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No upcoming events
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsSidebar;
