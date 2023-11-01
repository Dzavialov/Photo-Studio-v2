import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private bookingService: BookingService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getBookings().subscribe({
      next: result => this.bookings = result
    })
  }

  finishBooking(bookingId: number, fileUrl: string) {
    if(fileUrl === null) {
      this.toastr.error('Додайте посилання на файл')
      return;
    }
    this.bookingService.finishBooking(bookingId, {fileUrl}).subscribe({
      next: () => this.getBookings(),
      error: () => this.toastr.error('Виникла помилка під час закінчення бронювання')
    })
  }

  deleteBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: () => this.getBookings()
    })
  }
}
