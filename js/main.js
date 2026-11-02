(function () {
  var D = window.SCHOOL_DATA, $ = function (s) { return document.querySelector(s); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function get(p) { return p.split(".").reduce(function (o, k) { return o && o[k]; }, D); }
  function ic(n, flush) { return '<div class="ic"' + (flush ? ' style="margin:0"' : "") + '><svg class="i"><use href="#' + esc(n) + '"/></svg></div>'; }
  function card(x) { return '<article class="card rv">' + ic(x.icon, 1) + "<h3>" + esc(x.title) + "</h3><p>" + esc(x.text) + "</p>" + (x.tag ? '<span class="tag">' + esc(x.tag) + "</span>" : "") + "</article>"; }
  function fill(id, arr, fn) { $(id).innerHTML = arr.map(fn).join(""); }

  document.title = D.school.fullName;
  document.querySelectorAll("[data-t]").forEach(function (e) { var v = get(e.dataset.t); if (v != null) e.textContent = v; });
  document.querySelectorAll("[data-tel]").forEach(function (e) { e.href = "tel:" + D.school.phoneTel; });
  $("#mapLink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(D.school.mapsQuery);
  if (D.school.facebook) { $("#fb").innerHTML = '<a href="' + esc(D.school.facebook) + '" target="_blank" rel="noopener">صفحة المدرسة على فيسبوك</a>'; }
  else { $("#fb").textContent = ""; }

  fill("#chips", D.hero.chips, function (c) { return '<a href="' + esc(c.href) + '">' + esc(c.label) + "</a>"; });
  fill("#stats", D.stats, function (s) { return "<div>" + ic(s.icon) + '<b data-to="' + s.value + '" data-s="' + esc(s.suffix) + '">0</b><span>' + esc(s.label) + "</span></div>"; });
  fill("#levels-list", D.levels, card);
  fill("#facilities-list", D.facilities, card);
  fill("#community-list", D.community, card);
  fill("#fame-list", D.fame, function (f) { return '<div class="rv"><i>' + esc(f.rank) + "</i><b>" + esc(f.name) + "</b><br><small>" + esc(f.title) + "</small></div>"; });
  fill("#services-list", D.services, function (s) { return '<div class="card"><h3>' + esc(s.title) + "</h3><ul>" + s.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>"; });

  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .15 });
  document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
  document.querySelectorAll("[data-to]").forEach(function (el) {
    var to = +el.dataset.to, s = el.dataset.s || "", t0 = performance.now();
    (function k(t) { var p = Math.min((t - t0) / 1400, 1); el.textContent = "+" + Math.round(to * p) + s; if (p < 1) requestAnimationFrame(k); })(t0);
  });

  $("#rf").onsubmit = function (e) { e.preventDefault(); var r = $("#rr"); r.style.display = "block"; r.textContent = D.messages.resultPending; };
  $("#cf").onsubmit = function (e) { e.preventDefault(); var r = $("#cr"); r.textContent = D.messages.contactOk; r.style.display = "block"; e.target.reset(); };
})();
