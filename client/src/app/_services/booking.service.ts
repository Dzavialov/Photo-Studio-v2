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
}
