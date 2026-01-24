# SEO QA - Testing Guide

**Website:** crystaldetailing.sk  
**Framework:** Next.js 15 (App Router)  
**Hosting:** Vercel

---

## Pre-Deployment Checklist

### 1. Domain Verification
- [ ] Verify correct production domain (crystaldetailing.sk vs luxdetail.sk)
- [ ] Update all references in:
  - `app/layout.tsx` (baseUrl)
  - `app/sitemap.ts` (baseUrl)
  - `app/robots.ts` (baseUrl)
  - `components/structured-data.tsx` (URLs)
  - All location pages (canonical URLs)

### 2. Technical SEO Verification

#### Sitemap
- [ ] Verify sitemap is accessible: `https://crystaldetailing.sk/sitemap.xml`
- [ ] Check all pages are included:
  - Homepage (/)
  - Calculator (/calc)
  - Service Areas Hub (/lokality)
  - Location pages (/bratislava, /pezinok, /senec, /chorvatsky-grob)
- [ ] Verify lastModified dates are correct
- [ ] Check priority and changeFrequency values

#### Robots.txt
- [ ] Verify robots.txt is accessible: `https://crystaldetailing.sk/robots.txt`
- [ ] Check sitemap URL is correct
- [ ] Verify disallow rules are appropriate
- [ ] Test with Google Search Console robots.txt tester

#### Canonical URLs
- [ ] Verify canonical tag on homepage: `<link rel="canonical" href="https://crystaldetailing.sk/" />`
- [ ] Check canonical on all location pages
- [ ] Verify canonical on calculator page
- [ ] Ensure no duplicate canonical URLs

---

## Post-Deployment Testing

### 1. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

**Steps:**
1. Enter page URL (start with homepage)
2. Click "Test URL"
3. Verify structured data is detected:
   - ✅ LocalBusiness schema
   - ✅ Service schemas (if added)
   - ✅ FAQPage schema (on location pages)
4. Check for any errors or warnings
5. Repeat for all location pages

**Expected Results:**
- No critical errors
- LocalBusiness schema validated
- All required fields present
- Images load correctly

### 2. Google Search Console Setup

**Steps:**
1. Add property: `https://crystaldetailing.sk`
2. Verify ownership (DNS, HTML file, or meta tag)
3. Submit sitemap: `https://crystaldetailing.sk/sitemap.xml`
4. Request indexing for key pages:
   - Homepage
   - Location pages
   - Calculator page

**Monitor:**
- Coverage report (check for errors)
- Sitemap status
- Indexing status of pages
- Search performance (after 1-2 weeks)

### 3. Mobile-Friendly Test

**URL:** https://search.google.com/test/mobile-friendly

**Steps:**
1. Test homepage
2. Test location pages
3. Test calculator page
4. Verify all pages pass mobile-friendly test

**Expected Results:**
- All pages pass mobile-friendly test
- Text is readable without zooming
- Links are appropriately sized
- Content fits mobile screen

### 4. PageSpeed Insights

**URL:** https://pagespeed.web.dev/

**Steps:**
1. Test homepage
2. Test location pages
3. Check both mobile and desktop scores

**Target Metrics:**
- Performance: > 80 (mobile), > 90 (desktop)
- Accessibility: > 90
- Best Practices: > 90
- SEO: 100

**Common Issues to Fix:**
- Image optimization (should be enabled in next.config.mjs)
- Lazy loading for below-fold images
- Font loading optimization (already implemented)
- Reduce JavaScript bundle size

### 5. Structured Data Testing

#### LocalBusiness Schema
- [ ] Name: "Crystal Detailing"
- [ ] Description: Present and accurate
- [ ] URL: Correct domain
- [ ] Logo: Valid image URL
- [ ] Telephone: +421918722720
- [ ] Email: crystalbratislava@gmail.com
- [ ] PriceRange: €€
- [ ] AreaServed: All target locations listed
- [ ] OpeningHours: Present (if applicable)

#### Service Schemas
- [ ] Verify Service schemas on relevant pages
- [ ] Check serviceType is accurate
- [ ] Verify areaServed matches page location

#### FAQPage Schema
- [ ] Verify FAQ schemas on location pages
- [ ] Check questions and answers are accurate
- [ ] Ensure proper formatting

### 6. Metadata Verification

#### Homepage
- [ ] Title: "Crystal Detailing | Prémiový mobilný detailing v Bratislave"
- [ ] Description: Present, 150-160 characters
- [ ] OpenGraph: Title, description, image present
- [ ] Twitter Card: Present and correct
- [ ] Canonical: Present and correct

#### Location Pages
- [ ] Unique titles for each page
- [ ] Unique descriptions
- [ ] Location-specific keywords
- [ ] Canonical URLs correct

#### Calculator Page
- [ ] Title: "Cenová kalkulačka - Získajte okamžitú cenovú ponuku"
- [ ] Description: Present
- [ ] Canonical: Present

### 7. Image Alt Text Verification

**Check:**
- [ ] All images have alt text
- [ ] Alt text is in Slovak
- [ ] Alt text includes relevant keywords naturally
- [ ] No generic alt text ("image", "photo", etc.)
- [ ] Decorative images have empty alt (alt="")

**Pages to Check:**
- Homepage (all images)
- Location pages
- Calculator page

### 8. Internal Linking Verification

**Check:**
- [ ] Footer links to location pages
- [ ] Navbar includes "Lokality" link
- [ ] Location pages link to each other
- [ ] Location pages link back to homepage
- [ ] Service pages link to location pages
- [ ] Calculator linked from multiple pages

**Link Structure:**
```
Homepage
├── /lokality
│   ├── /bratislava
│   ├── /pezinok
│   ├── /senec
│   └── /chorvatsky-grob
└── /calc
```

### 9. Indexing Verification

**After 1-2 weeks:**

**Google Search Console:**
- [ ] Check Coverage report
- [ ] Verify pages are indexed
- [ ] Check for crawl errors
- [ ] Monitor search performance

**Manual Google Search:**
- [ ] Search: `site:crystaldetailing.sk`
- [ ] Verify all pages appear
- [ ] Check for duplicate content issues

**Search Queries to Test:**
- `mobilný detailing Bratislava`
- `detailing Pezinok`
- `tepovanie áut Bratislava`
- `keramická ochrana Bratislava`

### 10. Performance Testing

#### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

#### Image Optimization
- [ ] Images use next/image component
- [ ] Proper sizes attributes
- [ ] AVIF/WebP formats enabled
- [ ] Lazy loading for below-fold images
- [ ] Priority for above-fold images

#### Font Loading
- [ ] Fonts use next/font/google
- [ ] display: "swap" enabled
- [ ] Preload enabled for critical fonts

---

## Monthly SEO Maintenance

### Week 1: Analytics Review
- [ ] Review Google Search Console data
- [ ] Check for new errors or warnings
- [ ] Monitor search performance
- [ ] Review top performing pages

### Week 2: Content Updates
- [ ] Update location pages with new information
- [ ] Add new FAQs based on customer questions
- [ ] Update structured data if needed

### Week 3: Technical Audit
- [ ] Check for broken links
- [ ] Verify all pages load correctly
- [ ] Test mobile responsiveness
- [ ] Check page speed

### Week 4: Competitive Analysis
- [ ] Review competitor SEO strategies
- [ ] Identify new keyword opportunities
- [ ] Plan content updates

---

## Common Issues and Solutions

### Issue: Structured Data Not Showing
**Solution:**
- Verify JSON-LD is in `<head>` or `<body>`
- Check for syntax errors in schema
- Use Google Rich Results Test
- Ensure all required fields are present

### Issue: Pages Not Indexing
**Solution:**
- Submit sitemap in Google Search Console
- Request indexing manually
- Check robots.txt isn't blocking
- Verify canonical URLs are correct
- Ensure pages have unique content

### Issue: Duplicate Content
**Solution:**
- Ensure canonical URLs are set correctly
- Verify each page has unique title/description
- Check for duplicate H1 tags
- Review internal linking structure

### Issue: Slow Page Speed
**Solution:**
- Enable image optimization in next.config.mjs
- Lazy load below-fold images
- Optimize JavaScript bundles
- Use CDN for static assets
- Enable compression

---

## Tools and Resources

### Testing Tools
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Google Search Console:** https://search.google.com/search-console
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **Schema Markup Validator:** https://validator.schema.org/

### Monitoring Tools
- **Google Analytics:** Track traffic and conversions
- **Google Search Console:** Monitor search performance
- **Ahrefs/SEMrush:** Keyword tracking (optional)

### Documentation
- **Next.js SEO:** https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **Schema.org:** https://schema.org/
- **Google Search Central:** https://developers.google.com/search

---

## Success Metrics

### 3 Months
- [ ] All pages indexed
- [ ] No critical SEO errors
- [ ] Structured data validated
- [ ] Page speed scores > 80

### 6 Months
- [ ] Organic traffic increase: 50%+
- [ ] Top 10 rankings for 5+ target keywords
- [ ] Location pages ranking for local searches
- [ ] Zero crawl errors

### 12 Months
- [ ] Organic traffic increase: 200%+
- [ ] Top 3 rankings for primary keywords
- [ ] Strong local pack presence
- [ ] Consistent content publishing

---

## Notes

- **Domain:** Verify actual production domain before deployment
- **Social Media:** Update sameAs URLs in LocalBusiness schema when social profiles are created
- **Reviews:** Only add Review schema if real reviews exist in content
- **Content:** Start publishing blog articles from content plan after initial SEO setup


