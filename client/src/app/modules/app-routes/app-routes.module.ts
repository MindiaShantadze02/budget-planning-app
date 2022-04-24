import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// importing router modules
import { RouterModule, Routes } from '@angular/router';

// importing components
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { AdminPageComponent } from 'src/app/components/admin-page/admin-page.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TransactionsComponent } from 'src/app/components/home/home-components/transactions/transactions.component';
import { CategoriesPageComponent } from 'src/app/components/categories-page/categories-page.component';
import { CreateTransactionComponent } from 'src/app/components/create-transaction/create-transaction.component';
import { EditTransactionComponent } from 'src/app/components/edit-transaction/edit-transaction.component';
import { StatisticsComponent } from 'src/app/components/statistics/statistics.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard],
    children: [
      { 
        path: '',
        component: HomeComponent,
        children: [
          { path: '', component: TransactionsComponent },
          { path: ':id/transactions', component: TransactionsComponent },
          { path: 'search', component: TransactionsComponent },
          { path: 'statistics', component: StatisticsComponent }
        ]
       },
      { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'categories/edit/:categoryId', component: CategoriesPageComponent },
      { path: ':id/create-transaction', component: CreateTransactionComponent },
      { path: ':transactionId/edit', component: EditTransactionComponent }
    ]
 },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutesModule { }
