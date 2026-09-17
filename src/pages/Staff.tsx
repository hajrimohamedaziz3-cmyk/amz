import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { employees } from '../data/mock';
import { Button } from '../components/ui/button';
import { Plus, Calendar as CalendarIcon, MoreVertical } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

export function Staff() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Staff</h2>
        <Button className="gap-2" onClick={() => toast('New employee modal would open here')}>
          <Plus className="w-4 h-4" /> Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(employee => (
          <Card key={employee.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name} 
                      className="w-16 h-16 rounded-full border-2 border-white shadow-sm bg-gray-100"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{employee.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{employee.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-gray-400" onClick={() => toast('Employee settings opened')}>
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 text-emerald-500" />
                    <span>Working Today</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-t border-gray-100 p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-normal text-xs bg-white border border-gray-200 shadow-sm">
                    {employee.services?.length || 0} Services Assigned
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
