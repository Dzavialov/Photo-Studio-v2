import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  roomId: number | undefined;
  createItemMode = false;
  editItemMode = false;

  constructor (private equipmentService: EquipmentService, private route: ActivatedRoute) {}



  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.roomId = Number(routeParams.get('id'));

    this.equipmentService.getEquipmentItems(this.roomId).subscribe({
      next: result => this.equipment = result
    })
  }

  getItems() {

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

  onEditItem(itemId: number) {
    this.editItemMode = !this.editItemMode;
    this.itemToEditId = itemId;
  }
}
