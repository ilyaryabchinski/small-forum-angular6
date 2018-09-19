import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'forum-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  public logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

}
