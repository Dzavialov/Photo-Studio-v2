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
  roomToEditId: number | undefined;
  createRoomMode = false;
  editRoomMode = false;

  constructor (private roomService: RoomService) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getRooms().subscribe({
      next: result => this.rooms = result
    })
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe({
      next: () => this.getRooms()
    })
  }

  onCreateRoom() {
    this.createRoomMode = !this.createRoomMode;
  }

  getCreateMode(mode: boolean) {
    this.createRoomMode = mode;
    this.ngOnInit();
  }

  getEditMode(mode: boolean) {
    this.editRoomMode = mode;
    this.ngOnInit();
  }

  onEditRoom(roomId: number) {
    this.editRoomMode = !this.editRoomMode;
    this.roomToEditId = roomId;
  }
}
