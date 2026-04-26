import { expect } from '@playwright/test';
import { PortfolioPage } from '../pageObjects/PortfolioPage';

/**
 * Theme-toggle verification actions.
 */

export async function verifyThemeToggleVisible(portfolio: PortfolioPage): Promise<void> {
  await expect(portfolio.themeToggle).toBeVisible();
}

/**
 * Toggles theme twice and asserts the HTML `class` attribute differs
 * between the two states (proving the toggle actually works).
 */
export async function verifyThemeRoundTrip(portfolio: PortfolioPage): Promise<void> {
  await portfolio.toggleTheme();
  const classAfterFirst = await portfolio.getHtmlClass();

  await portfolio.toggleTheme();
  const classAfterSecond = await portfolio.getHtmlClass();

  expect(classAfterFirst).not.toBe(classAfterSecond);
}
