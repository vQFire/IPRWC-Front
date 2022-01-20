import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseOverviewComponent } from './purchase-overview/purchase-overview.component';
import {ComponentsModule} from "../components/components.module";
import { PurchaseComponent } from './purchase/purchase.component';


@NgModule({
  declarations: [
    PurchaseOverviewComponent,
    PurchaseComponent
  ],
    imports: [
        CommonModule,
        PurchaseRoutingModule,
        ComponentsModule
    ]
})
export class PurchaseModule { }
