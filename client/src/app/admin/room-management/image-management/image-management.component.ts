import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Room } from 'src/app/_models/Room';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { RoomService } from 'src/app/_services/room.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-image-management',
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.css']
})
export class ImageManagementComponent implements OnInit{
  room: Room | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private route: ActivatedRoute, private roomService: RoomService,
    private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => {
          if (user) this.user = user
        }
      })
    }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const roomIdFromRoute = Number(routeParams.get('id'));

    this.roomService.getRoom(roomIdFromRoute).subscribe({
      next: result => {
        this.room = result;
        this.initializeUploader();
      }
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'room/add-image/' + this.room?.id,
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.room?.images.push(photo);
      }
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  deleteImage(imageId: number) {
    this.roomService.deleteImage(this.room!.id, imageId).subscribe({
      next: () => {
          this.room!.images = this.room!.images.filter(x => x.id !== imageId)
        }
      });
  }
}
