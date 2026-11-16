(function () {
  document.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
  var nav = document.querySelector('nav.top');
  if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 8); }, { passive: true });
  // 서비스 모션 — 화면에 충분히 들어왔을 때 한 번 재생한다. 그 전에는 .wait 로 첫 장면에 멈춰 있다.
  // 동작 줄이기면 CSS 가 애니메이션을 걷어 끝 장면만 보이므로 바로 푼다.
  var mos = document.querySelectorAll('.motion.wait');
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || still) {
    mos.forEach(function (m) { m.classList.remove('wait'); });
  } else {
    var mio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove('wait'); mio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    mos.forEach(function (m) { mio.observe(m); });
  }
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
