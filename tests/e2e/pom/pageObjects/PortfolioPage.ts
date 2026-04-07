import type { Locator, Page } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;
  readonly navigation: Locator;
  readonly themeToggle: Locator;
  readonly projectCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.locator('.nav-links');
    this.themeToggle = page.locator('#themeToggle');
    this.projectCards = page.locator('.project-card');
  }

  async goto() {
    await this.page.goto('/');
  }

  getNavLink(name: string) {
    return this.navigation.getByRole('link', { name });
  }

  async clickNavLink(name: string) {
    await this.getNavLink(name).click();
  }

  getSectionByHash(hash: string) {
    return this.page.locator(hash);
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }
}
