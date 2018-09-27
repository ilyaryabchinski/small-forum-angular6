import {browser, by, element, ElementFinder} from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getLoginBlock(): ElementFinder {
    return element(by.css('login-page'));
  }

  getLoginInput(): ElementFinder {
    return element(by.css('input.form-control'));
  }

  getLoginButton(): ElementFinder {
    return element(by.css('button[type=submit]'));
  }
}
