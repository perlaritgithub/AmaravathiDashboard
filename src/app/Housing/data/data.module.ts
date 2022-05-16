import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { AdddistrictComponent } from './adddistrict/adddistrict.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';
import { AdddivisionComponent } from './adddivision/adddivision.component';
import { AddcolonyComponent } from './addcolony/addcolony.component';
import { AddhabitationComponent } from './addhabitation/addhabitation.component';
import { AddstageComponent } from './addstage/addstage.component';
import { AddinfrastructureComponent } from './addinfrastructure/addinfrastructure.component';
import { AdddepartmentComponent } from './adddepartment/adddepartment.component';

@NgModule({
  declarations: [AdddistrictComponent, AdddivisionComponent, AddcolonyComponent, AddhabitationComponent, AddstageComponent, AddinfrastructureComponent, AdddepartmentComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule

  ]
})
export class DataModule { }
