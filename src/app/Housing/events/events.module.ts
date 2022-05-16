import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { AddeventComponent } from './addevent/addevent.component';
import { CloseeventComponent } from './closeevent/closeevent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';




@NgModule({
  declarations: [AddeventComponent, CloseeventComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EventsModule { }
