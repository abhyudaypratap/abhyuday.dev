import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { TimelineEvent } from '../types/timeline';

interface TimelineProps {
  events: TimelineEvent[];
  onEventSelect: (event: TimelineEvent) => void;
  selectedEvent?: TimelineEvent;
}

const TimelineEventCard = ({ 
  event, 
  isSelected, 
  onSelect 
}: { 
  event: TimelineEvent; 
  isSelected: boolean; 
  onSelect: (event: TimelineEvent) => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`glass-panel rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-white' : ''
      }`}
      onClick={() => onSelect(event)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">{event.title}</span>
          <span className="text-gray-400 text-sm">{event.year}</span>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {event.location.name}
        </div>
      </div>
    </motion.div>
  );
};

export default function Timeline({ events, onEventSelect, selectedEvent }: TimelineProps) {
  const sortedEvents = [...events].sort((a, b) => b.year - a.year);

  return (
    <div className="glass-panel m-6 p-6 rounded-2xl">
      <div className="timeline-container overflow-x-auto">
        <div className="flex space-x-4">
          {sortedEvents.map((event) => (
            <div key={event.id} className="flex-none w-64">
              <TimelineEventCard
                event={event}
                isSelected={selectedEvent?.id === event.id}
                onSelect={onEventSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}