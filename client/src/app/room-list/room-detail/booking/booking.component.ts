import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Room } from '../../../_models/Room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../_services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../../_services/booking.service';
import { Booking } from '../../../_models/Booking';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

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
    private modalService: BsModalService, private router: Router, private toastr: ToastrService) {}

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
    const dateValue = this.bookingForm.get('datePicker')!.value;
    const timePickerStartValue = this.bookingForm.get('timePickerStart')!.value;
    const timePickerEndValue = this.bookingForm.get('timePickerEnd')!.value;

    const bookFrom = new Date(dateValue);
    bookFrom.setHours(timePickerStartValue.getHours(), timePickerStartValue.getMinutes());

    const bookTo = new Date(dateValue);
    bookTo.setHours(timePickerEndValue.getHours(), timePickerEndValue.getMinutes());
    console.log({bookFrom, bookTo});

    this.bookingService.createBooking(this.room!.id, {bookFrom, bookTo}).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.toastr.error('Помилка бронювання. Перевірте правильність даних')
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getDateBookings(){
    const value = this.bookingForm.get('datePicker')!.value;
    if(value) this.isButtonDisabled = true;
    this.bookingService.getDateBookings(value, this.room!.id).subscribe({
      next: result => {
        this.bookings = result
      }
    })
  }
}
