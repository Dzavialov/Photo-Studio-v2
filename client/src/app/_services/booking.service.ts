import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Booking } from '../_models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDateBookings(bookingDate: Date, roomId: number){
    let params = new HttpParams();

    params = params.append('bookingDate', bookingDate.toISOString());
    params = params.append('roomId', roomId);

    return this.http.get<Booking[]>(this.baseUrl + 'bookings/date-bookings', {params: params});
  }

  createBooking(id: number, model: any) {
    return this.http.post<Booking>(this.baseUrl + 'bookings/book-room/' + id, model)
  }

  getUserBooking() {
    return this.http.get<Booking[]>(this.baseUrl + 'bookings/user-bookings');
  }

  deleteBooking(id: number) {
    return this.http.delete(this.baseUrl + 'bookings/' + id);
  }

  getBookings() {
    return this.http.get<Booking[]>(this.baseUrl + 'bookings');
  }

  finishBooking(id:number, model: any) {
    return this.http.put<Booking>(this.baseUrl + 'bookings/' + id, model);
  }
}
