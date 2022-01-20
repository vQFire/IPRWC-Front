import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PurchaseOverviewComponent} from "./purchase-overview/purchase-overview.component";
import {AuthenticationGuard} from "../security/authentication.guard";
import {PurchaseComponent} from "./purchase/purchase.component";

const routes: Routes = [
  {
    path: "purchase",
    component: PurchaseOverviewComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: "purchase/:id",
    component: PurchaseComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
