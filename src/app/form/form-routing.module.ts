import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicInputsComponent } from './basic-inputs/basic-inputs.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { MasksComponent } from './masks/masks.component';
import { EditorComponent } from './editor/editor.component';
import { ValidationComponent } from './validation/validation.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';


const routes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'basic-inputs',
        component: BasicInputsComponent,
        data: {
          heading: 'Basic forms'
        }
      }, 
      {
        path: 'input-group',
        component: InputGroupComponent,
        data: {
          heading: 'Input Group'
        }
      }, 
      
      {
        path: 'form-layouts',
        component: FormLayoutsComponent,
        data: {
          heading: 'Form Layouts'
        }
      }, 
    {
      path: 'masks',
      component: MasksComponent,
      data: {
        heading: 'Masks'
      }
    }, 
    {
      path: 'editor',
      component: EditorComponent,
      data: {
        heading: 'Editor'
      }
    },
    {
      path: 'validation',
      component: ValidationComponent,
      data: {
        heading: 'Validation'
      }
    },
    {
      path: 'timepicker',
      component: TimepickerComponent,
      data: {
        heading: 'Timepicker'
      }
    },
    {
      path: 'datepicker',
      component: DatepickerComponent,
      data: {
        heading: 'Datepicker'
      }
    },
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
