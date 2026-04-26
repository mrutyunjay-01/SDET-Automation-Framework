import { expect } from '@playwright/test';
import { PortfolioPage } from '../pageObjects/PortfolioPage';

/**
 * Content-section verification actions (About, Experience, Resume).
 */

/* ── About ─────────────────────────────────────── */

export async function verifyAboutSectionPresent(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.aboutSection);
  await expect(portfolio.aboutSection).toBeVisible();
  await expect(portfolio.aboutSection).toContainText(/about/i);
}

export async function verifyAboutTechStack(
  portfolio: PortfolioPage,
  expectedTech: string[] = ['Playwright', 'TypeScript', 'Python', 'Selenium'],
): Promise<void> {
  await portfolio.scrollToSection(portfolio.aboutSection);
  for (const tech of expectedTech) {
    await expect(portfolio.aboutSection).toContainText(tech);
  }
}

/* ── Experience ────────────────────────────────── */

export async function verifyTimelineEntries(
  portfolio: PortfolioPage,
  minEntries = 2,
): Promise<void> {
  await portfolio.scrollToSection(portfolio.experienceSection);
  await expect(portfolio.experienceSection).toBeVisible();

  const count = await portfolio.timelineItems.count();
  expect(count).toBeGreaterThanOrEqual(minEntries);
}

export async function verifyCurrentRoleAtEricsson(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.experienceSection);
  await expect(portfolio.experienceSection).toContainText(/Ericsson/i);
  await expect(portfolio.experienceSection).toContainText(/present/i);
}

/* ── Resume ────────────────────────────────────── */

export async function verifyResumeSectionVisible(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.resumeSection);
  await expect(portfolio.resumeSection).toBeVisible();
}
