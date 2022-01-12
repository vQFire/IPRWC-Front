import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartOverviewComponent} from "./cart-overview/cart-overview.component";

const routes: Routes = [
  {
    path: "cart",
    component: CartOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
