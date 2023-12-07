import { Component, OnInit } from '@angular/core';
import { EquipmentItem } from '../_models/EquipmentItem';
import { EquipmentService } from '../_services/equipment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit{
  equipment: EquipmentItem[] | undefined;
  roomId: number | undefined;

  constructor(private equipmentService: EquipmentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.roomId = Number(routeParams.get('id'));

    this.equipmentService.getEquipmentItems(this.roomId).subscribe({
      next: result => this.equipment = result
    })
  }
}
