import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
}

export class FooterComponent {
  readonly page: Page;
  readonly elementsFooter: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elementsFooter = [
      {
        locator: (page: Page) => page.locator('[data-test="footer"]'),
        name: 'Footer',
      },
      {
        locator: (page: Page) => page.locator('[data-test="social-twitter"]'),
        name: 'Twitter link',
      },
      {
        locator: (page: Page) => page.locator('[data-test="social-facebook"]'),
        name: 'Facebook link',
      },
      {
        locator: (page: Page) => page.locator('[data-test="social-linkedin"]'),
        name: 'Twitter link',
      },
      {
        locator: (page: Page) => page.locator('[data-test="footer-copy"]'),
        name: 'Footer text',
        text: '© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy',
      },
    ];
  }

  async checkFooterVisible() {
    for (const { locator, name } of this.elementsFooter) {
      await test.step(`Проверка ${name}`, async () => {
        await expect(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkNameFooter() {
    for (const { locator, name, text } of this.elementsFooter) {
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect(locator(this.page)).toContainText(text);
        });
      }
    }
  }
}
