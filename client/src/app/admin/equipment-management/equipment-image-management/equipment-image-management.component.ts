import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { EquipmentItem } from 'src/app/_models/EquipmentItem';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { EquipmentService } from 'src/app/_services/equipment.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-equipment-image-management',
  templateUrl: './equipment-image-management.component.html',
  styleUrls: ['./equipment-image-management.component.css']
})
export class EquipmentImageManagementComponent implements OnInit{
  equipment: EquipmentItem | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService,
    private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => {
          if (user) this.user = user
        }
      })
    }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = Number(routeParams.get('id'));

    this.equipmentService.getEquipmentItem(itemIdFromRoute).subscribe({
      next: result => {
        this.equipment = result;
        this.initializeUploader();
      }
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'equipment/add-image/' + this.equipment?.id,
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
        this.equipment!.image = photo;
      }
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  deleteImage() {
    this.equipmentService.deleteImage(this.equipment!.id).subscribe({
      next: () => {
          this.equipment!.image = null as any;
        }
      });
  }
}
