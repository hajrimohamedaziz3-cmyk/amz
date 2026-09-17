// Simulating i18n support
export const translations = {
  en: {
    dashboard: "Dashboard",
    calendar: "Calendar",
    crm: "CRM",
    services: "Services",
    staff: "Staff",
    messages: "AI Messages",
    analytics: "Analytics",
    settings: "Settings",
    new_booking: "New Booking",
  },
  fr: {
    dashboard: "Tableau de Bord",
    calendar: "Calendrier",
    crm: "CRM",
    services: "Services",
    staff: "Personnel",
    messages: "Messages IA",
    analytics: "Analytiques",
    settings: "Paramètres",
    new_booking: "Nouvelle Réservation",
  },
  ar: {
    dashboard: "لوحة التحكم",
    calendar: "التقويم",
    crm: "إدارة العملاء",
    services: "الخدمات",
    staff: "الموظفين",
    messages: "محادثات الذكاء الاصطناعي",
    analytics: "التحليلات",
    settings: "الإعدادات",
    new_booking: "حجز جديد",
  }
};

export type Language = 'en' | 'fr' | 'ar';
export let currentLanguage: Language = 'en';

export function setLanguage(lang: Language) {
  currentLanguage = lang;
}

export function t(key: keyof typeof translations['en']): string {
  return translations[currentLanguage][key] || translations['en'][key];
}
