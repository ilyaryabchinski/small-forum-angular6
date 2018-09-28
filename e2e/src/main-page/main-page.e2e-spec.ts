import {MainPage} from './main-page.po';
import {browser, by, element, ElementFinder, ExpectedConditions, protractor} from 'protractor';
import {Element} from '@angular/compiler';


describe('main-page', () => {
  let page: MainPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new MainPage();
    page.navigateTo();
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

  it('should log out', () => {

    element(by.buttonText('Log Out')).click();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('login'), 5000).then(result => {
      expect(result).toBeTruthy();
    });
  });

  it('should open dialog', () => {
    const toast = element(by.css('.toast-success'));
    browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(toast)));
    const buttonEl = element(by.css('.btn-success'));
    buttonEl.click();
    element(by.css('ngb-modal-window')).isPresent().then(result => {
      expect(result).toBeTruthy();
    });
  });

  it('should show validation errors when fields is empty', () => {
    const toast = element(by.css('.toast-success'));
    browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(toast)));
    const buttonEl = element(by.css('.btn-success'));
    buttonEl.click();
    browser.wait(ExpectedConditions.presenceOf(element(by.css('ngb-modal-window'))));
    const inputTitleEl = element(by.css('input#title'));
    const inputBodyEl = element(by.css('textarea#body'));
    inputTitleEl.click();
    inputBodyEl.click();
    inputTitleEl.click();
    const titleMessageEl = inputTitleEl.element(by.xpath('ancestor::div[2]')).$('.badge').$('div.ng-star-inserted');
    const bodyMessageEl = inputBodyEl.element(by.xpath('ancestor::div[2]')).$('.badge').$('div.ng-star-inserted');
    titleMessageEl.getText().then(text => {
      expect(text).toBe('Title is required.');
    });
    bodyMessageEl.getText().then(text => {
      expect(text).toBe('Message is required.');
    });
  });
});
