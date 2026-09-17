import React, { useState } from 'react';
import { currentTenant, services, employees } from '../data/mock';
import { Button } from '../components/ui/button';
import { Check, Calendar as CalendarIcon, Clock, Scissors, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { format, addDays } from 'date-fns';

export function PublicBooking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });

  const timeSlots = ['09:00', '10:00', '11:30', '14:00', '15:30', '16:00'];

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">Thank you, {customerInfo.name}. Your appointment at {currentTenant.name} is confirmed.</p>
          
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 space-y-3">
             <div className="flex items-center gap-3 text-sm text-gray-700">
                <CalendarIcon className="w-4 h-4 text-emerald-600" /> {format(selectedDate, 'EEEE, MMMM d, yyyy')}
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-700">
                <Clock className="w-4 h-4 text-emerald-600" /> {selectedTime}
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-700">
                <Scissors className="w-4 h-4 text-emerald-600" /> {services.find(s => s.id === selectedService)?.name}
             </div>
          </div>
          
          <Button onClick={() => window.location.hash = '#'} className="w-full">
            Done
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {currentTenant.logo}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{currentTenant.name}</h1>
          <p className="text-gray-500 mt-1">Book your appointment online</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Progress */}
          <div className="bg-slate-50 border-b border-gray-100 p-4 flex justify-between items-center px-8">
            {[1,2,3,4].map(s => (
              <div key={s} className="flex items-center">
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors", step >= s ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500")}>
                  {s}
                </div>
                {s < 4 && <div className={cn("w-8 sm:w-16 h-1 mx-2 rounded", step > s ? "bg-slate-900" : "bg-slate-200")} />}
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <h2 className="text-lg font-bold mb-4">Select a Service</h2>
                {services.map(service => (
                  <button 
                    key={service.id}
                    onClick={() => { setSelectedService(service.id); setStep(2); }}
                    className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-slate-900 hover:shadow-sm transition-all flex justify-between items-center group bg-white"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-slate-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration} mins</p>
                    </div>
                    <div className="font-semibold">{service.price} TND</div>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <button onClick={() => setStep(1)} className="text-sm text-slate-500 mb-4 hover:text-slate-900">← Back</button>
                <h2 className="text-lg font-bold mb-4">Select Staff (Optional)</h2>
                
                <button 
                  onClick={() => { setSelectedStaff(null); setStep(3); }}
                  className="w-full p-4 border border-gray-200 rounded-xl hover:border-slate-900 hover:shadow-sm transition-all flex items-center gap-4 bg-white"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Anyone Available</h3>
                    <p className="text-sm text-gray-500">Maximum availability</p>
                  </div>
                </button>

                {employees.filter(e => e.services?.includes(selectedService!)).map(emp => (
                  <button 
                    key={emp.id}
                    onClick={() => { setSelectedStaff(emp.id); setStep(3); }}
                    className="w-full p-4 border border-gray-200 rounded-xl hover:border-slate-900 hover:shadow-sm transition-all flex items-center gap-4 bg-white"
                  >
                    <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full bg-gray-100" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{emp.name}</h3>
                      <p className="text-sm text-gray-500">{emp.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <button onClick={() => setStep(2)} className="text-sm text-slate-500 hover:text-slate-900">← Back</button>
                <h2 className="text-lg font-bold mb-2">Select Date & Time</h2>
                
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {[0,1,2,3,4,5].map(offset => {
                    const d = addDays(new Date(), offset);
                    const isSelected = format(d, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                    return (
                      <button
                        key={offset}
                        onClick={() => setSelectedDate(d)}
                        className={cn(
                          "flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center border transition-all",
                          isSelected ? "bg-slate-900 text-white border-slate-900 shadow-md" : "border-gray-200 bg-white hover:border-slate-400 text-gray-600"
                        )}
                      >
                        <span className="text-xs uppercase font-medium">{format(d, 'EEE')}</span>
                        <span className={cn("text-xl font-bold mt-1", isSelected ? "text-white" : "text-gray-900")}>{format(d, 'd')}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-3 rounded-lg border font-medium transition-all text-sm",
                        selectedTime === time ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-white border-gray-200 text-gray-700 hover:border-slate-400"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <Button disabled={!selectedTime} onClick={() => setStep(4)} className="w-full mt-4">
                  Continue
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <button onClick={() => setStep(3)} className="text-sm text-slate-500 mb-4 hover:text-slate-900">← Back</button>
                <h2 className="text-lg font-bold mb-4">Your Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      placeholder="Ahmed Mansour"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Phone Number</label>
                    <input 
                      type="tel" 
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      placeholder="+216 55 123 456"
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{services.find(s => s.id === selectedService)?.name}</span>
                      <span>{services.find(s => s.id === selectedService)?.price} TND</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Time</span>
                      <span>{format(selectedDate, 'MMM d')} at {selectedTime}</span>
                    </div>
                  </div>

                  <Button 
                    disabled={!customerInfo.name || !customerInfo.phone} 
                    onClick={() => setStep(5)} 
                    className="w-full h-12 text-base mt-4"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Powered by SmartBook AI</p>
      </div>
    </div>
  )
}
