
import axios from 'axios';
import { CalendarEvent } from '@/types/event';

// Configure axios with the base URL of your Spring Boot backend
// You'll need to replace this with your actual backend URL when deployed
const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventService = {
  // Get all events
  getAllEvents: async (): Promise<CalendarEvent[]> => {
    try {
      const response = await apiClient.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Get event by ID
  getEventById: async (id: string): Promise<CalendarEvent> => {
    try {
      const response = await apiClient.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new event
  createEvent: async (event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
    try {
      const response = await apiClient.post('/events', event);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Update an existing event
  updateEvent: async (event: CalendarEvent): Promise<CalendarEvent> => {
    try {
      const response = await apiClient.put(`/events/${event.id}`, event);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with id ${event.id}:`, error);
      throw error;
    }
  },

  // Delete an event
  deleteEvent: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/events/${id}`);
    } catch (error) {
      console.error(`Error deleting event with id ${id}:`, error);
      throw error;
    }
  },
  
  // Get events by date
  getEventsByDate: async (date: Date): Promise<CalendarEvent[]> => {
    try {
      const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const response = await apiClient.get(`/events/date/${formattedDate}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching events for date ${date}:`, error);
      throw error;
    }
  },
  
  // Get upcoming events
  getUpcomingEvents: async (count: number = 5): Promise<CalendarEvent[]> => {
    try {
      const response = await apiClient.get(`/events/upcoming?count=${count}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  }
};
