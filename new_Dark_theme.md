# ALDOTT.IN — CORPORATE DARK EDITORIAL REDESIGN SPEC
# Reference-led conversion based on the Dribbble “Corporate Website Design Concept”

> Site: aldott.in
> Stack: Next.js (App Router) + Tailwind CSS
> Goal: Rework the existing site into a dark, editorial corporate website inspired by the WindFlow reference
> Scope: Visual system, homepage composition, and key page treatment
> Do not change the factual content architecture or data model unless explicitly noted

---

## 0. DESIGN TARGET

This redesign should feel like a premium corporate wind-energy website with a strong hero, concise supporting content, and a clean footer. The reference emphasizes a left-aligned overview, accessible call-to-action, a news-style supporting section, and a structured footer with contact and collaboration details [page:1].  
Aldott should adopt that same feel, but keep its own engineering voice, services, proof, and technical trust signals [file:1].

---

## 1. WHAT TO MATCH

Match these qualities from the reference:
- Large hero area with strong editorial spacing.
- Left-aligned company narrative, not a centered slogan.
- Visible CTA early in the page.
- A supporting content section that feels like updates, news, or insights.
- Dark, premium surfaces with restrained contrast.
- A footer that feels substantial and useful, not decorative [page:1].

Do not copy the reference literally. Translate the structure into Aldott’s own factual, engineering-led language and service architecture [file:1].

---

## 2. WHAT TO AVOID

- Avoid a generic dark-mode inversion.
- Avoid white-card-on-black template styling.
- Avoid neon accents, heavy gradients, or glow effects.
- Avoid overly dense feature grids that fight the hero.
- Avoid turning the homepage into a flat list of cards [web:7][web:10][web:11].

The right direction is editorial corporate, not “darkened brochure.”

---

## 3. BRAND POSITIONING

Aldott is still an independent wind energy engineering consultancy with offices in Bremen and Bengaluru. The site must answer four questions fast: what Aldott does, who it serves, where it operates, and why it is credible [file:1].  
The redesign should increase perceived polish without weakening technical trust. The content must still feel precise, factual, and engineered [file:1].

---

## 4. VISUAL SYSTEM

### Base palette
Use a charcoal-first dark system with muted teal as the single accent.

```css
--color-page:        #07121F;
--color-surface:     #0C1726;
--color-surface-2:   #102033;
--color-elevated:    #132338;
--color-text:        #EAF0F6;
--color-text-muted:  #A9B4C2;
--color-text-soft:   #7F8A99;
--color-border:      #223149;
--color-accent:      #4FA9B8;
--color-accent-soft: rgba(79,169,184,0.14);
--color-navy-strong: #0B1F3A;
```

### Visual rules
- Use dark surfaces, not pure black.
- Use off-white text, not pure white everywhere.
- Keep borders subtle.
- Keep the accent quiet and selective.
- Keep spacing generous to create the editorial feel [web:7][web:10][web:11].

---

## 5. PAGE STRUCTURE

### Homepage order
Rework the homepage into this sequence:

1. Global header.
2. Hero.
3. Trust / proof strip.
4. Core services.
5. News or insights strip.
6. Why Aldott.
7. Engagement process.
8. Selected projects.
9. Contact CTA.
10. Footer.

This structure is intentionally closer to the reference because it gives the page a stronger narrative flow and more visual authority [page:1].

---

## 6. HERO DIRECTION

The hero should be the most important visual block on the page.

### Layout
- Full-width dark hero.
- Left side: headline, short intro, CTAs.
- Right side: a large image, panel, or visual composition.
- Use strong vertical breathing room and large typography.
- Keep the copy left-aligned.

### Copy shape
- One concise eyebrow.
- One clear headline.
- One short supporting paragraph.
- One primary CTA.
- One secondary CTA.

### Visual treatment
- Use a dark overlay on the image.
- Keep the image integrated with the background.
- Add the motif only subtly.
- Do not make the hero busy.

### Direction
The hero should feel like a corporate overview, not a marketing landing page [page:1][file:1].

---

## 7. TRUST STRIP

The proof strip should remain, but it needs more editorial restraint.

### Rules
- Keep the existing metrics and wording.
- Place them inside a dark surface band.
- Use larger spacing and thinner dividers.
- Make the metric numbers the dominant element.
- Keep labels muted.

### Purpose
This section should visually confirm credibility without looking like a stats dashboard [file:1].

---

## 8. CORE SERVICES

The three homepage service cards should remain, but they need to feel more compact and premium.

### Card treatment
- Dark surface cards.
- Thin borders.
- Clear hierarchy.
- Tight copy blocks.
- Small line icons, no colored icon circles.

### Content
- Keep the existing three homepage service cards.
- Keep standards tags.
- Keep the stretched-link behavior.
- Reduce visual clutter.

### Goal
The cards should read like a curated set of capabilities, not a generic feature grid [file:1].

---

## 9. NEWS STRIP

This is the biggest structural adaptation from the reference.

### Purpose
Add a slim content section that feels like:
- News.
- Insights.
- Updates.
- Industry notes.

### If no real news exists
Use one of these approaches:
- A “Latest insights” band with 2 to 3 editorial cards.
- A “From Aldott” band with recent project or knowledge entries.
- A “What’s new” band with factual operational updates.

### Card style
- Small, text-led cards.
- Date or category.
- One title.
- One short summary.
- One link.

### Rule
Do not invent fake news. If the data is not available, the section should be a restrained insights band using available factual content only [file:1].

---

## 10. WHY ALDOTT

This section should keep the technical proof points but feel lighter and more editorial than the current build.

### Layout
- Two-column layout.
- Left: proof points.
- Right: image or visual panel.
- Preserve strong spacing.

### Tone
- Independent expertise.
- European presence with global reach.
- End-to-end capability.

### Visual
- Keep icons minimal.
- Keep copy direct.
- Avoid overstyled cards.

This section should feel trustworthy and calm, not promotional [file:1].

---

## 11. PROCESS SECTION

Keep the 5-step engagement process, but simplify its presentation.

### Rules
- Use a clean horizontal desktop layout.
- Use a stacked timeline on mobile.
- Keep numerals as the main visual cue.
- Use thin lines and subtle dividers.
- Keep the descriptions factual and short.

### Goal
The process should feel like a structured corporate methodology, which aligns well with the reference’s organized, explanatory tone [page:1][file:1].

---

## 12. SELECTED PROJECTS

Keep the project cards, but make them more editorial.

### Rules
- Use dark cards.
- Prioritize title, category, and outcome.
- Reduce the prominence of metadata.
- Let one strong visual or text block lead each card.

### Copy
- Keep only factual project content.
- Do not invent client names.
- Keep the three-homepage-card limit.

---

## 13. CTA BAND

The CTA band should be the final strong push before the footer.

### Treatment
- Dark navy or charcoal background.
- Large heading.
- Short subtext.
- Single clear CTA.

### Goal
The CTA should feel like an invitation to collaborate, not a sales banner [page:1][file:1].

---

## 14. FOOTER

The footer should be larger and more informative, matching the reference’s “important collaboration and contact information” role [page:1].

### Footer layout
- Brand block.
- Services block.
- Company block.
- Contact block.

### Footer tone
- Strong structural dark background.
- Muted supporting text.
- Clear links.
- No clutter.

### Purpose
The footer should feel like a useful destination, not a closing strip [page:1].

---

## 15. HEADER

The header should become more refined and less like a standard white corporate nav.

### Rules
- Dark elevated background.
- Clear logo contrast.
- Subtle border.
- Compact CTA.
- Keep the same links.

### Behavior
- Sticky.
- Slight shadow or blur on scroll.
- High clarity on all breakpoints.

---

## 16. TYPOGRAPHY

Keep Inter and the current scale, but push the site toward a more editorial rhythm.

### Heading style
- Large, left-aligned headings.
- Fewer line breaks.
- More whitespace around headings.
- Strong contrast on dark surfaces.

### Body style
- Slightly muted off-white.
- Comfortable line height.
- Short paragraphs.

### Rule
Hierarchy should feel designed, not assembled [file:1].

---

## 17. MOTIF SYSTEM

Preserve the wind-engineering motif, but reduce its prominence.

### Rules
- Keep 1px line work.
- Keep it subtle.
- Use it mostly in the hero, CTA band, and perhaps one supporting section.
- Do not let it fight the content.

The motif should act as quiet technical texture, not a decorative pattern [file:1].

---

## 18. MOTION

Keep motion minimal.

### Allowed
- Gentle hover lifts.
- Soft reveal on scroll.
- Small nav shadow change.
- Smooth button feedback.

### Forbidden
- Parallax.
- Floating shapes.
- Animated backgrounds.
- Heavy transitions.
- Anything that makes the page feel like a motion demo [web:7][web:10].

---

## 19. IMPLEMENTATION PRIORITY

1. Rebuild the homepage hero.
2. Convert the app shell and global theme tokens.
3. Restyle service cards, proof strip, and CTA band.
4. Add the news or insights strip.
5. Rework footer and header.
6. Tune motif opacity and image overlays.
7. Audit spacing and contrast across breakpoints.

---

## 20. ACCEPTANCE CRITERIA

The redesign is correct when:
- The page feels like a premium corporate wind website.
- The hero is the dominant first impression.
- The content flow feels editorial and structured.
- The site still feels like Aldott, not the reference.
- The dark theme is restrained, not theatrical.
- The footer feels useful and substantial.
- The design remains clear on desktop and mobile.

---

## 21. FINAL RULE

Use the Dribbble concept as a structural and mood reference, not a style clone. The right result is a dark editorial corporate site with Aldott’s technical specificity, not a generic dark template and not a copy of the reference [page:1][file:1].