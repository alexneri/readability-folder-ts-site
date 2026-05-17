/* app.jsx — composition root for the readability-ts homepage */

const THEME_KEY = "readability-ts:theme";

const SECTIONS = [
  { id: "top",        label: "App info" },
  { id: "updates",    label: "Updates" },
  { id: "how",        label: "How it works" },
  { id: "use",        label: "How to use" },
  { id: "benchmarks", label: "Benchmarks" },
  { id: "vs",         label: "Compare" },
  { id: "faq",        label: "FAQ" },
];

function App() {
  const [theme, setTheme] = React.useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const dark = theme === "dark";
  const [active, setActive] = React.useState("top");

  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try { localStorage.setItem(THEME_KEY, dark ? "dark" : "light"); } catch (e) {}
  }, [dark]);

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, .25, .5, .75, 1] });
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target?.matches?.("input,textarea,[contenteditable]")) return;
      if (e.key === "t" || e.key === "T") {
        setTheme(dark ? "light" : "dark");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dark]);

  return (
    <div className="grain">
      <Nav
        dark={dark}
        onToggleTheme={() => setTheme(dark ? "light" : "dark")}
        sections={SECTIONS}
        active={active}
      />

      <main>
        <Hero />
        <UpdatesSection />
        <HowItWorks />
        <HowToUse />
        <FamousDocs />
        <CISection />
        <VsSection />
        <FAQSection />
        <Sponsor />
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
