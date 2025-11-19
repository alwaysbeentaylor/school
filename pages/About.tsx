import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import { Heart, Users, Star, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-school-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Onze School</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Een plek waar leren, leven en groeien hand in hand gaan.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visie & Missie</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  VBS Sint-Maarten is een katholieke dialoogschool. We staan open voor iedereen, ongeacht afkomst of overtuiging, 
                  vanuit een christelijke inspiratie. Onze kernwaarden zijn respect, verbondenheid en zorgzaamheid.
                </p>
                <p>
                  Wij geloven in de kracht van elk kind. Ons doel is om een stimulerende leeromgeving te bieden 
                  waarin kinderen niet alleen kennis vergaren, maar ook sociale vaardigheden ontwikkelen en zichzelf leren kennen.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <Feature icon={<Heart className="text-school-red" />} title="Hartelijk" text="Een warme sfeer staat centraal." />
                <Feature icon={<Star className="text-school-orange" />} title="Talent" text="Oog voor ieders sterktes." />
                <Feature icon={<Shield className="text-school-green" />} title="Veilig" text="Een plek om jezelf te zijn." />
                <Feature icon={<Users className="text-blue-500" />} title="Samen" text="Ouders als partners." />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-school-orange/20 rounded-2xl transform rotate-3"></div>
              {/* Image: Historic / Recognizable Brugge architecture to anchor location */}
              <img 
                src="https://images.unsplash.com/photo-1566320976755-4a445596e509?q=80&w=1000&auto=format&fit=crop" 
                alt="Sfeerbeeld omgeving Brugge" 
                className="relative rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Ons Team</h2>
            <p className="text-gray-600 mt-2">De drijvende krachten achter onze school</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow text-center pb-6">
                <div className="h-48 w-full overflow-hidden bg-gray-200">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-school-orange font-medium text-sm">{member.role}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                    {member.group}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ouderwerkgroep Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ouderwerkgroep</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Onze school kan rekenen op een fantastische groep ouders die de handen uit de mouwen steken tijdens schoolfeesten, 
            klusjesdagen en andere activiteiten. Wilt u ook uw steentje bijdragen?
          </p>
          <a href="mailto:ouderraad@vrijebasisschoolsijsele.be" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Neem contact op
          </a>
        </div>
      </section>
    </div>
  );
};

const Feature = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="flex flex-col items-start p-4 bg-gray-50 rounded-lg">
    <div className="mb-2 p-2 bg-white rounded-md shadow-sm">{icon}</div>
    <h4 className="font-bold text-gray-900">{title}</h4>
    <p className="text-sm text-gray-600">{text}</p>
  </div>
);

export default About;