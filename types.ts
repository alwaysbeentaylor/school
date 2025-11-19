export interface NewsItem {
  id: number;
  title: string;
  date: string; // Date of publication
  summary: string;
  image: string;
  category: 'Algemeen' | 'Kleuter' | 'Lager';
  validUntil: string; // YYYY-MM-DD format. Item hidden after this date.
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  group: 'Directie' | 'Kleuter' | 'Lager' | 'Zorg' | 'Administratie';
  image: string;
}

export interface DocumentItem {
  id: number;
  name: string;
  category: 'Algemeen' | 'Inschrijving' | 'Gezondheid';
  downloadUrl: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description?: string; // New field for short description
  location: 'De Verrekijker' | 'Kleuter Kloosterstraat' | 'Lagere School' | 'Algemeen';
  imageUrl: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:MM
  endTime?: string; // HH:MM
  location?: string;
  description?: string;
  type: 'Vakantie' | 'Activiteit' | 'Vrije Dag';
}