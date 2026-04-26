import { expect, type Page } from '@playwright/test';
import { PortfolioPage } from '../pageObjects/PortfolioPage';

/**
 * Accessibility, SEO, performance, and link-integrity verification actions.
 */

/* ── Accessibility ─────────────────────────────── */

export async function verifySingleH1(portfolio: PortfolioPage): Promise<void> {
  const h1Count = await portfolio.page.locator('h1').count();
  expect(h1Count).toBe(1);
}

export async function verifyAllImagesHaveAlt(portfolio: PortfolioPage): Promise<void> {
  const images = portfolio.page.locator('img');
  const count = await images.count();

  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    expect(alt, `Image ${i} is missing alt attribute`).not.toBeNull();
  }
}

export async function verifyNavLinksHaveAccessibleNames(portfolio: PortfolioPage): Promise<void> {
  const navLinks = portfolio.navigation.locator('a');
  const count = await navLinks.count();

  for (let i = 0; i < count; i++) {
    const text = await navLinks.nth(i).innerText();
    expect(text.trim().length, `Nav link ${i} has no text`).toBeGreaterThan(0);
  }
}

/* ── SEO ───────────────────────────────────────── */

/**
 * Documents that the site currently lacks a `<meta name="description">` tag.
 * Flip the assertion to `.toBe(1)` once a description is added.
 */
export async function verifyMetaDescriptionGap(portfolio: PortfolioPage): Promise<void> {
  const metaDesc = portfolio.page.locator('meta[name="description"]');
  const count = await metaDesc.count();
  expect(count, 'SEO: meta description tag is missing – consider adding one').toBe(0);
}

/* ── Performance ───────────────────────────────── */

export async function verifyPageLoadsWithinMs(
  page: Page,
  maxMs = 5000,
): Promise<void> {
  const start = Date.now();
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  const loadTime = Date.now() - start;

  expect(loadTime).toBeLessThan(maxMs);
}

/* ── Link Integrity ────────────────────────────── */

export async function verifyAllHashLinksResolve(portfolio: PortfolioPage): Promise<void> {
  const hashLinks = portfolio.page.locator('a[href^="#"]');
  const count = await hashLinks.count();

  for (let i = 0; i < count; i++) {
    const href = await hashLinks.nth(i).getAttribute('href');
    if (href && href !== '#') {
      const exists = (await portfolio.page.locator(href).count()) > 0;
      expect(exists, `Section ${href} does not exist`).toBeTruthy();
    }
  }
}
