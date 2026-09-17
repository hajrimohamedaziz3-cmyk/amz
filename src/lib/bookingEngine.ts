import { currentTenant, employees, services, appointments } from '../data/mock';
import { parseISO, addMinutes, isBefore, isAfter, isSameDay } from 'date-fns';

/**
 * 10. Booking Engine logic simulation.
 * This simulates how the backend Python/FastAPI will calculate availability.
 */
export class BookingEngine {
  
  static getAvailableSlots(dateString: string, serviceId: string, employeeId?: string): string[] {
    const targetDate = new Date(dateString);
    const dayOfWeek = targetDate.getDay(); // 0 = Sunday, etc.
    
    // 1. Check if business is open
    const businessHours = currentTenant.working_hours[dayOfWeek];
    if (!businessHours) return []; // Closed
    
    // 2. Find the service
    const service = services.find(s => s.id === serviceId);
    if (!service || !service.active) return [];
    
    const requiredDuration = service.duration + currentTenant.buffer_time;
    
    // 3. Select eligible employees
    let eligibleEmployees = employees.filter(e => e.services?.includes(serviceId));
    if (employeeId) {
      eligibleEmployees = eligibleEmployees.filter(e => e.id === employeeId);
    }
    
    // Filter out employees who have the day off
    eligibleEmployees = eligibleEmployees.filter(e => !e.days_off?.includes(dayOfWeek));
    
    if (eligibleEmployees.length === 0) return [];
    
    // Generate all possible 30-min slots during business hours
    const [startHour, startMin] = businessHours.start.split(':').map(Number);
    const [endHour, endMin] = businessHours.end.split(':').map(Number);
    
    let currentSlot = new Date(targetDate);
    currentSlot.setHours(startHour, startMin, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(endHour, endMin, 0, 0);
    
    const availableSlots: string[] = [];
    
    while (isBefore(addMinutes(currentSlot, requiredDuration), endOfDay)) {
      // Check if at least ONE eligible employee is free for this slot
      const isSlotAvailable = eligibleEmployees.some(emp => {
        // Find existing appointments for this employee on this day
        const empAppointments = appointments.filter(a => 
          a.employeeId === emp.id && 
          (a.status === 'Confirmed' || a.status === 'Pending') &&
          isSameDay(parseISO(a.datetime), currentSlot)
        );
        
        // Check for overlaps
        const hasOverlap = empAppointments.some(apt => {
          const aptStart = parseISO(apt.datetime);
          const aptSvc = services.find(s => s.id === apt.serviceId);
          const aptDuration = (aptSvc?.duration || 30) + currentTenant.buffer_time;
          const aptEnd = addMinutes(aptStart, aptDuration);
          
          const slotEnd = addMinutes(currentSlot, requiredDuration);
          
          // Overlap logic: (StartA < EndB) and (EndA > StartB)
          return isBefore(aptStart, slotEnd) && isAfter(aptEnd, currentSlot);
        });
        
        return !hasOverlap;
      });
      
      if (isSlotAvailable) {
        availableSlots.push(currentSlot.toISOString());
      }
      
      // Advance by 30 mins
      currentSlot = addMinutes(currentSlot, 30);
    }
    
    return availableSlots;
  }
}
