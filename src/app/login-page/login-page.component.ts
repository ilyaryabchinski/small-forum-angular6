import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {lettersValidator} from '../shared/validators/letters.validator';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'forum-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public loginForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(5),
      lettersValidator()
      ]
    ]
  });

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService) { }
  logIn() {
    if (this.loginForm.valid) {
      this.userService.logIn({ name: this.username.value });
      this.router.navigate(['/messages']).then( res => {
        this.toastr.clear();
        this.toastr.success('You logged in!', '', {positionClass: 'toast-bottom-right'});
      });
    } else  {
      this.toastr.error('Your username is incorrect', '', {positionClass: 'toast-bottom-right'});
    }
  }
  get username() { return this.loginForm.get('username'); }
}
