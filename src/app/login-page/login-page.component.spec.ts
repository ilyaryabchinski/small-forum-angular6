import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {UserService} from '../core/user.service';
import {UserModel} from '../shared/models/user.model';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {lettersValidator} from '../shared/validators/letters.validator';
import {ToastrService} from 'ngx-toastr';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    const store = { user: null };
    const userServiceStub = jasmine.createSpyObj('UserService', ['logIn', 'isLoggedIn']);
    userServiceStub.logIn.and.callFake( (user: UserModel) => {
      store.user = user;
    });
    userServiceStub.isLoggedIn.and.callFake(() => !!store.user);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ LoginPageComponent ],
      providers: [
        {provide: UserService, useValue: userServiceStub},
        { provide: Router,      useValue: routerSpy },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ToastrService, useValue: toastrSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    component.loginForm = formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        lettersValidator()
      ]
      ]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in', () => {
    const service = fixture.debugElement.injector.get(UserService);
    const router = fixture.debugElement.injector.get(Router);
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    const submitButton: HTMLElement = hostElement.querySelector('button');
    const routerSpy = router.navigate as jasmine.Spy;

    nameInput.value = 'ilyaryabchinski';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.click();

    expect(service.isLoggedIn()).toBeTruthy();
    expect(routerSpy).toHaveBeenCalledWith(['/messages']);
  });

  it('should not log in', () => {
    const service = fixture.debugElement.injector.get(UserService);
    const router = fixture.debugElement.injector.get(Router);
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    const submitButton: HTMLElement = hostElement.querySelector('button');
    const routerSpy = router.navigate as jasmine.Spy;

    nameInput.value = 'ily';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.click();

    expect(service.isLoggedIn()).toBeFalsy();
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });

});
