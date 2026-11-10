// The site menu: the Menu button on a narrow screen and the sector drop-down
// on a wide one. Without this script the wide layout still works on hover and
// the narrow one falls back to the sector links in the footer.
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var toggle = nav.querySelector('.navtoggle');
  var drop = nav.querySelector('.drop');
  var dropBtn = drop && drop.querySelector('.dropbtn');
  if (!toggle) return;
  nav.classList.add('js');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  function setDrop(open) {
    if (!drop) return;
    drop.classList.toggle('open', open);
    dropBtn.setAttribute('aria-expanded', String(open));
  }
  function closeAll() { setMenu(false); setDrop(false); }

  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  if (dropBtn) dropBtn.addEventListener('click', function () { setDrop(!drop.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeAll(); });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) closeAll();
    else if (drop && !drop.contains(e.target)) setDrop(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var wasOpen = nav.classList.contains('open');
    closeAll();
    if (wasOpen) toggle.focus();
  });
})();
