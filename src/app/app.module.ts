import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdmincateComponent } from './admincate/admincate.component';
import { FormsModule } from '@angular/forms';
import { authInterceptorProvider } from 'src/configintercepter';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminorderComponent } from './adminorder/adminorder.component';
import { AdminuserComponent } from './adminuser/adminuser.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminhomeComponent,
    AdmincateComponent,
    AdminloginComponent,
    AdminproductComponent,
    AdminorderComponent,
    AdminuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
