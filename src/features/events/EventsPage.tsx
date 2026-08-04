import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { events, registerForEvent } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredEvents = categoryFilter === 'All'
    ? events
    : events.filter(e => e.category === categoryFilter);

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 border border-orange-400/30 shadow-md text-white">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5" /> Department Events & Webinars
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            CSE Alumni Summits, Hackathons & Workshops
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm max-w-xl font-medium">
            Register for live technical webcasts, global alumni summits, and industry hackathons.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Reunion', 'Workshop', 'Hackathon'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 space-y-2 shadow-xs">
          <Calendar className="w-8 h-8 text-orange-600 mx-auto opacity-80" />
          <p className="font-bold text-zinc-900 text-sm">No events listed currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="bg-white border border-zinc-200 hover:border-orange-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md group transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 border border-zinc-200 text-orange-700 font-bold text-[10px] uppercase backdrop-blur-md shadow-xs">
                    {evt.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-zinc-900 text-base leading-snug group-hover:text-orange-600 transition">{evt.title}</h3>
                  <p className="text-xs text-zinc-600 line-clamp-3">{evt.description}</p>
                  
                  <div className="space-y-1.5 pt-2 border-t border-zinc-100 text-xs text-zinc-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-orange-600" />
                      <span>{new Date(evt.event_date).toLocaleString()}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{evt.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{evt.registered_count || 0} Registrations</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => registerForEvent(evt.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs ${
                    evt.is_registered
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-rose-100 hover:text-rose-700'
                      : 'bg-orange-600 hover:bg-orange-500 text-white'
                  }`}
                >
                  {evt.is_registered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> RSVP Registered (Cancel)
                    </>
                  ) : (
                    'Register / RSVP Now'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
