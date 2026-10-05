# Toshi Enterprises — Website

**Your Trusted OEM Manufacturing Partner**
Electrical Accessories & PET Household Products | Haridwar, Uttarakhand

---

## Quick Start

No build tools required. Open `index.html` directly in a browser, or serve from any static host.

```bash
# Local preview (Python)
python -m http.server 8080

# Local preview (Node)
npx serve .
```

---

## Folder Structure

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
│   └── products.json        # ← SINGLE SOURCE OF TRUTH for all products
├── assets/
│   ├── css/styles.css       # Full design system
│   ├── js/
│   │   ├── main.js          # Global: nav, AOS, Swiper, stats counter
│   │   └── products.js      # Products page: fetch JSON, Fuse search, filter, cards
│   └── images/
│       ├── products/        # Product images (name per convention below)
│       ├── team/            # Team member photos
│       └── industry/        # Hero/background images
├── sitemap.xml
└── README.md
```

---

## How to Add a New Product

Edit `data/products.json` only — no HTML changes needed.

```json
{
  "id": "elec-007",
  "categoryId": "electrical",
  "name": "Your Product Name",
  "shortSpec": "Key specs in one line",
  "description": "Longer description for the product.",
  "tags": ["keyword1", "keyword2", "search term"],
  "image": "assets/images/products/your-image-filename.jpg",
  "moq": "200 pcs",
  "enquirySubject": "Enquiry: Your Product Name"
}
```

Add the entry to the `products` array and drop the image in `assets/images/products/`. Done.

### Image naming convention
```
electrical-switch-modular-6a.jpg
electrical-mcb-10a.jpg
pet-bottle-1litre.jpg
pet-container-500ml.jpg
```

---

## How to Add a New Product Category

Add one entry to the `categories` array in `products.json`:

```json
{
  "id": "new-category",
  "name": "New Category Name",
  "icon": "🔌",
  "description": "Short description for the category strip",
  "color": "#1A3A6B"
}
```

Then set `"categoryId": "new-category"` on relevant products. The filter tabs on the products page and the category strip on the home page will update automatically — zero HTML edits.

---

## Enquiry Form Setup (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — copy the Form ID (looks like `xpzgkqla`)
3. Replace `YOUR_FORM_ID` in both `index.html` and `contact.html`:
   ```html
   <form action="https://formspree.io/f/xpzgkqla" method="POST">
   ```

Until you set this up, form submissions fall back to `mailto:` — the user's email client opens with the form data.

---

## Deployment Options

| Method | Cost | Time | Steps |
|--------|------|------|-------|
| **Netlify Drop** | Free | 2 min | Drag the `toshi-enterprises/` folder to [netlify.com/drop](https://app.netlify.com/drop) |
| **GitHub Pages** | Free | 10 min | Push to GitHub → Settings → Pages → Deploy from branch |
| **Vercel** | Free | 5 min | `npx vercel` in the project folder |
| **Hostinger** | ~₹99/mo | 30 min | Upload via File Manager, point domain |

For a **client preview link in under 2 minutes**: use Netlify Drop. Drag the folder, get a `toshi-abc.netlify.app` URL instantly.

### Custom domain (production)
1. Buy `toshienterprises.com` from Namecheap / GoDaddy
2. In Netlify/Vercel: Add custom domain → Update DNS at registrar
3. Update `sitemap.xml` `<loc>` tags to match your final domain
4. Update `<link rel="canonical">` in each HTML file

---

## SEO Checklist

- [x] Title + meta description on every page
- [x] H1 includes geo keyword ("Haridwar" / "Uttarakhand") on every page
- [x] JSON-LD ManufacturingBusiness schema on every page
- [x] FAQ page has FAQPage schema for rich snippets
- [x] Product schema dynamically injected on products.html
- [x] `sitemap.xml` with all 7 pages
- [x] `alt` text on product images follows: `"Product Name — Manufacturer in Haridwar | Toshi Enterprises"`
- [ ] Add `favicon.ico` (16×16 and 32×32 PNG, rename to `.ico`)
- [ ] Replace Google Maps embed URL with exact address pinpoint
- [ ] Submit sitemap to Google Search Console after going live

---

## Customisation Notes

**Phone / WhatsApp number**: Search & replace `918899009910` across all files if the number changes.

**Email**: Replace `enterprisestoshi@gmail.com` across all files.

**Address**: Update the address string in footer sections of all 7 HTML files and in the JSON-LD schema in `index.html`.

**Google Maps**: Replace the `iframe src` in `index.html` and `contact.html` with the embed URL for the exact pin from Google Maps → Share → Embed a map.

---

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JavaScript
- No build tools, no npm, no framework
- CDN libraries: Fuse.js, AOS.js, Swiper.js, GLightbox
- Product data: `data/products.json` (single source of truth)
