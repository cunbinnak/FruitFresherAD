import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmincateComponent } from './admincate/admincate.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminorderComponent } from './adminorder/adminorder.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { AdminuserComponent } from './adminuser/adminuser.component';

const routes: Routes = [
  {path:'admin/login',component:AdminloginComponent},
  {path:'admin/home',component:AdminhomeComponent},
  {path:'admin/categories',component:AdmincateComponent},
  {path:'admin/product', component:AdminproductComponent},
  {path:'admin/order', component:AdminorderComponent},
  {path:'admin/user', component:AdminuserComponent},
  { path: '',   redirectTo: 'admin/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
