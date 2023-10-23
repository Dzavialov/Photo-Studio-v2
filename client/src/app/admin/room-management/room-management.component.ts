import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/_models/Room';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {
  rooms: Room[] | undefined;
  createRoomMode = false;

  constructor (private roomService: RoomService) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getRooms().subscribe({
      next: result => this.rooms = result
    })
  }

  onCreateRoom() {
    this.createRoomMode = !this.createRoomMode;
  }

}
