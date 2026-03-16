import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { LoginPage } from '../pages/loginPage';

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
    await expect(actualNames).toEqual(sortedNames);
  });
  test('Проверка сортировки Z-A', async () => {
    await inventoryPage.sortZtoA();
    const actualNames = await inventoryPage.getItemNames();
    const sortedAsc = [...actualNames].sort((a, b) => a.localeCompare(b));
    const sortedDesc = sortedAsc.reverse();

    await expect(actualNames).toEqual(sortedDesc);
  });
  test('Проверка сортировки Low-High', async () => {
    await inventoryPage.sortLowToHigh();
    const actualPrice = await inventoryPage.getItemPrices();
    const sortedPrice = actualPrice.toSorted((a, b) => a - b);
    await expect(actualPrice).toEqual(sortedPrice);
  });
  test('Проверка сортировки high-low', async () => {
    await inventoryPage.sortLowToHigh();
    const actualPrice = await inventoryPage.getItemPrices();
    const sortedPrice = actualPrice.toSorted((a, b) => a - b);
    await expect(actualPrice).toEqual(sortedPrice);
  });

  test('Проверка добавления товара в корзину', async () => {
    await inventoryPage.addToCart(0);
    await inventoryPage.header.checkCartItems('1');
  });

  test('Проверка удаления товара из корзины', async () => {
    await inventoryPage.addToCart(0);
    await inventoryPage.removeFromCart(0);
    await inventoryPage.header.checkCartItems('');
  });

  test('Проверка открытия навигации', async () => {
    await inventoryPage.header.openMenu();
    await inventoryPage.navbar.openNavBar();
  });

  test('Проверка закрытия навигации', async () => {
    await inventoryPage.header.openMenu();
    await inventoryPage.navbar.openNavBar();
    await inventoryPage.navbar.closeNavBar();
  });

  test('Проверка перехода в информацию о продукте', async ({ page }) => {
    await inventoryPage.header.openMenu();
    await inventoryPage.navbar.clickAbout();
    await expect(page).toHaveURL(/.*saucelabs\.com.*/);
  });

  test('Проверка выхода из профиля', async ({ page }) => {
    await inventoryPage.header.openMenu();
    await inventoryPage.navbar.logout();
    const loginPage = new LoginPage(page);
    await loginPage.waitLoginVisible();
  });

  test('Проверка сброса состояния страницы', async () => {
    await inventoryPage.addToCart(0);
    await inventoryPage.header.checkCartItems('1');
    await inventoryPage.header.openMenu();
    await inventoryPage.navbar.resetState();
    await inventoryPage.header.checkCartItems('');
  });

  test('Переход на страницу товара', async ({ page }) => {
    await inventoryPage.openItem(1);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Bike Light',
    );
  });
});
