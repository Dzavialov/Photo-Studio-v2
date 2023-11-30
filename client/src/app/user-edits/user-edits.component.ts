import { Component } from '@angular/core';
import { EditItem } from '../_models/EditItem';
import { EditService } from '../_services/edit.service';

@Component({
  selector: 'app-user-edits',
  templateUrl: './user-edits.component.html',
  styleUrls: ['./user-edits.component.css']
})
export class UserEditsComponent {
  editItems: EditItem[] | undefined;

  constructor(private editService: EditService) {}

  ngOnInit(): void {
    this.getUserEdits();
  }

  getUserEdits() {
    this.editService.getUserEditItems().subscribe({
      next: result => {
        this.editItems = result
      }
    })
  }

  deleteBooking(bookingId: number) {
    this.editService.deleteEditItem(bookingId).subscribe({
      next: () => this.getUserEdits()
    })
  }
}
