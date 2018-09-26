import { Component} from '@angular/core';
import {UserService} from '../../../core/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'forum-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public userService: UserService, private router: Router, private toastr: ToastrService) { }

  public logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']).then(res => {
      this.toastr.clear();
      this.toastr.info('You\'ve been logged out', '', {positionClass: 'toast-bottom-right'});
    });
  }

}
