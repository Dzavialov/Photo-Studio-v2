import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Room } from 'src/app/_models/Room';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit{
  room: Room |  undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  user: User | undefined;
  roomToBookId: number | undefined;
  bookingRoomMode = false;

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService,
    private accountService: AccountService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const roomIdFromRoute = Number(routeParams.get('id'));
    this.getRoom(roomIdFromRoute);

    this.galleryOptions = [{
      width: '750px',
      height: '630px',
      imagePercent: 100,
      thumbnailsColumns: 3,
      thumbnailsArrows: false,
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

  getBookingMode(mode: boolean) {
    this.bookingRoomMode = mode;
    this.ngOnInit();
  }

  // onBookingRoom(roomId: number) {
  //   this.bookingRoomMode = !this.bookingRoomMode;
  //   this.roomToBookId = roomId;
  // }

  onBookingRoom(roomId: number) {
    if (!this.user) {
      this.toastr.error('Для бронювання необхідно залогінитися або зареєструватися')
    }
    else {
      this.bookingRoomMode = !this.bookingRoomMode;
    this.roomToBookId = roomId;
    }
  }
}
