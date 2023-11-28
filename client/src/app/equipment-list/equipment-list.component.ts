import { Component, OnInit } from '@angular/core';
import { EquipmentItem } from '../_models/EquipmentItem';
import { EquipmentService } from '../_services/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit{
  equipment: EquipmentItem[] | undefined;

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.equipmentService.getGetEquipmentItems().subscribe({
      next: result => this.equipment = result
    })
  }
}
