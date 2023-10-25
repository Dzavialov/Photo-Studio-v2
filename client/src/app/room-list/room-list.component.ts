import { Component, OnInit } from '@angular/core';
import { Room } from '../_models/Room';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit{
  rooms: Room[] | undefined;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getRooms().subscribe({
      next: result => this.rooms = result
    })
  }
}
