import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
const routes: Routes = [
  { path: 'createuser',component:CreateuserComponent},
  { path: 'viewuser',component:ViewuserComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerlaRoutingModule { }
