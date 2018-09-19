import {NgModule} from '@angular/core';
import {UserService} from './user.service';
import {AuthGuard} from './auth.guard';

@NgModule({
  imports: [],
  providers: [
    UserService,
    AuthGuard
  ],
  exports: []
})
export class ForumCoreModule {
}
