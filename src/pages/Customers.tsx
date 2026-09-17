import React from 'react';
import { Card } from '../components/ui/card';
import { customers } from '../data/mock';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Plus, Edit2, Search, Mail, Phone, Calendar as CalendarIcon, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">CRM & Customers</h2>
        <Button className="gap-2" onClick={() => toast('New customer modal would open here')}>
          <Plus className="w-4 h-4" /> Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => (
          <Card key={customer.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{customer.name}</h3>
                  <div className="flex flex-col gap-1 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {customer.phone}</span>
                    {customer.email && <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {customer.email}</span>}
                  </div>
                </div>
                <Badge variant={customer.total_bookings > 3 ? 'success' : 'secondary'} className="px-2">
                  {customer.total_bookings > 3 ? 'VIP' : 'Regular'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 block">Total Spend</span>
                  <span className="font-semibold text-gray-900">{customer.total_spending} TND</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 block">Bookings</span>
                  <span className="font-semibold text-gray-900">{customer.total_bookings}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                {customer.no_shows > 0 && (
                  <span className="text-red-600 font-medium bg-red-50 px-2 py-1 rounded">No-shows: {customer.no_shows}</span>
                )}
                {customer.cancelled_bookings > 0 && (
                  <span className="text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded">Cancelled: {customer.cancelled_bookings}</span>
                )}
              </div>
              
              {customer.notes && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50/50 p-2 rounded">
                    <FileText className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="italic">"{customer.notes}"</p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-slate-50 border-t border-gray-100 p-3 flex justify-end">
              <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => toast('Customer history opened')}>
                <CalendarIcon className="w-4 h-4 mr-2" /> History
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-200" onClick={() => toast('Edit customer opened')}>
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
