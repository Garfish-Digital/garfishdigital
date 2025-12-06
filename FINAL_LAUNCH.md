 🔒 SSL/HTTPS Considerations

  After DNS propagates:
  1. Force HTTPS (Netlify dashboard → Domain settings → HTTPS)
    - Enable "Force HTTPS" redirect
    - Ensure "Automatic TLS certificates" is ON
  2. HSTS (Optional but recommended for security)
    - Netlify dashboard → Build & deploy → Post processing
    - Enable "HSTS" headers

  ---
  🧪 Post-Launch Testing Checklist

  Immediately after DNS switch (within 1 hour):

  1. Test all pages load:
    - https://garfishdigital.com
    - https://www.garfishdigital.com (should redirect to non-www)
    - /gallery
    - /contact
    - /client
  2. Test contact form:
    - Submit test message
    - Check Netlify Forms dashboard
    - Verify email arrives
  3. Test client portal:
    - Login with test credentials
    - Check payment page (Stripe keys work)
    - Verify document links load
  4. Social media meta validation:
    - Facebook Debugger: https://developers.facebook.com/tools/debug/
    - Twitter Card Validator: https://cards-dev.twitter.com/validator
    - IMPORTANT: You'll need to "Scrape Again" to clear old cached meta
  5. Test Stripe payments (if live):
    - Use Stripe test mode
    - Complete test transaction
    - Verify webhook receives events (if configured)

  ---
  🚀 Deployment Strategy Recommendation

  Timing:
  1. Make code changes (update URLs in layout.jsx)
  2. Deploy to Netlify (still on .netlify.app subdomain)
  3. Test thoroughly on .netlify.app
  4. Then switch DNS
  5. Re-test on new domain
  6. Clear social media caches

  ---
  Summary of Action Items:

  Before DNS switch:
  - Update layout.jsx URLs from garfishdigital.netlify.app → garfishdigital.com
  - Add public/_redirects file (optional but recommended)
  - Decide what to do about client3 missing documents
  - Deploy and test on .netlify.app

  After DNS switch:
  - Force HTTPS in Netlify
  - Test all pages and forms
  - Clear social media meta caches
  - Verify SSL certificate issued
  - Test Stripe integration

  Everything else in your guide looks perfect. The only critical item is updating those hardcoded URLs.


How to Test OG Image:

  1. Social Media Debugger Tools (Best Method):

  Facebook/Meta:
  - URL: https://developers.facebook.com/tools/debug/
  - Paste: https://garfishdigital.netlify.app
  - Click "Scrape Again" to refresh cache
  - Shows preview exactly as Facebook sees it

  Twitter/X:
  - URL: https://cards-dev.twitter.com/validator
  - Paste your URL
  - Shows card preview

  LinkedIn:
  - URL: https://www.linkedin.com/post-inspector/
  - Paste your URL

  2. Open Graph Preview Tool:

  - URL: https://www.opengraph.xyz/
  - Enter: https://garfishdigital.netlify.app
  - Shows all OG tags and image preview

  3. Local Testing:

  curl -I http://localhost:3000/og-image.jpg
  Should return 200 OK and Content-Type: image/jpeg

  4. Browser DevTools:

  - Open your deployed site
  - View page source (Cmd+U)
  - Search for og:image
  - Click the URL to verify image loads


  After deploying, verify:
  1. Image is publicly accessible: Visit https://garfishdigital.netlify.app/og-image.jpg directly