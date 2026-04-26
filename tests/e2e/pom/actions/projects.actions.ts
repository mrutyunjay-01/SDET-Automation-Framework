import { expect } from '@playwright/test';
import { PortfolioPage } from '../pageObjects/PortfolioPage';

/**
 * Projects-section verification actions.
 */

/** The filter button labels rendered above the project grid. */
export const PROJECT_FILTER_LABELS = ['All', 'Playwright', 'Python', 'AI/ML'] as const;

export async function verifyFilterButtonsExist(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.projectsSection);

  for (const label of PROJECT_FILTER_LABELS) {
    await expect(portfolio.getProjectFilterButton(label)).toBeVisible();
  }
}

export async function verifyFilterUpdatesCards(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.projectsSection);

  // Apply "Playwright" filter
  await portfolio.getProjectFilterButton('Playwright').click();

  const filteredCount = await portfolio.projectCards.filter({
    has: portfolio.page.locator(':visible'),
  }).count();
  expect(filteredCount).toBeGreaterThan(0);

  // Reset with "All" and verify at least as many cards
  await portfolio.getProjectFilterButton('All').click();
  const allCount = await portfolio.projectCards.count();
  expect(allCount).toBeGreaterThanOrEqual(filteredCount);
}

export async function verifyEachCardHasTitle(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.projectsSection);

  const count = await portfolio.projectCards.count();
  for (let i = 0; i < count; i++) {
    const heading = portfolio.projectCards
      .nth(i)
      .locator('h3, h4, .project-title, [class*="title"]')
      .first();
    await expect(heading).not.toBeEmpty();
  }
}

export async function verifyLikeButtonsExist(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.projectsSection);
  const count = await portfolio.projectLikeButtons.count();
  expect(count).toBeGreaterThan(0);
}

export async function verifyLikeButtonIncrements(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.projectsSection);

  const firstLikeBtn = portfolio.projectLikeButtons.first();
  await firstLikeBtn.scrollIntoViewIfNeeded();

  const textBefore = await firstLikeBtn.innerText();
  await firstLikeBtn.click();
  const textAfter = await firstLikeBtn.innerText();

  expect(textAfter).not.toBe(textBefore);
}
