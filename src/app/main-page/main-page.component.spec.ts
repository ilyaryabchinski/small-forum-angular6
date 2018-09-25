import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MainPageComponent} from './main-page.component';
import {UserService} from '../core/user.service';
import {UserModel} from '../shared/models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesService} from './services/messages.service';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {MessageModel} from '../shared/models/message.model';


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
    const messagesStub = [
      {author: 'admin', title: 'First message', body: 'First message body'},
      {author: 'admin', title: 'Second message', body: 'Second message body'}
      ];
    const userServiceStub = jasmine.createSpyObj('UserService', ['logIn', 'getLoggedUser']);
    userServiceStub.logIn.and.callFake((user: UserModel) => {
      store.user = user;
    });
    userServiceStub.getLoggedUser.and.callFake(() => store.user);

    const modalServiceStub = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    modalServiceStub.open.and.callFake(() => {});
    modalServiceStub.dismissAll.and.callFake(() => {});
    const messagesServiceStub = jasmine.createSpyObj('MessagesService', ['getAll', 'save']);
    messagesServiceStub.getAll.and.returnValue(of(messagesStub));
    messagesServiceStub.save.and.callFake((message: MessageModel) => {
      messagesStub.push(message);
      return of({status: 200, statusText: 'OK', ok: true});
    });

    TestBed.configureTestingModule({
      declarations: [MessageStubComponent, NewMessageDialogStubComponent, MainPageComponent],
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
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get list of messages', fakeAsync (() => {
    const messagesService = fixture.debugElement.injector.get(MessagesService) as any;
    fixture.detectChanges();
    tick();

    expect(messagesService.getAll.calls.count()).toBe(1);
    expect(component.messages.length).toBe(2);
    component.ngOnDestroy();
  }));

  it('should send new message', fakeAsync (() => {
    const messagesService = fixture.debugElement.injector.get(MessagesService) as any;
    const userService = fixture.debugElement.injector.get(UserService) as any;
    const loggedUser = {name: 'somebody'};
    userService.logIn(loggedUser);
    fixture.detectChanges();
    const newMessage = {author: undefined, title: 'title', body: 'text'};
    component.onNewMessageRecieved(newMessage);
    tick();
    fixture.detectChanges();
    expect(messagesService.save).toHaveBeenCalledWith(newMessage);
    expect(component.messages.length).toBe(3);
    expect(component.messages.pop()).toEqual(Object.assign(newMessage, loggedUser));
    component.ngOnDestroy();
  }));

});
