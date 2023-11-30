import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { EditItem } from '../_models/EditItem';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createEditItem(model: any) {
    return this.http.post<EditItem>(this.baseUrl + 'edits/create-edit/', model)
  }

  getUserEditItems() {
    return this.http.get<EditItem[]>(this.baseUrl + 'edits/user-edits');
  }

  deleteEditItem(id: number) {
    return this.http.delete(this.baseUrl + 'edits/' + id);
  }

  getEditItems() {
    return this.http.get<EditItem[]>(this.baseUrl + 'edits');
  }

  getEditItem(id: number) {
    return this.http.get<EditItem>(this.baseUrl + 'edits/' + id);
  }

  finishEditItems(id:number, model: any) {
    return this.http.put<EditItem>(this.baseUrl + 'edits/' + id, model);
  }
}
