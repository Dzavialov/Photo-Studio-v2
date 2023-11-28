import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EquipmentItem } from 'src/app/_models/EquipmentItem';
import { EquipmentService } from 'src/app/_services/equipment.service';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})
export class EditEquipmentComponent {
  editItemForm : FormGroup = new FormGroup({});
  @Input() editItemModeChild: boolean | undefined;
  @Input() itemIdChild: number | undefined;
  @Output() editItemModeChange = new EventEmitter<boolean>();
  equipment: EquipmentItem | undefined;

  constructor(private equipmentService: EquipmentService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.equipmentService.getEquipmentItem(this.itemIdChild!).subscribe({
      next: result => {
        this.equipment = result;
        this.initializeForm();
      }
    });
    this.initializeForm();
  }

  initializeForm() {
    this.editItemForm = this.fb.group({
      name: [this.equipment?.name],
      description: [this.equipment?.description],
    })
  }

  onEditItem() {
    this.editItemModeChild = !this.editItemModeChild;
    this.editItemModeChange.emit(this.editItemModeChild);
  }

  editItem() {
    const values = {...this.editItemForm.value};
    this.equipmentService.editEquipmentItem(this.itemIdChild!, values).subscribe({
      next: () => {
        this.onEditItem();
      }
    })
  }
}
