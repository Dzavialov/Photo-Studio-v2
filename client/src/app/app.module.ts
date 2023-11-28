import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RoomManagementComponent } from './admin/room-management/room-management.component';
import { BookingManagementComponent } from './admin/booking-management/booking-management.component';
import { CreateRoomComponent } from './admin/room-management/create-room/create-room.component';
import { RoomImageManagementComponent } from './admin/room-management/room-image-management/room-image-management.component';
import { EditRoomComponent } from './admin/room-management/edit-room/edit-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-list/room-detail/room-detail.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { BookingComponent } from './room-list/room-detail/booking/booking.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FooterComponent } from './footer/footer.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { RulesComponent } from './rules/rules.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentManagementComponent } from './admin/equipment-management/equipment-management.component';
import { CreateEquipmentComponent } from './admin/equipment-management/create-equipment/create-equipment.component';
import { EditEquipmentComponent } from './admin/equipment-management/edit-equipment/edit-equipment.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EquipmentImageManagementComponent } from './admin/equipment-management/equipment-image-management/equipment-image-management.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    AdminPanelComponent,
    RoomManagementComponent,
    BookingManagementComponent,
    CreateRoomComponent,
    RoomImageManagementComponent,
    EditRoomComponent,
    RoomListComponent,
    RoomDetailComponent,
    BookingComponent,
    UserBookingsComponent,
    FooterComponent,
    HasRoleDirective,
    RulesComponent,
    ContactsComponent,
    EquipmentListComponent,
    EquipmentManagementComponent,
    CreateEquipmentComponent,
    EditEquipmentComponent,
    EquipmentImageManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FileUploadModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
