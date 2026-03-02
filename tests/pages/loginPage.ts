import { Page, Locator, expect } from '@playwright/test';
import { IUser } from '../data/users';

export class LoginPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  get emailInput(): Locator {
    return this.page.locator('[data-test="username"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('[data-test="password"]');
  }

  get submitButton(): Locator {
    return this.page.locator('[data-test="login-button"]');
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  get errorCloseButton(): Locator {
    return this.page.locator('[data-test="error-button"]');
  }

  get errorField(): Locator {
    return this.page.locator('div').filter({ hasText: /^Epic sadface: Username is required$/ });
  }

  get errorUsernameMark(): Locator {
    return this.page.locator('path').first();
  }

  get errorPasswordMark(): Locator {
    return this.page.locator('path').nth(1);
  }

  get titlePage(): Locator {
    return this.page.getByText('Swag Labs');
  }

  async login(user: IUser) {
    await this.emailInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }

  async waitLoginVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
