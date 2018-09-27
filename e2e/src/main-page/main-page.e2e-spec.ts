import {MainPage} from './main-page.po';
import {browser, by, element, protractor} from 'protractor';


describe('main-page', () => {
  let page: MainPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new MainPage();
    page.navigateTo();
  });

  afterEach(() => {
    page.logout();
  });

  it('should display welcome message and logout button', () => {

    const headerEl = element(by.css('forum-header'));

    headerEl.$$('button').count().then(count => {
      expect(count).toBe(1);
    });
    headerEl.$$('.user-greeting').count().then(count => {
      expect(count).toBe(1);
    });
  });

  it('should display messages', () => {
    const mainEl = element(by.css('forum-main-page'));

    mainEl.$$('forum-message').count().then(count => {
      expect(count).toBeGreaterThan(0);
    });
  });

  it('should open dialog', () => {
    const buttonEl = element(by.css('button.create-button'));
    element(by.css('div.toast-success')).click();
    browser.wait(protractor.ExpectedConditions.not(protractor.ExpectedConditions.presenceOf(element(by.css('div.toast-success')))), 2000, '');
    buttonEl.click().then(() => {
      expect(element(by.css('button.create-button'))).toBeDefined();
    });
  });
});
