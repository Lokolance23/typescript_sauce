import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { users } from '../data/users';

let loginPage: LoginPage;
const standardUserFile = 'playwright/.auth/standard_user.json';
const errorUserFile = 'playwright/.auth/error_user.json';

setup.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.waitLoginVisible();
});

setup('authenticate as standard_user', async ({ page }) => {
  await loginPage.login(users.standard);

  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await page.context().storageState({ path: standardUserFile });
});
setup('authenticate as problem_user', async ({ page }) => {
  await loginPage.login(users.problem);

  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await page.context().storageState({ path: errorUserFile });
});
