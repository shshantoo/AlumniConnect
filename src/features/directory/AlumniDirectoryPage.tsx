import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, Search, MapPin, GraduationCap, 
  CheckCircle2, Globe, Send 
} from 'lucide-react';
import * as maplibregl from 'maplibre-gl';

const COUNTRY_STOPS = [
  { id: 'cnt-1', name: 'United States', code: 'US', alumni_count: 420, lat: 37.7749, lng: -122.4194 },
  { id: 'cnt-2', name: 'Canada', code: 'CA', alumni_count: 180, lat: 43.6532, lng: -79.3832 },
  { id: 'cnt-3', name: 'United Kingdom', code: 'UK', alumni_count: 130, lat: 51.5074, lng: -0.1278 },
  { id: 'cnt-4', name: 'Germany', code: 'DE', alumni_count: 95, lat: 52.5200, lng: 13.4050 },
  { id: 'cnt-5', name: 'Singapore', code: 'SG', alumni_count: 110, lat: 1.3521, lng: 103.8198 },
  { id: 'cnt-6', name: 'Bangladesh', code: 'BD', alumni_count: 265, lat: 23.8103, lng: 90.4125 }
];

export const AlumniDirectoryPage: React.FC = () => {
  const { alumniProfiles, requestMentorship } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [mentorFilter, setMentorFilter] = useState<boolean | 'All'>('All');

  const [mentorModal, setMentorModal] = useState<typeof alumniProfiles[0] | null>(null);
  const [mentorTopic, setMentorTopic] = useState('Career Guidance & Tech Interview Prep');
  const [mentorMsg, setMentorMsg] = useState('');

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize OpenFreeMap with MapLibre GL
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Use window global or imported module
    const mapLibreInstance = (window as any).maplibregl || maplibregl;

    if (!mapLibreInstance || !mapLibreInstance.Map) return;

    const map = new mapLibreInstance.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/bright',
      center: [15, 25],
      zoom: 1.8,
    });

    map.addControl(new mapLibreInstance.NavigationControl(), 'top-right');

    COUNTRY_STOPS.forEach(cnt => {
      const el = document.createElement('div');
      el.className = 'w-7 h-7 rounded-full bg-[#ff5500] border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-extrabold cursor-pointer hover:scale-110 transition-transform';
      el.innerText = String(cnt.alumni_count);

      const popup = new mapLibreInstance.Popup({ offset: 15 }).setHTML(`
        <div class="p-1 font-sans text-xs">
          <strong class="text-[#ff5500] text-sm font-bold">${cnt.name}</strong><br/>
          <span class="text-zinc-800 font-semibold">${cnt.alumni_count} Active CSE Alumni</span>
        </div>
      `);

      new mapLibreInstance.Marker({ element: el })
        .setLngLat([cnt.lng, cnt.lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  const filteredAlumni = alumniProfiles.filter(alm => {
    const matchesSearch = 
      alm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alm.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alm.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = selectedCountry === 'All' || alm.country === selectedCountry;
    const matchesMentor = mentorFilter === 'All' || alm.mentor === mentorFilter;

    return matchesSearch && matchesCountry && matchesMentor;
  });

  const handleSendMentorship = (e: React.FormEvent) => {
    e.preventDefault();
    if (mentorModal) {
      requestMentorship(mentorModal.user_id, mentorModal.name, mentorModal.company, mentorTopic, mentorMsg);
      setMentorModal(null);
      setMentorMsg('');
      alert(`Mentorship request sent to ${mentorModal.name}!`);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#f8f6f0] border border-[#e5e0d5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div>
          <span className="taste-pill">
            <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
            <span>CSE Directory</span>
            <span className="text-[#ff5500]">Global Hubs →</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] tracking-tight">
          Global CSE Alumni Directory
        </h1>

        <p className="font-serif text-xl sm:text-2xl text-zinc-800 tracking-tight font-normal">
          Interactive Alumni Location Network Powered by OpenFreeMap
        </p>

        <p className="text-[#ff5500] font-semibold text-sm">
          Connect directly with CSE graduates across Google, AWS, Spotify & Stripe.
        </p>
      </div>

      {/* OpenFreeMap Interactive Vector Tile Map */}
      <div className="taste-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-zinc-950 text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#ff5500]" /> OpenFreeMap Vector Tile Map
          </h3>
          <span className="taste-pill">
            OpenFreeMap + MapLibre GL
          </span>
        </div>

        <div ref={mapContainerRef} className="h-72 rounded-xl overflow-hidden border border-[#e5e0d5] z-0" />
      </div>

      {/* Filter Bar */}
      <div className="taste-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, position, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none"
          >
            <option value="All">All Countries</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="Singapore">Singapore</option>
          </select>

          <select
            value={mentorFilter === 'All' ? 'All' : mentorFilter ? 'Available' : 'Unavailable'}
            onChange={(e) => {
              const val = e.target.value;
              setMentorFilter(val === 'All' ? 'All' : val === 'Available');
            }}
            className="bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl px-3 py-2 text-xs text-zinc-800 focus:outline-none"
          >
            <option value="All">Mentorship: Any</option>
            <option value="Available">Mentors Available Only</option>
          </select>
        </div>
      </div>

      {/* Alumni Profiles Grid */}
      {filteredAlumni.length === 0 ? (
        <div className="taste-card p-12 text-center text-zinc-500 space-y-2">
          <Users className="w-8 h-8 text-[#ff5500] mx-auto" />
          <p className="font-bold text-zinc-900 text-sm">No alumni records found.</p>
          <p className="text-xs text-zinc-500">Sign up as an Alumni to appear in the directory!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => (
            <div key={alumni.id} className="taste-card p-5 taste-card-hover group space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={alumni.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt={alumni.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#ff5500]/30 group-hover:scale-105 transition-transform"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-950 text-sm group-hover:text-[#ff5500] transition flex items-center gap-1.5">
                    {alumni.name}
                    {alumni.mentor && (
                      <span title="Verified Mentor">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-[#ff5500] font-semibold">{alumni.position}</p>
                  <p className="text-xs text-zinc-600 font-medium">{alumni.company}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 space-y-2 text-xs text-zinc-500">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#ff5500]" /> Grad Year
                  </span>
                  <span className="font-bold text-zinc-900">{alumni.graduation_year}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff5500]" /> Location
                  </span>
                  <span className="font-medium text-zinc-800">{alumni.city}, {alumni.country}</span>
                </div>
              </div>

              <div className="pt-2">
                {alumni.mentor ? (
                  <button
                    onClick={() => setMentorModal(alumni)}
                    className="btn-black w-full py-2.5 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#ff5500]" /> Request Mentorship
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2 bg-zinc-100 text-zinc-400 rounded-xl text-xs font-semibold cursor-not-allowed"
                  >
                    Mentorship Unavailable
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mentorship Request Modal */}
      {mentorModal && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl animate-scaleUp">
            <h3 className="text-lg font-bold text-zinc-950">Request Mentorship with {mentorModal.name}</h3>
            <p className="text-xs text-[#ff5500] font-semibold">{mentorModal.position} at {mentorModal.company}</p>
            
            <form onSubmit={handleSendMentorship} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">Mentorship Goal / Topic</label>
                <input
                  type="text"
                  required
                  value={mentorTopic}
                  onChange={(e) => setMentorTopic(e.target.value)}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">Introduction Message</label>
                <textarea
                  required
                  rows={4}
                  value={mentorMsg}
                  onChange={(e) => setMentorMsg(e.target.value)}
                  placeholder="Introduce your background and what topics you would like to discuss..."
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setMentorModal(null)}
                  className="btn-white px-4 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-black px-4 py-2 text-xs"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
