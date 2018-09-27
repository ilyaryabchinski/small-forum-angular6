// import {LoginPage} from './login-page.po';
// import {browser, by, element, protractor} from 'protractor';
// import {expand} from 'rxjs/operators';
//
//
// describe('Login Page', () => {
//   let page: LoginPage;
//
//   beforeEach(() => {
//     page = new LoginPage();
//     page.navigateTo();
//   });
//
//   it('should enter username in the field', () => {
//     const inputEl = page.getLoginInput();
//     const username = 'sometext';
//
//     inputEl.sendKeys(username);
//     expect(inputEl.getAttribute('value')).toBe(username);
//
//   });
//
//   it('should display button', () => {
//     expect(page.getLoginButton()).not.toBeNull();
//   });
//
//   it('should display login window', () => {
//     expect(page.getLoginBlock()).not.toBeNull();
//   });
//
//   it('should not display greeting and logout button', () => {
//     const headerEl = element(by.css('forum-header'));
//
//     headerEl.$$('button').count().then(count => {
//       expect(count).toBe(0);
//     });
//     headerEl.getText().then(str => {
//       expect(str.includes('Hello')).not.toBeTruthy();
//     });
//   });
//
//   it('should navigate to messages if username is correct', () => {
//     const inputEl = page.getLoginInput();
//     const username = 'sometext';
//
//     inputEl.sendKeys(username);
//
//     page.getLoginButton().click();
//     const EC = protractor.ExpectedConditions;
//     browser.wait(EC.urlContains('messages'), 5000).then(result => {
//       expect(result).toBeTruthy();
//     });
//
//   });
//
//   it('should not log in if username is incorrect', () => {
//     const inputEl = page.getLoginInput();
//     const username = '123';
//
//     inputEl.sendKeys(username);
//     page.getLoginButton().click().then(() => {
//       browser.getCurrentUrl().then(url => {
//         expect(url.includes('messages')).toBeFalsy();
//         expect(url.includes('login')).toBeTruthy();
//       });
//     });
//   });
//
// });
//
