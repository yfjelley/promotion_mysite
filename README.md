# Quant Build Studio landing page

Static Google Ads landing page for Cloudflare Pages. No VPS is required for the
current site because the production artifact is static HTML, CSS, and JS.

## Deploy

```bash
npx wrangler pages deploy public --project-name promotion-mysite --branch master
```

The publish directory is `public/`. The legacy Django files are not part of the
Cloudflare Pages deployment.

## Google Ads tracking

The site loads the existing Google Ads and GA4 tags, but it only reports the Ads
conversion when a visitor clicks or copies a contact method. Page views are not
counted as leads.
