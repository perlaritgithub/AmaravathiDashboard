import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerlaRoutingModule } from './perla-routing.module';
import { CreateuserComponent } from './createuser/createuser.component';
import { ViewuserComponent } from './viewuser/viewuser.component';


@NgModule({
  declarations: [CreateuserComponent, ViewuserComponent],
  imports: [
    CommonModule,
    PerlaRoutingModule
  ]
})
export class PerlaModule { }
