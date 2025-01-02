import { TimelineEvent } from '../types/timeline';
import { events2024 } from './events/2024';
import { legacyEvents } from './events/legacy';

export const timelineEvents: TimelineEvent[] = [...events2024, ...legacyEvents];