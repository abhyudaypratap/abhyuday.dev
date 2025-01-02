import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { timelineEvents } from '../data/timelineEvents';
import { useState } from 'react';

interface ExpandedEvent {
  id: string;
  isExpanded: boolean;
}

export default function YearOverview() {
  const { year } = useParams();
  const yearEvents = timelineEvents.filter(
    (event) => event.year === Number(year)
  );
  const [expandedEvents, setExpandedEvents] = useState<ExpandedEvent[]>([]);

  const toggleEvent = (eventId: string) => {
    setExpandedEvents((prev) => {
      const existingEvent = prev.find((e) => e.id === eventId);
      if (existingEvent) {
        return prev.map((e) =>
          e.id === eventId ? { ...e, isExpanded: !e.isExpanded } : e
        );
      }
      return [...prev, { id: eventId, isExpanded: true }];
    });
  };

  const isEventExpanded = (eventId: string) => {
    return expandedEvents.find((e) => e.id === eventId)?.isExpanded || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-5xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/journey" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Journey</span>
            </Link>
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8 text-blue-400" />
              <h1 className="text-5xl font-bold text-white">{year}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="relative pt-24 pb-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {yearEvents.map((event) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <div
                  className="p-8 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => toggleEvent(event.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-4 text-white">
                        {event.title}
                      </h2>
                      <div className="flex items-center text-gray-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location.name}</span>
                      </div>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                    <div className="ml-4">
                      {isEventExpanded(event.id) ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isEventExpanded(event.id) && event.image && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-[60vh] w-full">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                      </div>
                      <div className="p-8 bg-black/20">
                        <h3 className="text-xl font-semibold mb-4 text-white">
                          About this moment
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}