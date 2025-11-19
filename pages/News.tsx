import React from 'react';
import { useData } from '../context/DataContext';

const News: React.FC = () => {
  const { news } = useData();
  const today = new Date();

  // Filter expired news
  const validNews = news.filter(item => !item.validUntil || new Date(item.validUntil) >= today);

  return (
    <div className="w-full py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8">Nieuws & Actualiteit</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validNews.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col">
              <div className="relative h-56">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                 <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                    {new Date(item.date).toLocaleDateString('nl-BE')}
                  </div>
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-school-orange bg-orange-50 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h2>
                <p className="text-gray-600 mb-4">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback if empty */}
        {validNews.length === 0 && (
           <div className="text-center py-20 text-gray-500">
             Er zijn momenteel geen actuele nieuwsberichten.
           </div>
        )}
      </div>
    </div>
  );
};

export default News;