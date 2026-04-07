import { test, expect } from '@playwright/test';

test.describe('Portfolio Website', () => {

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Homepage loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Mrutyunjay Kar/i);
  });

  test('Navigation to About section works', async ({ page }) => {
    const aboutLink = page.getByRole('navigation').getByRole('link', { name: 'About' });
    await expect(aboutLink).toBeVisible(); // auto-waits
    await aboutLink.click();
  });

  test('Projects section displays project cards', async ({ page }) => {
    const cards = page.locator('.project-card');

    // Playwright auto-wait assertion
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Theme toggle switches dark mode OFF', async ({ page }) => {
    const html = page.locator('html');
    const toggle = page.locator('#themeToggle');

    await toggle.click(); // ON
    await toggle.click(); // OFF

    await expect(html).not.toHaveClass(/dark/);
  });

  test('Page has no console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.reload();
    expect(errors).toEqual([]);
  });

});