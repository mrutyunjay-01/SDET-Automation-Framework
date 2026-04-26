import { expect } from '@playwright/test';
import { PortfolioPage } from '../pageObjects/PortfolioPage';

/**
 * Contact-section and footer verification actions.
 */

/* ── Contact Form ──────────────────────────────── */

export async function verifyContactFormFields(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.contactSection);
  await expect(portfolio.contactNameField).toBeVisible();
  await expect(portfolio.contactMessageField).toBeVisible();
}

export async function verifyContactSubmitButton(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.contactSection);
  await expect(portfolio.contactSubmitButton.first()).toBeVisible();
}

export async function verifyContactQuickLinks(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.contactSection);
  await expect(portfolio.getContactQuickLink(/email/i)).toBeVisible();
  await expect(portfolio.getContactQuickLink(/call/i)).toBeVisible();
  await expect(portfolio.getContactQuickLink(/linkedin/i)).toBeVisible();
}

export async function verifyEmailLinkProtocol(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.contactSection);
  await expect(portfolio.getContactQuickLink(/email/i)).toHaveAttribute('href', /^mailto:/);
}

export async function verifyCallLinkProtocol(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.contactSection);
  await expect(portfolio.getContactQuickLink(/call/i)).toHaveAttribute('href', /^tel:/);
}

export async function verifyContactFormCanBeFilled(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.contactSection);
  await portfolio.fillContactForm('Test User', 'This is a test message');
  await expect(portfolio.contactNameField).toHaveValue('Test User');
  await expect(portfolio.contactMessageField).toHaveValue('This is a test message');
}

/* ── Footer ────────────────────────────────────── */

export async function verifyFooterLinks(
  portfolio: PortfolioPage,
  minLinks = 3,
): Promise<void> {
  await portfolio.scrollToSection(portfolio.footer);
  await expect(portfolio.footer).toBeVisible();
  const count = await portfolio.footerLinks.count();
  expect(count).toBeGreaterThanOrEqual(minLinks);
}

export async function verifyFooterCopyright(portfolio: PortfolioPage): Promise<void> {
  await portfolio.scrollToSection(portfolio.footer);
  await expect(portfolio.footer).toContainText(/mrutyunjay/i);
}
