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
  });

  test('Проверка неуспешной авторизации', async ({ page }) => {
    await loginPage.login(users.locked);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorPasswordMark).toBeVisible();
    await expect(loginPage.errorUsernameMark).toBeVisible();
    await expect(loginPage.errorCloseButton).toBeVisible();
  });
});
