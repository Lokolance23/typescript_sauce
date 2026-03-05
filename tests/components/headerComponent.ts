import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
}

export class HeaderComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  get headerArea(): Locator {
    return this.page.locator('[data-test="primary-header"]');
  }
  get headerButtonMenu(): Locator {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }
  get headerButtonCart(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get headerCartQuantity(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async checkHeaderVisible() {
    await expect(this.headerArea).toBeVisible();
    await expect(this.headerButtonCart).toBeVisible();
    await expect(this.headerButtonMenu).toBeVisible();
  }

  async checkCartItems(quantityItems: string) {
    await expect(this.headerCartQuantity).toHaveText(quantityItems);
  }
}
