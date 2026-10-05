# Toshi Enterprises — Website Development Prompt (Claude Code Ready)

## Project Overview

Build a complete, production-ready multi-page website for **Toshi Enterprises**, a manufacturer and trader of Electrical Accessories and PET Household products based in Haridwar, Uttarakhand, India. The primary goal is **B2B lead generation** — businesses searching for these products online should find this site and be prompted to make an inquiry or call.

**Tagline:** *Your Trusted OEM Manufacturing Partner*

---

## Tech Stack

- **HTML5 + CSS3 + Vanilla JavaScript** — pure static site, no build tools, deployable anywhere
- **Product data stored in `data/products.json`** — fully data-driven catalogue; adding products or categories never requires touching HTML
- Libraries (load via CDN, no npm):
  - **Fuse.js** (fuzzy search) → `https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js`
  - **AOS.js** (scroll animations) → `https://unpkg.com/aos@2.3.4/dist/aos.js`
  - **Swiper.js** (testimonial carousel) → `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js`
  - **GLightbox** (product image zoom) → `https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js`

---

## Project Folder Structure

```
toshi-enterprises/
├── index.html               # Home
├── about.html               # About Us
├── products.html            # Product catalogue (search + filter)
├── services.html            # Services
├── team.html                # Our Team
├── faq.html                 # FAQ
├── contact.html             # Contact Us
├── data/
│   └── products.json        # ← SINGLE SOURCE OF TRUTH for all products & categories
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js          # Global: nav, AOS init, WhatsApp btn, smooth scroll
│   │   └── products.js      # Products page: loads JSON, search, filter, render cards
│   └── images/
│       ├── products/        # Product images (user uploads; named per convention below)
│       ├── team/
│       └── industry/        # Hero/section backgrounds
├── favicon.ico
├── sitemap.xml
└── README.md
```

---

## Business Details

| Field | Value |
|-------|-------|
| Business Name | Toshi Enterprises |
| Tagline | Your Trusted OEM Manufacturing Partner |
| Industry | Manufacturing & Trading |
| Address | B-19, Ganga Nagri, Bhadrabad Industrial Area, Haridwar, Uttarakhand – 249403 |
| Phone | +91 88990 09910 |
| WhatsApp | +91 88990 09910 |
| Email | enterprisestoshi@gmail.com |
| Service Area | Pan India (B2B supply) |

---

## Product Data Architecture (`data/products.json`)

This is the core of the scalable catalogue. Structure it exactly like this so adding future categories requires only a new entry in this file — zero HTML changes.

```json
{
  "categories": [
    {
      "id": "electrical",
      "name": "Electrical Accessories",
      "icon": "⚡",
      "description": "ISI-certified electrical components for residential, commercial and industrial use",
      "color": "#1A3A6B"
    },
    {
      "id": "pet-household",
      "name": "PET Household Products",
      "icon": "🏠",
      "description": "Food-grade PET containers and household storage solutions",
      "color": "#F5A623"
    }
  ],
  "products": [
    {
      "id": "elec-001",
      "categoryId": "electrical",
      "name": "Modular Switch — 6A Single Pole",
      "shortSpec": "6A, 240V, ISI marked, white finish",
      "description": "Heavy-duty modular switch suitable for residential and commercial wiring. ISI certified.",
      "tags": ["switch", "modular", "6A", "wiring", "electrical"],
      "image": "assets/images/products/electrical-switch-modular-6a.jpg",
      "moq": "500 pcs",
      "enquirySubject": "Enquiry: Modular Switch 6A Single Pole"
    },
    {
      "id": "elec-002",
      "categoryId": "electrical",
      "name": "3-Pin Socket — 16A",
      "shortSpec": "16A, 240V, ISI marked, ivory finish",
      "description": "Standard 3-pin power socket for heavy appliances. Available in modular and concealed variants.",
      "tags": ["socket", "3-pin", "16A", "outlet", "electrical"],
      "image": "assets/images/products/electrical-socket-3pin-16a.jpg",
      "moq": "500 pcs",
      "enquirySubject": "Enquiry: 3-Pin Socket 16A"
    },
    {
      "id": "elec-003",
      "categoryId": "electrical",
      "name": "MCB — Single Pole 10A",
      "shortSpec": "10A, 240V, C-curve, 6kA breaking capacity",
      "description": "Miniature Circuit Breaker for overcurrent and short-circuit protection.",
      "tags": ["MCB", "circuit breaker", "10A", "protection", "electrical"],
      "image": "assets/images/products/electrical-mcb-10a.jpg",
      "moq": "200 pcs",
      "enquirySubject": "Enquiry: MCB Single Pole 10A"
    },
    {
      "id": "elec-004",
      "categoryId": "electrical",
      "name": "PVC Conduit Pipe — 20mm",
      "shortSpec": "20mm dia, 3m length, rigid PVC, ISI marked",
      "description": "Rigid PVC electrical conduit for concealed and surface wiring protection.",
      "tags": ["conduit", "pipe", "PVC", "wiring", "20mm"],
      "image": "assets/images/products/electrical-conduit-20mm.jpg",
      "moq": "100 pcs",
      "enquirySubject": "Enquiry: PVC Conduit Pipe 20mm"
    },
    {
      "id": "elec-005",
      "categoryId": "electrical",
      "name": "Extension Board — 4 Socket, 2m",
      "shortSpec": "4 outlets, 2m cord, 6A/16A, surge protected",
      "description": "Multi-socket extension board with master switch and surge protection for home and office.",
      "tags": ["extension board", "power strip", "4 socket", "surge protection"],
      "image": "assets/images/products/electrical-extension-board-4s.jpg",
      "moq": "200 pcs",
      "enquirySubject": "Enquiry: Extension Board 4 Socket"
    },
    {
      "id": "elec-006",
      "categoryId": "electrical",
      "name": "Junction Box — 4x4 inch",
      "shortSpec": "4×4 inch, PVC, IP44 rated, surface mount",
      "description": "Weatherproof PVC junction box for electrical connections and wire management.",
      "tags": ["junction box", "enclosure", "PVC", "weatherproof"],
      "image": "assets/images/products/electrical-junction-box-4x4.jpg",
      "moq": "500 pcs",
      "enquirySubject": "Enquiry: Junction Box 4x4"
    },
    {
      "id": "pet-001",
      "categoryId": "pet-household",
      "name": "PET Storage Bottle — 1 Litre",
      "shortSpec": "1000ml, food-grade PET, BPA-free, wide mouth",
      "description": "Crystal-clear food-grade PET bottle for water, juice, oil and dry goods storage.",
      "tags": ["bottle", "1 litre", "PET", "storage", "food grade", "water"],
      "image": "assets/images/products/pet-bottle-1litre.jpg",
      "moq": "1000 pcs",
      "enquirySubject": "Enquiry: PET Storage Bottle 1L"
    },
    {
      "id": "pet-002",
      "categoryId": "pet-household",
      "name": "PET Storage Container — 500ml",
      "shortSpec": "500ml, airtight lid, food-grade PET, stackable",
      "description": "Airtight stackable container for kitchen dry goods storage. Available in sets.",
      "tags": ["container", "500ml", "airtight", "kitchen", "storage", "PET"],
      "image": "assets/images/products/pet-container-500ml.jpg",
      "moq": "500 pcs",
      "enquirySubject": "Enquiry: PET Container 500ml"
    },
    {
      "id": "pet-003",
      "categoryId": "pet-household",
      "name": "Water Jug — 5 Litre",
      "shortSpec": "5L, food-grade PET, handle grip, wide mouth",
      "description": "Large-capacity water jug with ergonomic handle for household and office use.",
      "tags": ["jug", "5 litre", "water", "PET", "household"],
      "image": "assets/images/products/pet-jug-5litre.jpg",
      "moq": "200 pcs",
      "enquirySubject": "Enquiry: Water Jug 5L"
    },
    {
      "id": "pet-004",
      "categoryId": "pet-household",
      "name": "Liquid Dispenser Bottle — 300ml",
      "shortSpec": "300ml, pump dispenser, food-grade PET, clear",
      "description": "Press-pump dispenser for soap, sanitiser, lotion. Suitable for household and hospitality.",
      "tags": ["dispenser", "pump", "300ml", "soap", "sanitiser", "PET"],
      "image": "assets/images/products/pet-dispenser-300ml.jpg",
      "moq": "500 pcs",
      "enquirySubject": "Enquiry: Dispenser Bottle 300ml"
    }
  ]
}
```

**To add a new category in future:** Add one object to the `categories` array and set `categoryId` on new products. Nothing else changes.

---

## Products Page — Search & Filter (`products.js`)

Build the following behaviour entirely in `products.js`:

### On page load
1. Fetch `data/products.json`
2. Render category filter tabs dynamically from `categories` array (not hardcoded)
3. Render all product cards into the grid
4. Initialise Fuse.js with `keys: ["name", "shortSpec", "tags", "description"]`

### Search bar (live, as-you-type)
```js
// Fuse.js config
const fuse = new Fuse(products, {
  keys: ["name", "shortSpec", "description", "tags"],
  threshold: 0.35,      // fuzzy tolerance — finds "swicth" → "switch"
  minMatchCharLength: 2
});

// On input event, re-render filtered results
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  const results = query ? fuse.search(query).map(r => r.item) : allProducts;
  renderProducts(applyCategory(results, activeCategory));
});
```

### Category filter tabs
- "All Products" tab always first
- Remaining tabs generated from `categories` array — future categories appear automatically
- Active tab highlighted in primary navy; clicking filters the product grid
- Search and category filter work together (search within selected category)

### Product card structure
```html
<div class="product-card" data-category="electrical">
  <a href="assets/images/products/..." class="glightbox">
    <img src="..." alt="Modular Switch 6A — Toshi Enterprises" loading="lazy">
  </a>
  <div class="card-body">
    <span class="category-badge">Electrical Accessories</span>
    <h3 class="product-name">Modular Switch — 6A Single Pole</h3>
    <p class="product-spec">6A, 240V, ISI marked, white finish</p>
    <p class="product-moq">MOQ: 500 pcs</p>
    <div class="card-actions">
      <a href="mailto:enterprisestoshi@gmail.com?subject=Enquiry: Modular Switch 6A"
         class="btn btn-primary">Send Enquiry</a>
      <a href="https://wa.me/918899009910?text=Hello%2C%20I%20am%20interested%20in%20Modular%20Switch%206A"
         class="btn btn-whatsapp">WhatsApp</a>
    </div>
  </div>
</div>
```

### Empty state
When search returns 0 results, show:
```html
<div class="no-results">
  <p>No products found for "<strong>[query]</strong>"</p>
  <p>Try a different term or <a href="contact.html">contact us</a> — we may manufacture it.</p>
</div>
```

### Results count
Show `"Showing 8 of 10 products"` above the grid, updates live with search/filter.

---

## Pages & Content Requirements

### 1. Home (`index.html`)
- **Hero**: Full-width banner, headline: *"Your Trusted OEM Manufacturing Partner"*, sub-headline about Haridwar-based manufacturing, two CTAs:
  - `📞 Call Now` → `tel:+918899009910`
  - `💬 WhatsApp Enquiry` → `https://wa.me/918899009910?text=Hello%2C%20I%20am%20interested%20in%20your%20products`
- **Trust bar**: "ISI Certified Products", "Pan India Delivery", "OEM & Bulk Orders", "Haridwar Manufacturing"
- **Product categories strip**: Dynamically loaded from `products.json` — category cards with icon, name, product count, "Browse" link → `products.html?category=[id]`
- **Featured products**: 4 random products from JSON (2 electrical, 2 PET) with enquiry CTAs
- **Why Choose Us**: Quality assurance, Competitive MOQ, OEM capability, On-time delivery
- **Lead enquiry form**: Name*, Company*, Phone*, Product Interest (dropdown from categories), Message → Formspree or mailto
- **Testimonials**: Swiper.js carousel, 3 placeholder B2B client quotes
- **Google Maps embed**: Bhadrabad Industrial Area, Haridwar
- **Footer**: Address, clickable phone, WhatsApp, email, page links

### 2. About Us (`about.html`)
- Company overview with OEM manufacturing focus
- Mission & Vision
- Stats counter (animate on scroll with AOS): Years in operation, Product SKUs, Cities served, Orders completed
- Manufacturing capabilities description
- Certifications row (ISI, BIS — placeholder badges)

### 3. Products (`products.html`)
- Search bar (prominent, top of page) with placeholder: *"Search switches, PET bottles, MCBs..."*
- Category filter tabs (rendered from JSON)
- Results count
- Product grid (responsive: 1→2→3→4 col)
- GLightbox for image zoom
- "Can't find what you need? Contact us →" banner below grid

### 4. Services (`services.html`)
- OEM / Custom Manufacturing
- Bulk & Wholesale Supply
- Pan India Logistics
- Quality Testing & ISI Compliance
- Product Customisation (colour, label, packaging)
- After-Sales Support

### 5. Team (`team.html`)
- Placeholder team cards (Name, Designation, image placeholder)

### 6. FAQ (`faq.html`)
Accordion Q&A:
- Minimum order quantity?
- Do you supply pan India?
- OEM / custom branding available?
- Payment terms?
- Delivery timelines?
- ISI / BIS certified products?
- Can I get samples before bulk order?
- How to place a bulk enquiry?
- What product categories do you manufacture?
- Do you export?

### 7. Contact (`contact.html`)
- Lead form (Formspree free tier): Name*, Company*, Phone*, Email, Requirement, Message
- Prominent call-to-action phone link
- WhatsApp chat button
- Google Maps embed
- Business hours: Mon–Sat, 9:30 AM – 6:00 PM IST

---

## Design System

### Color Palette
```css
--primary:       #1A3A6B;   /* Navy — trust, industrial */
--primary-dark:  #0F2347;
--primary-light: #EEF2F9;   /* Tint for category badges */
--accent:        #F5A623;   /* Amber — energy, OEM highlight */
--accent-dark:   #D4891A;
--whatsapp:      #25D366;
--whatsapp-dark: #128C7E;
--text-dark:     #1C1C1C;
--text-mid:      #555555;
--text-light:    #888888;
--bg-page:       #FFFFFF;
--bg-section:    #F5F7FA;
--border:        #E0E6ED;
--success:       #27AE60;
--radius-card:   10px;
--radius-btn:    6px;
--shadow-card:   0 2px 12px rgba(0,0,0,0.08);
--shadow-hover:  0 6px 24px rgba(26,58,107,0.15);
```

### Typography
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
```
```css
--font-body:    'Inter', sans-serif;      /* All body text */
--font-heading: 'Poppins', sans-serif;    /* H1–H3, nav brand */
```

### Button Classes
```css
.btn-primary    { background: var(--primary); color: white; }
.btn-secondary  { background: white; border: 1.5px solid var(--primary); color: var(--primary); }
.btn-accent     { background: var(--accent); color: white; }
.btn-whatsapp   { background: var(--whatsapp); color: white; }
```

### Card hover behaviour
```css
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary);
}
```

---

## SEO Requirements

### Meta tags (customise per page)
```html
<title>Electrical Accessories Manufacturer in Haridwar | Toshi Enterprises</title>
<meta name="description" content="Toshi Enterprises — OEM manufacturer of Electrical Accessories & PET Household Products in Haridwar, Uttarakhand. Bulk & custom orders. Pan India supply. Call +91 88990 09910">
<meta name="keywords" content="electrical accessories manufacturer Haridwar, PET household products supplier India, OEM electrical manufacturer Uttarakhand, bulk electrical accessories, modular switches manufacturer, PET bottle manufacturer Haridwar">
<meta property="og:title" content="Toshi Enterprises | OEM Electrical & PET Manufacturer, Haridwar">
<meta property="og:description" content="Your Trusted OEM Manufacturing Partner. Electrical Accessories & PET Household Products. Bulk orders, pan India supply.">
<link rel="canonical" href="https://toshienterprises.com/">
```

### JSON-LD Schema (every page)
```json
{
  "@context": "https://schema.org",
  "@type": "ManufacturingBusiness",
  "name": "Toshi Enterprises",
  "slogan": "Your Trusted OEM Manufacturing Partner",
  "description": "Manufacturer and trader of Electrical Accessories and PET Household Products",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "B-19, Ganga Nagri, Bhadrabad Industrial Area",
    "addressLocality": "Haridwar",
    "addressRegion": "Uttarakhand",
    "postalCode": "249403",
    "addressCountry": "IN"
  },
  "telephone": "+918899009910",
  "email": "enterprisestoshi@gmail.com",
  "areaServed": "India",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Electrical Accessories & PET Household Products"
  }
}
```

### Product schema (on products.html, generated dynamically per product in JS)
```json
{
  "@type": "Product",
  "name": "Modular Switch 6A",
  "description": "...",
  "brand": { "@type": "Brand", "name": "Toshi Enterprises" },
  "manufacturer": { "@type": "Organization", "name": "Toshi Enterprises" }
}
```

### On-page SEO rules
- H1 on every page includes primary geo keyword: "in Haridwar" or "Uttarakhand"
- Product image `alt` text: `"[Product name] — Manufacturer in Haridwar | Toshi Enterprises"`
- `sitemap.xml` lists all 7 pages with `<lastmod>` and `<priority>`

---

## Functional Requirements

### Floating WhatsApp button (all pages)
```html
<a href="https://wa.me/918899009910?text=Hello%2C%20I%20am%20interested%20in%20your%20products"
   class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
  <!-- WhatsApp SVG icon -->
</a>
```
```css
.whatsapp-float {
  position: fixed; bottom: 24px; right: 24px;
  background: var(--whatsapp); border-radius: 50%;
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(37,211,102,0.4);
  z-index: 999;
}
```

### Mobile sticky CTA bar
```html
<!-- Visible only on mobile (max-width: 767px), fixed bottom -->
<div class="mobile-sticky-cta">
  <a href="tel:+918899009910" class="sticky-call">📞 Call Now</a>
  <a href="https://wa.me/918899009910" class="sticky-wa">💬 WhatsApp</a>
</div>
```

### Products page — URL parameter support
```js
// If user arrives at products.html?category=electrical, auto-activate that tab
const params = new URLSearchParams(window.location.search);
const preselect = params.get("category");
if (preselect) activateTab(preselect);
```
This allows Home page category cards to deep-link directly into a filtered view.

### Contact / enquiry forms
- Use **Formspree** (`https://formspree.io` — free, no backend): `<form action="https://formspree.io/f/[your-id]">`
- JS validation: all required fields before submit
- On submit success: show inline "Thank you — we'll contact you within 24 hours" message

---

## Responsive Breakpoints

```css
/* Mobile first */
/* Base:   < 480px  — single column */
/* sm:       480px  — 2-col product grid */
/* md:       768px  — nav expands, 3-col grid */
/* lg:      1024px  — full layout */
/* xl:      1280px  — max-width container 1200px */
```

- Hamburger nav on mobile; horizontal nav on desktop
- Product grid: 1 → 2 → 3 → 4 columns
- All `tel:` and `wa.me` links tappable (min 44px touch target)

---

## Performance

- `loading="lazy"` on all images below the fold
- WebP images where possible; fallback to JPEG
- CDN libraries loaded with `defer`
- Target: Lighthouse mobile score > 85

---

## Image Handling

Place real images in `assets/images/products/` using this naming convention:
```
electrical-switch-modular-6a.jpg
electrical-socket-3pin-16a.jpg
electrical-mcb-10a.jpg
electrical-conduit-20mm.jpg
pet-bottle-1litre.jpg
pet-container-500ml.jpg
pet-jug-5litre.jpg
pet-dispenser-300ml.jpg
```

Until real images are provided: generate CSS placeholder blocks with the product name as text (no external placeholder services). For hero/background images use Unsplash free-to-use images — search terms: "electrical manufacturing india", "industrial factory", "PET packaging".

---

## Sharing with Clients / Deployment

| Method | Cost | Time | Best for |
|--------|------|------|----------|
| **Netlify drop** | Free | 2 min | Client preview — drag project folder to netlify.com/drop |
| **GitHub Pages** | Free | 10 min | Permanent free hosting on `username.github.io/toshi-enterprises` |
| **Vercel** | Free | 5 min | Same as Netlify, slightly faster CDN |
| **Hostinger shared** | ~₹99/mo | 30 min | Final production with custom domain `toshienterprises.com` |

For client preview: **Netlify drop** is the fastest — results in a public URL like `toshi-abc123.netlify.app` in under 2 minutes, accessible on any device including mobile.

---

## Deliverables Checklist

- [ ] `index.html`, `about.html`, `products.html`, `services.html`, `team.html`, `faq.html`, `contact.html`
- [ ] `data/products.json` — populated with sample products across 2 categories
- [ ] `assets/css/styles.css` — full design system
- [ ] `assets/js/main.js` — nav, AOS, WhatsApp button, scroll
- [ ] `assets/js/products.js` — JSON fetch, Fuse.js search, category filter, card render
- [ ] `sitemap.xml`
- [ ] `README.md` — how to add products, how to deploy
- [ ] CSS placeholder images in correct folders

---

## Key Instruction for Claude Code

> **The product catalogue must be entirely data-driven.** Never hardcode product names or category names in HTML. All product rendering, search, and filtering happens by reading `data/products.json`. Adding a new category in the future = one JSON entry, zero HTML edits. The `products.js` file must dynamically generate category filter tabs from the JSON so they appear automatically.

---

*Build a fast, professional B2B website that ranks for "electrical accessories manufacturer Haridwar" and "PET household products supplier India". Every page should make it trivially easy to call, WhatsApp, or submit an enquiry. The product catalogue must scale to hundreds of products and multiple categories without code changes.*
