import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
}

export class FooterComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get footerArea(): Locator {
    return this.page.locator('[data-test="footer"]');
  }
  get footerTwitterLink(): Locator {
    return this.page.locator('[data-test="social-twitter"]');
  }
  get footerFacebookLink(): Locator {
    return this.page.locator('[data-test="social-facebook"]');
  }

  get footerLinkedinLink(): Locator {
    return this.page.locator('[data-test="social-linkedin"]');
  }
  get footerCopyrightText(): Locator {
    return this.page.locator('[data-test="footer-copy"]');
  }

  async checkFooterVisible() {
    await expect(this.footerArea).toBeVisible();
    await expect(this.footerTwitterLink).toBeVisible();
    await expect(this.footerFacebookLink).toBeVisible();
    await expect(this.footerLinkedinLink).toBeVisible();
    await expect(this.footerCopyrightText).toBeVisible();
  }

  async checkNameFooter() {
    const expectedText =
      '© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy';
    await expect(this.footerCopyrightText).toContainText(expectedText);
  }
}
