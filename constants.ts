import { NewsItem, TeamMember, DocumentItem, GalleryItem, CalendarEvent } from './types';

// Kleuren voor UI consistentie (Updated to match new Tailwind Config)
export const COLORS = {
  red: 'bg-school-red',
  green: 'bg-school-green',
  yellow: 'bg-school-yellow',
  blue: 'bg-school-blue',
};

// Traiteur Link
export const TRAITEUR_URL = "https://order.hanssens.be/menu/O56/OUDE-VESTIGING";

// Helper to set future dates for demo purposes
const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);
const nextYear = new Date(today);
nextYear.setFullYear(today.getFullYear() + 1);

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "Grootouderfeest in de kleuterklas",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString().split('T')[0],
    summary: "Wat een fantastische namiddag! De kleuters hebben hun best gedaan voor oma en opa. Er werd gedanst, gezongen en vooral veel gelachen.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop", // Vrolijke kids sfeer
    category: "Kleuter",
    validUntil: nextMonth.toISOString().split('T')[0]
  },
  {
    id: 2,
    title: "Inschrijvingen volgend schooljaar",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10).toISOString().split('T')[0],
    summary: "De inschrijvingen voor het nieuwe schooljaar starten binnenkort. Maak tijdig een afspraak voor een rondleiding in onze school.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop", // School sfeer
    category: "Algemeen",
    validUntil: nextYear.toISOString().split('T')[0]
  },
  {
    id: 3,
    title: "Herfstwandeling Ryckevelde",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15).toISOString().split('T')[0],
    summary: "De leerlingen van het 5de en 6de leerjaar trokken de bossen van Ryckevelde in om de herfstkleuren te bewonderen en paddenstoelen te determineren.",
    image: "https://images.unsplash.com/photo-1448375240586-dfd8d3793300?q=80&w=1000&auto=format&fit=crop", // Bos/Natuur (Ryckevelde style)
    category: "Lager",
    validUntil: new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0] // Expired item example
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: "Mevr. Directrice", role: "Directie", group: "Directie", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Juf An", role: "Kleuterjuf", group: "Kleuter", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Meester Tom", role: "L.O.", group: "Lager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Mevr. Verhulst", role: "Secretariaat", group: "Administratie", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Juf Els", role: "Zorgcoördinator", group: "Zorg", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop" },
];

export const DOCUMENTS: DocumentItem[] = [
  { id: 1, name: "Schoolreglement 2023-2024", category: "Algemeen", downloadUrl: "#" },
  { id: 2, name: "Infobrochure", category: "Algemeen", downloadUrl: "#" },
  { id: 3, name: "Aanvraagformulier Medicatie", category: "Gezondheid", downloadUrl: "#" },
  { id: 4, name: "Formulier Opvang De Verrekijker", category: "Inschrijving", downloadUrl: "#" },
  { id: 5, name: "Privacybeleid", category: "Algemeen", downloadUrl: "#" },
];

export const ENTRY_DATES = [
  "Maandag 6 november 2023",
  "Maandag 8 januari 2024",
  "Donderdag 1 februari 2024",
  "Maandag 19 februari 2024",
  "Maandag 15 april 2024",
  "Maandag 13 mei 2024",
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { 
    id: 1, 
    title: "Uitstap naar Brugge", 
    description: "Leren over de geschiedenis van onze streek met zicht op het Belfort.", 
    location: "Lagere School", 
    imageUrl: "https://images.unsplash.com/photo-1523206272279-8e47150099b0?q=80&w=800&auto=format&fit=crop" // Brugge
  },
  { 
    id: 2, 
    title: "Knutselen in de klas", 
    description: "Creatief met papier maché.", 
    location: "De Verrekijker", 
    imageUrl: "https://images.unsplash.com/photo-1506009322870-421b17e768e7?q=80&w=800&auto=format&fit=crop" // Kids crafting
  },
  { 
    id: 3, 
    title: "Sportdag in Damme", 
    description: "Fietsen langs de Damse Vaart.", 
    location: "Algemeen", 
    imageUrl: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=800&auto=format&fit=crop" // Biking/Nature
  },
  { 
    id: 4, 
    title: "Voorlezen", 
    description: "Genieten van verhaaltjes in de boekenhoek.", 
    location: "De Verrekijker", 
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" // Reading
  },
  { 
    id: 5, 
    title: "Schoolfeest", 
    description: "Dansjes op het grote podium.", 
    location: "Kleuter Kloosterstraat", 
    imageUrl: "https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=800&auto=format&fit=crop" // Party/Balloons
  },
  { 
    id: 6, 
    title: "Bezoek aan de Molen", 
    description: "Op ontdekking in de molen van Damme.", 
    location: "Lagere School", 
    imageUrl: "https://images.unsplash.com/photo-1523883587089-58297db02307?q=80&w=800&auto=format&fit=crop" // Windmill (Schellemolen style)
  },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 1, title: "Herfstvakantie", date: "2023-10-30", type: "Vakantie" },
  { id: 2, title: "Pedagogische studiedag", date: "2023-11-15", type: "Vrije Dag" },
  { id: 3, title: "Grootouderfeest", date: "2023-11-22", startTime: "13:30", endTime: "16:00", description: "Feest voor alle grootouders in de turnzaal", type: "Activiteit" },
  { id: 4, title: "Kerstvakantie", date: "2023-12-25", type: "Vakantie" },
];