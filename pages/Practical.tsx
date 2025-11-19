import React, { useState } from 'react';
import { FileText, Clock, Download, ExternalLink, Calendar as CalendarIcon } from 'lucide-react';
import { DOCUMENTS, TRAITEUR_URL } from '../constants';
import { useData } from '../context/DataContext';
import { CalendarEvent } from '../types';

const Practical: React.FC = () => {
  const { calendar } = useData();
  const [activeTab, setActiveTab] = useState<'general' | 'docs' | 'calendar'>('calendar'); // Default to calendar for this demo

  const handleAddToGoogleCalendar = (event: CalendarEvent) => {
    const startTime = event.startTime ? event.startTime.replace(':', '') + '00' : '090000';
    const endTime = event.endTime ? event.endTime.replace(':', '') + '00' : '170000';
    const dateStr = event.date.replace(/-/g, '');
    
    const details = event.description || event.type;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${dateStr}T${startTime}/${dateStr}T${endTime}&details=${encodeURIComponent(details)}&location=VBS+Sint-Maarten`;
    window.open(url, '_blank');
  };

  const handleDownloadICS = (event: CalendarEvent) => {
    const startTime = event.startTime ? event.startTime.replace(':', '') + '00' : '090000';
    const endTime = event.endTime ? event.endTime.replace(':', '') + '00' : '170000';
    const dateStr = event.date.replace(/-/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${dateStr}T${startTime}`,
      `DTEND:${dateStr}T${endTime}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description || event.type}`,
      'LOCATION:VBS Sint-Maarten',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8 text-center">Praktische Informatie</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 space-x-2 sm:space-x-4">
          <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} label="Uurregeling & Opvang" />
          <TabButton active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} label="Kalender" />
          <TabButton active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} label="Documenten" />
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 min-h-[400px]">
          
          {/* General Info Tab */}
          {activeTab === 'general' && (
            <div className="animate-fade-in space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-school-green w-6 h-6" />
                    <h2 className="text-2xl font-bold text-gray-900">Schooluren</h2>
                  </div>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold">Voormiddag</span>
                      <span>08:30 - 11:55</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold">Namiddag (ma, di, do)</span>
                      <span>13:10 - 15:45</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold">Namiddag (vr)</span>
                      <span>13:10 - 15:00</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold">Woensdag</span>
                      <span>08:30 - 11:55</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      De poort gaat open om 08:15. Gelieve op tijd aanwezig te zijn.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-school-orange flex items-center justify-center text-white text-xs font-bold">V</div>
                    <h2 className="text-2xl font-bold text-gray-900">Opvang "De Verrekijker"</h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Voor- en naschoolse opvang wordt georganiseerd voor kleuters in de Verrekijker.
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li><strong>Ochtend:</strong> Vanaf 07:00</li>
                    <li><strong>Avond:</strong> Tot 18:00</li>
                    <li><strong>Woensdagmiddag:</strong> Tot 18:00</li>
                  </ul>
                  <a href="#" className="text-school-orange font-medium hover:underline">
                    Download het huishoudelijk reglement opvang &rarr;
                  </a>
                </div>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Warme Maaltijden</h2>
                <p className="text-gray-600 mb-4">
                  Wij werken samen met traiteur Hanssens voor gezonde en gevarieerde warme maaltijden.
                  Ouders kunnen het menu online raadplegen.
                </p>
                <a 
                  href={TRAITEUR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-school-green hover:bg-green-700"
                >
                  Bekijk het Menu <ExternalLink size={18} className="ml-2" />
                </a>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Schoolkalender</h2>
                  <p className="text-sm text-gray-500">Bekijk de komende evenementen en voeg ze toe aan je eigen agenda.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {calendar.length === 0 && (
                   <p className="text-gray-500 italic text-center py-8">Geen aankomende evenementen gepland.</p>
                )}
                {calendar.map((event) => (
                  <div key={event.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-school-orange transition-colors shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    
                    {/* Date & Info */}
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-16 text-center rounded-lg p-2 ${
                         event.type === 'Vakantie' ? 'bg-green-50 text-green-700' : 
                         event.type === 'Vrije Dag' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        <span className="block text-xs font-bold uppercase">{new Date(event.date).toLocaleString('nl-BE', { month: 'short' })}</span>
                        <span className="block text-2xl font-bold">{new Date(event.date).getDate()}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            event.type === 'Vakantie' ? 'bg-green-100 text-green-800' : 
                            event.type === 'Vrije Dag' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="text-gray-600 text-sm flex flex-col gap-1">
                          {event.startTime && (
                             <span className="flex items-center gap-1"><Clock size={14}/> {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}</span>
                          )}
                          {event.description && (
                            <span>{event.description}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full md:w-auto">
                      <button 
                        onClick={() => handleAddToGoogleCalendar(event)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
                        title="Toevoegen aan Google Calendar"
                      >
                        <CalendarIcon size={14} /> Google
                      </button>
                      <button 
                        onClick={() => handleDownloadICS(event)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
                        title="Download voor Outlook/Apple"
                      >
                        <Download size={14} /> Outlook/iCal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'docs' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Documenten & Downloads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-school-orange transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded text-gray-500 group-hover:text-school-orange group-hover:bg-orange-50 transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <span className="text-xs text-gray-500">{doc.category}</span>
                      </div>
                    </div>
                    <a 
                      href={doc.downloadUrl} 
                      className="text-gray-400 hover:text-school-orange"
                      title="Downloaden"
                    >
                      <Download size={20} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-t-lg font-medium text-sm sm:text-base transition-colors ${
      active 
        ? 'bg-white text-school-red border-b-2 border-school-red shadow-sm' 
        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
    }`}
  >
    {label}
  </button>
);

export default Practical;