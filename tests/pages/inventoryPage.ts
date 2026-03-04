import { Page, Locator, expect } from '@playwright/test';
import { FooterComponent } from '../components/footerComponent';

export class InventoryPage {
  page: Page;
  footer: FooterComponent;
  constructor(page: Page) {
    this.page = page;
    this.footer = new FooterComponent(page);
  }

  get nameTitle(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  get sortButton(): Locator {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  get catalogList(): Locator {
    return this.page.locator('[data-test="inventory-container"]');
  }

  get firstItem(): Locator {
    return this.page.locator('[data-test="item-5-title-link"]');
  }

  async inventoryPageVisible() {
    await expect(this.nameTitle).toBeVisible();
    await expect(this.sortButton).toBeVisible();
    await expect(this.catalogList).toBeVisible();
  }

  async openInventoryPage() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.inventoryPageVisible();
  }
  async sortAtoZ() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('az');
  }
  async sortZtoA() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('za');
  }
  async sortLowToHigh() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  }
  async sortHighToLow() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }

  async sortItemsAsc() {}
}
