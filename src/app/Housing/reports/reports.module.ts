import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ViewreportComponent } from './viewreport/viewreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';
import { ToiletsComponent } from './toilets/toilets.component';
import { HousesComponent } from './houses/houses.component';
import { InfraComponent } from './infra/infra.component';
import { HabitationwisereportComponent } from './habitationwisereport/habitationwisereport.component';
import { DepartmentwisereportComponent } from './departmentwisereport/departmentwisereport.component';


@NgModule({
  declarations: [ViewreportComponent, ToiletsComponent, HousesComponent, InfraComponent, HabitationwisereportComponent, DepartmentwisereportComponent], 
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class ReportsModule { }
