import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { TextMaskModule } from 'angular2-text-mask';

import { MasksComponent } from './masks/masks.component';
import { EditorComponent } from './editor/editor.component';
import { ValidationComponent } from './validation/validation.component';
import { BasicInputsComponent } from './basic-inputs/basic-inputs.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';


@NgModule({
  declarations: [
    BasicInputsComponent,
    InputGroupComponent, 
    FormLayoutsComponent,
    MasksComponent, 
    EditorComponent, 
    ValidationComponent, 
    TimepickerComponent,
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    CustomFormsModule,
    TextMaskModule,
  ]
})
export class FormModule { }
