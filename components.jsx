/* components.jsx — reusable building blocks for the readability-ts homepage
   Exposes: ScoreChip, MiniScoreChip, CopyBlock, Terminal, FileCard,
            Badge, Tabs, RatingLegend, Histogram, ComparisonTable
*/

const { useState, useEffect, useRef, useMemo } = React;

/* ─── Rating bands ──────────────────────────────────────────────── */
const RATINGS = [
  { min: 90, max: 100, label: "Very easy",          grade: "6th grade",          sw: "#4F8E51", sentence: "Easily understood by an average 11-year-old." },
  { min: 80, max: 89,  label: "Fairly easy",        grade: "7th grade",          sw: "#7BC97A", sentence: "Conversational English for consumers." },
  { min: 70, max: 79,  label: "Plain English",      grade: "8–9th grade",        sw: "#C5E07A", sentence: "Easily understood by 13- to 15-year-old students." },
  { min: 60, max: 69,  label: "Fairly difficult",   grade: "10–12th grade",      sw: "#FFE45C", sentence: "Plain English with some effort. Where most popular writing sits." },
  { min: 50, max: 59,  label: "Difficult",          grade: "College",            sw: "#FFB347", sentence: "Fairly difficult. College reading level." },
  { min: 30, max: 49,  label: "Very difficult",     grade: "College graduate",   sw: "#E5784B", sentence: "Best understood by university graduates." },
  { min: 0,  max: 29,  label: "Extremely difficult",grade: "Professional",       sw: "#B9384A", sentence: "Best understood by professionals in the field." },
];
function ratingFor(score) {
  return RATINGS.find(r => score >= r.min && score <= r.max) || RATINGS[RATINGS.length - 1];
}

/* ─── Reduced motion ────────────────────────────────────────────── */
function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const h = (e) => setR(e.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);
  return r;
}

/* ─── Count-up animation ────────────────────────────────────────── */
function useCountUp(target, duration = 1400, startDelay = 200) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) { setVal(target); return; }
    let raf, t0;
    const tm = setTimeout(() => {
      const step = (t) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, startDelay);
    return () => { clearTimeout(tm); if (raf) cancelAnimationFrame(raf); };
  }, [target, duration, startDelay, reduce]);
  return val;
}

/* ─── ScoreChip ─────────────────────────────────────────────────── */
function ScoreChip({ score = 72.4, size = 168, animate = true, showLabel = true, showTicks = true }) {
  const live = animate ? useCountUp(score) : score;
  const display = Math.max(0, Math.min(100, live));
  const r = ratingFor(score);
  const C = 2 * Math.PI * 70;            // radius 70 in viewBox 200
  const offset = C * (1 - display / 100);
  return (
    <div className="score-chip" style={{ "--size": size + "px" }}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle className="ring-bg" cx="100" cy="100" r="70" strokeWidth="6" />
        {showTicks && Array.from({ length: 20 }).map((_, i) => {
          const a = (i / 20) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 84, y1 = 100 + Math.sin(a) * 84;
          const x2 = 100 + Math.cos(a) * 88, y2 = 100 + Math.sin(a) * 88;
          return <line key={i} className="ring-tick" x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.2" />;
        })}
        <circle className="ring-fg" cx="100" cy="100" r="70" strokeWidth="6"
                strokeDasharray={C} strokeDashoffset={offset} />
      </svg>
      <div className="num">{display.toFixed(1)}</div>
      {showLabel && (
        <div className="label" style={{ color: "var(--ink-2)" }}>
          <span style={{
            display: "inline-block", width: 8, height: 8, borderRadius: "50%",
            background: r.sw, marginRight: 6, verticalAlign: "middle"
          }} />
          {r.label.toUpperCase()}
        </div>
      )}
    </div>
  );
}

/* ─── MiniScoreChip (for grids) ─────────────────────────────────── */
function MiniScoreChip({ score, size = 64 }) {
  const r = ratingFor(score);
  const C = 2 * Math.PI * 70;
  const offset = C * (1 - score / 100);
  return (
    <div className="mini-chip" style={{ "--size": size + "px" }}>
      <svg viewBox="0 0 200 200" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx="100" cy="100" r="70" fill="none" strokeWidth="14" stroke="var(--rule)" />
        <circle cx="100" cy="100" r="70" fill="none" strokeWidth="14" stroke={r.sw}
                strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={offset} />
      </svg>
      <span className="num">{score.toFixed(1)}</span>
    </div>
  );
}

/* ─── Copy block ────────────────────────────────────────────────── */
function CopyBlock({ text, prompt = "$", multiline = false, label }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      // fallback: select
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch (e2) {}
      document.body.removeChild(ta);
    }
  };
  return (
    <div className="copy-block">
      <span className="prompt">{prompt}</span>
      <code style={multiline ? { whiteSpace: "pre" } : undefined}>{text}</code>
      <button type="button" className={"copy-btn" + (copied ? " copied" : "")} onClick={onCopy} aria-label={label || "Copy"}>
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}

/* ─── Terminal (mock CLI output, animated progress) ─────────────── */
function ProgressBar({ percent, width = 42 }) {
  const filled = Math.round((percent / 100) * width);
  return (
    <span className="bar">
      <span className="fill">{"█".repeat(filled)}</span>
      <span className="empty">{"░".repeat(width - filled)}</span>
    </span>
  );
}

function Terminal({ title = "~/docs", autoplay = true }) {
  const reduce = useReducedMotion();
  const [percent, setPercent] = useState(reduce ? 100 : 0);
  const [phase, setPhase] = useState(reduce ? "done" : "scanning"); // scanning -> done
  const [filesDone, setFilesDone] = useState(reduce ? 47 : 0);
  const total = 47;

  useEffect(() => {
    if (reduce || !autoplay) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const elapsed = t - start;
      const p = Math.min(100, (elapsed / 4200) * 100);
      setPercent(p);
      setFilesDone(Math.floor((p / 100) * total));
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("done");
        setFilesDone(total);
      }
    };
    const delay = setTimeout(() => { raf = requestAnimationFrame(tick); }, 600);
    return () => { clearTimeout(delay); if (raf) cancelAnimationFrame(raf); };
  }, [reduce, autoplay]);

  // Reset loop every ~9s
  useEffect(() => {
    if (reduce || !autoplay) return;
    if (phase !== "done") return;
    const t = setTimeout(() => {
      setPercent(0); setFilesDone(0); setPhase("scanning");
    }, 4200);
    return () => clearTimeout(t);
  }, [phase, reduce, autoplay]);

  return (
    <div className="term" role="img" aria-label="Mock terminal showing readability-ts running">
      <div className="term-bar">
        <span className="term-dots"><i /><i /><i /></span>
        <span className="term-title">{title} — readability-ts</span>
      </div>
      <div className="term-body">
        <div className="term-line"><span className="dim">$</span> readability-ts ./docs</div>
        <div className="term-line"><span className="dim">→</span> scanning <span className="acc">.md</span> and <span className="acc">.adoc</span> recursively…</div>
        <div style={{ height: 8 }} />
        <div className="term-line">
          Progress: [<ProgressBar percent={percent} />] <span className="num">{Math.round(percent)}%</span>
        </div>
        <div className="term-line dim" style={{ fontSize: 12, marginTop: 4 }}>
          {phase === "scanning"
            ? <>processed <span className="num">{filesDone}</span> / {total} · <span className="file">{filesDone < total ? mockFile(filesDone) : "—"}</span></>
            : <>processed <span className="num">{total}</span> / {total} · done.</>}
        </div>
        <div style={{ height: 14 }} />
        {phase === "done" && (
          <React.Fragment>
            <div className="term-line"><span className="ok">✓</span> Readability scores computed! Total files: <span className="num">{total}</span> in <span className="num">1.83</span>s.</div>
            <div className="term-line"><span className="ok">✓</span> Summary saved to <span className="file">scores.txt</span>.</div>
            <div style={{ height: 6 }} />
            <div className="term-line dim">avg score <span className="num">68.2</span> · easiest <span className="num">82.1</span> · hardest <span className="num">41.3</span></div>
            <div className="term-line"><span className="dim">$</span><span className="cursor" /></div>
          </React.Fragment>
        )}
        {phase === "scanning" && (
          <div className="term-line"><span className="dim">$</span><span className="cursor" /></div>
        )}
      </div>
    </div>
  );
}
function mockFile(i) {
  const files = [
    "intro.md", "getting-started.adoc", "install/macos.md",
    "install/linux.md", "guide/concepts.md", "guide/cli.adoc",
    "reference/api.md", "reference/config.adoc", "reference/errors.md",
    "cookbook/auth.md", "cookbook/deploy.adoc", "faq.md",
    "changelog.md", "contributing.md", "security.adoc",
  ];
  return files[i % files.length];
}

/* ─── FileCard ──────────────────────────────────────────────────── */
function FileCard({ path = "docs/getting-started.md", ext = "MD" }) {
  return (
    <div className="file-card">
      <div className="file-bar">
        <span className="ext">{ext}</span>
        <span className="path">{path}</span>
        <span style={{ marginLeft: "auto", color: "var(--muted-2)" }}>annotated</span>
      </div>
      <div className="file-body">
        <span className="annot">{`// Readability score: 72.41
// 8th & 9th grade — Plain English. Easily understood by 13- to 15-year-old students.
// File length: 142, Sentence count: 38, Word count: 612,
// Average word length: 4.81, Average syllables per word: 1.52,
// Code present: Yes, Acronyms: 7`}</span>
        <div className="markdown">
          <div><span className="h"># Getting started</span></div>
          <div style={{ height: "0.9em" }} />
          <div>Install the CLI with npm and point it at any folder of Markdown or</div>
          <div>AsciiDoc. Run once. Read the report. Ship better docs.</div>
          <div style={{ height: "0.9em" }} />
          <div><span className="h">## Install</span></div>
          <div style={{ height: "0.4em" }} />
          <div style={{ color: "var(--muted)" }}>```bash</div>
          <div>npm install @alexneri/readability-ts -g</div>
          <div style={{ color: "var(--muted)" }}>```</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Tabs ──────────────────────────────────────────────────────── */
function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map(t => (
        <button key={t.id} role="tab" aria-selected={active === t.id}
                className={"tab" + (active === t.id ? " active" : "")}
                onClick={() => onChange(t.id)}>{t.label}</button>
      ))}
    </div>
  );
}

/* ─── Rating legend (gradient bar + hover detail) ───────────────── */
function RatingLegend() {
  const [hover, setHover] = useState(3); // default to "Fairly difficult" — most prose
  const r = RATINGS[hover];
  return (
    <div className="legend">
      <div className="legend-bar" role="list">
        {RATINGS.map((row, i) => (
          <div key={i} className={"b" + (i + 1)}
               role="listitem"
               onMouseEnter={() => setHover(i)}
               onFocus={() => setHover(i)}
               tabIndex={0}
               aria-label={`${row.min}–${row.max}: ${row.label}`}>
            <span style={{ opacity: hover === i ? 1 : .7 }}>{row.min}{row.max !== 100 ? `–${row.max}` : "+"}</span>
          </div>
        ))}
      </div>
      <div className="legend-labels">
        {RATINGS.map((row, i) => (
          <div key={i}>
            <b>{row.min}–{row.max}</b>
            <span>{row.label}</span>
          </div>
        ))}
      </div>
      <div className="legend-detail" aria-live="polite">
        <span className="sw" style={{ background: r.sw }} />
        <span>
          <b style={{ color: "var(--ink)" }}>{r.label}</b>
          <span style={{ color: "var(--muted)" }}> · {r.grade}.</span>
          {" "}{r.sentence}
        </span>
      </div>
    </div>
  );
}

/* ─── Histogram (sample run distribution) ───────────────────────── */
function Histogram({ buckets }) {
  const max = Math.max(...buckets.map(b => b.count));
  return (
    <div>
      <div className="histo" role="img" aria-label="Distribution of readability scores across a sample 47-file documentation project">
        {buckets.map((b, i) => (
          <div className="col" key={i} title={`${b.count} files`}>
            <div className="bar-track">
              <div className="bar-fill"
                   style={{ height: `${(b.count / max) * 100}%`, background: b.color }} />
            </div>
            <div className="col-meta">
              <b>{b.count}</b>
              <span>{b.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Comparison table ──────────────────────────────────────────── */
function ComparisonTable() {
  const rows = [
    { feat: "Folder-wide, recursive",        a: "✓", b: "○", c: "○", d: "✗" },
    { feat: "Markdown + AsciiDoc",           a: "✓", b: "○", c: "✓", d: "✓" },
    { feat: "Numeric readability score",     a: "✓", b: "✗", c: "✗", d: "✓" },
    { feat: "Writes report back to files",   a: "✓", b: "✗", c: "✗", d: "✗" },
    { feat: "Zero configuration",            a: "✓", b: "○", c: "✓", d: "○" },
    { feat: "Style rule customisation",      a: "○", b: "✓", c: "○", d: "○" },
  ];
  const cell = (v, k) => {
    const cls = v === "✓" ? "check" : v === "✗" ? "cross" : "partial";
    const glyph = v === "✓" ? "● yes" : v === "✗" ? "○ no" : "◐ partial";
    return <div key={k} className={cls}>{glyph}</div>;
  };
  return (
    <div className="cmp" role="table" aria-label="Comparison vs other prose linting tools">
      <div className="cmp-row head">
        <div className="feat">Capability</div>
        <div className="self">readability-ts</div>
        <div>vale</div>
        <div>alex</div>
        <div>textstat</div>
      </div>
      {rows.map((r, i) => (
        <div className="cmp-row" key={i}>
          <div className="feat">{r.feat}</div>
          <div className="self-col">{cell(r.a, "a")}</div>
          {cell(r.b, "b")}
          {cell(r.c, "c")}
          {cell(r.d, "d")}
        </div>
      ))}
    </div>
  );
}

/* expose globals for other JSX scripts */
Object.assign(window, {
  ScoreChip, MiniScoreChip, CopyBlock, Terminal,
  FileCard, Tabs, RatingLegend, Histogram, ComparisonTable,
  RATINGS, ratingFor, useReducedMotion, useCountUp,
});
