import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './_guards/admin.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ImageManagementComponent } from './admin/room-management/image-management/image-management.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-list/room-detail/room-detail.component';
import { BookingComponent } from './room-list/room-detail/booking/booking.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { RulesComponent } from './rules/rules.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'room-list', component: RoomListComponent},
  {path: 'room-detail/:id', component: RoomDetailComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: '', runGuardsAndResolvers: 'always',
    canActivate:[AuthGuard],
    children:[
      {path: 'admin-panel', runGuardsAndResolvers: 'always', canActivate: [AdminGuard], component: AdminPanelComponent},
      {path: 'image-management/:id', runGuardsAndResolvers: 'always', canActivate: [AdminGuard], component: ImageManagementComponent},
      {path: 'user-bookings', canActivate: [AuthGuard], component: UserBookingsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
