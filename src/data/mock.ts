import { Tenant, Customer, Service, Employee, Appointment, ChatSession, AppNotification } from '../types';

const defaultHours = { start: '09:00', end: '18:00' };

export const currentTenant: Tenant = {
  id: 'tenant_1',
  name: 'Luxe Hair & Spa',
  slug: 'luxe-hair',
  timezone: 'Africa/Tunis',
  logo: 'LH',
  subscription_plan: 'Pro',
  working_hours: {
    1: defaultHours, 2: defaultHours, 3: defaultHours, 
    4: defaultHours, 5: defaultHours, 6: defaultHours // Monday to Saturday
  },
  buffer_time: 15 // 15 mins between appointments
};

export const services: Service[] = [
  { id: 's1', name: 'Haircut & Styling', duration: 30, price: 35, active: true },
  { id: 's2', name: 'Beard Trim', duration: 20, price: 15, active: true },
  { id: 's3', name: 'Coupe + Barbe', duration: 45, price: 45, active: true },
  { id: 's4', name: 'Facial Treatment', duration: 30, price: 40, active: true },
];

export const employees: Employee[] = [
  { id: 'e1', name: 'Ahmed Barber', role: 'Senior Barber', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ahmed', services: ['s1', 's2', 's3'], days_off: [0] },
  { id: 'e2', name: 'Sami Stylist', role: 'Hair Stylist', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sami', services: ['s1', 's3'], days_off: [0, 1] },
  { id: 'e3', name: 'Sarah Beauty', role: 'Beautician', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah', services: ['s4'], days_off: [0] },
];

export const customers: Customer[] = [
  { id: 'c1', name: 'Youssef Mansour', phone: '+216 22 123 456', email: 'youssef@example.com', total_bookings: 5, total_spending: 175, cancelled_bookings: 1, no_shows: 0, notes: 'Prefers Ahmed. Likes fade cut.' },
  { id: 'c2', name: 'Karim Ben Ali', phone: '+216 55 987 654', total_bookings: 2, total_spending: 90, cancelled_bookings: 0, no_shows: 1, notes: 'Late last time.' },
  { id: 'c3', name: 'Omar Trabelsi', phone: '+216 98 111 222', total_bookings: 1, total_spending: 45, cancelled_bookings: 0, no_shows: 0 },
  { id: 'c4', name: 'Nizar Khemiri', phone: '+216 20 444 555', total_bookings: 8, total_spending: 320, cancelled_bookings: 2, no_shows: 0 },
];

export const appointments: Appointment[] = [
  { id: 'a1', customerId: 'c1', employeeId: 'e1', serviceId: 's3', datetime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(), status: 'Confirmed', ai_handled: true },
  { id: 'a2', customerId: 'c2', employeeId: 'e2', serviceId: 's1', datetime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(), status: 'Pending', ai_handled: true },
  { id: 'a3', customerId: 'c3', employeeId: 'e1', serviceId: 's2', datetime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(), status: 'Cancelled', ai_handled: true },
  { id: 'a4', customerId: 'c4', employeeId: 'e3', serviceId: 's4', datetime: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(), status: 'Completed', ai_handled: true },
];

export const chatSessions: ChatSession[] = [
  {
    id: 'chat_1',
    customerId: 'c1',
    lastUpdated: new Date().toISOString(),
    messages: [
      { id: 'm1', sender: 'user', text: 'سلام، نحب نحجز coupe homme غدوة مع 16', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 'm2', sender: 'ai', text: '[System: Analyzing intent... Intent: Booking, Service: Coupe, Time: Tomorrow 16:00]', timestamp: new Date(Date.now() - 3595000).toISOString(), toolCall: 'get_services()' },
      { id: 'm3', sender: 'ai', text: '[System: Checking availability...]', timestamp: new Date(Date.now() - 3590000).toISOString(), toolCall: 'get_available_slots(service="s1", date="tomorrow")' },
      { id: 'm4', sender: 'ai', text: 'أكيد 👋 الساعة 16:00 غدوة محجوزة. عندنا 15:30 أو 16:30. أي وقت يناسبك؟', timestamp: new Date(Date.now() - 3585000).toISOString() },
      { id: 'm5', sender: 'user', text: '16:30', timestamp: new Date(Date.now() - 3500000).toISOString() },
      { id: 'm6', sender: 'ai', text: '[System: Booking appointment...]', timestamp: new Date(Date.now() - 3495000).toISOString(), toolCall: 'create_booking(customer="c1", service="s1", time="16:30")' },
      { id: 'm7', sender: 'ai', text: '✅ تم تأكيد حجزك.\nالخدمة: Haircut & Styling\nالتاريخ: غدوة\nالساعة: 16:30\nالموظف: Ahmed\n\nنستناك 👋', timestamp: new Date(Date.now() - 3490000).toISOString() }
    ]
  },
  {
    id: 'chat_2',
    customerId: 'c2',
    requiresHuman: true,
    lastUpdated: new Date().toISOString(),
    messages: [
      { id: 'm21', sender: 'user', text: 'عندي مشكلة في الفاتورة القديمة', timestamp: new Date(Date.now() - 1000000).toISOString() },
      { id: 'm22', sender: 'ai', text: '[System: Intent outside of boundaries. Triggering human handoff]', timestamp: new Date(Date.now() - 950000).toISOString() },
      { id: 'm23', sender: 'ai', text: 'عذراً، ما نقدرش نعاونك في هذا حالياً. تم تحويل المحادثة لأحد الموظفين، رح يتواصل معك قريباً. 👨‍💻', timestamp: new Date(Date.now() - 900000).toISOString() }
    ]
  }
];

export const notifications: AppNotification[] = [
  { id: 'n1', type: 'human_handoff', title: 'Human Takeover Required', message: 'Karim Ben Ali needs assistance with a billing issue.', timestamp: new Date().toISOString(), isRead: false },
  { id: 'n2', type: 'new_booking', title: 'New Booking', message: 'Youssef booked Coupe + Barbe for tomorrow.', timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: true },
];
