/**
 * Legal Data - Central source of truth for all legal information
 *
 * ⚠️ WICHTIG: Vor Go-Live fehlende Daten ausfüllen (siehe TODO Kommentare)
 */

export const COMPANY_INFO = {
  name: 'yeeylo UG (haftungsbeschränkt)',
  legalForm: 'UG (haftungsbeschränkt)',
  address: {
    street: 'Goerdelerstraße 29',
    city: '[Stadt]',        // TODO: Ausfüllen, z.B. "Hamburg"
    postalCode: '[PLZ]',    // TODO: Ausfüllen, z.B. "20148"
    country: 'Deutschland'
  },
  managingDirector: 'Jonas Peter Uhlig',
  email: 'jonas@yeeylo.com',
  phone: '+49 XXX XXXXXXX',  // TODO: Optional - Telefonnummer eintragen oder leer lassen
  commercialRegister: {
    court: 'Amtsgericht [Stadt]',  // TODO: Ausfüllen, z.B. "Amtsgericht Hamburg"
    number: 'HRB 17085',
    euid: 'DEN1206V.HRB17085'
  },
  vatId: '',  // TODO: Falls vorhanden, USt-ID eintragen (z.B. "DE123456789"), sonst leer lassen
  responsibleForContent: 'Jonas Peter Uhlig (Adresse wie oben)'
};

export const AFFILIATE_INFO = {
  amazonPartnerProgram: {
    name: 'Amazon Partnerprogramm',
    description: 'Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.',
    participantSince: '2024'
  }
};

export const DATA_PROCESSING = {
  vercel: {
    name: 'Vercel Inc.',
    purpose: 'Hosting und Analytics',
    location: 'USA',
    privacyPolicy: 'https://vercel.com/legal/privacy-policy'
  },
  supabase: {
    name: 'Supabase Inc.',
    purpose: 'Datenbank und Backend-Services',
    location: 'USA',
    privacyPolicy: 'https://supabase.com/privacy'
  },
  amazon: {
    name: 'Amazon EU S.à r.l.',
    purpose: 'Affiliate-Links und Produktinformationen',
    location: 'Luxemburg',
    privacyPolicy: 'https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010'
  }
};
