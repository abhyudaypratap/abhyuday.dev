import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Globe from './Globe';
import YearSection from './Journey/YearSection';
import { TimelineEvent } from '../types/timeline';
import { Loader2 } from 'lucide-react';
import { timelineEvents } from '../data/timelineEvents';

// Group events by year
const eventsByYear = timelineEvents.reduce((acc, event) => {
  if (!acc[event.year]) {
    acc[event.year] = [];
  }
  acc[event.year].push(event);
  return acc;
}, {} as Record<number, TimelineEvent[]>);

const years = Object.keys(eventsByYear)
  .map(Number)
  .sort((a, b) => b - a);

export default function JourneyPage() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | undefined>();

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Fixed Globe */}
      <div className="w-1/2 h-screen bg-gradient-to-br from-gray-50 to-white">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-800" />
            </div>
          }
        >
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Globe selectedLocation={selectedEvent?.location} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={4}
              maxDistance={8}
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Scrollable Timeline */}
      <div className="w-1/2 h-screen overflow-y-auto bg-gray-900">
        {years.map((year) => (
          <YearSection
            key={year}
            year={year}
            events={eventsByYear[year]}
            onEventSelect={setSelectedEvent}
            selectedEvent={selectedEvent}
          />
        ))}
      </div>
    </div>
  );
}