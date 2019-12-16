import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from './alert';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

//add service file
import { ProductsService } from './products.service';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
//added component
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    ProductGetComponent,
    ProductEditComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
	AlertModule
  ],
  providers: [ProductsService,UserService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
