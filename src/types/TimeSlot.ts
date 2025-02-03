export interface TimeSlot {
  _id: string;
  courtId: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}