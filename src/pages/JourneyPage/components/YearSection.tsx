import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { TimelineEvent } from '../../../types/timeline';

interface YearSectionProps {
  year: number;
  events: TimelineEvent[];
  onEventSelect: (event: TimelineEvent) => void;
  selectedEvent?: TimelineEvent;
}

export default function YearSection({
  year,
  events,
  onEventSelect,
  selectedEvent,
}: YearSectionProps) {
  const selectedEventForYear = events.find((e) => e.id === selectedEvent?.id);
  const displayImage = selectedEventForYear?.image || events[0]?.image;

  return (
    <div className="min-h-screen relative p-12">
      {/* Year Header */}
      <h2 className="text-[12rem] font-bold text-white/5 absolute top-0 right-8 pointer-events-none select-none">
        {year}
      </h2>

      {/* Featured Image */}
      {displayImage && (
        <div className="relative h-[60vh] w-full mb-8 overflow-hidden rounded-2xl">
          <img
            src={displayImage}
            alt={selectedEventForYear?.title || `Events from ${year}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-xl cursor-pointer p-6 transition-all duration-300 backdrop-blur-lg ${
              selectedEvent?.id === event.id
                ? 'bg-white/10 ring-1 ring-white/20 translate-x-4'
                : 'bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => onEventSelect(event)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-1">
                  {event.title}
                </h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{event.location.name}</span>
                </div>
              </div>
              <span className="text-sm text-gray-300 px-3 py-1 rounded-full bg-white/10 font-medium">
                {event.type}
              </span>
            </div>
            <p className="text-gray-300">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}