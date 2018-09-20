import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AuthGuard} from './core/auth.guard';
import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'messages', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: '/messages',
    pathMatch: 'full'
  }
];
