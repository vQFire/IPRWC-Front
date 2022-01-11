import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input/input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TableComponent } from './table/table.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    InputComponent,
    TableComponent
  ],
  exports: [
    InputComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
