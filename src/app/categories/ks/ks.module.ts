import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KsRoutingModule } from './ks-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ViewTotalDataComponent } from './view-total-data/view-total-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material/material.module';


@NgModule({
  declarations: [AddCategoryComponent, SubCategoryComponent, AddItemComponent, ViewTotalDataComponent],
  imports: [
    CommonModule,
    KsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class KsModule { }
