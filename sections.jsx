/* sections.jsx — page sections for readability-ts homepage */

const { useState: useState_s, useEffect: useEffect_s, useRef: useRef_s } = React;

/* ─── Nav ───────────────────────────────────────────────────────── */
function Nav({ dark, onToggleTheme, sections, active }) {
  return (
    <div className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label="readability-ts home">
          <span className="brand-mark">r</span>
          <span>readability-ts</span>
          <span style={{ color: "var(--muted)", fontWeight: 400 }}>v0.8.0</span>
        </a>
        <nav className="nav-links" aria-label="In-page sections">
          {sections.map(s => (
            <a key={s.id} href={"#" + s.id} className={active === s.id ? "active" : ""}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme" title="Toggle theme (T)">
            {dark ? "☼" : "☾"}
          </button>
          <a className="btn btn-ink" href="https://github.com/alexneri/readability-folder-ts" target="_blank" rel="noreferrer">
            <span style={{ fontFamily: "var(--mono)" }}>★</span> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero / App info ───────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="kicker">
              <span className="num">01</span> A CLI by Alexander Neri · v0.8.0
            </span>
            <h1 style={{ marginTop: 18 }}>
              Score the <span className="hl">readability</span> of every<br/>
              Markdown and AsciiDoc file <span className="em">in a folder</span><span className="scribble-line" />
            </h1>
            <p className="lede">
              A zero-config CLI that walks a documentation folder, runs the
              Flesch–Kincaid test on every <code className="mono">.md</code> and{" "}
              <code className="mono">.adoc</code> file, and tells you exactly how
              hard your docs are to read — with sentence, word, syllable, and
              acronym breakdowns to back it up.
            </p>

            <div className="install">
              <CopyBlock text="npm install @alexneri/readability-ts -g" />
            </div>

            <div className="cta-row" style={{ marginTop: 18 }}>
              <a className="btn" href="#use">Read the docs →</a>
              <a className="btn" href="https://github.com/alexneri/readability-folder-ts" target="_blank" rel="noreferrer">View on GitHub</a>
            </div>

            <div className="badge-row">
              <span className="badge"><span>npm</span><span>v0.8.0</span></span>
              <span className="badge"><span>license</span><span>GPL-3.0</span></span>
              <span className="badge"><span>node</span><span>≥ 18</span></span>
              <span className="badge"><span>type</span><span>CLI</span></span>
              <span className="badge"><span>lang</span><span>TypeScript</span></span>
            </div>
          </div>

          <div>
            <Terminal />
          </div>
        </div>

        {/* Score chip + features */}
        <div style={{ marginTop: 96 }}>
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 56, alignItems: "center" }} className="hero-after">
            <div className="hero-chip-wrap">
              <ScoreChip score={72.4} size={200} />
              <span className="annot-call" style={{ top: 8, right: -8 }}>
                <span className="l" /> sample chip — Plain English
              </span>
            </div>
            <div>
              <span className="kicker"><span className="num">↓</span> What you get</span>
              <h3 style={{ marginTop: 12, marginBottom: 18, fontFamily: "var(--serif)", fontSize: 28, fontWeight: 500 }}>
                One command. A full report on every prose file you ship.
              </h3>
              <div className="feature-grid">
                {[
                  { ord: "i.", t: "Recursive", b: "Walks nested folders. Whatever depth your docs live at, it finds them." },
                  { ord: "ii.", t: "Multi-format", b: ".md and .adoc out of the box. Markup is stripped so the score reflects prose, not syntax." },
                  { ord: "iii.", t: "Beyond a single number", b: "Sentence, word, average-word-length, syllables, code-block presence, and acronym count." },
                ].map((f, i) => (
                  <div className="feature" key={i}>
                    <span className="feature-glyph">{["§", "¶", "✦"][i]}</span>
                    <span className="ord">{f.ord}</span>
                    <h3>{f.t}</h3>
                    <p>{f.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .hero-after { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Updates feed ──────────────────────────────────────────────── */
const UPDATES = [
  {
    date: "2024-11-25", tag: "v0.8.0", major: true,
    title: "Markdown support + richer metrics",
    body: "Added .md file support and extended the report with sentence count, word count, average word length, average syllables, code-block presence, and acronym count — both in scores.txt and the per-file header comment.",
  },
  {
    date: "2024-11-21", tag: "docs",
    title: "Documentation refresh",
    body: "Clearer install and usage flow in the README. Examples for both first-run and repeated runs.",
  },
  {
    date: "2024-11-20", tag: "v0.1.0", major: true,
    title: "Published to npm",
    body: "Installable globally as readability-ts; converted from a script into a proper CLI command with positional path argument.",
  },
  {
    date: "2024-11-20", tag: "init",
    title: "Initial working release",
    body: "Recursive scan of .adoc files with Flesch–Kincaid scoring and scores.txt output.",
  },
];

function UpdatesSection() {
  return (
    <section id="updates">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <span className="kicker"><span className="num">02</span> Changelog</span>
            <p className="desc">Recent releases and what shipped. Sourced from <code className="mono">git log</code>, not marketing.</p>
          </div>
          <h2>The project is alive. <span className="hl-green">Here's what shipped.</span></h2>
        </div>

        <div className="two-col">
          <div className="timeline" role="list">
            {UPDATES.map((u, i) => (
              <article key={i} className={"t-item" + (u.major ? " major" : "")} role="listitem">
                <div className="t-meta">
                  <span>{u.date}</span>
                  <span className={"t-tag" + (u.major ? " major" : "")}>{u.tag}</span>
                </div>
                <h3 className="t-title">{u.title}</h3>
                <p className="t-body">{u.body}</p>
              </article>
            ))}
          </div>

          <aside>
            <div style={{ padding: 24, border: "1px solid var(--rule)", borderRadius: 14, background: "color-mix(in oklab, var(--paper-2) 60%, transparent)" }}>
              <span className="kicker" style={{ marginBottom: 12, display: "inline-flex" }}>
                <span className="num">→</span> What's next
              </span>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 22, margin: "8px 0 14px" }}>The roadmap</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Tests",            "More unit and integration coverage."],
                  ["Documentation",    "Examples, edge cases, recipes."],
                  ["File formats",     ".rst, .txt, .html, and source-code comment extraction."],
                  ["Languages",        "Beyond English. Syllable detection is the hard part."],
                  ["Readability tests","Dale-Chall, SMOG, Gunning-Fog as opt-in alternatives."],
                ].map(([t, b], i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 10, alignItems: "baseline", paddingBottom: 10, borderBottom: i === 4 ? "0" : "1px dashed var(--rule)" }}>
                    <span className="mono" style={{ fontSize: 12, color: "var(--ink)", fontWeight: 600 }}>{t}</span>
                    <span style={{ fontSize: 13.5, color: "var(--muted)" }}>{b}</span>
                  </li>
                ))}
              </ul>
              <a href="https://github.com/alexneri/readability-folder-ts/issues" target="_blank" rel="noreferrer"
                 className="btn" style={{ marginTop: 18, width: "100%", justifyContent: "center" }}>
                Request a feature →
              </a>
            </div>

            <div style={{ marginTop: 16, fontSize: 12.5, color: "var(--muted)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-2)" }} />
              <span>OSS under GPL-3.0 — fork it, file issues, send a PR.</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ──────────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <span className="kicker"><span className="num">03</span> How it works</span>
            <p className="desc">The pipeline, end to end. Read once, explain it to a teammate.</p>
          </div>
          <h2>Four steps from a folder of prose to a numbered <span className="hl">readability score</span>.</h2>
        </div>

        <div className="steps">
          {[
            { t: "Scan",      b: "Walks the folder you point it at, recursively. Collects every .adoc and .md file." },
            { t: "Clean",     b: "Strips headings (==), rule lines (----), fenced code, and attribute lists [...] so the score reflects prose, not syntax." },
            { t: "Score",     b: "Applies Flesch–Kincaid, clamps to 0–100, and tallies sentences, words, syllables, code blocks, and acronyms." },
            { t: "Annotate",  b: "Prepends a comment block to each file with the score and stats. Writes a combined scores.txt at the root." },
          ].map((s, i, arr) => (
            <div className="step" key={i}>
              <span className="order">{i + 1}</span>
              <h4>{s.t}</h4>
              <p>{s.b}</p>
              {i < arr.length - 1 && <span className="arrow">→</span>}
            </div>
          ))}
        </div>

        {/* Formula card */}
        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="formula-row">
          <div style={{ padding: 24, border: "1px solid var(--rule)", borderRadius: 14, background: "color-mix(in oklab, var(--paper-2) 60%, transparent)" }}>
            <span className="kicker"><span className="num">f(x)</span> The formula</span>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, margin: "12px 0 18px" }}>Flesch–Kincaid Reading Ease</h3>
            <div style={{ background: "var(--paper)", border: "1px solid var(--rule)", borderRadius: 10, padding: "18px 20px", fontFamily: "var(--mono)", fontSize: 14, lineHeight: 1.7, overflow: "hidden" }}>
              <div style={{ color: "var(--muted)", fontSize: 11.5, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>score =</div>
              <div style={{ color: "var(--ink)" }}>206.835</div>
              <div style={{ color: "var(--ink-2)" }}>− 1.015 × (words ÷ sentences)</div>
              <div style={{ color: "var(--ink-2)" }}>− 84.6 × (syllables ÷ words)</div>
            </div>
            <div className="note">Clamped to <b>0–100</b>. Higher means easier to read.</div>
          </div>

          <div style={{ padding: 24, border: "1px solid var(--rule)", borderRadius: 14, background: "color-mix(in oklab, var(--paper-2) 60%, transparent)" }}>
            <span className="kicker"><span className="num">─</span> What gets stripped</span>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, margin: "12px 0 18px" }}>Markup, not meaning</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--mono)", fontSize: 13 }}>
              {[
                ["==", "AsciiDoc headings"],
                ["----", "AsciiDoc rule lines"],
                ["```...```", "Fenced code blocks"],
                ["[...]", "Attribute lists"],
                ["# / ##", "Markdown headings"],
                ["![](…)", "Image / link syntax"],
              ].map(([m, l], i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 12, alignItems: "baseline", padding: "6px 0", borderBottom: i === 5 ? "0" : "1px dashed var(--rule)" }}>
                  <span style={{ color: "var(--muted-2)", textDecoration: "line-through" }}>{m}</span>
                  <span style={{ color: "var(--ink-2)", fontFamily: "var(--sans)", fontSize: 13.5 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rating legend */}
        <div style={{ marginTop: 56 }}>
          <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 26, marginBottom: 6 }}>The rating scale</h3>
          <p style={{ color: "var(--muted)", marginBottom: 20, maxWidth: "60ch" }}>
            Hover or focus a band to see where your prose lands. Each band carries
            both a label and a US grade level, so the meaning never relies on colour alone.
          </p>
          <RatingLegend />
          <p className="note">
            Further reading — the original <a href="https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests" target="_blank" rel="noreferrer">Flesch–Kincaid Wikipedia article</a> and Rudolf Flesch's 1948 <i>A new readability yardstick</i>.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .formula-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── How to use ────────────────────────────────────────────────── */
function HowToUse() {
  const [tab, setTab] = useState_s("npm");
  return (
    <section id="use">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <span className="kicker"><span className="num">04</span> Get started</span>
            <p className="desc">Two install paths, one command to run, two things to expect back.</p>
          </div>
          <h2>From <span className="hl-green">zero to your first score</span> in under a minute.</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 14 }}>
          <Tabs
            active={tab}
            onChange={setTab}
            tabs={[
              { id: "npm",    label: "npm — recommended" },
              { id: "source", label: "From source" },
            ]}
          />
          <span className="mono" style={{ fontSize: 11.5, color: "var(--muted)", letterSpacing: ".04em" }}>
            requires node ≥ 18
          </span>
        </div>

        <div style={{ marginBottom: 32 }}>
          {tab === "npm" && <CopyBlock text="npm install @alexneri/readability-ts -g" />}
          {tab === "source" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <CopyBlock text="git clone git@github.com:alexneri/readability-folder-ts.git" />
              <CopyBlock text="cd readability-folder-ts" />
              <CopyBlock text="npm install" />
              <CopyBlock text="npm link" />
            </div>
          )}
        </div>

        <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 24, marginBottom: 12 }}>Run it</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
          <CopyBlock text="readability-ts /path/to/folder" />
          <CopyBlock text="readability-ts                  # scan the current folder" />
        </div>

        <div className="two-col">
          <div>
            <span className="kicker"><span className="num">↳</span> What you'll see</span>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, margin: "10px 0 14px" }}>In your terminal</h3>
            <Terminal title="~/docs · zsh" />
          </div>
          <div>
            <span className="kicker"><span className="num">↳</span> What gets written</span>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, margin: "10px 0 14px" }}>Annotation at the top of each file</h3>
            <FileCard path="docs/getting-started.md" ext="MD" />
          </div>
        </div>

        {/* Troubleshooting */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 24, marginBottom: 14 }}>Troubleshooting</h3>
          <div className="faq-list">
            <details className="faq">
              <summary>"No <code className="mono">.adoc</code> or <code className="mono">.md</code> files found."</summary>
              <p>The CLI didn't find anything to score at the path you gave it. Confirm you're pointing at the right folder, and that your docs are not nested inside an ignored directory. <code className="mono">readability-ts .</code> from the docs folder is the safest sanity check.</p>
            </details>
            <details className="faq">
              <summary>Permissions error on write</summary>
              <p>The tool prepends a comment to each scored file, so it needs <b>write access</b> to the folder you scan. Run it from a directory you own, or chmod the docs tree.</p>
            </details>
            <details className="faq">
              <summary>"Command not found: readability-ts"</summary>
              <p>If you installed via <code className="mono">npm i -g</code>, make sure your npm global <code className="mono">bin</code> directory is on <code className="mono">PATH</code>. Check it with <code className="mono">npm bin -g</code>. If you installed from source, you need to run <code className="mono">npm link</code> from inside the repo.</p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── BEYOND BRIEF: Famous docs, illustrative ───────────────────── */
const FAMOUS = [
  { name: "Plain-language gov sites",   score: 78.4 },
  { name: "A typical README",           score: 64.2 },
  { name: "Open-source tool docs",      score: 56.1 },
  { name: "Mainstream news article",    score: 62.8 },
  { name: "RFC / Internet draft",       score: 38.4 },
  { name: "Academic abstract",          score: 22.7 },
];
function FamousDocs() {
  return (
    <section id="benchmarks">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <span className="kicker"><span className="num">05</span> Benchmarks</span>
            <p className="desc">Illustrative scores by genre — to calibrate your own.</p>
          </div>
          <h2>Where does your prose <span className="hl">land on the scale</span>?</h2>
        </div>

        <p className="prose" style={{ color: "var(--muted)", marginBottom: 28 }}>
          To give the numbers texture, here is roughly where common writing genres tend
          to score. These are <b>indicative ranges</b>, not measurements of any specific
          publication. Run the CLI against your own docs to get the real picture.
        </p>

        <div className="docs-grid">
          {FAMOUS.map((d, i) => {
            const r = ratingFor(d.score);
            return (
              <div className="doc-card" key={i}>
                <MiniScoreChip score={d.score} />
                <div>
                  <h4>{d.name}</h4>
                  <div className="rating">{r.label} · {r.grade}</div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="note">Illustrative — based on widely-reported ranges for these genres. Your mileage will vary by author, audience, and era.</p>

        {/* Histogram */}
        <div style={{ marginTop: 64 }}>
          <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 26, marginBottom: 6 }}>What a single run looks like</h3>
          <p style={{ color: "var(--muted)", marginBottom: 18, maxWidth: "60ch" }}>
            A sample distribution from scanning a 47-file documentation set. The CLI
            doesn't draw this — but it gives you all the numbers to make your own.
          </p>
          <div style={{ padding: 24, border: "1px solid var(--rule)", borderRadius: 14, background: "color-mix(in oklab, var(--paper-2) 60%, transparent)" }}>
            <Histogram buckets={[
              { label: "0–29",   count: 1,  color: "#B9384A" },
              { label: "30–49",  count: 4,  color: "#E5784B" },
              { label: "50–59",  count: 9,  color: "#FFB347" },
              { label: "60–69",  count: 18, color: "#FFE45C" },
              { label: "70–79",  count: 11, color: "#C5E07A" },
              { label: "80–89",  count: 3,  color: "#7BC97A" },
              { label: "90–100", count: 1,  color: "#4F8E51" },
            ]} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24, paddingTop: 24, borderTop: "1px dashed var(--rule)" }}>
              {[
                ["files scanned", "47"],
                ["avg score",     "68.2"],
                ["easiest file",  "82.1"],
                ["hardest file",  "41.3"],
              ].map(([l, v], i) => (
                <div key={i}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── BEYOND BRIEF: Wire it into CI ─────────────────────────────── */
function CISection() {
  return (
    <section id="ci">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <span className="kicker"><span className="num">06</span> Automate</span>
            <p className="desc">Score every PR. Catch regressions before they ship.</p>
          </div>
          <h2>Run it in CI. <span className="hl-green">Make readability a check, not an afterthought.</span></h2>
        </div>

        <div className="ci-wrap">
          <div>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, marginBottom: 12 }}>GitHub Actions</h3>
            <div className="copy-block" style={{ alignItems: "flex-start" }}>
              <span className="prompt" style={{ paddingTop: 14 }}>‣</span>
              <code style={{ whiteSpace: "pre", padding: "14px 4px", lineHeight: 1.7 }}>
{`# .github/workflows/readability.yml
name: Readability
on: [pull_request]
jobs:
  score:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm i -g @alexneri/readability-ts
      - run: readability-ts ./docs
      - uses: actions/upload-artifact@v4
        with:
          name: scores
          path: docs/scores.txt`}
              </code>
            </div>
            <p className="note">
              Pair with a tiny shell guard to fail the build if the average drops below your target.
            </p>
          </div>

          <div>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 22, marginBottom: 12 }}>Pre-commit hook</h3>
            <div className="copy-block" style={{ alignItems: "flex-start" }}>
              <span className="prompt" style={{ paddingTop: 14 }}>$</span>
              <code style={{ whiteSpace: "pre", padding: "14px 4px", lineHeight: 1.7 }}>
{`# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Score docs that changed in this commit
git diff --cached --name-only --diff-filter=ACM \\
  | grep -E '\\.(md|adoc)$' \\
  | xargs -I{} readability-ts {}`}
              </code>
            </div>
            <p className="note">
              Annotates only the files you're committing. Keeps the rest of the tree untouched.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── BEYOND BRIEF: vs. alternatives ────────────────────────────── */
function VsSection() {
  return (
    <section id="vs">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <span className="kicker"><span className="num">07</span> Compare</span>
            <p className="desc">Different tools, different jobs. Here's where each shines.</p>
          </div>
          <h2>Already using <span className="mono" style={{ fontSize: ".85em" }}>vale</span> or <span className="mono" style={{ fontSize: ".85em" }}>alex</span>? <span className="hl">Use this alongside them.</span></h2>
        </div>

        <p className="prose" style={{ color: "var(--muted)", marginBottom: 24 }}>
          Prose linters check <i>rules</i> — banned words, passive voice, inconsistent terms.
          Readability scoring gives you a single number for <i>density</i>, file by file.
          They complement each other; this isn't a replacement.
        </p>

        <ComparisonTable />
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────── */
const FAQS = [
  { q: "Why Flesch–Kincaid?",
    a: "It's old, well-studied, and good enough for the job. The 1948 formula is simple, deterministic, and language-aware in a useful way: more syllables and longer sentences make text harder. v0.8 ships with FK alone; the roadmap adds SMOG, Dale-Chall, and Gunning-Fog as opt-ins." },
  { q: "Does it modify my files?",
    a: "Yes — it prepends a comment block with the score and stats to the top of each scanned file. That's the whole point: the score travels with the doc. If you don't want that, run it against a copy of the folder or revert after." },
  { q: "Will it ever support .rst, .txt, or .html?",
    a: "It's on the roadmap. The hard part isn't reading the files; it's stripping the right things so the score reflects prose, not syntax. Open an issue if you have a specific format in mind." },
  { q: "Is the score localised?",
    a: "Not yet. Flesch–Kincaid is calibrated against English, and syllable detection is English-only. A multi-language pipeline (and language-specific formulae) is on the roadmap." },
  { q: "How do I uninstall?",
    a: "npm uninstall -g @alexneri/readability-ts — or unlink it if you installed from source. The annotations stay in your files unless you remove them yourself." },
  { q: "Can I just get the numbers without the file annotations?",
    a: "Not in v0.8. The scores.txt summary is always written; the per-file comment is always prepended. A --report-only flag is a good candidate for the next minor — file an issue." },
];

function FAQSection() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <span className="kicker"><span className="num">08</span> FAQ</span>
            <p className="desc">The questions that come up most.</p>
          </div>
          <h2>Frequently asked.</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <details className="faq" key={i} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sponsor + Footer ──────────────────────────────────────────── */
function Sponsor() {
  return (
    <section style={{ padding: "0 0 96px" }} aria-label="Sponsor">
      <div className="wrap">
        <div className="sponsor">
          <span className="heart">♡</span>
          <div>
            <h3>If this saved you an afternoon, throw a coffee.</h3>
            <p>readability-ts is built and maintained by one person, under GPL-3.0.</p>
          </div>
          <a className="btn" href="https://github.com/sponsors/alexneri" target="_blank" rel="noreferrer">
            Sponsor on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="brand" style={{ marginBottom: 12, color: "var(--ink)" }}>
              <span className="brand-mark">r</span>
              <span>readability-ts</span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13.5, maxWidth: "44ch" }}>
              Score the readability of every Markdown and AsciiDoc file in a
              folder. A small, focused, open-source CLI by Alexander Neri.
            </p>
          </div>
          <div>
            <h5>Project</h5>
            <ul>
              <li><a href="https://github.com/alexneri/readability-folder-ts" target="_blank" rel="noreferrer">Repository</a></li>
              <li><a href="https://github.com/alexneri/readability-folder-ts/issues" target="_blank" rel="noreferrer">Issues</a></li>
              <li><a href="https://www.npmjs.com/package/@alexneri/readability-ts" target="_blank" rel="noreferrer">npm package</a></li>
              <li><a href="https://github.com/sponsors/alexneri" target="_blank" rel="noreferrer">Sponsor</a></li>
            </ul>
          </div>
          <div>
            <h5>On this page</h5>
            <ul>
              <li><a href="#top">App info</a></li>
              <li><a href="#updates">Changelog</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#use">How to use</a></li>
              <li><a href="#vs">Compare</a></li>
            </ul>
          </div>
          <div>
            <h5>Further reading</h5>
            <ul>
              <li><a href="https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests" target="_blank" rel="noreferrer">Flesch–Kincaid (Wikipedia)</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Readability" target="_blank" rel="noreferrer">Readability (overview)</a></li>
              <li><a href="https://plainlanguage.gov/" target="_blank" rel="noreferrer">plainlanguage.gov</a></li>
            </ul>
          </div>
        </div>
        <div className="colofon">
          <span>© 2024 Alexander Neri · GPL-3.0-or-later</span>
          <span className="mono">readability-ts v0.8.0 · made for folders of prose</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, UpdatesSection, HowItWorks, HowToUse,
  FamousDocs, CISection, VsSection, FAQSection, Sponsor, Footer,
});
