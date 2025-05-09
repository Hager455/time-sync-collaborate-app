
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarEvent } from "@/types/event";
import { addHours } from "date-fns";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEvents } from "@/contexts/EventContext";
import { DateTimePicker } from "./DateTimePicker";

interface EventFormProps {
  event?: CalendarEvent;
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  isOpen,
  onClose,
  selectedDate,
}) => {
  const { addEvent, updateEvent, deleteEvent } = useEvents();
  const isNewEvent = !event;

  const defaultStartTime = selectedDate || new Date();
  const defaultEndTime = addHours(defaultStartTime, 1);

  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [location, setLocation] = useState(event?.location || "");
  const [startTime, setStartTime] = useState(event?.startTime || defaultStartTime);
  const [endTime, setEndTime] = useState(event?.endTime || defaultEndTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (isNewEvent) {
      addEvent({
        title,
        description,
        location,
        startTime,
        endTime,
      });
    } else if (event) {
      updateEvent({
        ...event,
        title,
        description,
        location,
        startTime,
        endTime,
      });
    }

    onClose();
  };

  const handleDelete = () => {
    if (event) {
      deleteEvent(event.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isNewEvent ? "Add Event" : "Edit Event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <DateTimePicker
                date={startTime}
                setDate={(date) => {
                  setStartTime(date || new Date());
                  // If end time is before the start time, adjust it
                  if (endTime < date!) {
                    setEndTime(addHours(date!, 1));
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor="endTime">End Time</Label>
              <DateTimePicker
                date={endTime}
                setDate={(date) => setEndTime(date || addHours(startTime, 1))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (optional)"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              rows={3}
            />
          </div>

          <DialogFooter>
            <div className="flex justify-between w-full">
              <div>
                {!isNewEvent && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">{isNewEvent ? "Create" : "Update"}</Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
