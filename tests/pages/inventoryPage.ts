import { Page, Locator, expect } from '@playwright/test';
import { FooterComponent } from '../components/footerComponent';
import { HeaderComponent } from '../components/headerComponent';

export class InventoryPage {
  page: Page;
  footer: FooterComponent;
  header: HeaderComponent;
  constructor(page: Page) {
    this.page = page;
    this.footer = new FooterComponent(page);
    this.header = new HeaderComponent(page);
  }

  get nameTitle(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  get sortButton(): Locator {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  get itemsList(): Locator {
    return this.page.locator('[data-test="inventory-container"]');
  }

  get inventoryItems(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  item(index: number): Locator {
    return this.inventoryItems.nth(index);
  }

  itemName(index: number): Locator {
    return this.item(index).locator('[data-test="inventory-item-name"]');
  }

  itemPrice(index: number): Locator {
    return this.item(index).locator('[data-test="inventory-item-price"]');
  }
  itemDescription(index: number): Locator {
    return this.item(index).locator('[data-test="inventory-item-desc"]');
  }

  itemAddCart(index: number): Locator {
    return this.item(index).locator('[data-test^="add-to-cart"]');
  }

  itemRemoveCart(index: number): Locator {
    return this.item(index).locator('[data-test^="remove"]');
  }

  async inventoryPageVisible() {
    await expect(this.nameTitle).toBeVisible();
    await expect(this.sortButton).toBeVisible();
    await expect(this.itemsList).toBeVisible();
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

  async addToCart(index: number) {
    await this.itemAddCart(index).click();
  }

  async removeFromCart(index: number) {
    await this.itemRemoveCart(index).click();
  }
}
