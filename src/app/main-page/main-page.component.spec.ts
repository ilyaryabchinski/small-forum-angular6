import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MainPageComponent} from './main-page.component';
import {UserService} from '../core/user.service';
import {UserModel} from '../shared/models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesService} from './services/messages.service';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';


describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  @Component({selector: 'forum-new-message-dialog', template: ''})
  class NewMessageDialogStubComponent {
  }

  @Component({selector: 'forum-message', template: ''})
  class MessageStubComponent {
  }

  beforeEach(async(() => {
    const store = {user: null};

    const userServiceStub = jasmine.createSpyObj('UserService', ['logIn', 'isLoggedIn']);
    userServiceStub.logIn.and.callFake((user: UserModel) => {
      store.user = user;
    });
    userServiceStub.isLoggedIn.and.callFake(() => !!store.user);

    const modalServiceStub = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    modalServiceStub.open.and.callFake(() => {
    });
    modalServiceStub.dismissAll.and.callFake(() => {
    });

    const messagesServiceStub = jasmine.createSpyObj('MessagesService', ['getAll', 'save']);
    messagesServiceStub.getAll.and.returnValue(of([
      {author: 'admin', title: 'First message', body: 'First message body'},
      {author: 'admin', title: 'Second message', body: 'Second message body'}]
    ));
    messagesServiceStub.save.and.returnValue(of({status: 200, statusText: 'OK', ok: true}));

    TestBed.configureTestingModule({
      declarations: [MessageStubComponent, NewMessageDialogStubComponent, MainPageComponent,],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: UserService, useValue: userServiceStub},
        {provide: NgbModal, useValue: modalServiceStub},
        {provide: MessagesService, useValue: messagesServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
