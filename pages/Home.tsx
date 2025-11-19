import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Utensils, Users, BookOpen } from 'lucide-react';
import { TRAITEUR_URL } from '../constants';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { news } = useData();

  // Filter valid news items and slice to top 3
  const today = new Date();
  const recentNews = news
    .filter(item => !item.validUntil || new Date(item.validUntil) >= today)
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section with Wave */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          {/* Image: Damse Vaart / Polder landscape style to emphasize Sijsele/Damme region */}
          <img 
            src="https://images.unsplash.com/photo-1605128358965-745855262d91?q=80&w=2070&auto=format&fit=crop" 
            alt="Sfeerbeeld Damme en omgeving" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-school-blue/80 via-school-blue/40 to-transparent"></div>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white pb-20">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-block px-4 py-1 rounded-full bg-school-yellow/90 text-school-blue font-bold text-sm mb-4 shadow-lg">
              Welkom op onze school
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 leading-tight">
              Groei begint waar je je <span className="text-school-yellow">thuis</span> voelt
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light text-blue-50 max-w-2xl">
              Een warme plek waar elk talent telt. Samen bouwen we aan de toekomst in een groene en stimulerende omgeving.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/inschrijven" className="bg-school-red hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-school-red/50 hover:-translate-y-1 flex items-center gap-2">
                Inschrijven <ArrowRight size={20} />
              </Link>
              <Link to="/school" className="bg-white hover:bg-gray-100 text-school-blue px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:-translate-y-1">
                Ontdek onze visie
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-white">
             <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Quick Links - The 4 Pillars Color Scheme */}
      <section className="relative z-10 -mt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickLinkCard 
              to={TRAITEUR_URL} 
              external 
              icon={<Utensils className="w-8 h-8" />}
              title="Weekmenu"
              description="Gezonde maaltijden"
              color="yellow"
            />
            <QuickLinkCard 
              to="/praktisch" 
              icon={<Calendar className="w-8 h-8" />}
              title="Kalender"
              description="Vrije dagen & events"
              color="green"
            />
            <QuickLinkCard 
              to="/school" 
              icon={<Users className="w-8 h-8" />}
              title="Het Team"
              description="Onze leerkrachten"
              color="blue"
            />
            <QuickLinkCard 
              to="/inschrijven" 
              icon={<BookOpen className="w-8 h-8" />}
              title="De Verrekijker"
              description="Peuterinstap"
              color="red"
            />
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-school-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-school-red font-bold tracking-wider uppercase text-sm">Blijf op de hoogte</span>
              <h2 className="text-4xl font-heading font-extrabold text-gray-900 mt-2">Nieuws uit de klas</h2>
            </div>
            <Link to="/nieuws" className="hidden md:flex items-center text-school-blue font-bold hover:text-school-yellow transition-colors bg-white px-6 py-3 rounded-full shadow-sm">
              Alle berichten <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((item) => (
              <div key={item.id} className="group flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-school-blue shadow-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wide">
                     {new Date(item.date).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long' })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-school-red transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {item.summary}
                  </p>
                  <Link to="/nieuws" className="text-school-blue font-bold text-sm inline-flex items-center group-hover:translate-x-2 transition-transform">
                    Lees verder <ArrowRight size={16} className="ml-2 text-school-yellow" />
                  </Link>
                </div>
              </div>
            ))}
            
            {recentNews.length === 0 && (
              <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300">
                <p className="text-gray-400 italic">Er zijn momenteel geen nieuwsberichten.</p>
              </div>
            )}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/nieuws" className="inline-flex items-center justify-center w-full bg-white text-school-blue font-bold py-4 rounded-xl shadow-sm">
               Bekijk alle berichten
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface QuickLinkCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  external?: boolean;
  color: 'red' | 'green' | 'yellow' | 'blue';
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ to, icon, title, description, external, color }) => {
  const colorStyles = {
    red: 'border-school-red text-school-red bg-red-50 group-hover:bg-school-red group-hover:text-white',
    green: 'border-school-green text-school-green bg-green-50 group-hover:bg-school-green group-hover:text-white',
    yellow: 'border-school-yellow text-school-yellow bg-yellow-50 group-hover:bg-school-yellow group-hover:text-white',
    blue: 'border-school-blue text-school-blue bg-blue-50 group-hover:bg-school-blue group-hover:text-white',
  };

  const Content = (
    <>
      <div className={`mb-4 rounded-2xl p-4 transition-colors duration-300 ${colorStyles[color]}`}>
        {React.cloneElement(icon as React.ReactElement, { 
          className: "w-8 h-8 transition-colors duration-300" 
        })}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-school-blue transition-colors">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </>
  );

  const containerClasses = `group bg-white p-8 rounded-3xl shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 border-b-4 flex flex-col items-center text-center h-full ${
    color === 'red' ? 'border-school-red' : 
    color === 'green' ? 'border-school-green' : 
    color === 'yellow' ? 'border-school-yellow' : 'border-school-blue'
  }`;

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={containerClasses}>
        {Content}
      </a>
    );
  }

  return (
    <Link to={to} className={containerClasses}>
      {Content}
    </Link>
  );
};

export default Home;