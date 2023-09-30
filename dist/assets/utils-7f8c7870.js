(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === 'childList')
        for (const i of r.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = s(e);
    fetch(e.href, r);
  }
})();
function c(o) {
  return JSON.parse(localStorage.getItem(o));
}
function a(o, t) {
  const s = c(o);
  localStorage.setItem(o, JSON.stringify(Array.isArray(s) ? [...s, t] : [t]));
}
function l(o) {
  return new URLSearchParams(window.location.search).get(o);
}
function u(o, t, s, n = 'afterbegin', e = !1) {
  const r = s.map(o);
  e && (t.innerHTML = ''), t.insertAdjacentHTML(n, r.join(''));
}
export { l as a, c as g, u as r, a as s };
