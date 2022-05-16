import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeventComponent } from './addevent/addevent.component';
import { CloseeventComponent } from './closeevent/closeevent.component';

const routes: Routes = [
  {path:'addevent',component: AddeventComponent},
  {path:'closeevent',component:CloseeventComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
