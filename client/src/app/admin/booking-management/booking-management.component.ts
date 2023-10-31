import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/_models/Booking';
import { BookingService } from 'src/app/_services/booking.service';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit{
  bookings: Booking[] | undefined;
  isFileInputFilled = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getBookings().subscribe({
      next: result => this.bookings = result
    })
  }

  finishBooking(bookingId: number, fileUrl: string) {
    this.bookingService.finishBooking(bookingId, {fileUrl}).subscribe({
      next: () => this.getBookings()
    })
  }

  deleteBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: () => this.getBookings()
    })
  }
}
