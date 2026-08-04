import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Calendar, Clock } from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { appointments, bookAppointment } = useAuth();
  const [topic, setTopic] = useState('Senior Thesis Research & Journal Submission Advice');
  const [date, setDate] = useState('2026-08-15T14:00');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment('usr-faculty-1', 'Prof. Alan Turing Jr.', date, topic);
    alert('Appointment requested with Prof. Alan Turing Jr.!');
  };

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 border border-orange-400/30 shadow-md text-white">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5" /> Academic Advising
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Faculty Office Hours & Thesis Counseling
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm max-w-xl font-medium">
            Book official counseling slots with CSE department faculty heads for thesis advising and academic guidance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Booking Form (1 col) */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" /> Book Office Hours Slot
          </h3>

          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Select Faculty Member</label>
              <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500">
                <option value="usr-faculty-1">Prof. Alan Turing Jr. (Department Head)</option>
                <option value="usr-faculty-2">Dr. Margaret Hamilton (Senior Lecturer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Preferred Date & Time</label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Consultation Topic</label>
              <textarea
                required
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="State your thesis paper topic or academic question..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-xs transition"
            >
              Request Counseling Appointment
            </button>
          </form>
        </div>

        {/* Existing Appointments List (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" /> Scheduled Appointments
          </h3>

          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">No appointments scheduled.</p>
            ) : (
              appointments.map((apt) => (
                <div key={apt.id} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900">{apt.faculty_name || 'Faculty Member'}</span>
                    <span className="px-2.5 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200 font-bold text-[10px]">
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs text-orange-700 font-semibold">Topic: {apt.topic}</p>
                  <p className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" /> Date: {new Date(apt.appointment_date).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
