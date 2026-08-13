/* ================================================================
   GUDEPU PRANAV SAI | Portfolio – Shared JS
   ================================================================ */

(function () {
  'use strict';

  /* ---- THEME TOGGLE ---- */
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  let isDark = localStorage.getItem('theme') !== 'light';

  function applyTheme(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeIcon) themeIcon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
  applyTheme(isDark);
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      isDark = !isDark;
      applyTheme(isDark);
    });
  }

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }
  window.closeMenu = function () {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', false);
  };

  /* ---- ACTIVE NAV LINK (single-page highlight via current URL) ---- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- SCROLL TO TOP ---- */
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 350);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- SCROLL REVEAL ---- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ---- COUNTER ANIMATION ---- */
  window.animateCounter = function (el, target, suffix) {
    suffix = suffix || '';
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count === target) clearInterval(timer);
    }, 25);
  };

  /* ---- FOOTER YEAR ---- */
  const yr = document.getElementById('footer-year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- GITHUB API ---- */
  window.fetchGitHub = function () {
    fetch('https://api.github.com/users/gudepupranav')
      .then(r => r.json())
      .then(d => {
        const repos = document.getElementById('gh-repos');
        const fol   = document.getElementById('gh-followers');
        const fing  = document.getElementById('gh-following');
        if (repos) repos.textContent = d.public_repos ?? '—';
        if (fol)   fol.textContent   = d.followers   ?? '—';
        if (fing)  fing.textContent  = d.following   ?? '—';
      }).catch(() => {});
  };

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn    = document.getElementById('form-submit-btn');
      const status = document.getElementById('form-status');
      const name   = document.getElementById('name').value.trim();
      const email  = document.getElementById('email').value.trim();
      const msg    = document.getElementById('message').value.trim();
      if (!name || !email || !msg) {
        status.innerHTML = '<span style="color:#ef4444"><i class="fas fa-exclamation-circle"></i> Please fill all required fields.</span>';
        return;
      }
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled  = true;
      setTimeout(() => {
        btn.innerHTML   = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
        status.innerHTML = `<span style="color:#22c55e"><i class="fas fa-check-circle"></i> Thanks <strong>${name}</strong>! I'll reply soon.</span>`;
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML   = '<i class="fas fa-paper-plane"></i> Send Message';
          btn.style.background = '';
          btn.disabled  = false;
          status.innerHTML = '';
        }, 4000);
      }, 1500);
    });
  }

  /* ---- PROJECT FILTER ---- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });

  /* ---- TYPING EFFECT (home page only) ---- */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const roles = ['Student Developer', 'Full Stack Enthusiast', 'Problem Solver', 'React Developer', 'Java Programmer'];
    let ri = 0, ci = 0, del = false;
    function type() {
      const w = roles[ri];
      typedEl.textContent = del ? w.substring(0, ci--) : w.substring(0, ci++);
      if (!del && ci === w.length + 1) { del = true; setTimeout(type, 1400); return; }
      if (del  && ci === 0)            { del = false; ri = (ri + 1) % roles.length; }
      setTimeout(type, del ? 55 : 105);
    }
    type();
  }

})();
