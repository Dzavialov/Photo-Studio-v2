import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EditItem } from 'src/app/_models/EditItem';
import { EditService } from 'src/app/_services/edit.service';

@Component({
  selector: 'app-edit-management',
  templateUrl: './edit-management.component.html',
  styleUrls: ['./edit-management.component.css']
})
export class EditManagementComponent {
  editItems: EditItem[] | undefined;
  modalRef?: BsModalRef;
  editItem: EditItem | undefined;

  constructor(private editService: EditService, private toastr: ToastrService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.getEditItems();
  }

  getEditItems() {
    this.editService.getEditItems().subscribe({
      next: result => this.editItems = result
    })
  }

  finishEdit(editId: number, fileUrl: string) {
    if(fileUrl === null) {
      this.toastr.error('Додайте посилання на файл')
      return;
    }
    this.editService.finishEditItems(editId, {fileUrl}).subscribe({
      next: () => this.getEditItems(),
      error: () => this.toastr.error('Виникла помилка під час відправки результатів редагування')
    })
  }

  getEditItem(id: number) {
    this.editService.getEditItem(id).subscribe({
      next: result => this.editItem = result
    })
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template);
    this.getEditItem(id);
  }

  deleteEdit(bookingId: number) {
    this.editService.deleteEditItem(bookingId).subscribe({
      next: () => this.getEditItems()
    })
  }
}
