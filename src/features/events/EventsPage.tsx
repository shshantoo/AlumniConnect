import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, MapPin, Users, CheckCircle2, Plus, 
  Trash2, Edit3, Eye, EyeOff, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { EventRecord } from '../../types/database.types';

export const EventsPage: React.FC = () => {
  const { 
    events, registerForEvent, currentRole, 
    createEvent, editEvent, deleteEvent, togglePublishEvent 
  } = useAuth();

  const [categoryFilter, setCategoryFilter] = useState('All');

  // Admin Event Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    category: 'Workshop' as 'Reunion' | 'Workshop' | 'Hackathon' | 'Webinar',
    image: '',
    is_published: true
  });

  const handleOpenCreateModal = () => {
    setEditingEventId(null);
    setEventForm({
      title: '',
      description: '',
      event_date: new Date().toISOString().slice(0, 16),
      location: 'IUB Campus & Zoom Webcast',
      category: 'Workshop',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      is_published: true
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditModal = (evt: EventRecord) => {
    setEditingEventId(evt.id);
    setEventForm({
      title: evt.title,
      description: evt.description,
      event_date: evt.event_date ? new Date(evt.event_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
      location: evt.location,
      category: evt.category,
      image: evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      is_published: evt.is_published !== false
    });
    setIsEventModalOpen(true);
  };

  const handleEventFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEventId) {
      editEvent(editingEventId, eventForm);
    } else {
      createEvent(eventForm);
    }
    setIsEventModalOpen(false);
  };

  const visibleEvents = events.filter(e => {
    const isCategoryMatch = categoryFilter === 'All' || e.category === categoryFilter;
    const isAccessAllowed = currentRole === 'admin' || e.is_published !== false;
    return isCategoryMatch && isAccessAllowed;
  });

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 border border-orange-400/30 shadow-md text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5" /> Department Events & Global Summits
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            CSE Alumni Summits, Hackathons & Workshops
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm max-w-xl font-medium">
            Register for live technical webcasts, global alumni summits, and industry hackathons.
          </p>
        </div>

        {/* Admin Create Event Trigger (Admin Only) */}
        {currentRole === 'admin' && (
          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-[#ff5500]" /> Create New Event
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Reunion', 'Workshop', 'Hackathon', 'Webinar'].map(cat => (
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

        {currentRole === 'admin' && (
          <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Admin Governance Mode
          </span>
        )}
      </div>

      {/* Events Grid */}
      {visibleEvents.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 space-y-3 shadow-xs">
          <Calendar className="w-10 h-10 text-zinc-300 mx-auto" />
          <h3 className="text-base font-bold text-zinc-800">No Events Scheduled</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {currentRole === 'admin' 
              ? 'Click "Create New Event" above to publish your first department event!' 
              : 'Check back soon for upcoming CSE departmental summits and workshops.'}
          </p>
          {currentRole === 'admin' && (
            <button
              onClick={handleOpenCreateModal}
              className="btn-black px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 shadow-md mt-2"
            >
              <Plus className="w-4 h-4 text-[#ff5500]" /> Add Event Now
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleEvents.map((evt) => (
            <div key={evt.id} className="taste-card p-5 bg-white border border-[#e5e0d5] space-y-4 flex flex-col justify-between relative overflow-hidden group">
              
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden bg-zinc-100">
                  <img
                    src={evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#0a0a0a]/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-bold text-[10px] uppercase tracking-wider">
                    {evt.category}
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-[#0a0a0a] line-clamp-1">{evt.title}</h3>
                  <p className="text-xs text-zinc-600 line-clamp-2 mt-1 leading-relaxed">{evt.description}</p>
                </div>

                <div className="space-y-1.5 pt-1 text-xs text-zinc-600 border-t border-zinc-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{new Date(evt.event_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{evt.registered_count || 0} Participants Registered</span>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="pt-3 border-t border-zinc-100 space-y-2">
                <button
                  onClick={() => registerForEvent(evt.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs ${
                    evt.is_registered
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'btn-black'
                  }`}
                >
                  {evt.is_registered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Registered
                    </>
                  ) : (
                    'Register for Event'
                  )}
                </button>

                {/* Admin Event Management Controls (Admin Only) */}
                {currentRole === 'admin' && (
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${evt.is_published !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {evt.is_published !== false ? 'Published' : 'Unpublished'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => togglePublishEvent(evt.id)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                        title={evt.is_published !== false ? 'Unpublish Event' : 'Publish Event'}
                      >
                        {evt.is_published !== false ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(evt)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                        title="Edit Event"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                      </button>

                      <button
                        onClick={() => deleteEvent(evt.id)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-rose-100 text-rose-600"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ADMIN EVENT MODAL (CREATE / EDIT) */}
      {isEventModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e5e0d5] rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-scaleUp text-xs text-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-extrabold text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
                {editingEventId ? 'Edit Event (Admin)' : 'Create New Event (Admin)'}
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-zinc-500 hover:text-zinc-800">✕</button>
            </div>

            <form onSubmit={handleEventFormSubmit} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual CSE Alumni Tech Summit 2026"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category *</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value as any })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                  >
                    <option value="Reunion">Reunion</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Webinar">Webinar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={eventForm.event_date}
                    onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Location / Venue *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Auditorium A, IUB Campus / Zoom Link"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Image Banner URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={eventForm.image}
                  onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Event Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Full details of speakers, topics, and registration requirements..."
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                />
              </div>

              <button
                type="submit"
                className="btn-black w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
              >
                {editingEventId ? 'Update Event & Publish' : 'Create & Publish Event'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
