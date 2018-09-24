import {UserService} from './user.service';
import {UserModel} from '../shared/models/user.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
    const store = {};
    const mockSessionStorage = {

      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      }
    };
    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem')
      .and.callFake(mockSessionStorage.removeItem);
  });

  it('should log in', () => {
    service.logIn({name: 'ilyar'});
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should log out', () => {
    service.logIn({name: 'ilyar'});
    service.logOut();
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should return user', () => {
    const user: UserModel = {name: 'ilyar'};
    service.logIn(user);
    expect(service.getLoggedUser()).toEqual(user);
  });

});
