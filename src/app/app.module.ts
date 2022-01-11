import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SecurityModule} from "./security/security.module";
import {ProductCrudModule} from "./product-crud/product-crud.module";
import { NavigationComponent } from './navigation/navigation.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    ProductCrudModule,
    SecurityModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
