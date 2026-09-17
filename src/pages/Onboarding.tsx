import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Building2, Scissors, Users, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Onboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const getStepIcon = (s: number) => {
    switch(s) {
      case 1: return <Building2 className="w-5 h-5" />;
      case 2: return <Scissors className="w-5 h-5" />;
      case 3: return <Users className="w-5 h-5" />;
      case 4: return <Clock className="w-5 h-5" />;
      case 5: return <MessageSquare className="w-5 h-5" />;
      case 6: return <CheckCircle2 className="w-5 h-5" />;
      default: return null;
    }
  };

  const getStepTitle = (s: number) => {
    switch(s) {
      case 1: return "Business Info";
      case 2: return "Services";
      case 3: return "Staff";
      case 4: return "Working Hours";
      case 5: return "Integrations";
      case 6: return "All Set!";
      default: return "";
    }
  };

  if (step === 6) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">You're All Set!</h2>
          <p className="text-gray-500 mb-8">Your SmartBook AI workspace is ready. Your WhatsApp agent is now online and ready to take bookings.</p>
          <Button onClick={() => window.location.hash = '#'} className="w-full h-12 text-lg">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Welcome to SmartBook AI</h1>
          <p className="text-slate-500 mt-2">Let's set up your business in a few simple steps.</p>
        </div>

        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 h-0.5 bg-slate-900 -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}></div>
          
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                step >= s ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-400"
              )}>
                {getStepIcon(s)}
              </div>
              <span className={cn("text-xs font-medium hidden sm:block", step >= s ? "text-slate-900" : "text-slate-400")}>
                {getStepTitle(s)}
              </span>
            </div>
          ))}
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" placeholder="e.g. Luxe Hair & Spa" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Business Type</label>
                <select className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white">
                  <option>Barbershop / Salon</option>
                  <option>Medical Clinic</option>
                  <option>Consulting</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                <select className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white">
                  <option>Africa/Tunis (GMT+1)</option>
                  <option>Europe/Paris (GMT+1)</option>
                  <option>America/New_York (GMT-5)</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <p className="text-slate-500 mb-4">Add the services your business offers.</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <input type="text" className="flex-2 p-3 border border-slate-200 rounded-lg outline-none w-full" placeholder="Service name (e.g. Haircut)" defaultValue="Haircut" />
                  <input type="number" className="flex-1 p-3 border border-slate-200 rounded-lg outline-none w-32" placeholder="Mins" defaultValue={30} />
                  <input type="number" className="flex-1 p-3 border border-slate-200 rounded-lg outline-none w-32" placeholder="Price" defaultValue={35} />
                </div>
                <div className="flex gap-3">
                  <input type="text" className="flex-2 p-3 border border-slate-200 rounded-lg outline-none w-full" placeholder="Service name" />
                  <input type="number" className="flex-1 p-3 border border-slate-200 rounded-lg outline-none w-32" placeholder="Mins" />
                  <input type="number" className="flex-1 p-3 border border-slate-200 rounded-lg outline-none w-32" placeholder="Price" />
                </div>
              </div>
              <Button variant="outline" className="w-full border-dashed">+ Add another service</Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <p className="text-slate-500 mb-4">Add your staff members.</p>
               <div className="space-y-3">
                <div className="flex gap-3">
                  <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none" placeholder="Staff name" defaultValue="Ahmed" />
                  <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none" placeholder="Role" defaultValue="Senior Barber" />
                </div>
                <div className="flex gap-3">
                  <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none" placeholder="Staff name" />
                  <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none" placeholder="Role" />
                </div>
              </div>
              <Button variant="outline" className="w-full border-dashed">+ Add another staff member</Button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <p className="text-slate-500 mb-4">Set your standard business hours.</p>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-32 font-medium text-slate-700 flex items-center gap-2">
                      <input type="checkbox" defaultChecked={i !== 6} className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900" />
                      {day}
                    </div>
                    {i !== 6 ? (
                      <div className="flex items-center gap-2 flex-1">
                        <select className="p-2 border border-slate-200 rounded-lg outline-none w-full bg-white"><option>09:00</option></select>
                        <span>to</span>
                        <select className="p-2 border border-slate-200 rounded-lg outline-none w-full bg-white"><option>18:00</option></select>
                      </div>
                    ) : (
                      <div className="flex-1 text-slate-400 text-sm italic">Closed</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <p className="text-slate-500 mb-6">Connect your accounts to enable AI booking.</p>
              
              <div className="border border-slate-200 rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">WhatsApp Business API</h3>
                    <p className="text-sm text-slate-500">Allow AI to chat with customers on WhatsApp</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Google Calendar</h3>
                    <p className="text-sm text-slate-500">Two-way sync for appointments</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
            <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
              Back
            </Button>
            <Button onClick={() => setStep(Math.min(6, step + 1))}>
              {step === 5 ? "Complete Setup" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
