
import React, { createContext, useState, useContext, useEffect } from "react";
import { CalendarEvent } from "@/types/event";
import { addDays, addHours, format, startOfDay } from "date-fns";
import { toast } from "sonner";

interface EventContextType {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (date: Date) => CalendarEvent[];
  getUpcomingEvents: (count?: number) => CalendarEvent[];
}

const EventContext = createContext<EventContextType | null>(null);

// Sample events for demo purposes
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
  const [events, setEvents] = useState<CalendarEvent[]>(generateSampleEvents());

  const addEvent = (eventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
    };
    
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    toast.success("Event created successfully");
    return newEvent;
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    toast.success("Event updated successfully");
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    toast.success("Event deleted successfully");
  };

  const getEventsByDate = (date: Date): CalendarEvent[] => {
    const dateString = format(date, "yyyy-MM-dd");
    return events.filter((event) => {
      const eventDateString = format(event.startTime, "yyyy-MM-dd");
      return eventDateString === dateString;
    });
  };

  const getUpcomingEvents = (count = 5): CalendarEvent[] => {
    const now = new Date();
    return events
      .filter((event) => event.startTime > now)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      .slice(0, count);
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
