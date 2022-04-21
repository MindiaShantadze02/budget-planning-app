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
import { TokenInterceptor } from './services/auth/token.interceptor';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { HomeComponent } from './components/home/home.component';
import { AccountsComponent } from './components/home/home-components/accounts/accounts.component';
import { TransactionsComponent } from './components/home/home-components/transactions/transactions.component';
import { OptionsComponent } from './components/home/home-components/options/options.component';
import { AccountComponent } from './components/home/home-components/account/account.component';
import { TransactionComponent } from './components/home/home-components/transaction/transaction.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { CategoriesComponent } from './components/categories-page/categories/categories.component';
import { CategoryComponent } from './components/categories-page/category/category.component';
import { AccountsDialogBoxComponent } from './components/dialog-boxes/accounts-dialog-box/accounts-dialog-box.component';
import { AccountDeleteDialogComponent } from './components/dialog-boxes/account-delete-dialog/account-delete-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountDetailsComponent } from './components/dialog-boxes/account-details/account-details.component';
import { LogoutDialogComponent } from './components/dialog-boxes/logout-dialog/logout-dialog.component';
import { EditAccountComponent } from './components/dialog-boxes/edit-account/edit-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    FooterComponent,
    AdminPageComponent,
    HomeComponent,
    AccountsComponent,
    TransactionsComponent,
    OptionsComponent,
    AccountComponent,
    TransactionComponent,
    CategoriesPageComponent,
    CategoriesComponent,
    CategoryComponent,
    AccountsDialogBoxComponent,
    AccountDeleteDialogComponent,
    AccountDetailsComponent,
    LogoutDialogComponent,
    EditAccountComponent
  ],
  entryComponents: [
    AccountsDialogBoxComponent,
    AccountDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: MatDialogRef,
      useValue: {}
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
