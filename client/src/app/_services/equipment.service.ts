import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { EquipmentItem } from '../_models/EquipmentItem';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGetEquipmentItems() {
    return this.http.get<EquipmentItem[]>(this.baseUrl + 'equipment');
  }

  getEquipmentItem(id: number) {
    return this.http.get<EquipmentItem>(this.baseUrl + 'equipment/' + id);
  }

  createEquipmentItem(model: any) {
    return this.http.post<EquipmentItem>(this.baseUrl + 'equipment/create-item', model);
  }

  editEquipmentItem(id:number, model: any) {
    return this.http.put<EquipmentItem>(this.baseUrl + 'equipment/' + id, model);
  }

  deleteEquipmentItem(id: number) {
    return this.http.delete(this.baseUrl + 'equipment/' + id);
  }

  deleteImage (itemId: number) {
    return this.http.delete(this.baseUrl + 'equipment/delete-image/' + itemId)
  }
}
