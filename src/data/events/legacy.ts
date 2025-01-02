import { TimelineEvent } from '../../types/timeline';

export const legacyEvents: TimelineEvent[] = [
  {
    id: '2023-1',
    year: 2023,
    title: 'Alpine Adventure',
    description: 'Hiking through the Swiss Alps',
    type: 'travel',
    location: {
      name: 'Swiss Alps',
      coordinates: [8.2275, 46.8182]
    },
    image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2023-2',
    year: 2023,
    title: 'Italian Summer',
    description: 'Exploring the beautiful cities of Italy',
    type: 'travel',
    location: {
      name: 'Rome, Italy',
      coordinates: [12.4964, 41.9028]
    },
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2020-1',
    year: 2020,
    title: 'Move to Europe',
    description: 'Started a new chapter in Europe',
    type: 'living',
    location: {
      name: 'Amsterdam, Netherlands',
      coordinates: [4.9041, 52.3676]
    },
    image: 'https://images.unsplash.com/photo-1584003564911-a5a0d74c8cf6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2020-2',
    year: 2020,
    title: 'Remote Work Journey',
    description: 'Adapted to the new normal of remote work',
    type: 'work',
    location: {
      name: 'Amsterdam, Netherlands',
      coordinates: [4.9041, 52.3676]
    },
    image: 'https://images.unsplash.com/photo-1585859615722-e4a235c7c7b1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2018-1',
    year: 2018,
    title: 'Kashmir Trek',
    description: 'Trekking through the beautiful valleys of Kashmir',
    type: 'travel',
    location: {
      name: 'Kashmir Valley',
      coordinates: [74.7973, 34.0837]
    },
    image: 'https://images.unsplash.com/photo-1566837497312-7be4c0275773?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2018-2',
    year: 2018,
    title: 'Tech Startup Experience',
    description: 'Joined an exciting tech startup',
    type: 'work',
    location: {
      name: 'Bangalore, India',
      coordinates: [77.5946, 12.9716]
    },
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2017-1',
    year: 2017,
    title: 'Himachal Adventure',
    description: 'Hiking in the Himachal Pradesh mountains',
    type: 'travel',
    location: {
      name: 'Himachal Pradesh',
      coordinates: [77.1734, 31.1048]
    },
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2017-2',
    year: 2017,
    title: 'First Tech Conference',
    description: 'Attended my first major tech conference',
    type: 'achievement',
    location: {
      name: 'Delhi, India',
      coordinates: [77.2090, 28.6139]
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '1994-1',
    year: 1994,
    title: 'Beginning of the Journey',
    description: 'Where it all started',
    type: 'achievement',
    location: {
      name: 'Mumbai, India',
      coordinates: [72.8777, 19.0760]
    },
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1200&q=80'
  }
];