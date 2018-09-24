import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [ MessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.message = {author: 'ilyar', body: 'test body', title: 'title'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message', () => {
    const authorEl: HTMLElement = fixture.nativeElement.querySelector('div.card-header');
    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.card-title');
    const bodyEl: HTMLElement = fixture.nativeElement.querySelector('.card-text span');

    expect(authorEl.textContent.includes(component.message.author)).toBeTruthy();
    expect(titleEl.textContent.includes(component.message.title)).toBeTruthy();
    expect(bodyEl.textContent.includes(component.message.body)).toBeTruthy();

  });
});
