// The founding audits counter (addendum v3 section 5.3). The S&M Machine
// works the number out from paid audits on its board and publishes it; this
// reads it in the browser, so the site never claims a spot that has gone.
//
// Marked-up elements:
//   data-founding="line"  the sentence that says how many are left
//   data-founding         anything else that only makes sense while spots
//                         remain (the price and its "Founding audit" label)
//   data-founding-over    hidden until every spot is taken, then shown
//
// If the number cannot be read, the line says "Ask about founding audits."
// and nothing else changes.
(function () {
  var URL_ = 'https://gtm-engine-dave-s-projects16.vercel.app/api/public/founding';
  var WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  var word = function (n) { return WORDS[n] || String(n); };
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
  var all = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  function show(f) {
    if (f.soldOut) {
      all('[data-founding]').forEach(function (el) { el.hidden = true; });
      all('[data-founding-over]').forEach(function (el) { el.hidden = false; });
      return;
    }
    var left = f.remaining === 1 ? 'one is still open' : word(f.remaining) + ' are still open';
    all('[data-founding="line"]').forEach(function (el) {
      el.textContent = cap(word(f.total)) + ' founding audits at $1,500 + GST, and ' + left +
        ". Once they're gone, audits move to standard rates.";
    });
  }

  function unknown() {
    all('[data-founding="line"]').forEach(function (el) { el.textContent = 'Ask about founding audits.'; });
  }

  if (!window.fetch) return;
  fetch(URL_, { mode: 'cors' })
    .then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
    .then(function (f) {
      if (typeof f.remaining !== 'number' || typeof f.total !== 'number') throw new Error('shape');
      show(f);
    })
    .catch(unknown);
})();
