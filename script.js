/* ═══════════════════════════════════════════════════
   GEERODS — Main Script
   Static header/footer, SPA-style page switching
   Content is driven by content.js — edit that file
   to update images, text and gallery items.
════════════════════════════════════════════════════ */

/* ─── PAGE ROUTER ─────────────────────────────────── */
const router = (() => {
  const pages    = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');
  const content  = document.getElementById('mainContent');

  function show(pageId) {
    const current = [...pages].find(p => !p.classList.contains('hidden'));
    const target  = document.getElementById('page-' + pageId) || document.getElementById('page-home');

    if (current === target) return;

    // Fade out → swap → fade in
    if (current) {
      current.classList.add('page-exit');
      setTimeout(() => {
        current.classList.add('hidden');
        current.classList.remove('page-exit');
        target.classList.remove('hidden');
        target.classList.add('page-enter');
        if (content) content.scrollTop = 0;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => target.classList.remove('page-enter'));
        });
      }, 160);
    } else {
      target.classList.remove('hidden');
      if (content) content.scrollTop = 0;
    }

    // Update active nav state
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });

    // Close mobile menu if open
    const nav    = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    if (nav) nav.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    }
  }

  function init() {
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        show(link.dataset.page);
      });
    });

    document.querySelectorAll('.service-card[data-page]').forEach(card => {
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          show(card.dataset.page);
        }
      });
    });
  }

  return { init, show };
})();

/* ─── HERO CAROUSEL ───────────────────────────────── */
const heroCarousel = (() => {
  let current   = 0;
  let autoTimer = null;
  const slides  = siteContent.heroSlides;

  function update(index) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];

    const img   = document.getElementById('heroImg');
    const label = document.getElementById('heroLabel');
    const title = document.getElementById('heroTitle');
    if (!img || !label || !title) return;

    img.style.opacity   = '0';
    img.style.transform = 'scale(1.04)';

    setTimeout(() => {
      img.src             = slide.image;
      img.alt             = slide.alt;
      label.textContent   = slide.label;
      title.textContent   = slide.title;
      img.style.opacity   = '1';
      img.style.transform = 'scale(1)';
    }, 200);

    document.querySelectorAll('.thumb-button').forEach((btn, i) => {
      btn.classList.toggle('active', i === current);
    });
  }

  function buildThumbs() {
    const container = document.getElementById('heroThumbs');
    if (!container) return;

    container.innerHTML = slides.map((slide, i) => `
      <button class="thumb-button${i === 0 ? ' active' : ''}" type="button" aria-label="${slide.label}">
        <img src="${slide.image}" alt="${slide.alt}" loading="lazy">
      </button>
    `).join('');

    container.querySelectorAll('.thumb-button').forEach((btn, i) => {
      btn.addEventListener('click', () => { stopAuto(); update(i); startAuto(); });
    });
  }

  function buildArrows() {
    const wrap = document.querySelector('.hero-img-wrap');
    if (!wrap || slides.length < 2) return;

    const prev = document.createElement('button');
    const next = document.createElement('button');
    prev.className = 'hero-arrow hero-arrow--prev';
    next.className = 'hero-arrow hero-arrow--next';
    prev.setAttribute('aria-label', 'Previous slide');
    next.setAttribute('aria-label', 'Next slide');
    prev.innerHTML = '&#8249;';
    next.innerHTML = '&#8250;';

    prev.addEventListener('click', () => { stopAuto(); update(current - 1); startAuto(); });
    next.addEventListener('click', () => { stopAuto(); update(current + 1); startAuto(); });

    wrap.appendChild(prev);
    wrap.appendChild(next);
  }

  function startAuto() {
    stopAuto();
    if (slides.length < 2) return;
    autoTimer = setInterval(() => update(current + 1), 4500);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function init() {
    buildThumbs();
    buildArrows();
    const img = document.getElementById('heroImg');
    if (img) img.style.transition = 'opacity 0.3s ease, transform 0.5s ease';
    update(0);
    startAuto();
  }

  return { init };
})();

/* ─── CONTENT RENDERER ────────────────────────────── */
const contentRenderer = (() => {

  function renderStats() {
    const strip = document.querySelector('.stats-strip');
    if (!strip || !siteContent.stats) return;

    strip.innerHTML = siteContent.stats.map((s, i) => `
      ${i > 0 ? '<div aria-hidden="true" class="stat-divider"></div>' : ''}
      <div class="stat">
        <strong>${s.value}</strong>
        <span>${s.label}</span>
      </div>
    `).join('');
  }

  function renderBuildTypes() {
    const container = document.querySelector('.build-types');
    if (!container || !siteContent.buildTypes) return;

    container.innerHTML = siteContent.buildTypes.map(b => `
      <div class="build-type-card">
        <img src="${b.image}" alt="${b.alt}" loading="lazy">
        <div class="build-type-body">
          <h4>${b.title}</h4>
          <p>${b.desc}</p>
        </div>
      </div>
    `).join('');
  }

  function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid || !siteContent.gallery) return;

    grid.innerHTML = siteContent.gallery.map(item => `
      <figure class="gallery-item" data-category="${item.category}">
        <img src="${item.image}" alt="${item.alt}" loading="lazy">
        <figcaption>${item.caption}</figcaption>
      </figure>
    `).join('');

    galleryFilter.bind(grid);
    lightbox.bind(grid);
  }

  function init() {
    renderStats();
    renderBuildTypes();
    renderGallery();
  }

  return { init };
})();

/* ─── GALLERY FILTER ──────────────────────────────── */
const galleryFilter = (() => {
  function bind(grid) {
    // Clone buttons to remove stale listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const clone = btn.cloneNode(true);
      btn.parentNode.replaceChild(clone, btn);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        grid.querySelectorAll('.gallery-item').forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('hidden', !match);
          // Re-bind lightbox navigation to visible items
          lightbox.rebindVisible(grid);
        });
      });
    });
  }

  function init() {
    bind(document.getElementById('galleryGrid'));
  }

  return { init, bind };
})();

/* ─── GALLERY LIGHTBOX ────────────────────────────── */
const lightbox = (() => {
  let overlay  = null;
  let items    = [];
  let current  = 0;

  function create() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close image viewer">&#10005;</button>
      <button class="lightbox-prev"  aria-label="Previous image">&#8249;</button>
      <button class="lightbox-next"  aria-label="Next image">&#8250;</button>
      <figure class="lightbox-figure">
        <img class="lightbox-img" src="" alt="" style="transition:opacity 0.15s ease">
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => step(-1));
    overlay.querySelector('.lightbox-next').addEventListener('click', () => step(1));
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  function open(index) {
    current = index;
    renderSlide();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.lightbox-close').focus();
  }

  function renderSlide() {
    const item    = items[current];
    const img     = overlay.querySelector('.lightbox-img');
    const caption = overlay.querySelector('.lightbox-caption');
    img.src       = item.src;
    img.alt       = item.alt;
    caption.textContent = item.caption;
    overlay.querySelector('.lightbox-prev').style.display = items.length < 2 ? 'none' : '';
    overlay.querySelector('.lightbox-next').style.display = items.length < 2 ? 'none' : '';
  }

  function step(dir) {
    current = (current + dir + items.length) % items.length;
    const img = overlay.querySelector('.lightbox-img');
    img.style.opacity = '0';
    setTimeout(() => { renderSlide(); img.style.opacity = '1'; }, 120);
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function buildItems(grid) {
    return [...grid.querySelectorAll('.gallery-item:not(.hidden)')].map(fig => ({
      src:     fig.querySelector('img').src,
      alt:     fig.querySelector('img').alt,
      caption: fig.querySelector('figcaption')?.textContent || ''
    }));
  }

  function rebindVisible(grid) {
    items = buildItems(grid);
  }

  function bind(grid) {
    create();
    items = buildItems(grid);

    grid.querySelectorAll('.gallery-item').forEach(fig => {
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', `View: ${fig.querySelector('figcaption')?.textContent || ''}`);

      const handler = () => {
        items = buildItems(grid);
        const visibleFigs   = [...grid.querySelectorAll('.gallery-item:not(.hidden)')];
        const visibleIndex  = visibleFigs.indexOf(fig);
        if (visibleIndex >= 0) open(visibleIndex);
      };

      // Remove stale listeners by cloning
      const clone = fig.cloneNode(true);
      fig.parentNode.replaceChild(clone, fig);
      clone.addEventListener('click', handler);
      clone.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
      });
    });
  }

  function init() {
    bind(document.getElementById('galleryGrid'));
  }

  return { init, bind, rebindVisible };
})();

/* ─── MOBILE NAV TOGGLE ───────────────────────────── */
const mobileNav = (() => {
  function init() {
    const toggle = document.querySelector('.nav-toggle');
    const nav    = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);

      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      }
    });
  }

  return { init };
})();

/* ─── CONTACT FORM ────────────────────────────────── */
const contactForm = (() => {
  function init() {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#e05555';
          valid = false;
        }
      });

      if (!valid) return;

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled    = true;

      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send message →';
        btn.disabled    = false;
        if (success) {
          success.classList.remove('hidden');
          setTimeout(() => success.classList.add('hidden'), 5000);
        }
      }, 1200);
    });
  }

  return { init };
})();

/* ─── SCROLL-BASED HEADER SHADOW ─────────────────── */
const headerScroll = (() => {
  function init() {
    const header  = document.querySelector('.topbar');
    const content = document.getElementById('mainContent');
    if (!header || !content) return;

    content.addEventListener('scroll', () => {
      header.style.boxShadow = content.scrollTop > 10
        ? '0 4px 24px rgba(0,0,0,0.32)'
        : 'none';
    }, { passive: true });
  }

  return { init };
})();

/* ─── INIT ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  contentRenderer.init();   // Render dynamic content from content.js first
  router.init();
  heroCarousel.init();
  galleryFilter.init();
  lightbox.init();
  mobileNav.init();
  contactForm.init();
  headerScroll.init();

  router.show('home');
});