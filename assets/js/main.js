/* ============================================================
   main.js — Global JS: nav scroll, hamburger, AOS, Swiper,
              stats counter, FAQ, home data load
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Nav scroll class ----------
  const nav = document.getElementById('site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Active nav link ----------
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.btn)').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ---------- Hamburger ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      })
    );
    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav?.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- AOS ----------
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 650, once: true, offset: 50, easing: 'ease-out-cubic' });
  }

  // ---------- Animated stats counter ----------
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(el => {
        if (el.isIntersecting) { animateCount(el.target); io.unobserve(el.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }

  function animateCount(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.floor(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ---------- FAQ Accordion (smooth height) ----------
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer  = btn.nextElementSibling;
      const isOpen  = btn.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // ---------- Swiper testimonials ----------
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }
    });
  }

  // ---------- Home page: load categories + featured products ----------
  loadHomeData();

  // ---------- Scroll progress bar ----------
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ---------- Back to top button ----------
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

/* ---- Home data loader ---- */
async function loadHomeData() {
  const catStrip     = document.getElementById('cat-strip');
  const featuredGrid = document.getElementById('featured-products');
  if (!catStrip && !featuredGrid) return;

  try {
    let data;
    if (window.TOSHI_DATA) {
      data = window.TOSHI_DATA;
    } else {
      data = await fetch('data/products.json').then(r => r.json());
    }
    const { categories, products } = data;

    if (catStrip) {
      catStrip.innerHTML = categories.map((cat, i) => {
        const count = products.filter(p => p.categoryId === cat.id).length;
        const isImageIcon = typeof cat.icon === 'string' && /\.(png|jpe?g|svg|webp|gif|avif|bmp)$/i.test(cat.icon);
        const iconMarkup = isImageIcon
          ? `<img src="${cat.icon}" alt="${cat.name}" loading="lazy">`
          : `<span aria-hidden="true">${cat.icon || '⚡'}</span>`;

        return `
          <a href="products.html?category=${cat.id}" class="category-card" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="category-card-content">
              <div class="cat-icon-wrap">${iconMarkup}</div>
              <h3>${cat.name}</h3>
              <p>${cat.description}</p>
              <span class="cat-count">${count} Products</span>
              <div class="cat-link">Browse Category <span>→</span></div>
            </div>
          </a>`;
      }).join('');
      if (typeof AOS !== 'undefined') AOS.refresh();
    }

    if (featuredGrid) {
      const featured = [];
      categories.forEach(cat => {
        // Only feature products that have actual images
        products.filter(p => p.categoryId === cat.id && p.image).slice(0, 3).forEach(p => featured.push(p));
      });
      featuredGrid.innerHTML = featured.map((p, i) =>
        buildCard(p, categories, i * 80)
      ).join('');
      if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.glightbox' });
      if (typeof AOS !== 'undefined') AOS.refresh();
    }
  } catch (e) {
    console.warn('Could not load products.json:', e);
  }
}

/* ---- Shared card builder (used by main.js for homepage) ---- */
function buildCard(product, categories, aosDelay = 0) {
  const cat     = categories.find(c => c.id === product.categoryId);
  const catName = cat ? cat.name : product.categoryId;
  const isPet   = product.categoryId === 'pet-household';
  const waText  = encodeURIComponent(`Hello, I am interested in ${product.name}`);

  const imgSrc  = product.image || '';
  const imgFrag = imgSrc
    ? `<img src="${imgSrc}" alt="${esc(product.name)} — Manufacturer in Haridwar | Toshi Enterprises" loading="lazy" onerror="this.closest('.card-img').querySelector('.img-placeholder').style.display='flex';this.style.display='none';">
       <div class="img-placeholder" style="display:none">
         <span class="placeholder-icon">${isPet ? '🍶' : '⚡'}</span>
         <span class="placeholder-label">${esc(product.name)}</span>
       </div>`
    : `<div class="img-placeholder">
         <span class="placeholder-icon">${isPet ? '🍶' : '⚡'}</span>
         <span class="placeholder-label">${esc(product.name)}</span>
       </div>`;

  const glightboxAttr = imgSrc
    ? `href="${imgSrc}" class="glightbox" data-glightbox="title: ${esc(product.name)}"`
    : `href="#" onclick="return false"`;

  return `
    <div class="product-card" data-category="${product.categoryId}" data-aos="fade-up" data-aos-delay="${aosDelay}">
      <div class="card-img">
        <a ${glightboxAttr} style="display:block;width:100%;height:100%;">
          ${imgFrag}
        </a>
        <div class="card-img-overlay">
          <div class="overlay-name">${esc(product.name)}</div>
          <div class="overlay-spec">${esc(product.shortSpec)}</div>
        </div>
      </div>
      <div class="card-body">
        <span class="category-badge ${isPet ? 'pet' : ''}">${esc(catName)}</span>
        <h3 class="product-name">${esc(product.name)}</h3>
        <p class="product-spec">${esc(product.shortSpec)}</p>
        <span class="product-moq">✓ MOQ: ${esc(product.moq)}</span>
        <div class="card-actions">
          <a href="mailto:enterprisestoshi@gmail.com?subject=${encodeURIComponent(product.enquirySubject)}" class="btn btn-primary">Send Enquiry</a>
          <a href="https://wa.me/918899009910?text=${waText}" class="btn btn-whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>`;
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
