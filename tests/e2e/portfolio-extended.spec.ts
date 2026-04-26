import { test, expect } from '@playwright/test';
import { PortfolioPage } from './pom/pageObjects/PortfolioPage';

/* ── Action Imports ────────────────────────────── */
import {
  verifyHeroHeading,
  verifyViewMyWorkCta,
  verifyDownloadResumeCta,
  verifyContactMeCta,
  verifyOpportunityBadge,
  verifyViewMyWorkScrollsToProjects,
  verifyContactMeScrollsToContact,
  verifyBrandLogo,
} from './pom/actions/hero.actions';

import {
  verifyAboutSectionPresent,
  verifyAboutTechStack,
  verifyTimelineEntries,
  verifyCurrentRoleAtEricsson,
  verifyResumeSectionVisible,
} from './pom/actions/sections.actions';

import {
  verifyFilterButtonsExist,
  verifyFilterUpdatesCards,
  verifyEachCardHasTitle,
  verifyLikeButtonsExist,
  verifyLikeButtonIncrements,
} from './pom/actions/projects.actions';

import {
  verifyContactFormFields,
  verifyContactSubmitButton,
  verifyContactQuickLinks,
  verifyEmailLinkProtocol,
  verifyCallLinkProtocol,
  verifyContactFormCanBeFilled,
  verifyFooterLinks,
  verifyFooterCopyright,
} from './pom/actions/contact.actions';

import {
  verifyThemeToggleVisible,
  verifyThemeRoundTrip,
} from './pom/actions/theme.actions';

import {
  verifyCommandPaletteButtonExists,
  verifyCommandPaletteOpensModal,
  verifyBackToTopAppearsOnScroll,
  verifyBackToTopScrollsToHero,
} from './pom/actions/ui-components.actions';

import {
  verifySingleH1,
  verifyAllImagesHaveAlt,
  verifyNavLinksHaveAccessibleNames,
  verifyMetaDescriptionGap,
  verifyPageLoadsWithinMs,
  verifyAllHashLinksResolve,
} from './pom/actions/accessibility.actions';

/* ═══════════════════════════════════════════════════
 *  EXTENDED E2E SUITE
 * ═══════════════════════════════════════════════════ */
test.describe('Portfolio Website – Extended Verification', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  /* ── Hero Section ────────────────────────────── */

  test('test-007 Hero section displays the main heading', async () => {
    await verifyHeroHeading(portfolio);
  });

  test('test-008 Hero CTA "View My Work" links to #projects', async () => {
    await verifyViewMyWorkCta(portfolio);
  });

  test('test-009 Hero CTA "Download Resume" points to PDF', async () => {
    await verifyDownloadResumeCta(portfolio);
  });

  test('test-010 Hero CTA "Contact Me" links to #contact', async () => {
    await verifyContactMeCta(portfolio);
  });

  test('test-011 Hero shows "Open to new opportunities" badge', async () => {
    await verifyOpportunityBadge(portfolio);
  });

  /* ── About Section ───────────────────────────── */

  test('test-012 About section is present and has content', async () => {
    await verifyAboutSectionPresent(portfolio);
  });

  test('test-013 About section lists tech-stack keywords', async () => {
    await verifyAboutTechStack(portfolio);
  });

  /* ── Experience Section ──────────────────────── */

  test('test-014 Experience section renders timeline entries', async () => {
    await verifyTimelineEntries(portfolio);
  });

  test('test-015 Experience mentions current role at Ericsson', async () => {
    await verifyCurrentRoleAtEricsson(portfolio);
  });

  /* ── Projects Section ────────────────────────── */

  test('test-016 Project filter buttons exist', async () => {
    await verifyFilterButtonsExist(portfolio);
  });

  test('test-017 Clicking a project filter updates visible cards', async () => {
    await verifyFilterUpdatesCards(portfolio);
  });

  test('test-018 Each project card has a title', async () => {
    await verifyEachCardHasTitle(portfolio);
  });

  test('test-019 Project cards have like buttons', async () => {
    await verifyLikeButtonsExist(portfolio);
  });

  test('test-020 Clicking a like button increments the count', async () => {
    await verifyLikeButtonIncrements(portfolio);
  });

  /* ── Resume Section ──────────────────────────── */

  test('test-021 Resume section is visible', async () => {
    await verifyResumeSectionVisible(portfolio);
  });

  /* ── Contact Section ─────────────────────────── */

  test('test-022 Contact form has Name and Message fields', async () => {
    await verifyContactFormFields(portfolio);
  });

  test('test-023 Contact form has a submit button', async () => {
    await verifyContactSubmitButton(portfolio);
  });

  test('test-024 Contact section has Email, Call, LinkedIn quick links', async () => {
    await verifyContactQuickLinks(portfolio);
  });

  test('test-025 Email link uses mailto protocol', async () => {
    await verifyEmailLinkProtocol(portfolio);
  });

  test('test-026 Call link uses tel protocol', async () => {
    await verifyCallLinkProtocol(portfolio);
  });

  test('test-027 Contact form can be filled', async () => {
    await verifyContactFormCanBeFilled(portfolio);
  });

  /* ── Footer ──────────────────────────────────── */

  test('test-028 Footer contains quick navigation links', async () => {
    await verifyFooterLinks(portfolio);
  });

  test('test-029 Footer displays copyright text', async () => {
    await verifyFooterCopyright(portfolio);
  });

  /* ── Theme Toggle ────────────────────────────── */

  test('test-030 Theme toggle button is visible in the navbar', async () => {
    await verifyThemeToggleVisible(portfolio);
  });

  test('test-031 Theme toggle switches to light mode and back', async () => {
    await verifyThemeRoundTrip(portfolio);
  });

  /* ── Command Palette ─────────────────────────── */

  test('test-032 Command palette button exists', async () => {
    await verifyCommandPaletteButtonExists(portfolio);
  });

  test('test-033 Clicking command palette opens a modal', async () => {
    await verifyCommandPaletteOpensModal(portfolio);
  });

  /* ── Back to Top ─────────────────────────────── */

  test('test-034 Back-to-top button appears after scrolling', async () => {
    await verifyBackToTopAppearsOnScroll(portfolio);
  });

  test('test-035 Back-to-top button scrolls page to top', async () => {
    await verifyBackToTopScrollsToHero(portfolio);
  });

  /* ── Accessibility & SEO ─────────────────────── */

  test('test-036 Page has exactly one h1 element', async () => {
    await verifySingleH1(portfolio);
  });

  test('test-037 All images have alt attributes', async () => {
    await verifyAllImagesHaveAlt(portfolio);
  });

  test('test-038 Page should have a meta description (known SEO gap)', async () => {
    await verifyMetaDescriptionGap(portfolio);
  });

  test('test-039 All nav links have accessible names', async () => {
    await verifyNavLinksHaveAccessibleNames(portfolio);
  });

  /* ── Performance ─────────────────────────────── */

  test('test-040 Page loads within 5 seconds', async ({ page }) => {
    await verifyPageLoadsWithinMs(page);
  });

  /* ── Smooth Scroll & Link Behaviour ──────────── */

  test('test-041 Clicking "View My Work" scrolls to projects section', async () => {
    await verifyViewMyWorkScrollsToProjects(portfolio);
  });

  test('test-042 Clicking "Contact Me" CTA scrolls to contact section', async () => {
    await verifyContactMeScrollsToContact(portfolio);
  });

  /* ── Brand / Logo ────────────────────────────── */

  test('test-043 Brand logo "MK." is visible in navbar', async () => {
    await verifyBrandLogo(portfolio);
  });

  /* ── Link Integrity ──────────────────────────── */

  test('test-044 All same-page hash links point to existing sections', async () => {
    await verifyAllHashLinksResolve(portfolio);
  });
});
