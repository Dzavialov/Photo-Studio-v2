import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from 'src/app/_models/Room';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit{
  editRoomForm : FormGroup = new FormGroup({});
  @Input() editRoomModeChild: boolean | undefined;
  @Input() roomIdChild: number | undefined;
  @Output() editRoomModeChange = new EventEmitter<boolean>();
  room: Room | undefined;

  constructor(private roomService: RoomService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.roomService.getRoom(this.roomIdChild!).subscribe({
      next: result => {
        this.room = result;
        this.initializeForm();
      }
    });
    this.initializeForm();
  }

  initializeForm() {
    this.editRoomForm = this.fb.group({
      name: [this.room?.name],
      description: [this.room?.description],
      additionalInformation: [this.room?.additionalInformation]
    })
  }

  onEditRoom() {
    this.editRoomModeChild = !this.editRoomModeChild;
    this.editRoomModeChange.emit(this.editRoomModeChild);
  }

  editRoom() {
    const values = {...this.editRoomForm.value};
    this.roomService.editRoom(this.roomIdChild!, values).subscribe({
      next: () => {
        this.onEditRoom();
      }
    })
  }
}
