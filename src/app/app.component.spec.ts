import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
describe('AppComponent', () => {

  @Component({selector: 'forum-header', template: ''})
  class HeaderStubComponent {
  }

  @Component({selector: 'router-outlet', template: ''})
  class RouterOutletStubComponent {
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderStubComponent,
        RouterOutletStubComponent,
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
