export interface Booking {
  id: string;
  userId: string;
  slotId: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
} 