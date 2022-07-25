import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import { StaffViewComponent } from './components/staff-view/staff-view.component';
import { StudentViewComponent } from './components/student-view/student-view.component'
import { AdminViewComponent } from './components/admin-view/admin-view.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'staff', component: StaffViewComponent },
  { path: 'student', component: StudentViewComponent },
  { path: 'admin', component: AdminViewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
