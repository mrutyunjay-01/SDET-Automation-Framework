/* ============================================
   PORTFOLIO — script.js
   All interactivity for Mrutyunjay Kar's portfolio.
   Well-commented for beginner-friendliness.
   ============================================ */

// Wait until the DOM is fully loaded before running any JS
document.addEventListener('DOMContentLoaded', () => {

  const brandCommandButton = document.getElementById('brandCommandButton');
  const commandPaletteBackdrop = document.getElementById('commandPaletteBackdrop');
  const commandPaletteClose = document.getElementById('commandPaletteClose');
  const commandActions = document.querySelectorAll('.command-action');
  const commandAboutPanel = document.getElementById('commandAboutPanel');
  const commandShortcuts = {
    p: 'projects',
    r: 'resume',
    t: 'theme',
    c: 'contact',
    a: 'about'
  };

  function openCommandPalette() {
    commandPaletteBackdrop.hidden = false;
    if (commandAboutPanel) commandAboutPanel.hidden = true;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => {
      commandActions[0]?.focus();
    }, 10);
  }

  function closeCommandPalette() {
    commandPaletteBackdrop.hidden = true;
    document.body.style.overflow = '';
    brandCommandButton?.focus();
  }

  function executeCommand(command) {
    const scrollToSection = selector => {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (command === 'projects') {
      closeCommandPalette();
      scrollToSection('#projects');
    }
    if (command === 'resume') {
      closeCommandPalette();
      document.querySelector('a[href="assets/resume/resume.pdf"]')?.click();
    }
    if (command === 'theme') {
      document.getElementById('themeToggle')?.click();
      closeCommandPalette();
    }
    if (command === 'contact') {
      closeCommandPalette();
      scrollToSection('#contact');
    }
    if (command === 'about' && commandAboutPanel) {
      commandAboutPanel.hidden = !commandAboutPanel.hidden;
    }
  }

  brandCommandButton?.addEventListener('click', () => {
    if (commandPaletteBackdrop.hidden) {
      openCommandPalette();
    } else {
      closeCommandPalette();
    }
  });

  commandPaletteClose?.addEventListener('click', closeCommandPalette);

  commandPaletteBackdrop?.addEventListener('click', event => {
    if (event.target === commandPaletteBackdrop) {
      closeCommandPalette();
    }
  });

  commandActions.forEach(action => {
    action.addEventListener('click', () => {
      executeCommand(action.dataset.command);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !commandPaletteBackdrop.hidden) {
      closeCommandPalette();
      return;
    }

    if (!commandPaletteBackdrop.hidden) {
      const shortcutCommand = commandShortcuts[event.key.toLowerCase()];
      if (shortcutCommand) {
        event.preventDefault();
        executeCommand(shortcutCommand);
      }
    }
  });

  const HEART_MAX_LEVEL = 12;
  const heartFloatMessages = ['nice', 'cute', 'again', 'solid', 'oooh', 'more'];
  const burstParticles = [
    { symbol: '❤', dx: -34, dy: -28, spin: '-18deg', size: '1rem' },
    { symbol: '❤', dx: 34, dy: -30, spin: '22deg', size: '1rem' },
    { symbol: '✨', dx: -12, dy: -44, spin: '-8deg', size: '0.92rem' },
    { symbol: '✨', dx: 14, dy: -46, spin: '10deg', size: '0.92rem' },
    { symbol: '💥', dx: 0, dy: -58, spin: '0deg', size: '0.96rem' },
    { symbol: '❤', dx: -42, dy: 2, spin: '-24deg', size: '0.92rem' },
    { symbol: '❤', dx: 42, dy: 4, spin: '26deg', size: '0.92rem' }
  ];
  const heartSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path class="like-fill" d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"></path>
      <path class="like-outline" d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"></path>
    </svg>`;
  let audioContext;
  let noiseBuffer;
  let audioPrimed = false;

  function getAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return null;

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }

    return audioContext;
  }

  function getNoiseBuffer(context) {
    if (noiseBuffer) return noiseBuffer;

    const buffer = context.createBuffer(1, context.sampleRate * 0.28, context.sampleRate);
    const channel = buffer.getChannelData(0);

    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * (1 - (index / channel.length) * 0.35);
    }

    noiseBuffer = buffer;
    return noiseBuffer;
  }

  function primeAudio() {
    if (audioPrimed) return;

    const context = getAudioContext();
    if (!context) return;

    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, now);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0002, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.03);

    audioPrimed = true;
  }

  function playLiquidPop(level) {
    const context = getAudioContext();
    if (!context) return;

    const now = context.currentTime;
    const normalizedLevel = Math.max(1, Math.min(level, HEART_MAX_LEVEL)) / HEART_MAX_LEVEL;
    const baseFrequency = 300 + normalizedLevel * 180;

    const oscillator = context.createOscillator();
    const overtone = context.createOscillator();
    const splash = context.createBufferSource();
    const gainNode = context.createGain();
    const toneFilter = context.createBiquadFilter();
    const splashFilter = context.createBiquadFilter();
    const splashGain = context.createGain();

    oscillator.type = 'sine';
    overtone.type = 'triangle';
    toneFilter.type = 'lowpass';
    toneFilter.Q.value = 1.6;
    splash.buffer = getNoiseBuffer(context);
    splashFilter.type = 'bandpass';
    splashFilter.Q.value = 5.8 + normalizedLevel * 2.2;

    oscillator.frequency.setValueAtTime(baseFrequency * 0.9, now);
    oscillator.frequency.exponentialRampToValueAtTime(baseFrequency * 1.16, now + 0.075);
    overtone.frequency.setValueAtTime(baseFrequency * 1.35, now);
    overtone.frequency.exponentialRampToValueAtTime(baseFrequency * 1.72, now + 0.065);

    toneFilter.frequency.setValueAtTime(900 + normalizedLevel * 500, now);
    toneFilter.frequency.exponentialRampToValueAtTime(1550 + normalizedLevel * 700, now + 0.08);
    splashFilter.frequency.setValueAtTime(480 + normalizedLevel * 260, now);
    splashFilter.frequency.exponentialRampToValueAtTime(920 + normalizedLevel * 420, now + 0.07);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.18 + normalizedLevel * 0.06, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    splashGain.gain.setValueAtTime(0.0001, now);
    splashGain.gain.exponentialRampToValueAtTime(0.05 + normalizedLevel * 0.025, now + 0.01);
    splashGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    oscillator.connect(toneFilter);
    overtone.connect(toneFilter);
    toneFilter.connect(gainNode);
    gainNode.connect(context.destination);

    splash.connect(splashFilter);
    splashFilter.connect(splashGain);
    splashGain.connect(context.destination);

    oscillator.start(now);
    overtone.start(now);
    splash.start(now);
    oscillator.stop(now + 0.18);
    overtone.stop(now + 0.18);
    splash.stop(now + 0.14);
  }

  function playBurstSound() {
    const context = getAudioContext();
    if (!context) return;

    const now = context.currentTime;
    const bubbleOffsets = [0, 0.06, 0.12];
    const bubbleFrequencies = [320, 390, 470];

    bubbleOffsets.forEach((offset, index) => {
      const bubbleTime = now + offset;
      const bubble = context.createOscillator();
      const bubbleOvertone = context.createOscillator();
      const bubbleGain = context.createGain();
      const bubbleFilter = context.createBiquadFilter();
      const splash = context.createBufferSource();
      const splashFilter = context.createBiquadFilter();
      const splashGain = context.createGain();

      bubble.type = 'sine';
      bubbleOvertone.type = 'triangle';
      bubbleFilter.type = 'lowpass';
      bubbleFilter.Q.value = 1.8;
      splash.buffer = getNoiseBuffer(context);
      splashFilter.type = 'bandpass';
      splashFilter.Q.value = 5.4;

      bubble.frequency.setValueAtTime(bubbleFrequencies[index] * 0.92, bubbleTime);
      bubble.frequency.exponentialRampToValueAtTime(bubbleFrequencies[index] * 1.18, bubbleTime + 0.08);
      bubbleOvertone.frequency.setValueAtTime(bubbleFrequencies[index] * 1.32, bubbleTime);
      bubbleOvertone.frequency.exponentialRampToValueAtTime(bubbleFrequencies[index] * 1.62, bubbleTime + 0.07);

      bubbleFilter.frequency.setValueAtTime(820 + index * 140, bubbleTime);
      bubbleFilter.frequency.exponentialRampToValueAtTime(1320 + index * 180, bubbleTime + 0.09);

      bubbleGain.gain.setValueAtTime(0.0001, bubbleTime);
      bubbleGain.gain.exponentialRampToValueAtTime(0.16 - index * 0.015, bubbleTime + 0.012);
      bubbleGain.gain.exponentialRampToValueAtTime(0.0001, bubbleTime + 0.17);

      splashFilter.frequency.setValueAtTime(420 + index * 120, bubbleTime);
      splashFilter.frequency.exponentialRampToValueAtTime(780 + index * 160, bubbleTime + 0.075);

      splashGain.gain.setValueAtTime(0.0001, bubbleTime);
      splashGain.gain.exponentialRampToValueAtTime(0.045, bubbleTime + 0.012);
      splashGain.gain.exponentialRampToValueAtTime(0.0001, bubbleTime + 0.12);

      bubble.connect(bubbleFilter);
      bubbleOvertone.connect(bubbleFilter);
      bubbleFilter.connect(bubbleGain);
      bubbleGain.connect(context.destination);

      splash.connect(splashFilter);
      splashFilter.connect(splashGain);
      splashGain.connect(context.destination);

      bubble.start(bubbleTime);
      bubbleOvertone.start(bubbleTime);
      splash.start(bubbleTime);
      bubble.stop(bubbleTime + 0.18);
      bubbleOvertone.stop(bubbleTime + 0.18);
      splash.stop(bubbleTime + 0.14);
    });
  }

  function getReactionState() {
    try {
      return JSON.parse(sessionStorage.getItem('portfolioLikes') || '{}');
    } catch {
      return {};
    }
  }

  function saveReactionState(state) {
    sessionStorage.setItem('portfolioLikes', JSON.stringify(state));
  }

  function formatReactionCount(count) {
    return count > 99 ? '99+' : String(count);
  }

  function getWidgetOrigin(card, button) {
    return {
      x: button.offsetLeft + (button.offsetWidth / 2),
      y: button.offsetTop + (button.offsetHeight / 2)
    };
  }

  function spawnReactionFloat(card, button, text, className = '') {
    const float = document.createElement('span');
    const { x, y } = getWidgetOrigin(card, button);

    float.className = `like-float ${className}`.trim();
    float.textContent = text;
    float.style.left = `${x}px`;
    float.style.top = `${y}px`;
    card.append(float);
    float.addEventListener('animationend', () => float.remove(), { once: true });
  }

  function spawnHeartBurst(card, button) {
    const { x, y } = getWidgetOrigin(card, button);

    burstParticles.forEach((particleConfig, index) => {
      const particle = document.createElement('span');
      particle.className = 'like-particle';
      particle.textContent = particleConfig.symbol;
      particle.style.setProperty('--origin-x', `${x}px`);
      particle.style.setProperty('--origin-y', `${y}px`);
      particle.style.setProperty('--dx', `${particleConfig.dx}px`);
      particle.style.setProperty('--dy', `${particleConfig.dy}px`);
      particle.style.setProperty('--spin', particleConfig.spin);
      particle.style.setProperty('--particle-size', particleConfig.size);
      particle.style.animationDelay = `${index * 18}ms`;
      card.append(particle);
      particle.addEventListener('animationend', () => particle.remove(), { once: true });
    });
  }

  function applyHeartLevel(button, count, options = {}) {
    const displayLevel = options.displayLevel ?? count;
    const clampedLevel = Math.max(0, Math.min(displayLevel, HEART_MAX_LEVEL));
    const progress = clampedLevel / HEART_MAX_LEVEL;
    const countEl = button.querySelector('.like-count');

    button.dataset.level = String(clampedLevel);
    button.dataset.count = String(count);
    button.style.setProperty('--like-progress', progress.toFixed(2));
    button.classList.toggle('is-active', clampedLevel > 0 || count > 0);
    button.setAttribute('aria-label', `Like this card. Current count: ${count}`);
    button.title = count > 0 ? `Current count ${count} of ${HEART_MAX_LEVEL}` : 'Tap to like this';

    if (countEl) {
      countEl.textContent = formatReactionCount(count);
    }
  }

  function attachHeartButtons() {
    const reactionState = getReactionState();
    const targets = document.querySelectorAll('#about .ring-card, #projects .project-card, #services .service-card');

    targets.forEach((card, index) => {
      const section = card.closest('section')?.id || 'section';
      const reactionKey = `${section}-${index}`;
      const button = document.createElement('button');

      card.classList.add('like-enabled');
      button.type = 'button';
      button.className = 'like-button';
      button.innerHTML = `${heartSvg}<span class="like-count" aria-hidden="true">0</span>`;
      button.dataset.key = reactionKey;

      applyHeartLevel(button, Number(reactionState[reactionKey] || 0));

      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        primeAudio();

        const currentCount = Number(reactionState[reactionKey] || 0);
        const nextCount = currentCount + 1;
        const fullChargeReached = nextCount >= HEART_MAX_LEVEL;
        const displayCount = fullChargeReached ? HEART_MAX_LEVEL : nextCount;

        reactionState[reactionKey] = displayCount;
        saveReactionState(reactionState);
        applyHeartLevel(button, displayCount);
        playLiquidPop(displayCount);

        spawnReactionFloat(
          card,
          button,
          fullChargeReached ? 'full send!' : heartFloatMessages[nextCount % heartFloatMessages.length],
          fullChargeReached ? 'like-float-burst' : ''
        );

        if (fullChargeReached) {
          button.classList.remove('is-bursting');
          void button.offsetWidth;
          button.classList.add('is-bursting');
          spawnHeartBurst(card, button);
          playBurstSound();

          window.setTimeout(() => {
            reactionState[reactionKey] = 1;
            saveReactionState(reactionState);
            applyHeartLevel(button, 1);
            button.classList.remove('is-bursting');
          }, 620);
        }

        button.classList.remove('is-popping');
        void button.offsetWidth;
        button.classList.add('is-popping');
      });

      button.addEventListener('animationend', () => {
        button.classList.remove('is-popping');
        button.classList.remove('is-bursting');
      });

      card.prepend(button);
    });
  }

  document.addEventListener('pointerdown', primeAudio, { once: true });

  attachHeartButtons();

  // ─────────────────────────────────────
  // 1) SCROLL-REVEAL ANIMATION
  //    Elements with class "reveal" fade in
  //    when they enter the viewport.
  // ─────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');   // triggers CSS transition
        revealObserver.unobserve(entry.target);  // only animate once
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─────────────────────────────────────
  // 2) NAV SHRINK + SCROLL PROGRESS BAR + BACK-TO-TOP + HERO PHOTO FADE
  //    The nav shrinks on scroll, a gradient bar
  //    fills along the top, back-to-top button appears,
  //    and the hero background photo fades out smoothly.
  // ─────────────────────────────────────
  const nav = document.querySelector('nav');
  const progressBar = document.getElementById('progress-bar');
  const backTop = document.getElementById('back-top');
  const heroBg = document.querySelector('.hero-bg-photo');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;

    // Shrink nav padding when scrolled past 60px
    nav.style.padding = scrolled > 60 ? '12px 60px' : '18px 60px';

    // Update scroll progress bar width (0% → 100%)
    progressBar.style.width = (scrolled / total * 100) + '%';

    // Show/hide back-to-top button
    backTop.classList.toggle('show', scrolled > 400);

    // Fade the hero background photo out as user scrolls past the hero
    if (heroBg) {
      const fade = 1 - Math.min(scrolled / (window.innerHeight * 0.7), 1);
      heroBg.style.opacity = fade;
    }
  });

  // ─────────────────────────────────────
  // 3) ACTIVE NAV LINK HIGHLIGHT
  //    Highlights the nav link matching the
  //    section currently in view.
  // ─────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reset all links, then highlight the active one
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ─────────────────────────────────────
  // 4) DARK / LIGHT MODE TOGGLE
  //    Toggles a "light" class on <html> and
  //    saves preference to localStorage.
  // ─────────────────────────────────────
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(isLight) {
    htmlEl.classList.toggle('light', isLight);
    themeIcon.textContent = isLight ? '☀️' : '🌙';
  }

  // Restore saved theme on page load
  applyTheme(localStorage.getItem('theme') === 'light');

  toggleBtn.addEventListener('click', () => {
    const isLight = !htmlEl.classList.contains('light');
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // ─────────────────────────────────────
  // 5) TYPEWRITER EFFECT
  //    Cycles through job titles, typing and
  //    deleting one character at a time.
  // ─────────────────────────────────────
  const roles = [
    'Test Automation Engineer',
    'Playwright (TS) Practitioner',
    'GitHub Copilot Advocate',
    'SDET at Ericsson',
    'GenAI Testing Pioneer'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const twEl = document.getElementById('typewriter');

  (function typeLoop() {
    const current = roles[roleIdx];

    // Type or delete one character
    twEl.textContent = deleting
      ? current.slice(0, --charIdx)
      : current.slice(0, ++charIdx);

    // Pause at end of word before deleting
    if (!deleting && charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);  // wait before deleting
      return;
    }

    // Move to next word after fully deleted
    if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }

    // Speed: typing = 95ms, deleting = 48ms
    setTimeout(typeLoop, deleting ? 48 : 95);
  })();

  // ─────────────────────────────────────
  // 6) CUSTOM CURSOR GLOW
  //    A soft glow follows the mouse pointer.
  //    Expands when hovering over interactive elements.
  // ─────────────────────────────────────
  const cursorEl = document.getElementById('cursor');

  document.addEventListener('mousemove', e => {
    cursorEl.style.left = e.clientX + 'px';
    cursorEl.style.top = e.clientY + 'px';
  });

  // Expand cursor on links, buttons, and cards
  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorEl.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursorEl.classList.remove('expand'));
  });

  // ─────────────────────────────────────
  // 7) PROJECT FILTER TABS
  //    Clicking a tab shows only projects
  //    matching the selected category.
  // ─────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards based on data-tags
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const tags = card.dataset.tags || '';
        card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
      });
    });
  });

  // ─────────────────────────────────────
  // 8) COUNT-UP ANIMATION FOR STATS
  //    Numbers count up from 0 when they
  //    first scroll into view.
  // ─────────────────────────────────────
  const countEls = document.querySelectorAll('.stat-number[data-count]');

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = +el.dataset.count;       // target number
      const suffix = el.dataset.suffix || '';  // e.g. "+" or "%"
      let current = 0;
      const step = Math.ceil(target / 40);    // increment per tick

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 28);

      countObserver.unobserve(el);  // only count once
    });
  }, { threshold: 0.6 });

  countEls.forEach(el => countObserver.observe(el));

  // ─────────────────────────────────────
  // 9) SKILL RING ANIMATION
  //    SVG rings animate their stroke from 0 to target %
  //    and the percentage number counts up inside.
  // ─────────────────────────────────────
  const ringCards = document.querySelectorAll('.ring-card');
  const circumference = 2 * Math.PI * 52; // r=52 → ~326.73

  const ringObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const pct = +card.dataset.pct;
      const color = card.dataset.color;
      const fill = card.querySelector('.ring-fill');
      const pctEl = card.querySelector('.ring-pct');

      // Set the ring color as a CSS variable
      card.style.setProperty('--ring-color', color);
      fill.style.stroke = color;

      // Animate stroke-dashoffset
      const offset = circumference - (circumference * pct / 100);
      fill.style.strokeDashoffset = offset;

      // Count up the percentage number
      let current = 0;
      const step = Math.ceil(pct / 50);
      const timer = setInterval(() => {
        current = Math.min(current + step, pct);
        pctEl.textContent = current + '%';
        if (current >= pct) clearInterval(timer);
      }, 22);

      ringObserver.unobserve(card);
    });
  }, { threshold: 0.25 });

  ringCards.forEach(card => ringObserver.observe(card));

  // ─────────────────────────────────────
  // 10) BACK TO TOP BUTTON
  //    Smooth-scrolls back to the top of the page.
  // ─────────────────────────────────────
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─────────────────────────────────────
  // 10) CONTACT FORM — OPEN MAIL DRAFT
  //     Static sites cannot send mail by themselves,
  //     so this opens the user's default mail app with
  //     a pre-filled subject and message.
  // ─────────────────────────────────────
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:mrutyunjaykar2001@gmail.com?subject=${subject}&body=${body}`;

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  });

});
