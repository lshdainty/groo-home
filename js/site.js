(function () {
  document.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
  var nav = document.querySelector('nav.top');
  if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 8); }, { passive: true });
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canWatch = 'IntersectionObserver' in window;
  // 서비스 짧은 장면 — 화면에 충분히 들어왔을 때 한 번 재생하고 마지막 장면에서 멈춘다.
  // poster 는 끝 장면이다. 재생할 수 있으면 첫 장면으로 바꿔 두었다가 들어오면 튼다. 모션 줄이기면 끝 장면 그대로 둔다.
  var clips = document.querySelectorAll('.photo.clip video');
  if (canWatch && !still) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.play().catch(function () {}); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    clips.forEach(function (v) { if (v.dataset.start) v.poster = v.dataset.start; v.preload = 'auto'; cio.observe(v); });
  }
  // 소개 첫 화면 영상 — 소리 없이 자동 재생, 버튼으로 소리 · 멈춤
  var hv = document.querySelector('.hero-video');
  if (hv) {
    var v = hv.querySelector('video'), sb = hv.querySelector('[data-act="sound"]'), pb = hv.querySelector('[data-act="play"]');
    var sync = function () {
      pb.dataset.state = v.ended ? 'replay' : (v.paused ? 'paused' : 'playing');
      pb.setAttribute('aria-label', v.ended ? '다시 보기' : (v.paused ? '재생' : '일시정지'));
      sb.setAttribute('aria-pressed', String(!v.muted));
      sb.setAttribute('aria-label', v.muted ? '소리 켜기' : '소리 끄기');
    };
    ['play', 'pause', 'ended', 'volumechange'].forEach(function (ev) { v.addEventListener(ev, sync); });
    pb.addEventListener('click', function () { if (v.paused) v.play().catch(function () {}); else v.pause(); });
    sb.addEventListener('click', function () { v.muted = !v.muted; if (!v.muted && v.paused) v.play().catch(function () {}); });
    if (canWatch && !still) {
      var hio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { v.play().catch(function () {}); hio.unobserve(v); } });
      }, { threshold: 0.5 });
      hio.observe(v);
    }
    sync();
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
