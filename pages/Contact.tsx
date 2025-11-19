import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-12 text-center">Contacteer Ons</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gegevens</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-school-green">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Adres</h3>
                    <p className="text-gray-600">Kloosterstraat 1<br/>8340 Sijsele</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-school-green">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Telefoon</h3>
                    <p className="text-gray-600">050 12 34 56</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-school-green">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">E-mail</h3>
                    <a href="mailto:info@vrijebasisschoolsijsele.be" className="text-school-orange hover:underline">
                      info@vrijebasisschoolsijsele.be
                    </a>
                  </div>
                </li>
              </ul>
            </div>

             {/* Map Placeholder */}
             <div className="bg-gray-200 h-64 rounded-2xl overflow-hidden relative shadow-sm">
                <iframe 
                  title="School Locatie"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=Kloosterstraat%201%2C%208340%20Sijsele&t=&z=15&ie=UTF8&iwloc=&output=embed"
                ></iframe>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stuur een bericht</h2>
            <p className="text-gray-500 mb-6">Heeft u een vraag of wilt u een afspraak maken? Vul onderstaand formulier in.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent outline-none transition"
                    placeholder="Uw naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent outline-none transition"
                    placeholder="uw@email.be"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Onderwerp</label>
                <select 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent outline-none transition"
                >
                  <option>Algemene vraag</option>
                  <option>Inschrijving</option>
                  <option>Afspraak Directie</option>
                  <option>Zorgvraag</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Bericht</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-green focus:border-transparent outline-none transition"
                  placeholder="Typ hier uw bericht..."
                ></textarea>
              </div>

              <button 
                type="button" // Changed to button to prevent submit in demo
                className="w-full bg-school-green hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md"
              >
                Versturen
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;