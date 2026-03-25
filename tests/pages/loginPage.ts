import { Page, Locator, expect } from '@playwright/test';
import { IUser } from '../data/users';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openLoginPage() {
    await this.navigate('https://www.saucedemo.com/');
    await this.waitForPageLoad();
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
    await this.fill(this.emailInput, user.username);
    await this.fill(this.passwordInput, user.password);
    await this.click(this.submitButton);
  }

  async waitLoginVisible() {
    await this.waitForElement(this.emailInput);
    await this.waitForElement(this.passwordInput);
    await this.waitForElement(this.submitButton);
  }

  async checkErrorState() {
    await this.waitForElement(this.errorMessage);
    await this.waitForElement(this.errorCloseButton);
    await this.waitForElement(this.errorUsernameMark);
    await this.waitForElement(this.errorPasswordMark);
  }

  async checkErrorMessage(errorMessage: string) {
    await this.waitForText(this.errorMessage, errorMessage);
  }
}
