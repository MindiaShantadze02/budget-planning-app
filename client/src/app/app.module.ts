import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared-components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './modules/material/material.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutesModule } from './modules/app-routes/app-routes.module';
import { TokenInterceptor } from './services/token.interceptor';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    FooterComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutesModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
