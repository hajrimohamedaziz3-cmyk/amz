import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CalendarView } from './pages/CalendarView';
import { Services } from './pages/Services';
import { Staff } from './pages/Staff';
import { Customers } from './pages/Customers';
import { AIMessages } from './pages/AIMessages';
import { Analytics } from './pages/Analytics';
import { PublicBooking } from './pages/PublicBooking';
import { Onboarding } from './pages/Onboarding';
import { Settings } from './pages/Settings';
import { Toaster } from 'sonner';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Simple Hash Router for public pages & onboarding
  if (hash.startsWith('#/book')) {
    return <PublicBooking />;
  }
  
  if (hash.startsWith('#/onboarding')) {
    return <Onboarding />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <CalendarView />;
      case 'services':
        return <Services />;
      case 'staff':
        return <Staff />;
      case 'customers':
        return <Customers />;
      case 'messages':
        return <AIMessages />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Work in Progress</h2>
            <p className="text-gray-500 mt-2">This module ({activeView}) is currently being built.</p>
          </div>
        );
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      <Toaster position="top-right" richColors />
      {renderContent()}
    </Layout>
  );
}



