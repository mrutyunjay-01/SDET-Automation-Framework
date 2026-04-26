import { expect } from '@playwright/test';
import { PortfolioPage } from '../pageObjects/PortfolioPage';

/**
 * UI-component verification actions
 * (command palette, back-to-top button).
 */

/* ── Command Palette ───────────────────────────── */

export async function verifyCommandPaletteButtonExists(portfolio: PortfolioPage): Promise<void> {
  await expect(portfolio.commandPaletteButton).toBeVisible();
}

export async function verifyCommandPaletteOpensModal(portfolio: PortfolioPage): Promise<void> {
  await portfolio.commandPaletteButton.click();
  await expect(portfolio.commandPaletteModal.first()).toBeVisible({ timeout: 3000 });
}

/* ── Back to Top ───────────────────────────────── */

export async function verifyBackToTopAppearsOnScroll(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToBottom();
  await expect(portfolio.backToTopButton).toBeVisible();
}

export async function verifyBackToTopScrollsToHero(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToBottom();
  await portfolio.backToTopButton.click();
  await portfolio.page.waitForTimeout(800);
  await expect(portfolio.heroSection).toBeInViewport();
}
