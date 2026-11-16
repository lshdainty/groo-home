(function () {
  document.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
  var nav = document.querySelector('nav.top');
  if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 8); }, { passive: true });
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canWatch = 'IntersectionObserver' in window;
  // 화면 안 영상(첫 화면 반복 · 기능 화면 · 서비스 줄 짧은 장면) — 절반 이상 보일 때만 소리 없이 반복, 벗어나면 멈춘다.
  // 모션 줄이기면 재생하지 않고 poster(정지 화면)만 둔다. 멈춤 버튼으로 직접 멈춘 영상은 다시 보여도 틀지 않는다.
  var autos = document.querySelectorAll('video.auto');
  autos.forEach(function (v) {
    var btn = v.parentElement.querySelector('.vpause');
    if (!btn) return;
    if (still || !canWatch) { btn.hidden = true; return; }
    btn.addEventListener('click', function () {
      if (v.paused) { delete v.dataset.held; v.play().catch(function () {}); } else { v.dataset.held = '1'; v.pause(); }
    });
    var sync = function () { if (v.paused) btn.dataset.paused = ''; else delete btn.dataset.paused; btn.setAttribute('aria-label', v.paused ? '영상 재생' : '영상 멈추기'); };
    v.addEventListener('play', sync); v.addEventListener('pause', sync); sync();
  });
  if (canWatch && !still) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { if (v.dataset.held) return; if (v.preload === 'none') v.preload = 'auto'; v.play().catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.5 });
    autos.forEach(function (v) { if (v.dataset.start) v.poster = v.dataset.start; vio.observe(v); });
  }
  // 소개 영상 — 버튼을 눌러야 소리와 함께 본편을 띄운다(본편은 자동 재생하지 않는다)
  var film = document.querySelector('dialog.film');
  if (film && film.showModal) {
    var fv = film.querySelector('video'), fd = film.querySelector('.film-desc');
    document.querySelectorAll('[data-film]').forEach(function (b) {
      b.addEventListener('click', function () {
        fv.src = b.dataset.film; fv.poster = b.dataset.poster || ''; fd.textContent = b.dataset.desc || '';
        film.showModal(); fv.currentTime = 0; fv.play().catch(function () {});
      });
    });
    film.querySelector('.film-close').addEventListener('click', function () { film.close(); });
    film.addEventListener('click', function (e) { if (e.target === film) film.close(); });
    film.addEventListener('close', function () { fv.pause(); fv.removeAttribute('src'); fv.load(); });
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
