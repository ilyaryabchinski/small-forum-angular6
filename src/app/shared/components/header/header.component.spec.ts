import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../../core/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    const store = { user: null };
    const userServiceStub = jasmine.createSpyObj('UserService', ['logIn', 'logOut', 'isLoggedIn', 'getLoggedUser']);
    userServiceStub.logIn.and.callFake( (user: UserModel) => {
      store.user = user;
    });
    userServiceStub.isLoggedIn.and.callFake(() => !!store.user);
    userServiceStub.getLoggedUser.and.callFake(() => store.user);
    userServiceStub.logOut.and.callFake(() => store.user = null);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: UserService, useValue: userServiceStub},
        { provide: Router,      useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show username and logout button when user logged in', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const loddedUser: UserModel = {name: 'ilyaryabchinski'};
    userService.logIn(loddedUser);
    fixture.detectChanges();
    const userGreeting = fixture.nativeElement.querySelector('.user-greeting');
    const logoutButton = fixture.nativeElement.querySelector('button');

    expect(userGreeting.textContent.includes(loddedUser.name)).toBeTruthy();
    expect(logoutButton).not.toBeNull();

  });

  it('should not show username and logout button when user logged out', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const loddedUser: UserModel = {name: 'ilyaryabchinski'};
    userService.logIn(loddedUser);
    fixture.detectChanges();
    userService.logOut();
    fixture.detectChanges();
    const userGreeting = fixture.nativeElement.querySelector('.user-greeting');
    const logoutButton = fixture.nativeElement.querySelector('button');

    expect(userGreeting).toBeNull();
    expect(logoutButton).toBeNull();

  });

  it('should navigate to login page when user logs out', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const router = fixture.debugElement.injector.get(Router);
    const loddedUser: UserModel = {name: 'ilyaryabchinski'};
    const routerSpy = router.navigate as jasmine.Spy;
    userService.logIn(loddedUser);
    fixture.detectChanges();
    const userGreeting = fixture.nativeElement.querySelector('.user-greeting');
    const logoutButton = fixture.nativeElement.querySelector('button');

    logoutButton.click();

    expect(userService.isLoggedIn()).toBeFalsy();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);



  });
});
