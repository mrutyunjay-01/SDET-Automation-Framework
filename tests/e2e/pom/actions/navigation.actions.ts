import { expect } from '@playwright/test';
import { PortfolioPage } from '../pageObjects/PortfolioPage';

export const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export async function verifyNavigationTabs(portfolio: PortfolioPage) {
  await expect(portfolio.navigation).toBeVisible();
  await expect(portfolio.navigation.locator('a')).toHaveCount(navItems.length);

  for (const { name, href } of navItems) {
    const link = portfolio.getNavLink(name);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    await link.click();
    await expect(portfolio.page).toHaveURL(new RegExp(`${href}$`));
    await expect(portfolio.getSectionByHash(href)).toBeVisible();
  }
}
