import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/_services/equipment.service';

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
  styleUrls: ['./create-equipment.component.css']
})
export class CreateEquipmentComponent {
  createEquipmentForm : FormGroup = new FormGroup({});
  @Input() createItemModeChild: boolean | undefined;
  @Input() roomId: number | undefined;
  @Output() createItemModeChange = new EventEmitter<boolean>();

  constructor(private equipmentService: EquipmentService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.createEquipmentForm = this.fb.group({
      name: [''],
      description: [''],
    })
  }

  onCreateItem() {
    this.createItemModeChild = !this.createItemModeChild;
    this.createItemModeChange.emit(this.createItemModeChild);
  }

  createItem() {
    const values = {...this.createEquipmentForm.value};
    this.equipmentService.createEquipmentItem(this.roomId!, values).subscribe({
      next: () => {
        this.onCreateItem();
      }
    })
  }
}
