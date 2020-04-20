import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {AddProductComponent} from './add-product/add-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {CategoriesComponent} from './categories/categories.component';
import {LoginComponent} from './login/login.component';
import {AdminCategoriesComponent} from './admin-categories/admin-categories.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';


const routes: Routes = [
  {path:"products/:productUrl", component: ProductComponent},
  {path:"login", component: LoginComponent},
  {path:"adminCategories", component: AdminCategoriesComponent},
  {path:"adminProducts", component: AdminProductsComponent},
  {path:"adminUsers", component: AdminUsersComponent},
  //{path:"add-product", component: AddProductComponent},
  //{path:"edit-product/:id", component: EditProductComponent},
 // {path:"categories", component: CategoriesComponent},
  // /{path:"", redirectTo: "/products", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
