GeeRods Brand Identity & Reusable Asset GuideThis document provides a comprehensive, ready-to-use branding system for GeeRods, a custom fishing rod building and repair specialist. It is designed for both web and print, with reusable assets and clear implementation guidance for designers and developers.1. Colour PaletteA disciplined five-colour system for consistent, recognizable branding.Name Hex Usage CSS Variable Moss Green #5E7C3A Primary, trust elements --color-moss-green Lure Yellow #C8E01E Accent, calls to action --color-lure-yellow Slate Grey #2B3539 Backgrounds, headers (60%) --color-slate-grey Stone #D9D9CC Cards, dividers (neutral) --color-stone Ink #20282B Body text, fine detail --color-ink CSS Implementation::root {
  --color-moss-green: #5E7C3A;
  --color-lure-yellow: #C8E01E;
  --color-slate-grey: #2B3539;
  --color-stone: #D9D9CC;
  --color-ink: #20282B;
}
2. Logo SuitePrimary Logo: Handcrafted script wordmark with a cast-line hook. Use for main branding.App Icon/Badge: Standalone "G" with hook mark. Use for favicon, app icons.Hook Mark: Use as watermark, bullet, or loading spinner.SVG Example for Hook Mark:<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 4 C18 10, 28 10, 16 28" stroke="#5E7C3A" stroke-width="3" fill="none"/>
  <circle cx="16" cy="28" r="2" fill="#C8E01E"/>
</svg>
3. Visual Language & MotifsGuide-Wrap Stripes: Thread-wrap bands in brand colours for section dividers, sidebars, footers.Casting Line: Sweeping diagonal for hero banners, conveying energy and motion.Lure Dot Grid: Chartreuse dots for background texture.CSS Example for Guide-Wrap Stripe:.section-divider {
  border-top: 4px solid var(--color-moss-green);
  border-bottom: 2px solid var(--color-lure-yellow);
  margin: 2rem 0;
}
4. TypographyUsage Font Example CSS/HTML Logo wordmark Brush Script MT GeeRods (logo only) SVG/PNG asset Headlines Arial Black Tight lines. (H1, 44pt) h1, h2 Body/UI Trebuchet MS Body text (14pt) body, nav Captions/Labels Trebuchet MS CAPTIONS (11pt, upper) .caption CSS Implementation:@import url('https://fonts.googleapis.com/css?family=Trebuchet+MS:400,700&display=swap');
body {
  font-family: 'Trebuchet MS', Arial, sans-serif;
  color: var(--color-ink);
  font-size: 14pt;
}
h1 {
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 44pt;
  font-weight: bold;
}
h2 {
  font-family: 'Arial Black', Arial, sans-serif;
  font-size: 24pt;
  font-weight: bold;
}
.caption {
  font-size: 11pt;
  text-transform: uppercase;
}
5. Website Components & LayoutsFront Page Carousel (HTML Structure)<div class="carousel">
  <div class="carousel-hero">
    <img src="/images/featured-rod.jpg" alt="7'6" Custom Bass Rod">
    <div class="carousel-caption">
      <h2>7'6" Custom Bass Rod</h2>
      <span class="caption">Featured Build</span>
    </div>
  </div>
  <div class="carousel-controls">
    <button class="prev">&#8249;</button>
    <button class="next">&#8250;</button>
    <div class="carousel-dots">
      <span class="dot active"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  <div class="carousel-thumbnails">
    <!-- Thumbnail images here -->
  </div>
</div>
Section Layouts (HTML Snippet)<section id="custom-builds">
  <h2>Custom Build Rods</h2>
  <p>Bespoke blanks, hand-wrapped guides and custom finishes — built to your exact spec.</p>
</section>
<section id="repairs">
  <h2>Repairs</h2>
  <p>Snapped tips, worn guides and refinishing, turned around fast and built to last.</p>
</section>
<section id="contact">
  <h2>Contact Us</h2>
  <p>Tell us about your next build or repair.<br>Email: <a href="mailto:hello@geerods.com">hello@geerods.com</a></p>
  <a class="cta" href="/quote">Get a Quote &rarr;</a>
</section>
6. Quick Reference TableAsset Usage Example Implementation Moss Green Primary, trust elements var(--color-moss-green) Lure Yellow Calls to action, accents var(--color-lure-yellow) Slate Grey Backgrounds, headers var(--color-slate-grey) Stone Cards, dividers var(--color-stone) Ink Body text, fine detail var(--color-ink) Brush Script MT Logo only SVG/PNG asset Arial Black Headlines h1, h2 Trebuchet MS Body, navigation body, nav Hook Mark SVG Icon, watermark, spinner Inline SVG This branding document provides all the reusable assets and code snippets needed for a consistent, professional GeeRods digital presence. All assets are ready for direct integration into your web or print projects.