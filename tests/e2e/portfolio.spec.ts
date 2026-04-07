import { test, expect } from '@playwright/test';
import { PortfolioPage } from './pom/pageObjects/PortfolioPage';
import { verifyNavigationTabs } from './pom/actions/navigation.actions';

test.describe('Portfolio Website', () => {
  let portfolio: PortfolioPage;

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('test-001 Homepage loads with correct title', async () => {
    await expect(portfolio.page).toHaveTitle(/Mrutyunjay Kar/i);
  });

  test('test-002 Navigation to About section works', async () => {
    await expect(portfolio.getNavLink('About')).toBeVisible();
    await portfolio.clickNavLink('About');
    await expect(portfolio.page).toHaveURL(/#about$/);
    await expect(portfolio.getSectionByHash('#about')).toBeVisible();
  });

  test('test-003 Navigation tabs exist and update the hash for each section', async () => {
    await verifyNavigationTabs(portfolio);
  });

  test('test-004 Projects section displays project cards', async () => {
    await expect(portfolio.projectCards.first()).toBeVisible();
    const count = await portfolio.projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('test-005 Theme toggle switches dark mode OFF', async () => {
    await portfolio.toggleTheme(); // ON
    await portfolio.toggleTheme(); // OFF

    await expect(portfolio.page.locator('html')).not.toHaveClass(/dark/);
  });

  test('test-006 Page has no console errors', async () => {
    const errors: string[] = [];

    portfolio.page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await portfolio.page.reload();
    expect(errors).toEqual([]);
  });
});