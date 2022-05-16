import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { AddPermissionsComponent } from './add-permissions/add-permissions.component';
import { ViewPermissionsComponent } from './view-permissions/view-permissions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';
import { FoolDirective } from './view-permissions/fool.directive';

@NgModule({
  declarations: [CreateUserComponent, AddPermissionsComponent, ViewPermissionsComponent,FoolDirective ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PermissionsModule { }
