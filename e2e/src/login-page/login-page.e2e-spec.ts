import {LoginPage} from './login-page.po';
import {by, element} from 'protractor';
import {text} from '@fortawesome/fontawesome-svg-core';


describe('Login Page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should enter username in the field', () => {
    const inputEl = page.getLoginInput();
    const username = 'sometext';

    inputEl.sendKeys(username);
    expect(inputEl.getAttribute('value')).toBe(username);

  });

  it('should display button', () => {
    expect(page.getLoginButton()).not.toBeNull();
  });

  it('should display login window and logout button', () => {
    expect(page.getLoginBlock()).not.toBeNull();
  });

  it('should not display greeting', () => {
    const headerEl = element(by.css('forum-header'));
    
    headerEl.$$('button').count().then(count => {
      expect(count).toBe(0);
    });
    headerEl.getText().then(str => {
      expect(str.includes('Hello')).not.toBeTruthy();
    });
  });

  it('should log in navigate to messages', function () {
    
  });

  it('should not log in', function () {
    
  });
});
