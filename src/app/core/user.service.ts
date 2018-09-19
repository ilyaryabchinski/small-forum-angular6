import {Injectable} from '@angular/core';
import {UserModel} from '../shared/models/user.model';


@Injectable()
export class UserService {
  private  SESSION_KEY = 'my-forum-username';
  public logIn(user: UserModel) {
    sessionStorage.setItem(this.SESSION_KEY, user.name);
  }
  public getLoggedUser(): UserModel {
    const username = sessionStorage.getItem(this.SESSION_KEY);
    return username ? {name: username} : null;
  }
  public isLogggedIn(): boolean {
    return sessionStorage.getItem(this.SESSION_KEY) ? true : false;
  }
  public logOut() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
}
