import { Component, OnInit } from '@angular/core';
import { Booking } from '../_models/Booking';
import { BookingService } from '../_services/booking.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit{
  bookings: Booking[] | undefined;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getUserBookings();
  }

  getUserBookings() {
    this.bookingService.getUserBooking().subscribe({
      next: result => this.bookings = result
    })
  }

  deleteBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: () => this.getUserBookings()
    })
  }
}
