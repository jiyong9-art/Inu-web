/* I&U — language switch (Korean / English) */
(function () {
  var KEY = 'iu-lang';
  var root = document.documentElement;

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'en' ? 'en' : 'ko');
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }
    var alt = document.querySelector('link[rel="alternate"][hreflang]');
    if (alt) { alt.setAttribute('hreflang', lang === 'en' ? 'ko' : 'en'); }
  }

  var saved = null;
  try { saved = window.localStorage.getItem(KEY); } catch (e) { saved = null; }
  if (saved !== 'en') { saved = 'ko'; }
  apply(saved);

  document.addEventListener('click', function (event) {
    var target = event.target.closest ? event.target.closest('[data-set-lang]') : null;
    if (!target) { return; }
    var lang = target.getAttribute('data-set-lang');
    if (lang !== 'ko' && lang !== 'en') { return; }
    apply(lang);
    try { window.localStorage.setItem(KEY, lang); } catch (e) { /* storage may be unavailable */ }
  });
})();
