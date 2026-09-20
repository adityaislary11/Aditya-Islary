/* =============================================
   PORTFOLIO — app.js
   Handles: navigation, scroll effects, reveal animations
   ============================================= */

(function () {
  'use strict';

  /* ---- DOM refs ---- */
  const nav       = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = navLinks ? navLinks.querySelectorAll('.nav__link') : [];

  /* =============================================
     NAVBAR — scroll state
     ============================================= */
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* =============================================
     MOBILE NAVIGATION
     ============================================= */
  function openMenu() {
    navLinks.classList.add('nav__links--open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('nav__links--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  /* Close menu when a link is clicked */
  allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  /* Close menu on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      navToggle.focus();
    }
  });

  /* Close menu when clicking outside on mobile */
  navLinks.addEventListener('click', function (e) {
    if (e.target === navLinks) {
      closeMenu();
    }
  });

  /* =============================================
     SMOOTH SCROLL — anchor links
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* =============================================
     SCROLL REVEAL
     ============================================= */
  var revealObserver;

  function initReveal() {
    /* Respect prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('in-view');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      /* Fallback: show everything immediately */
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('in-view');
      });
      return;
    }

    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  initReveal();

  /* =============================================
     ACTIVE NAV LINK — highlight on scroll
     ============================================= */
  var sections = [];

  document.querySelectorAll('section[id]').forEach(function (s) {
    sections.push(s);
  });

  function updateActiveLink() {
    var scrollY = window.scrollY;
    var navHeight = nav ? nav.offsetHeight : 0;

    var current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - navHeight - 80;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    allLinks.forEach(function (link) {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('nav__link--active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

})();
