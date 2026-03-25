import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(locator: Locator, timeout: number = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async click(locator: Locator) {
    await this.waitForElement(locator);
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await this.waitForElement(locator);
    await locator.fill(text);
  }

  async waitForText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async clear(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.clear();
  }
}
