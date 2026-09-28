(function () {
  const sel = ".section .head, .cats-head, .svc, .cat, .princ, .threshold-frame, .hm-mark, .hm-nav, .hm-statement, .hm-bio, .contact-form, .footer .col";
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.removeAttribute("data-rv-hidden"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });

  let n = 0;
  function bind() {
    document.querySelectorAll(sel).forEach((el) => {
      if (el.dataset.rv) return;
      const r = el.getBoundingClientRect();
      if (!r.height) return;                 // not laid out yet — try next tick
      el.dataset.rv = "1";
      // hidden start state applies ONLY to blocks confirmed below the fold
      if (r.top > window.innerHeight * 0.94) {
        el.setAttribute("data-rv-hidden", "");
        el.style.setProperty("--reveal-delay", (n++ % 6) * 60 + "ms");
        el.classList.add("reveal");
        io.observe(el);
      }
    });
  }

  const started = Date.now();
  const poll = setInterval(() => { bind(); if (Date.now() - started > 5000) clearInterval(poll); }, 120);
  bind();
  window.addEventListener("scroll", () => {
    bind();
    document.querySelectorAll("[data-rv-hidden]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.94) el.removeAttribute("data-rv-hidden");
    });
  }, { passive: true });
})();
