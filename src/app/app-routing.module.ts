import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductGetComponent } from './product-get/product-get.component';

import { AdminComponent } from './admin/admin.component';  
import { HomeComponent } from './home/home.component';  
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './helpers/auth.guard';
import { User } from './User';
import { Role } from './Role';

const routes: Routes = [
  /*{
    path: '',
    component: ProductGetComponent
  },*/
  {
    path: 'product/create',
    component: ProductAddComponent
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'products',
    component: ProductGetComponent
  },
  {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin/home',
    component: HomeComponent,
	canActivate: [AuthGuard]
  }
];

@NgModule({
   imports: [RouterModule.forRoot(routes, {useHash: true})],
  //imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
