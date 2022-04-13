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

const appRoutes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard], 
    children: [
      { path: '', component: HomeComponent, 
        children: [
          { path: '', component: TransactionsComponent },
          { path: ':id', component: TransactionsComponent }
        ]
      },
      { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard], pathMatch: 'full' }
    ] 
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
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
