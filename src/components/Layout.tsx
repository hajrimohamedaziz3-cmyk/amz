import React, { useState } from 'react';
import { currentTenant } from '../data/mock';
import { notifications } from '../data/mock';
import { t, setLanguage, currentLanguage, Language } from '../lib/i18n';
import { toast } from 'sonner';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Users, 
  Scissors, 
  UserCircle, 
  Settings,
  Bell,
  MessageSquare,
  BarChart3,
  ExternalLink,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { format } from 'date-fns';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Layout({ children, activeView, onViewChange }: LayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [lang, setLang] = useState<Language>(currentLanguage);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLangChange = () => {
    const next: Record<Language, Language> = { en: 'fr', fr: 'ar', ar: 'en' };
    setLang(next[lang]);
    setLanguage(next[lang]);
  };

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'calendar', label: t('calendar'), icon: CalendarIcon },
    { id: 'customers', label: t('crm'), icon: Users },
    { id: 'services', label: t('services'), icon: Scissors },
    { id: 'staff', label: t('staff'), icon: UserCircle },
    { id: 'messages', label: t('messages'), icon: MessageSquare },
    { id: 'analytics', label: t('analytics'), icon: BarChart3 },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col">
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
              {currentTenant.logo}
            </div>
            <span className="font-semibold text-white truncate">{currentTenant.name}</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-sm font-medium",
                activeView === item.id 
                  ? "bg-slate-800 text-white" 
                  : "hover:bg-slate-800/50 hover:text-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
              {item.id === 'messages' && notifications.some(n => n.type === 'human_handoff' && !n.isRead) && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <a href={`#/book/${currentTenant.slug}`} target="_blank" className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-sm font-medium transition-colors">
            <ExternalLink className="w-4 h-4" /> Public Page
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-900 capitalize">
            {navItems.find(i => i.id === activeView)?.label || 'SmartBook AI'}
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleLangChange} className="text-gray-500 hover:text-gray-900 font-medium uppercase w-12 flex items-center gap-1">
              <Globe className="w-4 h-4" /> {lang}
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="w-5 h-5 text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <button className="text-xs text-blue-600 hover:underline" onClick={() => toast.success('All notifications marked as read')}>Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={cn("p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors", !n.isRead && "bg-blue-50/30")} onClick={() => toast(`Notification opened: ${n.title}`)}>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={cn("text-sm font-semibold", n.type === 'human_handoff' ? "text-red-600" : "text-gray-900")}>
                            {n.title}
                          </h4>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{format(new Date(n.timestamp), 'HH:mm')}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
