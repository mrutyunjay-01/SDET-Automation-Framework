<<<<<<< HEAD
# Mrutyunjay Kar Portfolio

A single-page personal portfolio built with HTML, CSS, and vanilla JavaScript to present SDET, automation engineering, and front-end implementation skills.

## Overview

This project is a static portfolio website designed to balance professional presentation with custom interactivity. It showcases experience, projects, automation architecture thinking, AI-in-testing perspective, and recruiter-friendly contact access.

The site is intentionally framework-free. The goal was to keep the implementation lightweight, portable, easy to deploy, and fully controlled through browser-native technologies.

## Features

- Single-page recruiter-focused portfolio
- Dark and light theme toggle with saved preference
- Interactive MK. command palette with keyboard shortcuts
- Hero section with cinematic background treatment
- Business impact highlights
- Animated skill rings using SVG
- Experience timeline and flagship case study
- Filterable project cards using data attributes
- AI-in-testing and automation architecture sections
- Interactive heart reactions with burst animation
- Web Audio API generated reaction sounds
- Static-site-friendly contact flow using mailto
- Responsive layout across desktop, tablet, and mobile

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- Web Audio API
- IntersectionObserver
- localStorage
- sessionStorage

## Project Structure

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── readme.txt
└── assets/
    ├── images/
    └── resume/
```

## Architecture Notes

### HTML

`index.html` contains the full semantic structure of the portfolio as a single-page application-style layout with anchored sections:

- Hero
- Business Impact
- About
- Experience
- Case Study
- Projects
- AI in Testing
- Automation Architecture
- Services
- Resume
- Contact

### CSS

`style.css` acts as the design system and interaction styling layer.

Key responsibilities:

- Theme tokens using CSS variables
- Light mode overrides via `html.light`
- Layout and responsive breakpoints
- Glass-style cards and section presentation
- Hero image blending and overlays
- Command palette styling
- Skill ring and project card visuals
- Heart reaction animations
- Utility effects like progress bar, reveal transitions, toast, and cursor glow

### JavaScript

`script.js` powers the interaction layer.

Key responsibilities:

- Theme toggle with persistence
- Scroll progress bar and nav shrink behavior
- Hero background fade on scroll
- Active section highlight in nav
- Scroll reveal animations
- Typewriter role animation
- Skill ring count-up and stroke animation
- Project card filtering
- Command palette open/close behavior and shortcuts
- Heart reaction injection, state, animation, and sound
- Mailto-based contact form handling

## Why No Framework

This project was intentionally built without React, Vue, or Angular.

Reasons:

- The site does not require client-side routing.
- The interaction model is meaningful but still manageable with browser APIs.
- There is no complex shared application state.
- A framework would add setup and runtime complexity without enough architectural benefit.
- Vanilla JavaScript keeps the portfolio lightweight and demonstrates strong fundamentals.

## Key Engineering Decisions

- Used CSS variables to keep colors, surfaces, borders, and text consistent.
- Used a single root theme class, `html.light`, for clean theme switching.
- Used `IntersectionObserver` for reveal and count-up triggers instead of heavy manual scroll logic.
- Used SVG stroke animation for skill rings to keep them crisp and scalable.
- Used `localStorage` for theme because it is a true user preference.
- Used `sessionStorage` for heart reactions because they are session-based interactive state.
- Used `mailto:` for contact instead of pretending there is a backend form service.
- Used Web Audio API to synthesize sounds rather than load external audio assets.

## Running Locally

Because this is a static site, you can run it directly by opening `index.html` in a browser.

If you want a local server instead, you can use any lightweight option such as:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

Then open the local URL in your browser.

## Deployment

This project is suitable for static hosting platforms such as:

- GitHub Pages
- Netlify
- Vercel

No build step is required.

## Future Improvements

- Add reduced-motion support
- Add optional backend-backed contact handling
- Add an accessibility review pass
- Split larger areas into smaller reusable partials if the project grows

## Author

Mrutyunjay Kar

SDET | Automation Engineer | Playwright | TypeScript | AI-assisted testing
=======
# My_Portfolio
Personal portfolio showcasing my work as an SDET with automation and testing projects
>>>>>>> 59d56b5b7bcd57f271dc73f3b098d63a7320089f
