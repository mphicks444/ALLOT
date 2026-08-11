(function () {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const dot = document.createElement("div");
  dot.className = "om-cursor-dot";
  const ring = document.createElement("div");
  ring.className = "om-cursor-ring";
  document.body.appendChild(ring);
  document.body.appendChild(dot);
  document.documentElement.classList.add("has-custom-cursor");

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my, visible = false;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    if (!visible) { visible = true; rx = mx; ry = my; document.body.classList.add("cursor-on"); }
    dot.style.transform = "translate3d(" + mx + "px," + my + "px,0) translate(-50%,-50%)";
    const t = e.target.closest("a,button,input,textarea,select,[role=button],.cat,.svc,.princ");
    ring.classList.toggle("is-active", !!t);
  });
  window.addEventListener("mouseout", (e) => { if (!e.relatedTarget) document.body.classList.remove("cursor-on"); });
  window.addEventListener("mouseover", () => document.body.classList.add("cursor-on"));
  window.addEventListener("mousedown", () => ring.classList.add("is-down"));
  window.addEventListener("mouseup", () => ring.classList.remove("is-down"));

  (function loop() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
    requestAnimationFrame(loop);
  })();
})();
