import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { users } from '../data/users';

test.describe('Проверка на странице логина', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.waitLoginVisible();
  });
  test('Проверка перехода на страницу логина', async ({ page }) => {
    await expect(loginPage.titlePage).toHaveText('Swag Labs');
  });

  test('Проверка успешной авторизации', async ({ page }) => {
    await loginPage.login(users.standard);
    await expect(page.getByText('Swag Labs')).toBeVisible;
  });

  test('Проверка неуспешной авторизации', async ({ page }) => {
    await loginPage.login(users.locked);
    await loginPage.checkErrorState();
    await loginPage.checkErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Проверка авторизации пустых полей', async ({ page }) => {
    await loginPage.submitButton.click();
    await loginPage.checkErrorState();
    await loginPage.checkErrorMessage('Epic sadface: Username is required');
  });

  test('Проверка успешной авторизации сломанного пользователя', async ({ page }) => {
    await loginPage.login(users.error_user);
    await expect(page.getByText('Swag Labs')).toBeVisible;
  });

  test('Проверка авторизации с неправильными данными', async ({ page }) => {
    await loginPage.login(users.invalid_user);
    await loginPage.checkErrorState();
    await loginPage.checkErrorMessage(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('Проверка авторизации без ввода password', async ({ page }) => {
    await loginPage.login(users.user_without_password);
    await loginPage.checkErrorState();
    await loginPage.checkErrorMessage('Epic sadface: Password is required');
  });

  test('Проверка авторизации без ввода username', { tag: '@smoke' }, async ({ page }) => {
    await loginPage.login(users.user_without_username);
    await loginPage.checkErrorState();
    await loginPage.checkErrorMessage('Epic sadface: Username is required');
  });
});
