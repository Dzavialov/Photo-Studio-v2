import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './_guards/admin.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ImageManagementComponent } from './admin/room-management/image-management/image-management.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-list/room-detail/room-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'room-list', component: RoomListComponent},
  {path: 'room-detail/:id', component: RoomDetailComponent},
  {path: 'admin-panel', runGuardsAndResolvers: 'always', canActivate: [AdminGuard], component: AdminPanelComponent},
  {path: 'image-management/:id', runGuardsAndResolvers: 'always', canActivate: [AdminGuard], component: ImageManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
