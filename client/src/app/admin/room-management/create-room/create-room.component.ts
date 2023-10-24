import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit{
  createRoomForm : FormGroup = new FormGroup({});
  @Input() createRoomModeChild: boolean | undefined;
  @Output() createRoomModeChange = new EventEmitter<boolean>();

  constructor(private roomService: RoomService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.createRoomForm = this.fb.group({
      name: [''],
      description: [''],
      additionalInformation: ['']
    })
  }

  onCreateRoom() {
    this.createRoomModeChild = !this.createRoomModeChild;
    this.createRoomModeChange.emit(this.createRoomModeChild);
  }

  createRoom() {
    const values = {...this.createRoomForm.value};

    this.roomService.createRoom(values).subscribe({
      next: () => {
        this.onCreateRoom();
      }
    })
  }
}
