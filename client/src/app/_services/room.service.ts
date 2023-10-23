import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Room } from '../_models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get<Room[]>(this.baseUrl + 'room');
  }

  getRoom(id: number) {
    return this.http.get<Room>(this.baseUrl + 'room/' + id);
  }

  createRoom(model: any) {
    return this.http.post<Room>(this.baseUrl + 'room/create-room', model);
  }

  deleteImage (roomId: number, imageId: number) {
    return this.http.delete(this.baseUrl + 'room/delete-image/'+ roomId + '/' + imageId)
  }
}
