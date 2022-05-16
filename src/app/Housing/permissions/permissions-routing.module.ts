import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPermissionsComponent } from './add-permissions/add-permissions.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewPermissionsComponent } from './view-permissions/view-permissions.component';

const routes: Routes = [
  {path: 'CreateUser',component: CreateUserComponent},
  {path:'AddPermissions' ,component: AddPermissionsComponent},
  {path:'ViewPermissions',component: ViewPermissionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
