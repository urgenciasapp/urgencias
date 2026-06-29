/* =====================================================================
   Urgencia · Hospital de Frutillar — main.js
   JavaScript puro (sin frameworks), compartido por todas las páginas.
   Cada bloque comprueba que sus elementos existan antes de usarlos,
   para poder incluir este mismo archivo en todas las páginas del sitio.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. Accesibilidad: tamaño de texto y alto contraste
   Se guardan en localStorage para mantenerse entre páginas y visitas.
   --------------------------------------------------------------------- */
(function a11yControls(){
  var root = document.documentElement;
  var FONT_KEY = 'hf_font_px';
  var HC_KEY = 'hf_high_contrast';
  var MIN = 15, MAX = 23;

  var decBtn = document.getElementById('a11y-dec');
  var incBtn = document.getElementById('a11y-inc');
  var contrastBtn = document.getElementById('a11y-contrast');
  if(!decBtn || !incBtn || !contrastBtn) return;

  function applyFont(px){ root.style.fontSize = px + 'px'; }
  function currentPx(){ return parseFloat(getComputedStyle(root).fontSize) || 17; }

  // Restaurar preferencias guardadas
  try{
    var savedFont = localStorage.getItem(FONT_KEY);
    if(savedFont) applyFont(parseFloat(savedFont));
    if(localStorage.getItem(HC_KEY) === '1'){
      root.classList.add('hc');
      contrastBtn.setAttribute('aria-pressed', 'true');
    }
  }catch(e){ /* localStorage no disponible: se ignora silenciosamente */ }

  incBtn.addEventListener('click', function(){
    var px = Math.min(MAX, currentPx() + 1);
    applyFont(px);
    try{ localStorage.setItem(FONT_KEY, px); }catch(e){}
  });
  decBtn.addEventListener('click', function(){
    var px = Math.max(MIN, currentPx() - 1);
    applyFont(px);
    try{ localStorage.setItem(FONT_KEY, px); }catch(e){}
  });
  contrastBtn.addEventListener('click', function(){
    var on = root.classList.toggle('hc');
    contrastBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    try{ localStorage.setItem(HC_KEY, on ? '1' : '0'); }catch(e){}
  });
})();

/* ---------------------------------------------------------------------
   2. Navegación: menú hamburguesa + resaltado automático de la página activa
   --------------------------------------------------------------------- */
(function mainNav(){
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');

  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Cerrar el menú al elegir un enlace (mejor experiencia en móvil)
    menu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && menu.classList.contains('open')){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Resaltar el enlace correspondiente a la página actual
  var links = document.querySelectorAll('.nav-menu a');
  if(links.length){
    var current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function(link){
      var href = link.getAttribute('href');
      if(href === current){
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
})();

/* ---------------------------------------------------------------------
   3. Animación de aparición al hacer scroll (respeta prefers-reduced-motion)
   --------------------------------------------------------------------- */
(function revealOnScroll(){
  var items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced || !('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  items.forEach(function(el){ observer.observe(el); });
})();
