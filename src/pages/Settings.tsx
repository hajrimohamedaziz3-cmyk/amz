import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { currentTenant } from '../data/mock';
import { Building2, CreditCard, Bell, Shield, Webhook } from 'lucide-react';
import { toast } from 'sonner';

export function Settings() {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="p-2 md:col-span-1 h-fit">
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-slate-100 text-slate-900 text-sm font-medium">
              <Building2 className="w-4 h-4" /> Workspace
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 text-sm font-medium">
              <CreditCard className="w-4 h-4" /> Billing
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 text-sm font-medium">
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 text-sm font-medium">
              <Webhook className="w-4 h-4" /> Integrations
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 text-sm font-medium">
              <Shield className="w-4 h-4" /> Security
            </button>
          </nav>
        </Card>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Workspace Information</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input 
                  type="text" 
                  defaultValue={currentTenant.name}
                  className="w-full p-2 border border-gray-200 rounded-md outline-none focus:border-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Public URL Slug</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
                    smartbook.ai/book/
                  </span>
                  <input 
                    type="text" 
                    defaultValue={currentTenant.slug}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-200 outline-none focus:border-slate-400 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select className="w-full p-2 border border-gray-200 rounded-md outline-none focus:border-slate-400 bg-white">
                  <option value="Africa/Tunis">Africa/Tunis (GMT+1)</option>
                  <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4 border-red-100">
            <h3 className="text-lg font-bold text-red-600 border-b border-red-50 pb-2">Danger Zone</h3>
            <p className="text-sm text-gray-500">Permanently delete your workspace and all data.</p>
            <Button variant="destructive" onClick={() => toast.error('This action is disabled in the preview')}>
              Delete Workspace
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
