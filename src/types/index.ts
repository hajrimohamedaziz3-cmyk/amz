export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';

export interface WorkingHours {
  start: string; // '09:00'
  end: string;   // '18:00'
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo: string;
  timezone: string; // e.g. 'Africa/Tunis'
  subscription_plan: 'Free' | 'Basic' | 'Pro' | 'Business';
  working_hours: Record<number, WorkingHours>; // 0 = Sunday, 1 = Monday, etc.
  buffer_time: number; // minutes between appointments
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  total_bookings: number;
  total_spending: number;
  cancelled_bookings: number;
  no_shows: number;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  active: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  services?: string[]; // IDs of services they can perform
  working_hours?: Record<number, WorkingHours>;
  days_off?: number[]; // [0, 6] for Sunday, Saturday
}

export interface Appointment {
  id: string;
  customerId: string;
  employeeId: string;
  serviceId: string;
  datetime: string;
  status: AppointmentStatus;
  ai_handled: boolean; // True if the AI booked/handled this appointment
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'human';
  text: string;
  timestamp: string;
  toolCall?: string; // name of the tool called, e.g. "get_available_slots"
}

export interface ChatSession {
  id: string;
  customerId: string;
  messages: ChatMessage[];
  lastUpdated: string;
  requiresHuman?: boolean;
}

export interface AppNotification {
  id: string;
  type: 'new_booking' | 'cancellation' | 'reschedule' | 'new_customer' | 'no_show' | 'human_handoff';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

