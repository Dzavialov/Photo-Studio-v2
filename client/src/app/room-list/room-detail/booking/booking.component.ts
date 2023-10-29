import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Room } from '../../../_models/Room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../_services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../../_services/booking.service';
import { Booking } from '../../../_models/Booking';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  @Input() bookingRoomModeChild: boolean | undefined;
  @Input() roomIdChild: number | undefined;
  @Output() bookingRoomModeChange = new EventEmitter<boolean>();
  room: Room | undefined;
  bookings: Booking[] | undefined;
  bookingForm : FormGroup = new FormGroup({});
  ismeridian = false;
  modalRef?: BsModalRef;
  isButtonDisabled = false;

  constructor(private roomService: RoomService, private fb: FormBuilder, private bookingService: BookingService,
    private modalService: BsModalService) {}

  ngOnInit(): void {
    this.roomService.getRoom(this.roomIdChild!).subscribe({
      next: result => {
        this.room = result;
      }
    });
    this.initializeForm();
  }

  initializeForm() {
    this.bookingForm = this.fb.group({
      datePicker: ['', Validators.required],
      timePickerStart: ['', Validators.required],
      timePickerEnd: ['', Validators.required]
    })
  }

  onBookingRoom() {
    this.bookingRoomModeChild = !this.bookingRoomModeChild;
    this.bookingRoomModeChange.emit(this.bookingRoomModeChild);
  }

  createBooking() {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getDateBookings(){
    this.isButtonDisabled = true;
    const value = this.bookingForm.get('datePicker')!.value;
    this.bookingService.getDateBookings(value, this.room!.id).subscribe({
      next: result => {
        this.bookings = result
      }
    })
  }
}
