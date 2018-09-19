import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {ForumCoreModule} from './core/core.module';
import { MainPageComponent } from './main-page/main-page.component';
import {AuthGuard} from './core/auth.guard';


const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'messages', component: MainPageComponent, canActivate: [AuthGuard] }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    MainPageComponent
  ],
  imports: [
    ForumCoreModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
