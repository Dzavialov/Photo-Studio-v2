import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/_models/Room';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit{
  room: Room | undefined;
  constructor(private route: ActivatedRoute, private roomService: RoomService) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const roomIdFromRoute = Number(routeParams.get('id'));
    console.log('room id is ' + roomIdFromRoute);
    this.getRoom(roomIdFromRoute);
  }

  getRoom(roomId: number) {
    this.roomService.getRoom(roomId).subscribe({
      next: result => this.room = result
    })
  }
}
