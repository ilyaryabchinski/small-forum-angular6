import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'forum-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  logIn(username: string) {
    this.userService.logIn({name: username});
    this.router.navigate(['/messages']);
  }
}
