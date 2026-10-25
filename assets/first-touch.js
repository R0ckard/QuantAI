// Where a visitor first came from, kept on their own device so the 6-minute
// AI check can say so when they finish it (addendum v3 row 5).
//
// A visitor often lands on the homepage or a sector page from a link that
// carries utm_source, utm_medium and utm_campaign, then clicks through to
// /check/ with none of them. This remembers the first such arrival for 90
// days: the link's tags, the sector code, a partner's name, and the host of
// the site that sent them (never its full address). Nothing leaves the
// browser until the check is submitted, and the check sends only these.
(function () {
  var KEY = 'qa-first-touch';
  var DAYS = 90;
  var clean = function (v) { return (v || '').toString().slice(0, 60).replace(/[^\w .:/-]/g, ''); };
  try {
    var p = new URLSearchParams(location.search);
    var host = '';
    try { host = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : ''; } catch (e) { host = ''; }
    if (/(^|\.)quantai\.com\.au$/.test(host)) host = '';
    var touch = {
      utm: { source: clean(p.get('utm_source')), medium: clean(p.get('utm_medium')), campaign: clean(p.get('utm_campaign')) },
      referrer: host,
      sector: clean(p.get('sector')),
      partner: clean(p.get('partner')),
      at: Date.now()
    };
    var any = touch.utm.source || touch.utm.medium || touch.utm.campaign || touch.referrer || touch.partner;
    if (!any) return;
    var old = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (old && old.at && Date.now() - old.at < DAYS * 86400000) return; // first touch wins
    localStorage.setItem(KEY, JSON.stringify(touch));
  } catch (e) { /* storage blocked: the check still works, just without this */ }
})();
