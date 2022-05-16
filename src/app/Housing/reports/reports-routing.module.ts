import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewreportComponent} from '../reports/viewreport/viewreport.component'
import {HousesComponent} from '../reports/houses/houses.component'
import{ToiletsComponent} from '../reports/toilets/toilets.component'
import{InfraComponent} from '../reports/infra/infra.component'
import { HabitationwisereportComponent } from './habitationwisereport/habitationwisereport.component';
import {DepartmentwisereportComponent} from './departmentwisereport/departmentwisereport.component'
const routes: Routes = [
  {path:'viewreport', component: ViewreportComponent},
  {path:'houses',component:HousesComponent},
  {path:'toilets',component:ToiletsComponent},
  {path:'infra',component:InfraComponent},
  {path:'habitationwisereport',component:HabitationwisereportComponent},
  {path:'departmentwisereport',component:DepartmentwisereportComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
