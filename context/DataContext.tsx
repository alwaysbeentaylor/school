
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { NewsItem, CalendarEvent, GalleryItem } from '../types';
import { supabase } from '../supabaseClient';
import { NEWS_ITEMS, CALENDAR_EVENTS, GALLERY_IMAGES } from '../constants';

interface DataContextType {
  news: NewsItem[];
  calendar: CalendarEvent[];
  gallery: GalleryItem[];
  loading: boolean;
  addNews: (item: Omit<NewsItem, 'id'>) => Promise<void>;
  deleteNews: (id: number) => Promise<void>;
  addEvent: (item: Omit<CalendarEvent, 'id'>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  addPhoto: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deletePhoto: (id: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [calendar, setCalendar] = useState<CalendarEvent[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    
    // Safely access env
    const env = (import.meta as any).env || {};
    
    if (!env.VITE_SUPABASE_URL) {
      console.warn("Supabase niet geconfigureerd, gebruik mock data.");
      setNews(NEWS_ITEMS);
      setCalendar(CALENDAR_EVENTS);
      setGallery(GALLERY_IMAGES);
      setLoading(false);
      return;
    }

    try {
      const { data: newsData } = await supabase.from('news').select('*').order('date', { ascending: false });
      const { data: calendarData } = await supabase.from('calendar').select('*').order('date', { ascending: true });
      const { data: galleryData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });

      if (newsData) setNews(newsData);
      if (calendarData) setCalendar(calendarData);
      if (galleryData) setGallery(galleryData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Actions ---

  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    try {
      const { data, error } = await supabase.from('news').insert([item]).select();
      if (error) throw error;
      if (data) setNews(prev => [data[0], ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (e) {
      console.error("Error adding news:", e);
      alert("Fout bij toevoegen nieuws. Ben je ingelogd?");
    }
  };

  const deleteNews = async (id: number) => {
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
      setNews(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error("Error deleting news:", e);
    }
  };

  const addEvent = async (item: Omit<CalendarEvent, 'id'>) => {
    try {
      const { data, error } = await supabase.from('calendar').insert([item]).select();
      if (error) throw error;
      if (data) setCalendar(prev => [...prev, data[0]].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    } catch (e) {
      console.error("Error adding event:", e);
      alert("Fout bij toevoegen event. Ben je ingelogd?");
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      const { error } = await supabase.from('calendar').delete().eq('id', id);
      if (error) throw error;
      setCalendar(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error("Error deleting event:", e);
    }
  };

  const addPhoto = async (item: Omit<GalleryItem, 'id'>) => {
    const dbItem = {
      title: item.title,
      description: item.description,
      location: item.location,
      image_url: item.imageUrl // Map camelCase to snake_case column
    };

    try {
      const { data, error } = await supabase.from('gallery').insert([dbItem]).select();
      if (error) throw error;
      
      // Map back to frontend type
      const newItem: GalleryItem = {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description,
        location: data[0].location,
        imageUrl: data[0].image_url
      };
      
      setGallery(prev => [newItem, ...prev]);
    } catch (e) {
      console.error("Error adding photo:", e);
      alert("Fout bij toevoegen foto. Ben je ingelogd?");
    }
  };

  const deletePhoto = async (id: number) => {
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      setGallery(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error("Error deleting photo:", e);
    }
  };

  return (
    <DataContext.Provider value={{ 
      news, calendar, gallery, loading,
      addNews, deleteNews, 
      addEvent, deleteEvent, 
      addPhoto, deletePhoto 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
