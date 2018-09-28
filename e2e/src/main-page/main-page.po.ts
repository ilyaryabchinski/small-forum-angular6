import {browser, by, element, ElementFinder, protractor} from 'protractor';

export class MainPage {
  public TEST_USERNAME = 'testusername';

  navigateTo() {
    browser.get('/login');
    const usernameInput = element(by.css('input.form-control'));
    usernameInput.sendKeys(this.TEST_USERNAME);
    element(by.css('button[type=submit]')).click();
  }

  logout() {
    const headerEl = element(by.css('forum-header'));
    headerEl.$('button').click().then(() => {
      return browser.getPageSource();
    });
  }
}
