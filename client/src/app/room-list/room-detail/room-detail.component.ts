import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Room } from 'src/app/_models/Room';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit{
  room: Room | undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  constructor(private route: ActivatedRoute, private roomService: RoomService) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const roomIdFromRoute = Number(routeParams.get('id'));
    console.log('room id is ' + roomIdFromRoute);
    this.getRoom(roomIdFromRoute);

    this.galleryOptions = [{
      width: '750px',
      height: '630px',
      imagePercent: 100,
      thumbnailsColumns: 3,
      imageAnimation: NgxGalleryAnimation.Fade,
      preview: false
    }]
  }

  getImages() {
    if (!this.room) return [];
    const imageUrl = [];
    for (const image of this.room.images) {
      imageUrl.push({
        small: image.url,
        medium: image.url,
        big: image.url
      })
    }
    return imageUrl;
  }

  getRoom(roomId: number) {
    this.roomService.getRoom(roomId).subscribe({
      next: result => {
        this.room = result
        this.galleryImages = this.getImages();
      }
    })
  }
}
