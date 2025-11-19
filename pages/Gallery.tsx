import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Gallery: React.FC = () => {
  const { gallery } = useData();
  const [filter, setFilter] = useState<'All' | 'De Verrekijker' | 'Kleuter Kloosterstraat' | 'Lagere School'>('All');

  const filteredImages = filter === 'All' 
    ? gallery 
    : gallery.filter(img => img.location === filter || img.location === 'Algemeen');

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Fotogalerij</h1>
        <p className="text-gray-600 mb-8">Een kijkje in onze klassen en activiteiten.</p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {['All', 'De Verrekijker', 'Kleuter Kloosterstraat', 'Lagere School'].map((loc) => (
            <button
              key={loc}
              onClick={() => setFilter(loc as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === loc 
                  ? 'bg-school-orange text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {loc === 'All' ? 'Alle Foto\'s' : loc}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="group relative aspect-w-4 aspect-h-3 rounded-xl overflow-hidden bg-gray-200 cursor-pointer shadow-md">
              <img 
                src={img.imageUrl} 
                alt={img.title} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="inline-block px-2 py-1 bg-school-orange text-white text-xs font-bold rounded mb-2 w-fit">
                  {img.location}
                </span>
                <h3 className="text-white font-bold text-lg">{img.title}</h3>
                {img.description && (
                  <p className="text-gray-300 text-sm mt-1">{img.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12 text-gray-500 italic">
            Geen foto's gevonden in deze categorie.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;