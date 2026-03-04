import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Проверка основной страницы товаров', async () => {
  let inventoryPage: InventoryPage;
  test.use({ storageState: 'playwright/.auth/standard_user.json' });
  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.openInventoryPage();
  });
  test('Проверка перехода на страницу каталога товаров', async () => {
    await inventoryPage.footer.checkFooterVisible();
  });
  test('Проверка сортировки A-Z', async () => {
    await inventoryPage.sortZtoA();
    await inventoryPage.sortAtoZ();
    const actualNames = await inventoryPage.getItemNames();
    const sortedNames = [...actualNames].sort((a, b) => a.localeCompare(b));
    expect(actualNames).toEqual(sortedNames);
  });
  test('Проверка сортировки Z-A', async () => {
    await inventoryPage.sortZtoA();
    const actualNames = await inventoryPage.getItemNames();
    const sortedAsc = [...actualNames].sort((a, b) => a.localeCompare(b));
    const sortedDesc = sortedAsc.reverse();

    expect(actualNames).toEqual(sortedDesc);
  });
  test('Проверка сортировки Low-High', async () => {
    await inventoryPage.sortLowToHigh();
    const actualPrice = await inventoryPage.getItemPrices();
    const sortedPrice = actualPrice.toSorted((a, b) => a - b);
    expect(actualPrice).toEqual(sortedPrice);
  });
  test('Проверка сортировки high-low', async () => {
    await inventoryPage.sortLowToHigh();
    const actualPrice = await inventoryPage.getItemPrices();
    const sortedPrice = actualPrice.toSorted((a, b) => a - b);
    expect(actualPrice).toEqual(sortedPrice);
  });
});
