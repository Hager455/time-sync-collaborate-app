
import React, { useState } from "react";
import { addDays, addMonths, isEqual } from "date-fns";
import CalendarHeader from "@/components/CalendarHeader";
import MonthView from "@/components/MonthView";
import DayView from "@/components/DayView";
import EventForm from "@/components/EventForm";
import EventsSidebar from "@/components/EventsSidebar";
import { useEvents } from "@/contexts/EventContext";
import { CalendarEvent } from "@/types/event";

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "month">("month");
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  const { events } = useEvents();

  const handlePrevious = () => {
    if (viewMode === "day") {
      setCurrentDate(addDays(currentDate, -1));
    } else {
      setCurrentDate(addMonths(currentDate, -1));
    }
  };

  const handleNext = () => {
    if (viewMode === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
    setViewMode("day");
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(undefined);
    setSelectedDate(currentDate);
    setIsEventFormOpen(true);
  };

  const handleEventFromSidebar = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setIsEventFormOpen(true);
      setCurrentDate(event.startTime);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <div className="flex-grow flex flex-col">
          <div className="m-4">
            <CalendarHeader
              currentDate={currentDate}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onToday={handleToday}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            
            {viewMode === "month" ? (
              <MonthView 
                currentDate={currentDate}
                onSelectDate={handleSelectDate}
                onEventClick={handleEventClick}
              />
            ) : (
              <DayView
                currentDate={currentDate}
                onEventClick={handleEventClick}
              />
            )}
          </div>
        </div>
        
        <EventsSidebar
          onAddEvent={handleAddEvent}
          onEventClick={handleEventFromSidebar}
        />
      </div>
      
      <EventForm
        isOpen={isEventFormOpen}
        onClose={() => setIsEventFormOpen(false)}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarPage;
