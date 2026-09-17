import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { appointments, employees, customers, services } from '../data/mock';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { toast } from 'sonner';

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // We'll just do a simple daily schedule view for the prototype
  const timeSlots = Array.from({length: 10}, (_, i) => i + 9); // 9 AM to 6 PM

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md p-1 shadow-sm">
            <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => setCurrentDate(addDays(currentDate, -1))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-2">{format(currentDate, 'EEE, MMM d')}</span>
            <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => setCurrentDate(addDays(currentDate, 1))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-100 p-1 rounded-md flex gap-1">
            <Button variant="default" size="sm" className="h-7">Day</Button>
            <Button variant="ghost" size="sm" className="h-7 text-gray-500" onClick={() => toast('Week view not implemented in preview')}>Week</Button>
          </div>
          <Button size="sm" className="gap-2" onClick={() => toast('New booking modal would open here')}>
            <Plus className="w-4 h-4" /> New Booking
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-[80px_1fr] divide-x divide-gray-100">
          {/* Time Column */}
          <div className="bg-gray-50/50">
            {timeSlots.map(hour => (
              <div key={hour} className="h-24 border-b border-gray-100 p-2 text-right relative">
                <span className="text-xs font-medium text-gray-400 absolute -top-2 right-2 bg-gray-50 px-1">{hour}:00</span>
              </div>
            ))}
          </div>
          
          {/* Schedule Area */}
          <div className="relative bg-white" onClick={(e) => {
            if (e.target === e.currentTarget || (e.target as HTMLElement).className.includes('h-24')) {
               toast('Click to add new appointment at this time slot');
            }
          }}>
            {timeSlots.map(hour => (
              <div key={hour} className="h-24 border-b border-gray-100" />
            ))}
            
            {/* Render Appointments */}
            {appointments.map(apt => {
              const date = new Date(apt.datetime);
              const hour = date.getHours();
              if (hour < 9 || hour > 18) return null; // Outside business hours
              
              const top = (hour - 9) * 96 + (date.getMinutes() / 60) * 96; // 96px is h-24
              const service = services.find(s => s.id === apt.serviceId);
              const customer = customers.find(c => c.id === apt.customerId);
              const employee = employees.find(e => e.id === apt.employeeId);
              const height = (service?.duration || 30) / 60 * 96;

              return (
                <div 
                  key={apt.id}
                  onClick={(e) => { e.stopPropagation(); toast(`Opening appointment details for ${customer?.name}`); }}
                  className="absolute left-4 right-4 rounded-md border border-blue-200 bg-blue-50/80 backdrop-blur-sm p-3 shadow-sm flex flex-col gap-1 overflow-hidden hover:bg-blue-100 transition-colors cursor-pointer"
                  style={{ top: `${top}px`, height: `${height}px` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-900">{customer?.name}</span>
                    <Badge variant={apt.status === 'Confirmed' ? 'success' : 'default'} className="text-[10px] h-4 px-1.5 py-0">
                      {apt.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-blue-700 font-medium flex justify-between items-center mt-1">
                    <span>{service?.name}</span>
                    <div className="flex items-center gap-1 bg-white/50 px-1.5 py-0.5 rounded">
                       <img src={employee?.avatar} alt={employee?.name} className="w-3 h-3 rounded-full" />
                       <span className="text-[10px]">{employee?.name}</span>
                    </div>
                  </div>
                  {apt.ai_handled && (
                    <div className="absolute bottom-1 right-2 flex items-center gap-1">
                       <span className="text-[10px] font-bold text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">
                         AI Booked
                       </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}
