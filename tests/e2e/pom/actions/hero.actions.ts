import { expect } from '@playwright/test';
import { PortfolioPage } from '../pageObjects/PortfolioPage';

/**
 * Hero-section verification actions.
 */
export async function verifyHeroHeading(portfolio: PortfolioPage): Promise<void> {
  await expect(portfolio.heroSection).toBeVisible();
  await expect(portfolio.heroSection).toContainText('Mrutyunjay Kar');
}

export async function verifyViewMyWorkCta(portfolio: PortfolioPage): Promise<void> {
  await expect(portfolio.viewMyWorkCta).toBeVisible();
  await expect(portfolio.viewMyWorkCta).toHaveAttribute('href', '#projects');
}

export async function verifyDownloadResumeCta(portfolio: PortfolioPage): Promise<void> {
  await expect(portfolio.downloadResumeCta).toBeVisible();
  await expect(portfolio.downloadResumeCta).toHaveAttribute('href', /resume\.pdf$/);
}

export async function verifyContactMeCta(portfolio: PortfolioPage): Promise<void> {
  await expect(portfolio.contactMeCta).toBeVisible();
  await expect(portfolio.contactMeCta).toHaveAttribute('href', '#contact');
}

export async function verifyOpportunityBadge(portfolio: PortfolioPage): Promise<void> {
  await expect(portfolio.heroSection).toContainText(/open to new opportunities/i);
}

export async function verifyViewMyWorkScrollsToProjects(portfolio: PortfolioPage): Promise<void> {
  await portfolio.viewMyWorkCta.click();
  await portfolio.page.waitForTimeout(800);
  await expect(portfolio.projectsSection).toBeInViewport();
}

export async function verifyContactMeScrollsToContact(portfolio: PortfolioPage): Promise<void> {
  await portfolio.contactMeCta.click();
  await portfolio.page.waitForTimeout(800);
  await expect(portfolio.contactSection).toBeInViewport();
}

export async function verifyBrandLogo(portfolio: PortfolioPage): Promise<void> {
  await expect(portfolio.brandLogo).toContainText('MK.');
}
