
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { supabase } from '../supabaseClient';
import { Trash2, Plus, Calendar, Image, Newspaper, Lock, LogOut, Loader2, AlertTriangle } from 'lucide-react';

const Admin: React.FC = () => {
  const { 
    news, addNews, deleteNews,
    calendar, addEvent, deleteEvent,
    gallery, addPhoto, deletePhoto,
    loading
  } = useData();

  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'news' | 'calendar' | 'gallery'>('news');
  const [isConfigured, setIsConfigured] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const env = (import.meta as any).env || {};
    
    // Als Supabase URL ontbreekt, blokkeer auth calls om netwerk errors te voorkomen
    if (!env.VITE_SUPABASE_URL) {
      setIsConfigured(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Login mislukt: ' + error.message);
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Als Supabase niet is ingesteld
  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center border-l-4 border-school-yellow">
          <div className="mb-4 flex justify-center">
            <AlertTriangle size={48} className="text-school-yellow" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Supabase Niet Geconfigureerd</h1>
          <p className="text-gray-600 mb-6">
            Er is geen database verbinding gevonden. Het admin-paneel werkt pas als je de <code>VITE_SUPABASE_URL</code> en <code>VITE_SUPABASE_ANON_KEY</code> instelt in je .env bestand.
          </p>
          <p className="text-sm text-gray-400">
            De publieke website werkt wel gewoon met voorbeeld data.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-red-100 rounded-full text-school-red">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-gray-500 mb-6">Log in met je directie account.</p>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-school-red"
            placeholder="Email adres"
            required
          />
           <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-school-red"
            placeholder="Wachtwoord"
            required
          />
          <button 
            type="submit" 
            disabled={authLoading}
            className="w-full bg-school-red text-white font-bold py-2 rounded-lg hover:bg-red-700 transition flex justify-center items-center gap-2"
          >
            {authLoading ? <Loader2 className="animate-spin" size={20} /> : 'Inloggen'}
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Nog geen account? Vraag de ontwikkelaar om een invite.
          </p>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-school-blue" size={48} /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gray-900 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Beheerders Dashboard</h1>
            <p className="text-xs text-gray-400">Ingelogd als: {session.user.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-2 rounded hover:bg-gray-700 transition">
            <LogOut size={16} /> Uitloggen
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('news')} 
            className={`pb-3 px-4 font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === 'news' ? 'text-school-red border-b-2 border-school-red' : 'text-gray-500'}`}
          >
            <Newspaper size={18} /> Nieuws
          </button>
          <button 
            onClick={() => setActiveTab('calendar')} 
            className={`pb-3 px-4 font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === 'calendar' ? 'text-school-orange border-b-2 border-school-orange' : 'text-gray-500'}`}
          >
            <Calendar size={18} /> Kalender
          </button>
          <button 
            onClick={() => setActiveTab('gallery')} 
            className={`pb-3 px-4 font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === 'gallery' ? 'text-school-green border-b-2 border-school-green' : 'text-gray-500'}`}
          >
            <Image size={18} /> Foto's
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Add Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus size={20} className="text-school-green" /> Nieuw Toevoegen
              </h2>
              
              {activeTab === 'news' && <NewsForm onAdd={addNews} />}
              {activeTab === 'calendar' && <CalendarForm onAdd={addEvent} />}
              {activeTab === 'gallery' && <GalleryForm onAdd={addPhoto} />}
            </div>
          </div>

          {/* Right: List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Huidige Items</h2>
            
            {activeTab === 'news' && (
              <div className="space-y-4">
                {news.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-500">Datum: {item.date} | Geldig tot: {item.validUntil}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{item.summary}</p>
                    </div>
                    <button onClick={() => deleteNews(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-2">
                 {calendar.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center border-l-4 border-school-orange">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-16">
                        <div className="text-xs text-gray-500 uppercase font-bold">{new Date(item.date).toLocaleString('nl-BE', { month: 'short' })}</div>
                        <div className="text-xl font-bold text-gray-800">{new Date(item.date).getDate()}</div>
                      </div>
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.type}</span>
                      </div>
                    </div>
                    <button onClick={() => deleteEvent(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid grid-cols-2 gap-4">
                {gallery.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group relative">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
                    <div className="p-2">
                      <h4 className="font-bold text-sm truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.location}</p>
                    </div>
                    <button onClick={() => deletePhoto(item.id)} className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Forms (kept largely the same but with handling promises) ---

const NewsForm = ({ onAdd }: { onAdd: (i: any) => Promise<void> }) => {
  const [form, setForm] = useState({ title: '', date: new Date().toISOString().split('T')[0], validUntil: '', summary: '', category: 'Algemeen', image: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random()*100) });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(form);
    setLoading(false);
    setForm({ ...form, title: '', summary: '', image: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random()*100) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input required className="w-full border rounded p-2" placeholder="Titel" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500">Publicatiedatum</label>
          <input required type="date" className="w-full border rounded p-2" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
        </div>
        <div>
          <label className="text-xs text-gray-500">Zichtbaar tot (auto-verwijder)</label>
          <input required type="date" className="w-full border rounded p-2" value={form.validUntil} onChange={e => setForm({...form, validUntil: e.target.value})} />
        </div>
      </div>
      <select className="w-full border rounded p-2" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
        <option>Algemeen</option>
        <option>Kleuter</option>
        <option>Lager</option>
      </select>
      <textarea required className="w-full border rounded p-2" placeholder="Korte samenvatting" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} />
      <input className="w-full border rounded p-2 text-sm" placeholder="Afbeelding URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
      <button type="submit" disabled={loading} className="w-full bg-school-red text-white py-2 rounded hover:bg-red-700 font-bold flex justify-center">
        {loading ? <Loader2 className="animate-spin" /> : 'Plaats Nieuwsbericht'}
      </button>
    </form>
  );
};

const CalendarForm = ({ onAdd }: { onAdd: (i: any) => Promise<void> }) => {
  const [form, setForm] = useState({ title: '', date: '', type: 'Activiteit', description: '', startTime: '', endTime: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(form);
    setLoading(false);
    setForm({ title: '', date: '', type: 'Activiteit', description: '', startTime: '', endTime: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input required className="w-full border rounded p-2" placeholder="Titel Evenement" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
      <input required type="date" className="w-full border rounded p-2" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
      <div className="grid grid-cols-2 gap-2">
        <input type="time" className="w-full border rounded p-2" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} placeholder="Start" />
        <input type="time" className="w-full border rounded p-2" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} placeholder="Eind" />
      </div>
      <select className="w-full border rounded p-2" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
        <option>Activiteit</option>
        <option>Vakantie</option>
        <option>Vrije Dag</option>
      </select>
      <input className="w-full border rounded p-2" placeholder="Locatie / Beschrijving" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      <button type="submit" disabled={loading} className="w-full bg-school-orange text-white py-2 rounded hover:bg-orange-700 font-bold flex justify-center">
         {loading ? <Loader2 className="animate-spin" /> : 'Voeg Evenement Toe'}
      </button>
    </form>
  );
};

const GalleryForm = ({ onAdd }: { onAdd: (i: any) => Promise<void> }) => {
  const [form, setForm] = useState({ title: '', description: '', location: 'Algemeen', imageUrl: 'https://picsum.photos/600/400?random=' + Math.floor(Math.random()*100) });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(form);
    setLoading(false);
    setForm({ ...form, title: '', description: '', imageUrl: 'https://picsum.photos/600/400?random=' + Math.floor(Math.random()*100) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input required className="w-full border rounded p-2" placeholder="Titel Foto" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
      <input className="w-full border rounded p-2" placeholder="Beschrijving (optioneel)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      <select className="w-full border rounded p-2" value={form.location} onChange={e => setForm({...form, location: e.target.value})}>
        <option>Algemeen</option>
        <option>De Verrekijker</option>
        <option>Kleuter Kloosterstraat</option>
        <option>Lagere School</option>
      </select>
      <input className="w-full border rounded p-2 text-sm" placeholder="Afbeelding URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
      <button type="submit" disabled={loading} className="w-full bg-school-green text-white py-2 rounded hover:bg-green-700 font-bold flex justify-center">
        {loading ? <Loader2 className="animate-spin" /> : 'Upload Foto'}
      </button>
    </form>
  );
};

export default Admin;
