import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {RouterModule} from '@angular/router';
import {ForumCoreModule} from './core/core.module';
import { MainPageComponent } from './main-page/main-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MessagesService} from './main-page/services/messages.service';
import { MessageComponent } from './main-page/message/message.component';
import {HttpClientModule} from '@angular/common/http';
import { NewMessageDialogComponent } from './main-page/new-message-dialog/new-message-dialog.component';
import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {appRoutes} from './app.routes';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    MainPageComponent,
    MessageComponent,
    NewMessageDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgbModalModule,
    ForumCoreModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
