
import React, { useState } from "react";
import { useEvents } from "@/contexts/EventContext";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventForm from "@/components/EventForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarEvent } from "@/types/event";

const EventsList: React.FC = () => {
  const { events } = useEvents();
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();

  const sortedEvents = [...events].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );

  const handleAddEvent = () => {
    setSelectedEvent(undefined);
    setIsEventFormOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Events</h1>
        <Button onClick={handleAddEvent} className="gap-1">
          <Plus className="h-4 w-4" /> Add Event
        </Button>
      </div>

      {sortedEvents.length > 0 ? (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.map((event) => (
                <TableRow
                  key={event.id}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleEventClick(event)}
                >
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{format(event.startTime, "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    {format(event.startTime, "h:mm a")} - {format(event.endTime, "h:mm a")}
                  </TableCell>
                  <TableCell>{event.location || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-lg text-muted-foreground">No events found</p>
          <Button onClick={handleAddEvent} variant="outline" className="mt-4">
            Create your first event
          </Button>
        </div>
      )}

      <EventForm
        isOpen={isEventFormOpen}
        onClose={() => setIsEventFormOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventsList;
