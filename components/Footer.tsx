import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Lock, ArrowRight } from 'lucide-react';
import { SchoolLogo } from './Navbar';

const Footer: React.FC = () => {
  return (
    <footer className="bg-school-blue text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Branding */}
          <div className="md:col-span-5">
            <div className="mb-6 bg-white p-3 rounded-xl inline-block">
              <SchoolLogo className="h-12" />
            </div>
            <p className="text-blue-100 leading-relaxed mb-6 max-w-sm">
              Een warme school waar elk kind telt. Wij bouwen samen aan de toekomst in een groene en stimulerende omgeving.
            </p>
            <div className="flex gap-4">
              {/* Socials placeholder */}
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-school-yellow hover:text-school-blue transition-colors flex items-center justify-center cursor-pointer">
                <span className="font-bold">Fb</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-school-red hover:text-white transition-colors flex items-center justify-center cursor-pointer">
                <span className="font-bold">Ig</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-heading font-bold mb-6 text-school-yellow">Ontdek</h3>
            <ul className="space-y-3 text-blue-100">
              <li><Link to="/inschrijven" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={14}/> Inschrijven</Link></li>
              <li><Link to="/school" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={14}/> Ons Team</Link></li>
              <li><Link to="/praktisch" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={14}/> Kalender</Link></li>
              <li><Link to="/nieuws" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={14}/> Nieuws</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-heading font-bold mb-6 text-school-yellow">Contact</h3>
            <ul className="space-y-4 text-blue-100">
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg text-school-yellow">
                  <MapPin size={20} />
                </div>
                <span>Kloosterstraat 1<br/>8340 Sijsele</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-lg text-school-green">
                  <Phone size={20} />
                </div>
                <span>050 12 34 56</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-lg text-school-red">
                  <Mail size={20} />
                </div>
                <a href="mailto:info@vrijebasisschoolsijsele.be" className="hover:text-white border-b border-transparent hover:border-white transition-all">info@vrijebasisschoolsijsele.be</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} VBS Sint-Maarten Sijsele.</p>
          <Link to="/admin" className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 hover:bg-blue-900 hover:text-white transition-colors">
            <Lock size={14} /> Directie Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;