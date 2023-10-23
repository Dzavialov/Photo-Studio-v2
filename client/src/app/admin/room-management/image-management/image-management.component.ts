import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/_models/Room';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-image-management',
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.css']
})
export class ImageManagementComponent implements OnInit{
  room: Room | undefined;

  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const roomIdFromRoute = Number(routeParams.get('id'));

    this.roomService.getRoom(roomIdFromRoute).subscribe({
      next: result => this.room = result
    })
  }
}
