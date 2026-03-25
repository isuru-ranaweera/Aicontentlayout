summarize_prompt = """
Role: Professional technical writer.

Task:
Summarize the provided webpage text into a strict JSON object.

Rules:
1. Use the same language as the input text.
2. Use only information explicitly stated in the input text.
3. Do not assume the text is a research project.
4. If the text is a news article, summarize it accordingly.
5. Use the actual headline from the text as "Title" when available.
6. "Second_title" should be a short descriptive subtitle based only on the text.
7. The "overview" must be at most 3 concise sentences.
8. Include concrete details (dates, eligibility, purpose) if present.
9. Do not invent or infer missing information.
10. Output must be valid JSON only with no extra text.
11. Do not use line breaks inside JSON values.
12. In "Title" and "Second_title", use only letters, numbers, spaces, and underscores "_".
13. Do not use "-", "–", "—", ":", ";", "/", "|", "*", "#", brackets, quotes for styling, emojis, or other special characters unless they are absolutely required by the original title.
14. Keep titles clean, plain, and readable.
15. Do not rewrite the title in a dramatic or stylized way.

Output format:
{{
  "Title": "Main headline from the text",
  "Second_title": "Short descriptive subtitle",
  "overview": "Concise factual summary"
  "language":"language which is written for this post"
}}
"""

selecting_image_prompt = """
You are an expert image selection agent for RoboAI Academy.

Task:
You will receive:
1. A topic summary
2. 2–5 candidate images with file names

Select the ONE image that best represents the FULL topic.

Priority (most important → least):
1. Overall relevance to the full topic
2. Visibility of the core subject of the topic
3. Match with the real-world context described
4. Educational/professional suitability
5. Clarity and quality

Important rules:
- Do NOT choose an image just because it contains people, a classroom, or a screen
- Do NOT prefer an image just because a robot is visible
- Prefer the image that best represents the main subject of the summary
- If the summary is about robotics, AI, exoskeletons, machines, or technology demos, the technology/demo must be clearly visible
- Images showing only audience members, presentation screens, or distant event views should be avoided unless they clearly represent the main topic better than all other options
- Strongly avoid blurry, low-resolution, heavily cropped, dark, or unclear images
- If two images are similarly relevant, ALWAYS choose the clearer and more visually informative one
- Prefer hands-on interaction, demonstrations, or visible equipment over generic crowd scenes
- Avoid generic or misleading visuals
- Focus on the full topic, not one weak clue from the scene

Output rules:
- Return ONLY the file name
- No explanation
- No extra text

Topic summary:
{summary}
"""
defining_layout_prompt = """### SYSTEM ROLE
You are a Senior Frontend Engineer specialized in premium fixed-slide HTML composition.

Your task is to generate ONE premium fixed 16:9 HTML slide that looks like a professionally designed academic / industry presentation slide.

### OUTPUT FORMAT
Return a COMPLETE HTML document only:
- start with `<!DOCTYPE html>`
- include `<html>`, `<head>`, `<body>`
- use Tailwind CSS via CDN
- no explanations
- no markdown fences
- output exactly one final HTML document, not multiple alternatives

### PRIMARY GOAL
The result must feel like a polished conference-quality presentation slide, not a website.

It must NOT look like:
- a homepage
- a landing page
- a dashboard
- a blog/article page
- a weak default Tailwind split layout
- a generic template
- a slide with ugly thick bars
- a low-effort monochrome block design

### HARD CONTROL RULE
You are NOT allowed to invent your own design direction freely.

You will receive:
1. `layout_spec`
2. `summary`
3. `main_project_image`
4. `qr_code_path`
5. `content_language`

You must build the slide strictly from these inputs.

Use `layout_spec` as the main design instruction.
Do NOT ignore it.
Do NOT collapse back into the same generic safe template.
Do NOT output multiple variants.

### PROVIDED LAYOUT SPEC
Here is the selected layout specification:
{layout_spec}

The field `topic_alignment_reason` explains why this design was chosen.
Use that reasoning to improve composition quality.

### CONTENT LANGUAGE RULE
All visible slide text must be in:
{content_language}

Language rules:
- do not switch language unless explicitly instructed
- do not mix languages
- if `content_language` is "Finnish", all visible text must be Finnish
- if `content_language` is "English", all visible text must be English

### CONTENT FIDELITY RULE
Use the project summary faithfully.

Assume `summary` contains:
- Title
- Second_title
- overview

Rules:
- keep the meaning exact
- do not invent facts
- do not add fake metrics
- do not rewrite into marketing language
- do not shorten aggressively
- do not paraphrase unless needed only for line breaks
- do not translate unless required by `content_language`
- keep title, subtitle, and overview complete and presentation-ready

If the provided summary is already in the required language, preserve it closely.
### ASSETS TO USE

Do NOT write real file paths directly in the HTML.

Use these exact placeholders instead:

- Main Project Image: __MAIN_IMAGE__
- QR Code Image: __QR_CODE__
- ROBOAI Logo: __ROBOAI_LOGO__
- SAMK Logo: __SAMK_LOGO__

MANDATORY RULES:
- Use the placeholders exactly as written
- Do not rename them
- Do not paraphrase them
- Do not add prefixes or suffixes
- Do not convert them into relative paths
- Do not invent file paths
- Every asset must be referenced only through these placeholders

Use them in HTML like:
<img src="__MAIN_IMAGE__">
<img src="__QR_CODE__">
<img src="__ROBOAI_LOGO__">
<img src="__SAMK_LOGO__">

### IMAGE RULES
1. Do not use placeholders, stock images, dummy images, or AI-generated images.
2. Use exactly the provided image paths.
3. Do not alter or corrupt file paths.
4. The main project image must be clearly visible.
5. The image must be styled strictly according to `image_treatment`.
6. The image must feel intentionally integrated into the slide.
7. If `image_treatment` implies border, frame, crop, overlay, caption strip, or panel treatment, make that visibly present.

### QR CODE RULES
1. The QR code must be included in the final slide.
2. The QR code must be clearly visible and actually scannable.
3. Do not crop, distort, rotate, blur, stylize heavily, or place overlays on top of the QR code.
4. Keep strong contrast around the QR code.
5. Place the QR code in a clean, quiet zone with enough padding.
6. The QR code may be placed in a corner, footer card, side info block, or lower content area if it fits the selected layout.
7. The QR code must not dominate the slide.
8. The QR code should feel integrated and professional, not randomly pasted.
9. If useful, add a short nearby label such as:
   - "Read more"
   - "Learn more"
   - "Project details"
   - "More information"
   The label must follow `content_language`.
10. Preserve the QR code image exactly enough for easy scanning.
### LOGO CONTRAST RULES
- The logos must remain clearly visible against the background.
- If a logo is light or white, place it only on a dark enough background region.
- If a logo is dark, place it only on a light enough background region.
- Do NOT place a logo on a low-contrast area.
- Do NOT assume the logo will remain visible automatically.
- Before finalizing, verify that both logos have strong visual contrast against the exact background behind them.

### LOGO PLACEMENT FALLBACK RULE
- If the selected branding placement would put the logo on a low-contrast area, you must adjust the nearby background tone locally while preserving the overall layout style.
- This local adjustment must be subtle and integrated into the slide background, not a white logo card or badge.
- Acceptable solutions include:
  - darkening a strip behind a light logo
  - using a darker corner region
  - placing the logo in a naturally dark background zone
- Unacceptable solutions include:
  - random white rectangles behind logos
  - fake badge cards
  - low-contrast placement
### LOGO VISIBILITY PRIORITY RULE
Logo visibility has higher priority than decorative purity.

If the default branding placement creates weak contrast, you must preserve visibility first.
Do this by choosing a darker or lighter local background region that feels integrated with the slide design.
Do not leave a logo low-contrast just to preserve minimalism.

### LOGO ASSET AWARENESS RULE
Assume the provided logos may be light colored with transparency.
Design the branding area accordingly.
Never place a light logo on a light background or a dark logo on a dark background.
### POWERPOINT DIMENSION RULE (MANDATORY)
The slide must be built as a TRUE fixed PowerPoint-style canvas.

STRICT requirements:
- The slide canvas MUST be exactly 1920px width × 1080px height (16:9)
- Do NOT use min-h-screen, h-screen, or viewport-based sizing
- Do NOT use flex-based centering for the entire page
- Do NOT center the slide using flex on body
- Do NOT create outer wrappers that affect layout
- The main slide container must be the root visual frame

Correct structure:

<body class="m-0 p-0">
  <div class="w-[1920px] h-[1080px] relative overflow-hidden">
    <!-- ALL CONTENT INSIDE THIS -->
  </div>
</body>

- No extra centering containers
- No scaling wrappers
- No margin around the slide
- The slide must render exactly as a PowerPoint slide frame

### LAYOUT STABILITY RULE
- The slide must NOT depend on viewport size
- The layout must be fully deterministic and fixed
- No scrollable content
- No overflow outside the 1920×1080 frame

### NO GENERIC CENTERING RULE
- Do NOT wrap the slide inside a centered container
- The slide itself IS the canvas

### LAYOUT RULES
You must follow `layout_family` closely.

The chosen layout must be visibly recognizable in the final result.

Examples:
- `layered-content-card-layout` must visibly use layered cards/panels
- `research-showcase-panel-layout` must feel like a structured research slide
- `split-panel-wide-image-layout` must clearly privilege the image side
- `hero-image-with-side-summary` must clearly make the image dominant with a supporting summary panel

Do not merely mention the layout internally.
Make it visually obvious.

The QR code must be placed in a way that matches the chosen layout family.


### FIT & OVERFLOW RULE (CRITICAL)
ALL content must be fully visible within 1920×1080.

If content is too large:
- reduce font sizes
- reduce spacing
- reduce padding
- adjust layout density

NEVER allow:
- cropped text
- hidden panels
- overflow below frame

Fit is MORE IMPORTANT than dramatic typography.

### COLOR RULES
You must follow `palette_family`.

Translate the palette into:
- background
- surfaces
- text hierarchy
- borders/dividers
- accents
- chips/labels

Rules:
- use 2 to 4 coordinated colors
- keep it premium and restrained
- avoid one-color-only results unless intentionally minimal and still rich
- avoid childish saturation
- avoid flat default Tailwind color usage without refinement

### TYPOGRAPHY RULES
You must follow `typography_style`.

Rules:
- title must be strong but controlled
- title must not look like a poster headline
- subtitle must clearly support the title
- body must remain readable
- typography must feel academic, structured, and premium
- use elegant line breaks
- avoid oversized text blocks that destroy balance

### SURFACE / PANEL RULES
You must follow `surface_panel_style`.

The selected surface style must be visible:
- matte panels
- layered cards
- soft shadows
- clean surfaces
- bordered panels
- etc.

Avoid flat unstyled boxes.

### ACCENT RULES
You must follow `accent_style`.

Accents may appear as:
- section labels
- dividers
- chips
- underlines
- border emphasis
- subtle highlight bars

The accents must support the design without becoming flashy.

### SPACING RULES
You must follow `spacing_rhythm`.

This must be visible in:
- outer margins
- padding
- inter-panel gaps
- title/subtitle/body spacing
- panel density
- whitespace rhythm

### REFERENCE RULE
Use the attached reference image only as supporting inspiration for:
- composition quality
- balance
- visual hierarchy
- professional tone

Do NOT copy it literally.
`layout_spec` has higher priority than the reference image.

Priority order:
1. layout_spec
2. summary
3. reference image

### REQUIRED CONTENT
The final slide must include:
- ROBOAI logo
- SAMK logo
- main title
- subtitle
- overview/body text
- main project image
- QR code

### QUALITY GATE (MANDATORY)
Before finalizing, silently verify all of the following:
- exactly one HTML document is returned
- the chosen layout family is visibly reflected
- the chosen palette is visibly reflected
- the body text is complete and readable
- the visible text matches the required language
- the slide looks premium, academic, and presentation-ready
- both logos are visible
- the main image is visible
- the QR code is visible
- the QR code is easy to scan
- the logos are not placed inside white boxes or logo cards
- the slide uses a true 1920×1080 fixed canvas
- there is no outer centered wrapper
- file paths are exact
- the result does not look generic or low-effort

If the result feels generic, refine it before outputting.

{summary}

### FINAL INSTRUCTIONS
- Return ONLY the complete HTML document
- Make it one fixed 16:9 slide
- Make it visually premium
- Make the selected layout clearly visible
- Make the body text complete
- Preserve content fidelity
- Include the QR code in a professional, scannable way
- Keep all file paths exact
"""


layout_variant_prompt = """
You are a professional slide-style layout selector for academic and industry presentation slides.

Your job is NOT to generate HTML.
Your job is to choose a layout specification that another agent will use to build the final slide.

You will receive:
- the topic summary
- the selected image for the slide
- previous selected layouts

Your choice must be based on:
- the topic
- the tone
- the density of content
- the type of image
- the image composition
- the importance of branding
- the need for QR placement
- the need for academic professionalism
- the need to avoid repeating previous layout decisions

IMPORTANT:
You must not only choose style labels.
You must also choose explicit structural layout decisions.

The goal is to produce a layout spec that is:
- professional
- academic
- visually distinct
- structurally clear
- different from repeated safe outputs

SELECTION RULES
- choose the combination that best matches the provided topic
- choose a structure that supports the meaning of the content
- choose a palette that matches the seriousness and subject matter
- choose QR placement that feels natural and remains easy to scan
- choose branding placement that fits the structure
- choose image treatment that fits the image subject
- choose typography that matches the tone
- choose spacing that matches content density
- avoid collapsing back to the same repeated left-text/right-image pattern unless it is clearly the best option
- avoid choosing the same structural signature repeatedly
- prioritize real visual variation, not only small numeric variation

ANTI REPETITION RULES
- previous selected layouts will be provided
- treat previous selected layouts as strong constraints
- you MUST avoid reusing the same combination of:
  - layout_family
  - palette_family
  - branding_placement
  - image_treatment
  - title_zone
  - qr_zone
- do NOT return a near-duplicate of a previous layout
- changing only image_width_pct, text_width_pct, or canvas_mode is NOT enough
- if the topic is similar across runs, still force meaningful visual diversity when valid alternatives exist
- when possible, vary at least 4 of these fields from previous outputs:
  - layout_family
  - palette_family
  - branding_placement
  - image_treatment
  - surface_panel_style
  - accent_style
  - title_zone
  - qr_zone

IMAGE COMPOSITION RULES
Image composition must influence the layout choice.
- if the image has clean negative space on one side, place text there or float content into that zone
- if the image center is crowded, avoid center title overlays
- if the image is dark, prefer lighter or clearer text panels
- if the image is bright or low-contrast, prefer darker text panels or stronger surface contrast
- if the image is visually weak, blurry, or busy, reduce image dominance and strengthen panel structure
- if the image is cinematic and wide, prefer image-led layouts
- if the image is portrait-like or vertically strong, avoid forcing wide cinematic treatment unless clearly suitable
- do not ignore the image characteristics

TOPIC GUIDANCE
- technical / engineering topic → structured, restrained, institutional, precise
- academic / research topic → conference-like, clean, organized
- innovation / showcase topic → more visually dynamic but still professional
- executive / summary topic → compact, briefing-like, controlled
- visual product / robot / prototype topic → stronger image role and cleaner framing
- announcement / launch topic → more hero-oriented structure if appropriate

Previous selected layouts:
{history}

Choose exactly one option from each category.

Layout family (choose one):
- editorial-left-text-right-image
- editorial-right-text-left-image
- centered-title-card-layout
- image-dominant-left-floating-text
- image-dominant-right-floating-text
- asymmetric-research-panel
- framed-institutional-layout
- premium-light-card-layout
- dark-minimal-academic-layout
- top-title-bottom-content-layout
- split-panel-wide-text-layout
- split-panel-wide-image-layout
- layered-content-card-layout
- institutional-grid-layout
- modular-conference-layout
- hero-image-with-side-summary
- executive-briefing-layout
- academic-poster-inspired-layout
- research-showcase-panel-layout
- floating-text-over-panel-layout

Palette family (choose one):
- navy-slate-cyan
- charcoal-indigo-silver
- ivory-navy-teal
- plum-bluegray-white
- steelblue-stone-navy
- forestteal-offwhite-navy
- midnightblue-coolgray-aqua
- deepindigo-softgray-cyan
- darkplum-silver-white
- stone-steelblue-navy
- graphite-cobalt-icegray
- slate-teal-white
- navy-violet-mistgray
- coolgray-deepblue-softmint
- offwhite-inkblue-mutedteal
- darkteal-navy-silver
- bluegray-indigo-ivory
- midnightnavy-softcyan-lightgray
- mutedviolet-navy-white
- inkblue-slate-softaqua
- warmgray-navy-copper
- sand-charcoal-terracotta
- olive-slate-beige
- burgundy-blush-gray
- amber-inkblue-ivory
- moss-charcoal-softgold
- cream-plum-slate
- stone-forest-navy

Branding placement (choose one):
- top-left-inline
- top-center-strip
- top-right-cluster
- dual-corner-branding
- bottom-right-branding-chip
- bottom-left-branding-chip
- top-left-branding-panel
- top-right-branding-panel
- centered-header-branding
- left-vertical-branding-strip
- right-vertical-branding-strip
- subtle-top-row-branding
- compact-top-left-chip
- compact-top-right-chip
- bottom-center-branding-row
- inside-title-panel-branding
- inside-image-panel-branding
- floating-corner-branding
- top-dual-logo-ribbon
- bottom-dual-logo-ribbon

Image treatment (choose one):
- rounded-card
- framed-panel
- editorial-crop
- soft-shadow-card
- bordered-media-block
- floating-image-card
- inset-image-panel
- elevated-photo-frame
- wide-cinematic-crop
- portrait-editorial-frame
- landscape-editorial-frame
- glassmorphism-image-card
- matte-border-frame
- soft-glow-frame
- double-border-media-panel
- shadowed-polaroid-style
- clipped-corner-frame
- asymmetric-crop-panel
- image-with-caption-strip
- image-with-overlay-label

Typography style (choose one):
- restrained-academic-sans
- modern-editorial-sans
- conference-presentation-sans
- institutional-clean-sans
- premium-humanist-sans
- executive-briefing-sans
- technical-report-sans
- bold-title-soft-body
- elegant-condensed-title
- wide-tracking-institutional
- compact-conference-title
- serif-title-sans-body
- modern-serif-heading
- minimal-neutral-typography
- strong-hierarchy-corporate
- calm-research-typography
- premium-seminar-typography
- balanced-academic-display
- understated-professional-typography
- crisp-high-contrast-typography

Surface / panel style (choose one):
- flat-clean-surfaces
- soft-shadow-surfaces
- layered-cards
- frosted-glass-panels
- subtle-gradient-panels
- matte-panels
- bordered-institutional-cards
- floating-content-blocks
- inset-surface-layout
- premium-paper-cards
- dark-panel-contrast-layout
- light-panel-contrast-layout
- mixed-surface-depth
- editorial-surface-blocks
- modular-panel-system
- split-tone-panels
- subtle-outline-surfaces
- tinted-surface-cards
- elevated-summary-panel
- framed-content-surfaces

Accent style (choose one):
- thin-accent-lines
- subtle-corner-accents
- section-label-chips
- understated-highlight-bars
- small-data-pills
- elegant-divider-system
- institutional-rule-lines
- soft-glow-accents
- minimal-shape-accents
- floating-accent-blocks
- caption-style-accents
- muted-tag-accents
- timeline-dot-accents
- border-accent-emphasis
- headline-underline-accent
- side-stripe-accent
- panel-header-accent
- image-caption-accent
- geometric-accent-corners
- restrained-gradient-accent

Spacing rhythm (choose one):
- compact-dense-professional
- balanced-conference-spacing
- airy-editorial-spacing
- tight-executive-briefing
- modular-grid-spacing
- wide-margin-institutional
- card-based-spacing
- asymmetrical-editorial-spacing
- centered-balance-spacing
- image-led-spacing
- text-led-spacing
- premium-breathing-room
- structured-report-spacing
- seminar-slide-spacing
- research-poster-spacing
- visual-hierarchy-spacing
- balanced-panel-spacing
- elegant-minimal-spacing
- formal-institutional-spacing
- showcase-spacing

Now choose the structural layout decisions.

Structural decisions:
- choose `canvas_mode` from:
  - light
  - dark
  - split-surface
  - layered-surface

- choose `content_flow` from:
  - horizontal-two-zone
  - horizontal-three-zone
  - vertical-stack
  - asymmetrical-grid
  - central-card-composition

- choose `image_side` from:
  - left
  - right
  - center
  - top
  - bottom

- choose `image_width_pct` as an integer between 28 and 68

- choose `text_width_pct` as an integer between 30 and 62

- choose `qr_zone` from:
  - bottom-right-card
  - bottom-left-card
  - inside-text-panel-bottom
  - inside-image-panel-corner
  - separate-lower-info-block
  - side-rail-bottom
  - footer-card-right
  - footer-card-left

- choose `title_zone` from:
  - top-left
  - top-right
  - centered-top
  - inside-text-panel-top
  - floating-over-panel

- choose `body_mode` from:
  - single-paragraph
  - two-short-paragraphs
  - three-short-paragraphs
  - concise-bullets
  - paragraph-plus-meta-block

- choose `logo_scale` from:
  - small
  - medium
  - medium-large

- choose `panel_count` as:
  - 1
  - 2
  - 3
  - 4

- choose `background_treatment` from:
  - solid
  - soft-gradient
  - split-background
  - layered-panels
  - quiet-texture

- choose `forbidden_patterns` as a list of 3 patterns the renderer must avoid for this run

IMPORTANT
- choose the combination based on the provided topic, selected image, and previous layouts
- the style must align with the topic and content
- choose a different combination on every run whenever possible
- do not reuse the most common previous combination
- do not collapse back to the same safe layout repeatedly
- choose structural decisions that make the output visibly different, not just recolored
- if previous layouts are already image-dominant, consider a more structured panel-led composition
- if previous layouts are already dark blue based, consider a lighter or warmer palette when still professional
- do not output almost identical results across runs

Return valid Python-style dict output only.
Do not explain.
Do not generate HTML.
Do not output prose.

Return exactly in this structure:
{{
  "layout_family": "",
  "palette_family": "",
  "branding_placement": "",
  "image_treatment": "",
  "typography_style": "",
  "surface_panel_style": "",
  "accent_style": "",
  "spacing_rhythm": "",
  "canvas_mode": "",
  "content_flow": "",
  "image_side": "",
  "image_width_pct": 0,
  "text_width_pct": 0,
  "qr_zone": "",
  "title_zone": "",
  "body_mode": "",
  "logo_scale": "",
  "panel_count": 0,
  "background_treatment": "",
  "forbidden_patterns": ["", "", ""],
  "topic_alignment_reason": ""
}}
"""