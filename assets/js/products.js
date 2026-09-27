/* ============================================================
   products.js — Products page: load JSON, search, filter, render
   ============================================================ */

let allProducts  = [];
let allCategories = [];
let fuseInstance  = null;
let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();
  handleURLParam();
});

async function loadProducts() {
  try {
    let data;
    if (window.TOSHI_DATA) {
      data = window.TOSHI_DATA;
    } else {
      data = await fetch('data/products.json').then(r => r.json());
    }
    const { categories, products } = data;
    allCategories = categories;
    allProducts   = products;
    renderFilterTabs();
    renderProducts(allProducts);
    initFuse();
    initSearch();
    injectProductSchema(allProducts);
    if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.glightbox' });
  } catch (err) {
    document.getElementById('products-grid').innerHTML =
      '<p style="color:#dc2626;padding:24px">Failed to load products. Please refresh the page.</p>';
  }
}

function renderFilterTabs() {
  const container = document.getElementById('filter-tabs');
  if (!container) return;
  const allTab  = `<button class="filter-tab active" data-cat="all">All Products</button>`;
  const catTabs = allCategories.map(cat =>
    `<button class="filter-tab" data-cat="${cat.id}">${cat.icon} ${cat.name}</button>`
  ).join('');
  container.innerHTML = allTab + catTabs;
  container.addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.cat;
    applyFilters();
  });
}

function activateTab(categoryId) {
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === categoryId);
  });
  activeCategory = categoryId;
  applyFilters();
}

function initFuse() {
  if (typeof Fuse === 'undefined') return;
  fuseInstance = new Fuse(allProducts, {
    keys: ['name', 'shortSpec', 'description', 'tags'],
    threshold: 0.35,
    minMatchCharLength: 2
  });
}

function initSearch() {
  document.getElementById('product-search')?.addEventListener('input', applyFilters);
}

function applyFilters() {
  const query = (document.getElementById('product-search')?.value || '').trim();
  let results = allProducts;
  if (query && fuseInstance) results = fuseInstance.search(query).map(r => r.item);
  if (activeCategory !== 'all') results = results.filter(p => p.categoryId === activeCategory);
  renderProducts(results, query);
}

function renderProducts(products, query = '') {
  const grid    = document.getElementById('products-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;

  if (countEl) countEl.textContent = `Showing ${products.length} of ${allProducts.length} products`;

  if (!products.length) {
    grid.innerHTML = `
      <div class="no-results">
        <p style="font-size:2rem;margin-bottom:8px">🔍</p>
        <p>No products found${query ? ` for "<strong>${escHtml(query)}</strong>"` : ''}.</p>
        <p style="margin-top:8px">Try a different term or <a href="contact.html">contact us</a> — we may manufacture it.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map((p, i) => buildProductCard(p, i)).join('');
  if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.glightbox' });
  if (typeof AOS !== 'undefined') AOS.refresh();
}

function buildProductCard(product, index = 0) {
  const cat     = allCategories.find(c => c.id === product.categoryId);
  const catName = cat ? cat.name : product.categoryId;
  const isPet   = product.categoryId === 'pet-household';
  const waText  = encodeURIComponent(`Hello, I am interested in ${product.name}`);
  const delay   = Math.min(index * 60, 400);
  const imgSrc  = product.image || '';

  const imgFrag = imgSrc
    ? `<img src="${imgSrc}" alt="${escHtml(product.name)} — Manufacturer in Haridwar | Toshi Enterprises" loading="lazy" onerror="this.closest('.card-img').querySelector('.img-placeholder').style.display='flex';this.style.display='none';">
       <div class="img-placeholder" style="display:none">
         <span class="placeholder-icon">${isPet ? '🍶' : '⚡'}</span>
         <span class="placeholder-label">${escHtml(product.name)}</span>
       </div>`
    : `<div class="img-placeholder">
         <span class="placeholder-icon">${isPet ? '🍶' : '⚡'}</span>
         <span class="placeholder-label">${escHtml(product.name)}</span>
       </div>`;

  const glightboxAttr = imgSrc
    ? `href="${imgSrc}" class="glightbox" data-glightbox="title: ${escAttr(product.name)}"`
    : `href="#" onclick="return false"`;

  return `
    <div class="product-card" data-category="${product.categoryId}" data-aos="fade-up" data-aos-delay="${delay}">
      <div class="card-img">
        <a ${glightboxAttr} style="display:block;width:100%;height:100%;">
          ${imgFrag}
        </a>
        <div class="card-img-overlay">
          <div class="overlay-name">${escHtml(product.name)}</div>
          <div class="overlay-spec">${escHtml(product.shortSpec)}</div>
        </div>
      </div>
      <div class="card-body">
        <span class="category-badge ${isPet ? 'pet' : ''}">${escHtml(catName)}</span>
        <h3 class="product-name">${escHtml(product.name)}</h3>
        <p class="product-spec">${escHtml(product.shortSpec)}</p>
        <span class="product-moq">✓ MOQ: ${escHtml(product.moq)}</span>
        <div class="card-actions">
          <a href="mailto:enterprisestoshi@gmail.com?subject=${encodeURIComponent(product.enquirySubject)}" class="btn btn-primary">Send Enquiry</a>
          <a href="https://wa.me/919897794104?text=${waText}" class="btn btn-whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>`;
}

function handleURLParam() {
  const cat = new URLSearchParams(location.search).get('category');
  if (cat && allCategories.find(c => c.id === cat)) activateTab(cat);
}

function injectProductSchema(products) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': products.map(p => ({
      '@type': 'Product',
      'name': p.name,
      'description': p.description,
      'brand': { '@type': 'Brand', 'name': 'Toshi Enterprises' },
      'manufacturer': { '@type': 'Organization', 'name': 'Toshi Enterprises' }
    }))
  });
  document.head.appendChild(script);
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(s) {
  return String(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
