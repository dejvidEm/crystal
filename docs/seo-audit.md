# SEO Audit - Crystal Detailing

**Date:** 2025-01-27  
**Domain:** crystaldetailing.sk (needs verification - robots.txt references luxdetail.sk)  
**Framework:** Next.js 15 (App Router)  
**Hosting:** Vercel

## Executive Summary

This audit identifies critical SEO issues and provides actionable fixes for a Slovak mobile car detailing website targeting Bratislava and surrounding areas.

---

## Critical Issues Found

### 1. **Missing Sitemap**
- ❌ No `app/sitemap.ts` file exists
- ❌ Public robots.txt references wrong domain (luxdetail.sk instead of crystaldetailing.sk)
- **Impact:** Search engines cannot discover all pages
- **Fix:** Create dynamic sitemap.ts with all pages

### 2. **Incorrect Robots.txt**
- ❌ References `luxdetail.sk` instead of `crystaldetailing.sk`
- ❌ Static file in `/public` instead of dynamic `app/robots.ts`
- **Impact:** Wrong sitemap URL, potential indexing issues
- **Fix:** Create `app/robots.ts` with correct domain

### 3. **Missing Canonical URLs**
- ❌ No canonical tags on pages
- **Impact:** Potential duplicate content issues
- **Fix:** Add canonical URLs to metadata

### 4. **No Structured Data (JSON-LD)**
- ❌ Missing LocalBusiness schema
- ❌ Missing Service schemas
- ❌ Missing FAQPage schema
- **Impact:** No rich snippets in search results, missed local SEO opportunities
- **Fix:** Add comprehensive JSON-LD schemas

### 5. **Missing Location Landing Pages**
- ❌ No pages for target locations (Bratislava, Pezinok, Senec, Chorvátsky Grob)
- ❌ No service areas hub page
- **Impact:** Missing local SEO opportunities, no location-specific rankings
- **Fix:** Create location pages with unique content

### 6. **Metadata Issues**
- ⚠️ Basic metadata exists but lacks:
  - Title template for dynamic pages
  - Proper OpenGraph images
  - Twitter Card metadata
  - Alternate language links
- **Impact:** Poor social sharing, inconsistent titles
- **Fix:** Enhance metadata with templates and proper images

### 7. **Image Alt Text**
- ⚠️ Some images have generic English alt text
- ⚠️ Missing Slovak keywords in alt text
- **Impact:** Poor accessibility and missed SEO opportunities
- **Fix:** Update alt text with Slovak keywords naturally

### 8. **Missing Internal Linking**
- ⚠️ No links to location pages (they don't exist yet)
- ⚠️ Limited internal linking between services
- **Impact:** Poor site architecture, missed link equity distribution
- **Fix:** Add strategic internal links

### 9. **Heading Structure**
- ✅ Good H1 usage (one per page)
- ⚠️ Could improve H2/H3 hierarchy for better content organization
- **Impact:** Minor - structure is acceptable but could be optimized

### 10. **Performance Concerns**
- ⚠️ Images set to `unoptimized: true` in next.config.mjs
- ⚠️ Some images may not have proper sizes attributes
- **Impact:** Slower page loads, poor Core Web Vitals
- **Fix:** Enable image optimization, add proper sizes

---

## Medium Priority Issues

### 11. **Missing FAQ Schema**
- No FAQ sections with structured data
- **Fix:** Add FAQ sections to location pages with FAQPage schema

### 12. **No Blog/Content Section**
- Missing content marketing opportunities
- **Fix:** Create content plan (see content-plan.md)

### 13. **Language Alternates**
- Site has EN/SK but no hreflang tags
- **Fix:** Add alternate language links in metadata

---

## Low Priority / Future Enhancements

### 14. **Review Schema**
- Only add if real reviews exist in content
- **Status:** Defer until reviews are added

### 15. **Breadcrumbs**
- Could add breadcrumb schema for better navigation
- **Status:** Nice to have

---

## Priority Fix Order

1. ✅ **Critical:** Create sitemap.ts and robots.ts
2. ✅ **Critical:** Add canonical URLs
3. ✅ **Critical:** Implement structured data (LocalBusiness, Service)
4. ✅ **Critical:** Create location landing pages
5. ✅ **High:** Enhance metadata with templates
6. ✅ **High:** Update image alt text
7. ✅ **High:** Fix image optimization
8. ✅ **Medium:** Add internal linking
9. ✅ **Medium:** Add FAQ schemas
10. ✅ **Low:** Content plan for blog

---

## Domain Verification Needed

⚠️ **IMPORTANT:** Verify the correct production domain:
- Metadata references: `crystaldetailing.sk`
- Robots.txt references: `luxdetail.sk`
- **Action Required:** Confirm correct domain and update all references

---

## Testing Checklist

After implementation, verify:
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Canonical URLs present on all pages
- [ ] Structured data validates in Google Rich Results Test
- [ ] All location pages indexed
- [ ] Images have Slovak alt text
- [ ] No console errors
- [ ] Page speed improved

---

## Notes

- All fixes will maintain existing UI/UX
- Slovak language focus for all content
- Local SEO emphasis on Bratislava region
- Mobile-first approach maintained


