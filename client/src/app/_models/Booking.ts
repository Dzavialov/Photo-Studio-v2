export interface Booking {
  id: number;
  bookFrom: Date;
  bookTo: Date;
  status: string;
  fileUrl: string;
  username: string;
  roomId: number;
}
