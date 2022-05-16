import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingRoutingModule } from './housing-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HousingRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class HousingModule { }
