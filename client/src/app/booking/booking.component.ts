import { Component, OnInit } from '@angular/core';
import { Room } from '../_models/Room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  room: Room | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const roomIdFromRoute = Number(routeParams.get('id'));
    this.getRoom(roomIdFromRoute);
  }

  getRoom(roomId: number) {
    this.roomService.getRoom(roomId).subscribe({
      next: result => {
        this.room = result;
      }
    })
  }


}
