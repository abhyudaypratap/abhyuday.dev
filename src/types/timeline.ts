export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  location: {
    name: string;
    coordinates: [number, number];
  };
  type: 'travel' | 'living' | 'education' | 'work' | 'achievement';
  image?: string;
}