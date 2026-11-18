(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Apparition au défilement
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Aperçu des affiches
  var box = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  document.querySelectorAll('.shot').forEach(function (btn) {
    btn.addEventListener('click', function () {
      img.src = btn.getAttribute('data-full');
      img.alt = btn.getAttribute('data-alt') || '';
      if (box.showModal) box.showModal();
    });
  });
  box.addEventListener('click', function (e) {
    if (e.target === box) box.close();
  });

  // Une seule vidéo à la fois
  var videos = document.querySelectorAll('video');
  videos.forEach(function (v) {
    v.addEventListener('play', function () {
      videos.forEach(function (o) { if (o !== v) o.pause(); });
    });
  });

  // Année du pied de page
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
