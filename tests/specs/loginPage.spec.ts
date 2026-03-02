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
});
