import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from  './add-category/add-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ViewTotalDataComponent } from './view-total-data/view-total-data.component';




const routes: Routes = [
  { path:'add-category',component:AddCategoryComponent },
  { path:'sub-category',component:SubCategoryComponent },
  { path:'add-item',component:AddItemComponent },
  { path:'view-total-data',component:ViewTotalDataComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsRoutingModule { }
