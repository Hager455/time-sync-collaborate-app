
export type EventStatus = 'pending' | 'confirmed' | 'declined';

export interface EventAttendee {
  id: string;
  name: string;
  email: string;
  status: EventStatus;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  color?: string;
  isAllDay?: boolean;
  reminder?: number; // minutes before event
  attendees?: EventAttendee[];
  createdBy?: string;
}
