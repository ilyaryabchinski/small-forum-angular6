import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageDialogComponent } from './new-message-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('NewMessageDialogComponent', () => {
  let component: NewMessageDialogComponent;
  let fixture: ComponentFixture<NewMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ NewMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call subscribe on click', () => {
    const message = {body: 'boody', title: 'title'};
    component.messageForm.setValue(message);
    component.newMessage$.subscribe(res => expect(res).toEqual(message));
    fixture.nativeElement.querySelector('button[type="submit"]').click();
  });
});
