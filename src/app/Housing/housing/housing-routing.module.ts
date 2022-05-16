import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HousingComponent} from './housing.component'
const routes: Routes = [
  {path:'housinggraphs',component:HousingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousingRoutingModule { }
