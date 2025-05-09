
import React, { createContext, useState, useContext, useEffect } from "react";
import { CalendarEvent } from "@/types/event";
import { format } from "date-fns";
import { toast } from "sonner";
import { eventService } from "@/api/eventService";

interface EventContextType {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => Promise<CalendarEvent>;
  updateEvent: (event: CalendarEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventsByDate: (date: Date) => Promise<CalendarEvent[]>;
  getUpcomingEvents: (count?: number) => Promise<CalendarEvent[]>;
  loading: boolean;
  error: string | null;
}

const EventContext = createContext<EventContextType | null>(null);

// Sample events for demo purposes - will be replaced with API data
const generateSampleEvents = (): CalendarEvent[] => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  
  return [
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly sync with the product team",
      startTime: addHours(today, 2),
      endTime: addHours(today, 3),
      location: "Conference Room A",
    },
    {
      id: "2",
      title: "Lunch with Sarah",
      description: "Discuss project timeline",
      startTime: addHours(today, 4),
      endTime: addHours(today, 5),
      location: "Cafe Nero",
    },
    {
      id: "3",
      title: "Project Deadline",
      description: "Submit final deliverables",
      startTime: addHours(tomorrow, 10),
      endTime: addHours(tomorrow, 11),
    },
    {
      id: "4",
      title: "Dentist Appointment",
      description: "Regular checkup",
      startTime: addHours(addDays(today, 2), 9),
      endTime: addHours(addDays(today, 2), 10),
      location: "Dental Clinic",
      reminder: 60, // 60 minutes before
    },
    {
      id: "5",
      title: "All Hands Meeting",
      description: "Company monthly update",
      startTime: addHours(addDays(today, 3), 14),
      endTime: addHours(addDays(today, 3), 15),
      isAllDay: false,
      location: "Main Auditorium",
      attendees: [
        { id: "u1", name: "John Doe", email: "john@example.com", status: "confirmed" },
        { id: "u2", name: "Jane Smith", email: "jane@example.com", status: "pending" },
      ],
    },
  ];
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // When backend is ready, use this:
        // const fetchedEvents = await eventService.getAllEvents();
        // setEvents(fetchedEvents);
        
        // Until backend is ready, use sample data:
        setEvents(generateSampleEvents());
        setError(null);
      } catch (err) {
        setError("Failed to fetch events. Using sample data instead.");
        setEvents(generateSampleEvents());
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (eventData: Omit<CalendarEvent, "id">): Promise<CalendarEvent> => {
    try {
      setLoading(true);
      // When backend is ready, use this:
      // const newEvent = await eventService.createEvent(eventData);
      
      // Until backend is ready, create a local event:
      const newEvent: CalendarEvent = {
        ...eventData,
        id: `event-${Date.now()}`,
      };
      
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      toast.success("Event created successfully");
      return newEvent;
    } catch (err) {
      setError("Failed to create event");
      toast.error("Failed to create event");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (updatedEvent: CalendarEvent): Promise<void> => {
    try {
      setLoading(true);
      // When backend is ready, use this:
      // await eventService.updateEvent(updatedEvent);
      
      // Until backend is ready, update locally:
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      toast.success("Event updated successfully");
    } catch (err) {
      setError("Failed to update event");
      toast.error("Failed to update event");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      // When backend is ready, use this:
      // await eventService.deleteEvent(id);
      
      // Until backend is ready, delete locally:
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      toast.success("Event deleted successfully");
    } catch (err) {
      setError("Failed to delete event");
      toast.error("Failed to delete event");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEventsByDate = async (date: Date): Promise<CalendarEvent[]> => {
    try {
      // When backend is ready, use this:
      // return await eventService.getEventsByDate(date);
      
      // Until backend is ready, filter locally:
      const dateString = format(date, "yyyy-MM-dd");
      return events.filter((event) => {
        const eventDateString = format(event.startTime, "yyyy-MM-dd");
        return eventDateString === dateString;
      });
    } catch (err) {
      setError("Failed to fetch events by date");
      console.error(`Error fetching events for date ${date}:`, err);
      return [];
    }
  };

  const getUpcomingEvents = async (count = 5): Promise<CalendarEvent[]> => {
    try {
      // When backend is ready, use this:
      // return await eventService.getUpcomingEvents(count);
      
      // Until backend is ready, filter locally:
      const now = new Date();
      return events
        .filter((event) => event.startTime > now)
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .slice(0, count);
    } catch (err) {
      setError("Failed to fetch upcoming events");
      console.error("Error fetching upcoming events:", err);
      return [];
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventsByDate,
        getUpcomingEvents,
        loading,
        error
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  
  return context;
};
