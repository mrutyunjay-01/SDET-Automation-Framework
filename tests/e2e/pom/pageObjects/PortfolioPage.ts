import type { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the single-page portfolio website.
 *
 * Organises every locator by visual section and exposes only lightweight
 * interaction helpers.  Business-level workflows and assertions live in
 * the companion action files under `pom/actions/`.
 */
export class PortfolioPage {
  /* ── Core ────────────────────────────────────── */
  readonly page: Page;

  /* ── Navigation Bar ──────────────────────────── */
  readonly navigation: Locator;
  readonly themeToggle: Locator;
  readonly brandLogo: Locator;
  readonly commandPaletteButton: Locator;

  /* ── Hero Section (#hero) ────────────────────── */
  readonly heroSection: Locator;
  readonly viewMyWorkCta: Locator;
  readonly downloadResumeCta: Locator;
  readonly contactMeCta: Locator;

  /* ── About Section (#about) ──────────────────── */
  readonly aboutSection: Locator;

  /* ── Experience Section (#experience) ────────── */
  readonly experienceSection: Locator;
  readonly timelineItems: Locator;

  /* ── Projects Section (#projects) ────────────── */
  readonly projectsSection: Locator;
  readonly projectCards: Locator;
  readonly projectLikeButtons: Locator;

  /* ── Resume Section (#resume) ────────────────── */
  readonly resumeSection: Locator;

  /* ── Contact Section (#contact) ──────────────── */
  readonly contactSection: Locator;
  readonly contactNameField: Locator;
  readonly contactMessageField: Locator;
  readonly contactSubmitButton: Locator;

  /* ── Footer ──────────────────────────────────── */
  readonly footer: Locator;
  readonly footerLinks: Locator;

  /* ── Utility UI ──────────────────────────────── */
  readonly backToTopButton: Locator;
  readonly commandPaletteModal: Locator;

  constructor(page: Page) {
    this.page = page;

    /* Navigation */
    this.navigation    = page.locator('.nav-links');
    this.themeToggle   = page.locator('#themeToggle');
    this.brandLogo     = page.locator('nav, header').first();
    this.commandPaletteButton = page.locator('#brandCommandButton');

    /* Hero */
    this.heroSection       = page.locator('#hero');
    this.viewMyWorkCta     = this.heroSection.getByRole('link', { name: /view my work/i });
    this.downloadResumeCta = this.heroSection.getByRole('link', { name: /download resume/i });
    this.contactMeCta      = this.heroSection.getByRole('link', { name: /contact me/i });

    /* About */
    this.aboutSection = page.locator('#about');

    /* Experience */
    this.experienceSection = page.locator('#experience');
    this.timelineItems     = this.experienceSection.locator('.tl-item');

    /* Projects */
    this.projectsSection   = page.locator('#projects');
    this.projectCards       = page.locator('.project-card');
    this.projectLikeButtons = this.projectsSection.locator('.like-button, button[class*="like"]');

    /* Resume */
    this.resumeSection = page.locator('#resume');

    /* Contact */
    this.contactSection       = page.locator('#contact');
    this.contactNameField     = this.contactSection.locator('#name, input[name="name"]');
    this.contactMessageField  = this.contactSection.locator('#message, textarea[name="message"]');
    this.contactSubmitButton  = this.contactSection.locator(
      'button.form-submit, button[type="submit"], button:has-text("Open Email Draft")',
    );

    /* Footer */
    this.footer      = page.locator('footer');
    this.footerLinks = this.footer.locator('a');

    /* Utility UI */
    this.backToTopButton     = page.locator('#back-top');
    this.commandPaletteModal = page.locator(
      '[class*="command"], [class*="modal"], [role="dialog"], .command-palette',
    );
  }

  /* ── Navigation ──────────────────────────────── */

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  getNavLink(name: string): Locator {
    return this.navigation.getByRole('link', { name });
  }

  async clickNavLink(name: string): Promise<void> {
    await this.getNavLink(name).click();
  }

  getSectionByHash(hash: string): Locator {
    return this.page.locator(hash);
  }

  /* ── Theme ───────────────────────────────────── */

  async toggleTheme(): Promise<void> {
    await this.themeToggle.click();
  }

  async getHtmlClass(): Promise<string> {
    return (await this.page.locator('html').getAttribute('class')) ?? '';
  }

  /* ── Projects ────────────────────────────────── */

  getProjectFilterButton(label: string): Locator {
    return this.projectsSection.getByRole('button', { name: label });
  }

  /* ── Contact ─────────────────────────────────── */

  getContactQuickLink(name: RegExp): Locator {
    return this.contactSection.getByRole('link', { name });
  }

  async fillContactForm(name: string, message: string): Promise<void> {
    await this.contactNameField.fill(name);
    await this.contactMessageField.fill(message);
  }

  /* ── Utility ─────────────────────────────────── */

  async scrollToSection(section: Locator): Promise<void> {
    await section.scrollIntoViewIfNeeded();
  }

  async scrollToBottom(): Promise<void> {
    await this.contactSection.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
  }
}
