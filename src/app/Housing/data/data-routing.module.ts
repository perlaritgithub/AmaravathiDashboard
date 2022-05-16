import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdddistrictComponent} from '../data/adddistrict/adddistrict.component'
import { AddcolonyComponent } from './addcolony/addcolony.component';
import { AdddepartmentComponent } from './adddepartment/adddepartment.component';
import { AdddivisionComponent } from './adddivision/adddivision.component';
import { AddhabitationComponent } from './addhabitation/addhabitation.component';
import { AddinfrastructureComponent } from './addinfrastructure/addinfrastructure.component';
import { AddstageComponent } from './addstage/addstage.component';

const routes: Routes = [
  {path:'adddistrict',component:AdddistrictComponent},
  {path:'adddivision',component:AdddivisionComponent},
  {path:'addhabitation',component:AddhabitationComponent},
  {path:'addcolony',component:AddcolonyComponent},
  {path:'addstage',component:AddstageComponent},
  {path:'addinfrastructure',component:AddinfrastructureComponent},
  {path:'adddepartment',component:AdddepartmentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
