import { Component } from '@angular/core';
import { EquipmentItem } from 'src/app/_models/EquipmentItem';
import { EquipmentService } from 'src/app/_services/equipment.service';

@Component({
  selector: 'app-equipment-management',
  templateUrl: './equipment-management.component.html',
  styleUrls: ['./equipment-management.component.css']
})
export class EquipmentManagementComponent {
  equipment: EquipmentItem[] | undefined;
  itemToEditId: number | undefined;
  createItemMode = false;
  editItemMode = false;

  constructor (private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.equipmentService.getGetEquipmentItems().subscribe({
      next: result => this.equipment = result
    })
  }

  deleteItem(id: number) {
    this.equipmentService.deleteEquipmentItem(id).subscribe({
      next: () => this.getItems()
    })
  }

  onCreateItem() {
    this.createItemMode = !this.createItemMode;
  }

  getCreateMode(mode: boolean) {
    this.createItemMode = mode;
    this.ngOnInit();
  }

  getEditMode(mode: boolean) {
    this.editItemMode = mode;
    this.ngOnInit();
  }

  onEditItem(roomId: number) {
    this.editItemMode = !this.editItemMode;
    this.itemToEditId = roomId;
  }
}
