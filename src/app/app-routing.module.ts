import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {AddProductComponent} from './add-product/add-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';


const routes: Routes = [
  {path:"products", component: ProductComponent},
  {path:"add-product", component: AddProductComponent},
  {path:"edit-product/:id", component: EditProductComponent},
  {path:"", redirectTo: "/products", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
