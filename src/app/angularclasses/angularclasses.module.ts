import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularclassesRoutingModule } from './angularclasses-routing.module';
import { Component1Component } from './component1/component1.component';


@NgModule({
  declarations: [Component1Component],
  imports: [
    CommonModule,
    AngularclassesRoutingModule
  ]
})
export class AngularclassesModule { }
