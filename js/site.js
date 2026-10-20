(function () {
  document.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
  var nav = document.querySelector('nav.top');
  if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 8); }, { passive: true });
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(function (e, i) { e.style.transitionDelay = (i % 3) * 80 + 'ms'; io.observe(e); });
})();
