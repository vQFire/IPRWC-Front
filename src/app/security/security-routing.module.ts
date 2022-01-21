import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthenticationGuard} from "./authentication.guard";
import {UserOverviewComponent} from "./user-overview/user-overview.component";
import {Role} from "./role";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile", component: ProfileComponent, canActivate: [AuthenticationGuard]},
  {
    path: "profile/:name",
    component: ProfileComponent,
    canActivate: [AuthenticationGuard],
    data: {
      expectedRole: Role.ROLE_MODERATOR
    }
  },
  {
    path: "admin/user",
    component: UserOverviewComponent,
    canActivate: [AuthenticationGuard],
    data: {
      expectedRole: Role.ROLE_MODERATOR
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
