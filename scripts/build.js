#!/usr/bin/env node
/**
 * Programmatic SEO Static Site Builder (build.js)
 * Zero external dependencies. Generates:
 * - /public/index.html (Directory + Interactive SaaS/AI ROI & Token Cost Calculator)
 * - /public/tools/<slug>.html (Detailed review, alternatives table & JSON-LD FAQ schema)
 * - /public/compare/<a-vs-b>.html (High-CPC head-to-head comparison pages)
 * - /public/privacy.html, /public/terms.html, /public/about.html, /public/contact.html (AdSense required pages)
 * - /public/sitemap.xml, /public/robots.txt, /public/ads.txt
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'tools.json');
const OUT_DIR = path.join(__dirname, '..', 'public');
const BASE_PATH = '/ai-toolsdirectiory';
const SITE_URL = process.env.SITE_URL || `https://rmdnkrts25-a11y.github.io${BASE_PATH}`;
const SITE_NAME = 'ToolPulse AI & SaaS Benchmark';

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderLayout({ title, description, canonicalPath, content, jsonLd }) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
  <style>
    :root {
      --bg: #0b0f19;
      --surface: #111827;
      --surface-2: #1f2937;
      --border: #2e3a4e;
      --text: #f3f4f6;
      --muted: #9ca3af;
      --primary: #38bdf8;
      --primary-dark: #0284c7;
      --accent: #34d399;
      --warn: #fbbf24;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.65;
    }
    a { color: var(--primary); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .container { max-width: 1140px; margin: 0 auto; padding: 0 1.25rem; }
    header {
      border-bottom: 1px solid var(--border);
      background: rgba(17, 24, 39, 0.88);
      backdrop-filter: blur(8px);
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .brand {
      font-weight: 800;
      font-size: 1.2rem;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .brand-badge {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #0b0f19;
      padding: 0.15rem 0.5rem;
      border-radius: 6px;
      font-size: 0.78rem;
      font-weight: 800;
    }
    .nav-links { display: flex; gap: 1.25rem; font-size: 0.95rem; }
    .nav-links a { color: var(--muted); }
    .nav-links a:hover { color: #fff; text-decoration: none; }
    .hero {
      padding: 3.5rem 0 2.5rem;
      border-bottom: 1px solid var(--border);
      background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.12), transparent 55%);
    }
    .hero h1 { font-size: clamp(1.85rem, 3.5vw, 2.75rem); line-height: 1.2; margin-bottom: 0.85rem; }
    .hero p { color: var(--muted); max-width: 760px; font-size: 1.08rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.25rem;
      margin: 2rem 0;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.35rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .card:hover { transform: translateY(-2px); border-color: var(--primary); }
    .badge-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
    .badge {
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      background: var(--surface-2);
      color: var(--primary);
      border: 1px solid var(--border);
      font-weight: 600;
    }
    .badge.green { color: var(--accent); }
    .badge.gold { color: var(--warn); }
    .price-tag { font-size: 1.15rem; font-weight: 700; color: #fff; }
    .btn {
      display: inline-block;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      text-align: center;
      background: var(--primary);
      color: #0b0f19;
      border: none;
      cursor: pointer;
    }
    .btn:hover { background: #7dd3fc; text-decoration: none; }
    .btn-outline {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-outline:hover { border-color: var(--primary); background: var(--surface-2); }
    .calc-box {
      background: linear-gradient(145deg, #111827, #172033);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1.75rem;
      margin: 2.25rem 0;
    }
    .calc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
      margin-top: 1.25rem;
    }
    .input-group label {
      display: block;
      font-size: 0.85rem;
      color: var(--muted);
      margin-bottom: 0.4rem;
    }
    .input-group input, .input-group select {
      width: 100%;
      padding: 0.65rem 0.8rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--bg);
      color: #fff;
      font-size: 0.95rem;
    }
    .calc-result {
      margin-top: 1.25rem;
      padding: 1.1rem;
      border-radius: 10px;
      background: rgba(52, 211, 153, 0.1);
      border: 1px solid rgba(52, 211, 153, 0.35);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      background: var(--surface);
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    th, td {
      padding: 0.9rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }
    th { background: var(--surface-2); color: #fff; font-weight: 700; }
    .ad-slot {
      margin: 2rem 0;
      padding: 1.25rem;
      border: 1px dashed var(--border);
      border-radius: 10px;
      text-align: center;
      color: var(--muted);
      font-size: 0.82rem;
      background: rgba(17, 24, 39, 0.5);
    }
    .prose h2 { margin: 1.8rem 0 0.75rem; font-size: 1.45rem; }
    .prose h3 { margin: 1.4rem 0 0.5rem; font-size: 1.15rem; }
    .prose p, .prose ul { margin-bottom: 1rem; color: #d1d5db; }
    .prose ul { padding-left: 1.4rem; }
    footer {
      margin-top: 4rem;
      padding: 2.5rem 0;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <header>
    <div class="container nav">
      <a href="${BASE_PATH}/index.html" class="brand">
        <span class="brand-badge">AI &amp; SaaS</span>
        <span>ToolPulse Benchmark</span>
      </a>
      <nav class="nav-links">
        <a href="${BASE_PATH}/index.html">Directory</a>
        <a href="${BASE_PATH}/index.html#calculator">ROI Calculator</a>
        <a href="${BASE_PATH}/index.html#comparisons">Comparisons</a>
        <a href="${BASE_PATH}/about.html">About</a>
        <a href="${BASE_PATH}/privacy.html">Privacy</a>
      </nav>
    </div>
  </header>
  <main class="container">
    ${content}
  </main>
  <footer>
    <div class="container" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
      <div>
        <strong>${SITE_NAME}</strong> — Independent Software &amp; AI Pricing Benchmarks.<br/>
        Updated automatically via verified public feeds.
      </div>
      <div style="display:flex;gap:1.2rem;">
        <a href="${BASE_PATH}/about.html">About Us</a>
        <a href="${BASE_PATH}/privacy.html">Privacy Policy</a>
        <a href="${BASE_PATH}/terms.html">Terms of Use</a>
        <a href="${BASE_PATH}/contact.html">Contact</a>
        <a href="${BASE_PATH}/sitemap.xml">Sitemap</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function generatePairs(tools) {
  const pairs = [];
  const seen = new Set();
  const addPair = (a, b) => {
    const idxA = tools.indexOf(a);
    const idxB = tools.indexOf(b);
    const [first, second] = idxA < idxB ? [a, b] : [b, a];
    const key = `${first.id}-vs-${second.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      pairs.push([first, second]);
    }
  };

  for (const tool of tools) {
    const alternatives = tools.filter((t) => t.id !== tool.id);
    const sameCategory = alternatives.filter((t) => t.category === tool.category);
    const topAlts = (sameCategory.length >= 2 ? sameCategory : alternatives).slice(0, 4);
    for (const alt of topAlts) {
      addPair(tool, alt);
    }
  }

  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      if (tools[i].category === tools[j].category || pairs.length < 24) {
        addPair(tools[i], tools[j]);
      }
    }
  }
  return pairs;
}

function buildSite() {
  const tools = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  ensureDir(OUT_DIR);
  ensureDir(path.join(OUT_DIR, 'tools'));
  ensureDir(path.join(OUT_DIR, 'compare'));

  const urls = ['/index.html', '/about.html', '/privacy.html', '/terms.html', '/contact.html'];
  const pairs = generatePairs(tools);

  // 1. Build Individual Tool Pages (/tools/<id>.html)
  for (const tool of tools) {
    const alternatives = tools.filter((t) => t.id !== tool.id);
    const sameCategory = alternatives.filter((t) => t.category === tool.category);
    const topAlts = (sameCategory.length >= 2 ? sameCategory : alternatives).slice(0, 4);

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How much does ${tool.name} cost per month?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${tool.name} uses a ${tool.pricingModel} pricing model starting at $${tool.startingPrice} per ${tool.billingCycle}. Free tier available: ${tool.freeTier ? 'Yes' : 'No'}.`
          }
        },
        {
          '@type': 'Question',
          name: `What are the best ${tool.name} alternatives in 2026?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `The top verified alternatives to ${tool.name} are ${topAlts.map((a) => a.name).join(', ')}.`
          }
        }
      ]
    };

    const pageHtml = renderLayout({
      title: `${tool.name} Review, Pricing & Top ${topAlts.length} Alternatives (2026)`,
      description: `Compare ${tool.name} pricing ($${tool.startingPrice}/${tool.billingCycle}), pros, cons, and the best verified alternatives including ${topAlts.map((a) => a.name).join(' and ')}.`,
      canonicalPath: `/tools/${tool.id}.html`,
      jsonLd: faqSchema,
      content: `
        <section class="hero">
          <div class="badge-row">
            <span class="badge">${escapeHtml(tool.category)}</span>
            <span class="badge green">${escapeHtml(tool.pricingModel)}</span>
            <span class="badge gold">★ ${tool.rating}/5.0 Rating</span>
            <span class="badge">Verified: ${escapeHtml(tool.updatedAt)}</span>
          </div>
          <h1>${escapeHtml(tool.name)}: Pricing, Benchmarks &amp; Best Alternatives</h1>
          <p>${escapeHtml(tool.tagline)}</p>
          <div style="margin-top:1.5rem;display:flex;gap:0.85rem;flex-wrap:wrap;">
            <a class="btn" href="${escapeHtml(tool.website)}" target="_blank" rel="noopener noreferrer">Visit Official Website →</a>
            <a class="btn btn-outline" href="#alternatives">Compare Alternatives</a>
          </div>
        </section>

        <div class="ad-slot">Advertisement / Sponsored Placement Ready (AdSense Responsive Unit)</div>

        <section class="prose">
          <h2>Executive Benchmark Summary</h2>
          <p><strong>${escapeHtml(tool.name)}</strong> is purpose-built for <em>${escapeHtml(tool.bestFor)}</em>. Its entry-level paid plan starts at <strong>$${tool.startingPrice}/${escapeHtml(tool.billingCycle)}</strong> and ${tool.freeTier ? 'includes a free tier for testing before upgrading' : 'requires a paid subscription'}.</p>

          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
            <div class="card">
              <h3 style="color:var(--accent);margin-top:0;">✔ Key Strengths (Pros)</h3>
              <ul>
                ${tool.pros.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}
              </ul>
            </div>
            <div class="card">
              <h3 style="color:var(--warn);margin-top:0;">⚠ Limitations (Cons)</h3>
              <ul>
                ${tool.cons.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
              </ul>
            </div>
          </div>

          <h2 id="alternatives">Best ${escapeHtml(tool.name)} Alternatives Compared</h2>
          <p>Below is a side-by-side specification and pricing comparison between ${escapeHtml(tool.name)} and its closest competitors:</p>
          <table>
            <thead>
              <tr>
                <th>Software</th>
                <th>Category</th>
                <th>Starting Price</th>
                <th>Free Tier</th>
                <th>API Access</th>
                <th>Head-to-Head</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${escapeHtml(tool.name)}</strong> (Current)</td>
                <td>${escapeHtml(tool.category)}</td>
                <td>$${tool.startingPrice}/${escapeHtml(tool.billingCycle)}</td>
                <td>${tool.freeTier ? 'Yes' : 'No'}</td>
                <td>${tool.apiAvailable ? 'Yes' : 'No'}</td>
                <td>—</td>
              </tr>
              ${topAlts
                .map((alt) => {
                  const pairSlug =
                    tools.indexOf(tool) < tools.indexOf(alt)
                      ? `${tool.id}-vs-${alt.id}`
                      : `${alt.id}-vs-${tool.id}`;
                  return `<tr>
                    <td><a href="${BASE_PATH}/tools/${alt.id}.html"><strong>${escapeHtml(alt.name)}</strong></a></td>
                    <td>${escapeHtml(alt.category)}</td>
                    <td>$${alt.startingPrice}/${escapeHtml(alt.billingCycle)}</td>
                    <td>${alt.freeTier ? 'Yes' : 'No'}</td>
                    <td>${alt.apiAvailable ? 'Yes' : 'No'}</td>
                    <td><a href="${BASE_PATH}/compare/${pairSlug}.html">Compare →</a></td>
                  </tr>`;
                })
                .join('')}
            </tbody>
          </table>
        </section>
      `
    });

    fs.writeFileSync(path.join(OUT_DIR, 'tools', `${tool.id}.html`), pageHtml, 'utf8');
    urls.push(`/tools/${tool.id}.html`);
  }

  // 2. Build Head-to-Head Comparison Pages (/compare/<a-vs-b>.html)
  for (const [a, b] of pairs) {
    const slug = `${a.id}-vs-${b.id}`;
    const cheaper = a.startingPrice <= b.startingPrice ? a : b;
    const higherRated = a.rating >= b.rating ? a : b;

    const compareHtml = renderLayout({
      title: `${a.name} vs ${b.name} (2026): Pricing, Features & Which is Better?`,
      description: `Side-by-side comparison of ${a.name} ($${a.startingPrice}/mo) vs ${b.name} ($${b.startingPrice}/mo). Compare features, API access, free tiers, and team seat costs.`,
      canonicalPath: `/compare/${slug}.html`,
      content: `
        <section class="hero">
          <div class="badge-row">
            <span class="badge">Head-to-Head Comparison</span>
            <span class="badge green">Updated ${escapeHtml(a.updatedAt)}</span>
          </div>
          <h1>${escapeHtml(a.name)} vs ${escapeHtml(b.name)}: Full 2026 Comparison</h1>
          <p>Trying to decide between <strong>${escapeHtml(a.name)}</strong> and <strong>${escapeHtml(b.name)}</strong>? Compare verified monthly seat pricing, feature sets, and real-world use cases below.</p>
        </section>

        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th><a href="${BASE_PATH}/tools/${a.id}.html">${escapeHtml(a.name)}</a></th>
              <th><a href="${BASE_PATH}/tools/${b.id}.html">${escapeHtml(b.name)}</a></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Category</strong></td>
              <td>${escapeHtml(a.category)}</td>
              <td>${escapeHtml(b.category)}</td>
            </tr>
            <tr>
              <td><strong>Starting Price</strong></td>
              <td>$${a.startingPrice} / ${escapeHtml(a.billingCycle)}</td>
              <td>$${b.startingPrice} / ${escapeHtml(b.billingCycle)}</td>
            </tr>
            <tr>
              <td><strong>10-Person Team Annual Cost</strong></td>
              <td>$${(a.startingPrice * 10 * 12).toFixed(0)} / year</td>
              <td>$${(b.startingPrice * 10 * 12).toFixed(0)} / year</td>
            </tr>
            <tr>
              <td><strong>Free Tier Available</strong></td>
              <td>${a.freeTier ? '✔ Yes' : '✖ No'}</td>
              <td>${b.freeTier ? '✔ Yes' : '✖ No'}</td>
            </tr>
            <tr>
              <td><strong>API Access</strong></td>
              <td>${a.apiAvailable ? '✔ Yes' : '✖ No'}</td>
              <td>${b.apiAvailable ? '✔ Yes' : '✖ No'}</td>
            </tr>
            <tr>
              <td><strong>Benchmark Rating</strong></td>
              <td>★ ${a.rating} / 5.0</td>
              <td>★ ${b.rating} / 5.0</td>
            </tr>
            <tr>
              <td><strong>Best For</strong></td>
              <td>${escapeHtml(a.bestFor)}</td>
              <td>${escapeHtml(b.bestFor)}</td>
            </tr>
          </tbody>
        </table>

        <div class="ad-slot">Advertisement / Sponsored Placement Ready (AdSense In-Article Unit)</div>

        <section class="prose">
          <h2>Verdict: Should You Choose ${escapeHtml(a.name)} or ${escapeHtml(b.name)}?</h2>
          <ul>
            <li><strong>Best Budget Option:</strong> <strong>${escapeHtml(cheaper.name)}</strong> starts at $${cheaper.startingPrice}/${escapeHtml(cheaper.billingCycle)}, making it the more cost-effective choice for solo builders and lean teams.</li>
            <li><strong>Highest User Satisfaction:</strong> <strong>${escapeHtml(higherRated.name)}</strong> leads in our current benchmark with a <strong>${higherRated.rating}/5.0</strong> score.</li>
            <li>Choose <strong><a href="${BASE_PATH}/tools/${a.id}.html">${escapeHtml(a.name)}</a></strong> if your priority is: <em>${escapeHtml(a.bestFor)}</em>.</li>
            <li>Choose <strong><a href="${BASE_PATH}/tools/${b.id}.html">${escapeHtml(b.name)}</a></strong> if your priority is: <em>${escapeHtml(b.bestFor)}</em>.</li>
          </ul>
        </section>
      `
    });

    fs.writeFileSync(path.join(OUT_DIR, 'compare', `${slug}.html`), compareHtml, 'utf8');
    urls.push(`/compare/${slug}.html`);
  }

  // 3. Build Homepage (/index.html) with Interactive Calculator + Search + Comparisons
  const indexHtml = renderLayout({
    title: `${SITE_NAME} — Compare AI Tools, Pricing & Team ROI Calculator`,
    description:
      'Compare verified AI software pricing, discover open-source alternatives, and calculate your annual team SaaS & AI savings.',
    canonicalPath: '/index.html',
    content: `
      <section class="hero">
        <div class="badge-row">
          <span class="badge green">Autonomous Daily Updates</span>
          <span class="badge">${tools.length} Verified Platforms</span>
          <span class="badge gold">${pairs.length}+ Side-by-Side Comparisons</span>
        </div>
        <h1>Find the Best AI &amp; SaaS Alternatives — Backed by Real Pricing Data</h1>
        <p>Compare subscription tiers, API availability, and open-source alternatives. Use our interactive calculator below to estimate your team's annual software spend and ROI.</p>
      </section>

      <section id="calculator" class="calc-box">
        <h2 style="margin-bottom:0.35rem;">Interactive Team AI &amp; SaaS ROI Calculator</h2>
        <p style="color:var(--muted);font-size:0.95rem;">Estimate your annual seat cost vs. productivity time saved across your team.</p>
        <div class="calc-grid">
          <div class="input-group">
            <label for="calc-tool">Select Software Tier</label>
            <select id="calc-tool">
              ${tools
                .map(
                  (t) =>
                    `<option value="${t.startingPrice}">${escapeHtml(t.name)} ($${t.startingPrice}/mo)</option>`
                )
                .join('')}
            </select>
          </div>
          <div class="input-group">
            <label for="calc-seats">Team Size (Seats)</label>
            <input id="calc-seats" type="number" min="1" max="500" value="5" />
          </div>
          <div class="input-group">
            <label for="calc-hours">Hours Saved per Person / Week</label>
            <input id="calc-hours" type="number" min="1" max="40" value="4" />
          </div>
          <div class="input-group">
            <label for="calc-rate">Avg. Hourly Value ($ USD)</label>
            <input id="calc-rate" type="number" min="5" max="500" value="35" />
          </div>
        </div>
        <div class="calc-result">
          <div>
            <div style="font-size:0.85rem;color:var(--muted);">Annual Subscription Cost</div>
            <div id="res-cost" style="font-size:1.4rem;font-weight:800;color:#fff;">$1,200 / yr</div>
          </div>
          <div>
            <div style="font-size:0.85rem;color:var(--muted);">Estimated Annual Productivity Value</div>
            <div id="res-value" style="font-size:1.4rem;font-weight:800;color:var(--accent);">$36,400 / yr</div>
          </div>
          <div>
            <div style="font-size:0.85rem;color:var(--muted);">Net Annual ROI</div>
            <div id="res-roi" style="font-size:1.4rem;font-weight:800;color:var(--primary);">+$35,200 (29x)</div>
          </div>
        </div>
      </section>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-top:2rem;">
        <h2>Verified Software &amp; AI Directory</h2>
        <input id="search-box" type="search" placeholder="Filter by name or category..." style="padding:0.6rem 1rem;border-radius:8px;border:1px solid var(--border);background:var(--surface);color:#fff;min-width:260px;" />
      </div>

      <div class="grid" id="tools-grid">
        ${tools
          .map(
            (t) => `
          <article class="card" data-search="${escapeHtml((t.name + ' ' + t.category + ' ' + t.tagline).toLowerCase())}">
            <div>
              <div class="badge-row">
                <span class="badge">${escapeHtml(t.category)}</span>
                <span class="badge green">${escapeHtml(t.pricingModel)}</span>
                <span class="badge gold">★ ${t.rating}</span>
              </div>
              <h3 style="font-size:1.25rem;margin-bottom:0.4rem;">
                <a href="${BASE_PATH}/tools/${t.id}.html" style="color:#fff;">${escapeHtml(t.name)}</a>
              </h3>
              <p style="color:var(--muted);font-size:0.93rem;margin-bottom:1rem;">${escapeHtml(t.tagline)}</p>
            </div>
            <div style="border-top:1px solid var(--border);padding-top:0.9rem;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span class="price-tag">${t.startingPrice === 0 ? 'Free' : '$' + t.startingPrice}</span>
                <span style="color:var(--muted);font-size:0.82rem;">/${escapeHtml(t.billingCycle)}</span>
              </div>
              <a class="btn btn-outline" href="${BASE_PATH}/tools/${t.id}.html">Review &amp; Alternatives →</a>
            </div>
          </article>`
          )
          .join('')}
      </div>

      <div class="ad-slot">Advertisement / Sponsored Placement Ready (AdSense Multiplex Unit)</div>

      <section id="comparisons" class="prose">
        <h2>Popular Head-to-Head Software Comparisons</h2>
        <p>Explore direct feature and pricing breakdowns for high-intent buyers:</p>
        <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));">
          ${pairs
            .map(
              ([a, b]) => `
            <a class="card" href="${BASE_PATH}/compare/${a.id}-vs-${b.id}.html" style="padding:1rem;color:#fff;">
              <strong>${escapeHtml(a.name)} vs ${escapeHtml(b.name)}</strong>
              <span style="color:var(--muted);font-size:0.85rem;margin-top:0.25rem;">$${a.startingPrice}/mo vs $${b.startingPrice}/mo →</span>
            </a>`
            )
            .join('')}
        </div>
      </section>

      <script>
        (function() {
          const toolEl = document.getElementById('calc-tool');
          const seatsEl = document.getElementById('calc-seats');
          const hoursEl = document.getElementById('calc-hours');
          const rateEl = document.getElementById('calc-rate');
          const resCost = document.getElementById('res-cost');
          const resValue = document.getElementById('res-value');
          const resRoi = document.getElementById('res-roi');

          function updateCalc() {
            const monthly = parseFloat(toolEl.value) || 0;
            const seats = Math.max(1, parseInt(seatsEl.value, 10) || 1);
            const hours = Math.max(0, parseFloat(hoursEl.value) || 0);
            const rate = Math.max(1, parseFloat(rateEl.value) || 1);

            const annualCost = monthly * seats * 12;
            const annualValue = seats * hours * 52 * rate;
            const net = annualValue - annualCost;
            const mult = annualCost > 0 ? (annualValue / annualCost).toFixed(1) + 'x' : '∞';

            resCost.textContent = '$' + annualCost.toLocaleString() + ' / yr';
            resValue.textContent = '$' + annualValue.toLocaleString() + ' / yr';
            resRoi.textContent = (net >= 0 ? '+$' : '-$') + Math.abs(net).toLocaleString() + ' (' + mult + ')';
          }

          [toolEl, seatsEl, hoursEl, rateEl].forEach(el => el.addEventListener('input', updateCalc));
          updateCalc();

          const searchBox = document.getElementById('search-box');
          const cards = Array.from(document.querySelectorAll('#tools-grid article'));
          searchBox.addEventListener('input', function() {
            const q = searchBox.value.toLowerCase().trim();
            cards.forEach(card => {
              const hay = card.getAttribute('data-search') || '';
              card.style.display = hay.includes(q) ? '' : 'none';
            });
          });
        })();
      </script>
    `
  });
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), indexHtml, 'utf8');

  // 4. Build Mandatory Google AdSense Compliance Pages
  fs.writeFileSync(
    path.join(OUT_DIR, 'about.html'),
    renderLayout({
      title: `About Us — ${SITE_NAME}`,
      description: 'Learn how ToolPulse benchmarks software pricing, API availability, and AI productivity ROI.',
      canonicalPath: '/about.html',
      content: `<section class="prose" style="padding:2.5rem 0;">
        <h1>About ${SITE_NAME}</h1>
        <p>${SITE_NAME} is an independent software intelligence directory that tracks pricing, context limits, API availability, and open-source alternatives across leading AI and SaaS platforms.</p>
        <h2>Our Methodology</h2>
        <p>Every tool listed in our catalog is evaluated across transparent criteria: entry-level monthly price, team scaling cost, free-tier availability, API support, and verified strengths and limitations.</p>
      </section>`
    }),
    'utf8'
  );

  fs.writeFileSync(
    path.join(OUT_DIR, 'privacy.html'),
    renderLayout({
      title: `Privacy Policy & AdSense Cookie Disclosure — ${SITE_NAME}`,
      description: 'Privacy policy, cookie policy, and Google AdSense DoubleClick DART cookie disclosure.',
      canonicalPath: '/privacy.html',
      content: `<section class="prose" style="padding:2.5rem 0;">
        <h1>Privacy Policy</h1>
        <p>Last updated: November 2026</p>
        <h2>Google AdSense &amp; DoubleClick DART Cookie</h2>
        <p>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</p>
        <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
        <h2>Log Files &amp; Analytics</h2>
        <p>We follow a standard procedure of using log files to analyze aggregate traffic trends and administer the site. No personally identifiable information is sold or shared with third parties.</p>
      </section>`
    }),
    'utf8'
  );

  fs.writeFileSync(
    path.join(OUT_DIR, 'terms.html'),
    renderLayout({
      title: `Terms of Use — ${SITE_NAME}`,
      description: 'Terms and conditions for using the ToolPulse software benchmark directory.',
      canonicalPath: '/terms.html',
      content: `<section class="prose" style="padding:2.5rem 0;">
        <h1>Terms of Use</h1>
        <p>All pricing and feature benchmarks provided on ${SITE_NAME} are for informational purposes. Software vendors may update subscription pricing at any time; always verify final billing terms on the vendor's official website.</p>
      </section>`
    }),
    'utf8'
  );

  fs.writeFileSync(
    path.join(OUT_DIR, 'contact.html'),
    renderLayout({
      title: `Contact Us — ${SITE_NAME}`,
      description: 'Get in touch with the ToolPulse editorial and benchmark team.',
      canonicalPath: '/contact.html',
      content: `<section class="prose" style="padding:2.5rem 0;">
        <h1>Contact Us</h1>
        <p>Have a software update, pricing correction, or partnership inquiry? Reach our editorial desk at <strong>editorial@toolpulse-directory.web.app</strong>.</p>
      </section>`
    }),
    'utf8'
  );

  // 5. Sitemap.xml, robots.txt, ads.txt
  const today = new Date().toISOString().slice(0, 10);
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>\n`;

  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(
    path.join(OUT_DIR, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    'utf8'
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'ads.txt'),
    `# Replace pub-0000000000000000 with your Google AdSense Publisher ID once approved\n# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\n`,
    'utf8'
  );

  console.log(`[Builder] Generated ${urls.length} SEO pages + sitemap.xml + AdSense compliance pages in /public.`);
}

buildSite();
