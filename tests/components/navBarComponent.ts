import { expect, Locator, Page } from '@playwright/test';

export class NavBarComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  get closeNavBarButton(): Locator {
    return this.page.getByRole('button', { name: 'Close Menu' });
  }

  get openAllItemsButton(): Locator {
    return this.page.locator('[data-test="inventory-sidebar-link"]');
  }

  get aboutButton(): Locator {
    return this.page.locator('[data-test="about-sidebar-link"]');
  }

  get logoutButton(): Locator {
    return this.page.locator('[data-test="logout-sidebar-link"]');
  }

  get resetStateButton(): Locator {
    return this.page.locator('[data-test="reset-sidebar-link"]');
  }

  async checkVisibleNavBar() {
    await expect(this.openAllItemsButton).toBeVisible();
    await expect(this.aboutButton).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.resetStateButton).toBeVisible();
    await expect(this.closeNavBarButton).toBeVisible();
  }

  async checkHiddenNavBar() {
    await expect(this.openAllItemsButton).toBeHidden();
    await expect(this.aboutButton).toBeHidden();
    await expect(this.logoutButton).toBeHidden();
    await expect(this.resetStateButton).toBeHidden();
    await expect(this.closeNavBarButton).toBeHidden();
  }

  async openNavBar() {
    await this.checkVisibleNavBar();
  }

  async closeNavBar() {
    await this.closeNavBarButton.click();
    await this.checkHiddenNavBar();
  }

  async clickAllIlems() {
    await this.openAllItemsButton.click();
  }

  async clickAbout() {
    await this.aboutButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async resetState() {
    await this.resetStateButton.click();
  }
}
