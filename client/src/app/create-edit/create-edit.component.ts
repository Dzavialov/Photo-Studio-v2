import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditService } from '../_services/edit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent {
  createEditItemForm : FormGroup = new FormGroup({});

  constructor(private editService: EditService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.createEditItemForm = this.fb.group({
      userMessage: [''],
      inputUrl: [''],
    })
  }

  createItem() {
    const values = {...this.createEditItemForm.value};

    this.editService.createEditItem(values).subscribe({
      next: () => this.router.navigateByUrl('/user-edits')
    })
  }
}
