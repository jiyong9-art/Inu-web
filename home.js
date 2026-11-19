/* I&U — home page interactions: mobile menu, in-place hover/click media (trailer, EP02, song) */
(function () {
  'use strict';

  /* ---------- mobile menu ---------- */
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  if (header && menuBtn) {
    var setOpen = function (open) {
      header.setAttribute('data-open', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    menuBtn.addEventListener('click', function () {
      setOpen(header.getAttribute('data-open') !== 'true');
    });
    header.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.site-nav a')) { setOpen(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); }
    });
  }

  /* ---------- shared sound bookkeeping ---------- */
  var players = [];           // every media controller on the page
  function soundBusy(except) {
    for (var i = 0; i < players.length; i++) {
      if (players[i] !== except && players[i].hasSound()) { return true; }
    }
    return false;
  }
  function stopOthers(except) {
    for (var i = 0; i < players.length; i++) {
      if (players[i] !== except) { players[i].stop(); }
    }
  }
  function isMouse(e) { return !e.pointerType || e.pointerType === 'mouse'; }

  /* ---------- video covers (UnderEarth trailer, EP02) ---------- */
  function VideoCover(el) {
    var video = el.querySelector('video');
    var hoverSound = el.getAttribute('data-hover-sound') === 'true';
    var self = this;
    var lock = false, hovering = false, soundHover = false, quiet = false;

    function setState(s) { el.setAttribute('data-state', s); }
    function loadSrc() {
      if (!video.getAttribute('src') && video.getAttribute('data-src')) {
        video.setAttribute('src', video.getAttribute('data-src'));
      }
    }
    function pauseQuiet() { quiet = true; video.pause(); quiet = false; }
    function reset() {
      lock = false; soundHover = false;
      video.muted = true;
      setState('idle');
      el.setAttribute('aria-pressed', 'false');
    }
    this.hasSound = function () { return (lock || soundHover) && !video.paused; };
    this.stop = function () { if (lock || soundHover || !video.paused) { pauseQuiet(); try { video.currentTime = 0; } catch (err) {} reset(); } };

    video.addEventListener('ended', reset);
    video.addEventListener('pause', function () { if ((lock || soundHover) && !video.ended && !quiet) { reset(); } });

    function playMuted() {
      soundHover = false; video.muted = true;
      var p = video.play();
      if (p && p.then) {
        p.then(function () { if (hovering && !lock) { setState('hoverMuted'); } else if (!lock) { pauseQuiet(); } }).catch(function () {});
      }
    }

    el.addEventListener('pointerenter', function (e) {
      if (!isMouse(e) || lock) { return; }
      hovering = true; loadSrc(); video.loop = true;
      if (hoverSound && !soundBusy(self)) {
        video.muted = false;
        var p = video.play();
        if (p && p.then) {
          p.then(function () {
            if (hovering && !lock) { soundHover = true; setState('hoverSound'); } else if (!lock) { pauseQuiet(); }
          }).catch(function () { if (hovering) { playMuted(); } });
        }
      } else {
        playMuted();
      }
    });
    el.addEventListener('pointerleave', function (e) {
      if (!isMouse(e)) { return; }
      hovering = false;
      if (lock) { return; }
      pauseQuiet(); soundHover = false; video.muted = true;
      try { video.currentTime = 0; } catch (err) {}
      setState('idle');
    });
    el.addEventListener('click', function () {
      loadSrc();
      if (lock) { pauseQuiet(); reset(); return; }
      stopOthers(self);
      var continuing = !video.paused;
      lock = true; soundHover = false;
      video.loop = false; video.muted = false;
      if (!continuing) { try { video.currentTime = 0; } catch (err) {} }
      var p = video.play();
      if (p && p.then) { p.then(function () { setState('locked'); el.setAttribute('aria-pressed', 'true'); }).catch(reset); }
      else { setState('locked'); }
    });
    setState('idle');
  }

  /* ---------- song button (musical) ---------- */
  function SongCard(card) {
    var btn = card.querySelector('.track');
    var src = btn.getAttribute('data-src');
    var audio = null, hoverMode = false, lockMode = false;
    var self = this;
    function setState(s) { btn.setAttribute('data-state', s); btn.setAttribute('aria-pressed', s === 'locked' ? 'true' : 'false'); }
    function get() {
      if (!audio) {
        audio = new Audio(src);
        audio.preload = 'auto';
        audio.addEventListener('ended', function () { hoverMode = false; lockMode = false; setState('idle'); });
      }
      return audio;
    }
    this.hasSound = function () { return !!audio && !audio.paused; };
    this.stop = function () { if (audio && !audio.paused) { audio.pause(); } hoverMode = false; lockMode = false; setState('idle'); };

    card.addEventListener('pointerenter', function (e) {
      if (!isMouse(e) || lockMode || soundBusy(self)) { return; }
      var a = get();
      if (!a.paused) { return; }
      hoverMode = true;
      var p = a.play();
      if (p && p.then) {
        p.then(function () { if (hoverMode) { setState('hover'); } else { a.pause(); } })
         .catch(function () { hoverMode = false; setState('needClick'); });
      }
    });
    card.addEventListener('pointerleave', function (e) {
      if (!isMouse(e)) { return; }
      if (hoverMode && !lockMode) { hoverMode = false; if (audio) { audio.pause(); } setState('idle'); }
    });
    btn.addEventListener('click', function () {
      var a = get();
      if (lockMode) { a.pause(); lockMode = false; hoverMode = false; setState('idle'); return; }
      stopOthers(self);
      lockMode = true; hoverMode = false;
      if (a.paused) {
        var p = a.play();
        if (p && p.then) { p.then(function () { setState('locked'); }).catch(function () { lockMode = false; setState('idle'); }); }
      } else {
        setState('locked');
      }
    });
    setState('idle');
  }

  var covers = document.querySelectorAll('[data-video-cover]');
  for (var i = 0; i < covers.length; i++) { players.push(new VideoCover(covers[i])); }
  var songs = document.querySelectorAll('[data-song-card]');
  for (var j = 0; j < songs.length; j++) { players.push(new SongCard(songs[j])); }
})();
