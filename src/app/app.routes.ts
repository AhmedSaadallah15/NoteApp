import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [



  {path: '', redirectTo:'home' , pathMatch: 'full' },
  {path: 'home',canActivate:[authGuard] ,component:HomeComponent},
  {path: 'register',canActivate:[noAuthGuard] ,component:RegisterComponent},
  {path: 'login',canActivate:[noAuthGuard] , component:LoginComponent},


  { path: '**', component:NotfoundComponent }
];
