# 🎭 Playwright SDET Automation Framework

Modern end-to-end automation framework built with Playwright + TypeScript following real-world SDET practices.

![CI](https://github.com/mrutyunjay-01/SDET-Automation-Framework/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-Framework-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-orange)

It is designed to demonstrate:
- modern SDET test architecture
- reusable and maintainable test code
- browser automation best practices
- a clean separation between application behavior and test assertions

## 🚀 Key Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile viewport testing
- Page Object Model architecture
- GitHub Actions CI pipeline
- Automatic screenshots & videos on failure
- Trace viewer for debugging CI failures
- Parallel execution & test sharding ready

## 🤖 Continuous Integration (CI)

This project includes a GitHub Actions pipeline that automatically runs on every push and pull request.

The pipeline performs:
- dependency installation
- Playwright browser setup
- headless cross-browser test execution
- HTML report generation
- upload of debugging artifacts

Artifacts available after each run:
- Playwright HTML report
- execution traces
- screenshots
- videos of failed tests

## Project Structure

```text
SDET_portfolio/
├── index.html                  # Local entry point and redirect
├── package.json                # Scripts, dependencies, and tooling
├── playwright.config.ts        # Playwright test configuration
├── README.md                   # Project and SDET documentation
├── tests/
│   ├── e2e/
│   │   ├── pom/
│   │   │   ├── actions/         # Reusable action helpers
│   │   │   └── pageObjects/     # Page objects and locator abstractions
│   │   └── portfolio.spec.ts    # High-level E2E test scenarios
│   ├── integration/            # Integration test placeholders
│   └── unit/                   # Unit test placeholders
├── config/                     # Additional configuration files
└── docs/                       # Supporting documentation
```

## Modern SDET Style and Techniques

### 1. Page Object Model (POM)

The POM pattern keeps tests readable and maintainable by moving UI details into page objects.

In this repo:
- `tests/e2e/pom/pageObjects/PortfolioPage.ts` stores locators and page-level interactions
- tests call the page object instead of repeating selectors
- UI changes are isolated to page objects rather than scattered across many specs

### 2. Action Files

Action files capture higher-level workflows that can be reused across multiple tests.

In this repo:
- `tests/e2e/pom/actions/navigation.actions.ts` contains navigation verification logic
- action helpers allow tests to focus on intent, not implementation details

### 3. Focused, Descriptive Tests

Each spec should verify a single user outcome.

In this repo:
- test names clearly describe behavior
- assertions validate navigation, page state, and element visibility
- tests avoid overly broad or brittle validation

### 4. Stable Locator Strategy

Good automation relies on stable selectors, not fragile DOM paths.

Best practices used here:
- use role/accessible selectors wherever possible
- use IDs and meaningful class names for key anchors
- avoid brittle XPath and deep descendant chains

### 5. Explicit Assertions and Auto-Waiting

Playwright auto-waits for elements, but assertions provide explicit validation.

This project uses:
- `expect(locator).toBeVisible()`
- `expect(locator).toHaveAttribute(...)`
- `expect(page).toHaveURL(...)`

This makes failures easier to diagnose and keeps tests deterministic.

### 6. Reusable Test Setup

Common setup is centralized in `beforeEach`.

This repo demonstrates:
- consistent state before each test
- `portfolio.goto()` to navigate to the base application URL
- reuse of the same `PortfolioPage` object across all tests

### 7. Separation of Concerns

The tests use a layered approach:
- page objects define selectors and simple actions
- action modules define reusable flows
- spec files define business-facing scenarios

That separation improves readability, reduces duplication, and supports future growth.

## Playwright Configuration

`playwright.config.ts` is configured for real-world SDET usage:
- `testDir: './tests/e2e'`
- `fullyParallel: true`
- browser matrix for Chromium, Firefox, WebKit, and mobile devices
- `baseURL` set to the deployed site
- trace collection on retry

This makes the automation suite easy to run locally and suitable for CI.

## Running the Project

### Install dependencies

```bash
npm install
```

### Run local dev server

```bash
npm run dev
```

Then open `http://localhost:8000`.

### Run tests

```bash
npm test
npm run test:e2e
npx playwright test --ui
```

### Additional scripts

- `npm run build` — placeholder for build tasks
- `npm run test:unit` — placeholder for unit tests
- `npm run lint` — placeholder for linting
- `npm run format` — placeholder for formatting

## Test Coverage Areas

This repository is structured to support multiple test layers:
- `tests/e2e/` — full browser-based end-to-end verification
- `tests/integration/` — integration tests for shared logic and services
- `tests/unit/` — unit tests for isolated functions

The current implementation is focused on E2E and test architecture.

## Why This Approach Works for SDETs

This repo reflects modern SDET expectations:
- maintainable automation built for evolving UI
- clear separation between implementation and validation
- reusable helpers that reduce repeated code
- strong use of Playwright's modern API
- test design that matches real user behavior

## Notes for Contributors

When extending this repository:
- add new page objects for new pages or sections
- keep high-level test flows in action helpers
- preserve descriptive test and helper names
- reuse selectors through page object methods
- keep assertions close to the behavior being tested
- avoid hard-coded waits; rely on Playwright waits and assertions

## Author

Mrutyunjay Kar

SDET | Automation Engineer | Playwright | TypeScript | Modern Test Automation

