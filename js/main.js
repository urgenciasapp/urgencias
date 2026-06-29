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

/* ---------------------------------------------------------------------
   4. Orientador interactivo "¿Dónde debería consultar?"
   Cuestionario Sí/No, 100% en el navegador, no envía datos a ningún servidor.
   No diagnostica enfermedades: solo orienta hacia el nivel de atención.
   Prioriza siempre la seguridad: cualquier señal de alarma → Urgencia.
   Solo se ejecuta si el bloque existe en la página (donde-consultar.html).
   --------------------------------------------------------------------- */
(function orientador(){
  var box = document.getElementById('orientador-box');
  if(!box) return;

  var step1 = document.getElementById('ori-step-1');
  var step2 = document.getElementById('ori-step-2');
  var step3 = document.getElementById('ori-step-3');
  var result = document.getElementById('ori-result');
  var resultCard = document.getElementById('ori-result-card');

  var DISCLAIMER = 'Esta herramienta es orientativa y no reemplaza la evaluación de un profesional de salud. ' +
    'Ante cualquier duda, consulta directamente. Si es una emergencia vital, llama al 131 (SAMU).';

  function focusHeading(step){
    var h = step.querySelector('h3');
    if(h) h.focus();
  }

  function showResult(level, title, html){
    [step1, step2, step3].forEach(function(s){ s.hidden = true; });
    resultCard.className = 'ori-result-card ori-' + level;
    resultCard.innerHTML = '<h3>' + title + '</h3>' + html + '<p class="ori-disclaimer">' + DISCLAIMER + '</p>';
    result.hidden = false;
    resultCard.focus();
  }

  var continueBtn = document.getElementById('ori-continue-1');
  if(continueBtn){
    continueBtn.addEventListener('click', function(){
      var checked = box.querySelectorAll('input[name="alarma"]:checked');
      if(checked.length > 0){
        showResult('urgencia', '🔴 Ve a Urgencia ahora',
          '<p>Por los síntomas que marcaste, debes consultar de inmediato en el Servicio de Urgencia del Hospital de Frutillar.</p>' +
          '<a class="btn btn-primary" href="tel:+56652326900">📞 Llamar a Urgencia</a>');
        return;
      }
      step1.hidden = true;
      step2.hidden = false;
      focusHeading(step2);
    });
  }

  box.addEventListener('click', function(e){
    var btn = e.target.closest('.ori-answer');
    if(!btn) return;
    var q = btn.getAttribute('data-q');
    var a = btn.getAttribute('data-a');

    if(q === '2'){
      if(a === 'si'){
        showResult('sapu', '🟠 Consulta en SAPU / SAR',
          '<p>Para síntomas recientes que te preocupan pero no son una emergencia, el SAPU es la vía más rápida hoy mismo.</p>' +
          '<p><strong>SAPU Frutillar:</strong> Lun a Vie 17:00–24:00 hrs · Sáb, Dom y feriados 09:00–24:00 hrs.</p>');
      }else{
        step2.hidden = true;
        step3.hidden = false;
        focusHeading(step3);
      }
    }

    if(q === '3'){
      if(a === 'si'){
        showResult('cesfam', '🟢 Consulta en tu CESFAM o CECOSF',
          '<p>Para controles, recetas, certificados o vacunas, el CESFAM o el CECOSF son la vía adecuada.</p>' +
          '<a class="btn btn-primary" href="https://horasalud.cl/web/portal/" target="_blank" rel="noopener">📅 Pedir hora</a>');
      }else{
        showResult('programada', '🔵 Agenda una atención programada',
          '<p>Tu consulta parece ser de seguimiento o no urgente. Te recomendamos agendar hora con tu médico tratante, especialista o en tu CESFAM.</p>' +
          '<a class="btn btn-primary" href="https://horasalud.cl/web/portal/" target="_blank" rel="noopener">📅 Pedir hora</a>');
      }
    }
  });

  var restartBtn = document.getElementById('ori-restart');
  if(restartBtn){
    restartBtn.addEventListener('click', function(){
      box.querySelectorAll('input[name="alarma"]:checked').forEach(function(cb){ cb.checked = false; });
      result.hidden = true;
      step3.hidden = true;
      step2.hidden = true;
      step1.hidden = false;
      focusHeading(step1);
    });
  }
})();
