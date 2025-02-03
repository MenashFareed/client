export interface Court {
  _id: string;
  name: string;
  type: 'tennis' | 'squash';
  location: string;
  hourlyRate: number;
  description?: string;
  images: string[];
  status: 'available' | 'maintenance' | 'blocked';
} 