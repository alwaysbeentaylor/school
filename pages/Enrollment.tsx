import React from 'react';
import { CheckCircle, Calendar, Phone } from 'lucide-react';
import { ENTRY_DATES } from '../constants';

const Enrollment: React.FC = () => {
  return (
    <div className="w-full">
       <div className="bg-school-red/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Inschrijven</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Welkom nieuwe kleuter of leerling! We kijken ernaar uit om jullie te ontmoeten.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Intro Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hoe inschrijven?</h2>
            <p className="text-gray-600 mb-4">
              Inschrijven kan doorheen het hele schooljaar op het secretariaat. 
              We raden aan om vooraf even een afspraak te maken, zodat we tijd hebben voor een rondleiding en kennismaking.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-school-green flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">Breng de <strong>ISI+ kaart</strong> of identiteitskaart van het kind mee.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-school-green flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">Kennismakingsgesprek met de directie.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-school-green flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">Rondleiding in de klasjes.</span>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-2">Maak een afspraak</h3>
              <a href="/contact" className="inline-flex items-center text-school-orange font-bold hover:underline">
                <Phone size={18} className="mr-2" /> Contacteer ons
              </a>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-school-orange w-8 h-8" />
              <h2 className="text-2xl font-bold text-gray-900">Instapdata Peuters</h2>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Kleuters mogen naar school komen vanaf de leeftijd van 2,5 jaar op de volgende instapdata:
            </p>
            <ul className="space-y-3">
              {ENTRY_DATES.map((date, idx) => (
                <li key={idx} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="w-2 h-2 bg-school-orange rounded-full mr-3"></span>
                  <span className="text-gray-800 font-medium">{date}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-6">
              * Is uw kind al 3 jaar? Dan mag het op elke schooldag starten.
            </p>
          </div>
        </div>

        {/* Belevingsbox Section (Explicitly requested) */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 h-64 md:h-auto bg-gray-100 relative">
             {/* Image: Cozy home setting for the box */}
             <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop" 
                alt="Belevingsbox" 
                className="absolute inset-0 w-full h-full object-cover"
              />
          </div>
          <div className="p-8 md:w-2/3">
            <h3 className="text-2xl font-bold text-school-red mb-4">De Belevingsbox</h3>
            <p className="text-gray-600 mb-6">
              Nieuwsgierig naar onze school? Vraag onze <strong>Belevingsbox</strong> aan! 
              In deze doos vinden jullie peuter en uzelf leuke spulletjes en informatie om alvast kennis te maken met de sfeer van Sint-Maarten, gewoon thuis in de woonkamer.
            </p>
            <button className="bg-school-red text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
              Vraag de box aan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Enrollment;