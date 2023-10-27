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
    return this.http.get<Room[]>(this.baseUrl + 'rooms');
  }

  getRoom(id: number) {
    return this.http.get<Room>(this.baseUrl + 'rooms/' + id);
  }

  createRoom(model: any) {
    return this.http.post<Room>(this.baseUrl + 'rooms/create-room', model);
  }

  editRoom(id:number, model: any) {
    return this.http.put<Room>(this.baseUrl + 'rooms/' + id, model);
  }

  deleteRoom(id: number) {
    return this.http.delete(this.baseUrl + 'rooms/' + id);
  }

  deleteImage (roomId: number, imageId: number) {
    return this.http.delete(this.baseUrl + 'rooms/delete-image/' + roomId + '/' + imageId)
  }
}
