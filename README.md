# Urgencia — Hospital de Frutillar

Sitio informativo (estático, un solo archivo HTML, sin frameworks ni dependencias de build) sobre el funcionamiento del Servicio de Urgencia del Hospital de Frutillar.

## Archivo

- `index.html` — página completa (HTML + CSS + JavaScript vanilla, todo en un solo archivo).

## Contenido del sitio

- Horarios: Urgencia (24 h), SAPU, CESFAM Frutillar y CECOSF Pantanosa, con botón directo a HoraSalud para pedir hora.
- Categorización de pacientes (triage), con infografía del flujo C1–C5 y ejemplos clínicos ampliados.
- Tiempos de espera.
- Qué ocurrirá durante tu atención (línea de tiempo: ingreso → admisión → triage → evaluación → exámenes → tratamiento → alta/hospitalización).
- Qué traer a tu atención (tarjetas con íconos).
- ¿Urgencia, SAPU o CESFAM? (comparativa con ejemplos ampliados).
- Señales de alarma (acordeones: dolor torácico, dolor abdominal, fiebre, dificultad respiratoria, traumatismos).
- Embarazo y niños: cuándo consultar de inmediato.
- **Orientador interactivo** ("¿Dónde debería consultar?"): cuestionario Sí/No 100% en el navegador (sin enviar datos a ningún servidor) que recomienda Urgencia, SAPU/SAR, CESFAM o atención programada. Prioriza siempre la seguridad: si se marca cualquier señal de alarma, recomienda Urgencia de inmediato. Incluye aviso de que no reemplaza la evaluación clínica.
- Preguntas frecuentes (ampliadas).
- Ubicación y contacto, con mapa.

## Accesibilidad

- Botones para aumentar/disminuir el tamaño del texto y modo de alto contraste (arriba de todo, se recuerdan entre visitas).
- Navegación completa con teclado, foco visible, `aria-labels`, `aria-live` en el orientador.
- Animaciones discretas (aparición al hacer scroll, acordeones) que respetan `prefers-reduced-motion`.
- Contraste pensado para cumplir WCAG AA en la mayoría de los elementos; revisa visualmente el modo alto contraste antes de publicar, especialmente si cambias colores.

## Pasos para publicar

1. Sube `index.html` a la raíz del repositorio `urgencias`, reemplazando el actual.
2. Haz **commit** en `main`.
3. Ve a **Settings → Pages** → Source: "Deploy from a branch", branch `main`, carpeta `/(root)` → Save.
4. Tu sitio queda en `https://urgenciasapp.github.io/urgencias/` (puede tardar 1–2 minutos).

## Qué revisar antes de publicar

Ya no quedan textos de "editar antes de publicar": todo el contenido fue confirmado contigo. Aun así, antes de publicar conviene que:

- Verifiques visualmente el modo de alto contraste y el aumento de texto en un celular real.
- Revises que los horarios de SAPU/CESFAM/CECOSF sigan vigentes si cambian en el futuro (quedan en la sección "Horarios").
- Confirmes que el enlace a HoraSalud (`https://horasalud.cl/web/portal/`) sea el correcto para tu comuna.
- Si cambias el nombre del repositorio o de la cuenta de GitHub, actualiza la URL en `<link rel="canonical">` y en las etiquetas `og:url` dentro del `<head>` del HTML.

## Cómo seguir personalizando

- **Colores/tipografía:** variables CSS al inicio del `<style>` (`--primary`, `--accent`, etc.). El modo de alto contraste redefine estas mismas variables bajo `html.hc`.
- **Secciones:** cada bloque es una `<section>` con su propio `id`, referenciado por el menú superior (`.chipnav`). Puedes reordenar, quitar o agregar secciones siguiendo el mismo patrón.
- **Orientador:** la lógica de preguntas está en el bloque `<script>` final, en la función con comentario "Orientador interactivo". Puedes agregar más preguntas siguiendo el mismo patrón (`data-q`, `data-a`).
- **Logo:** el encabezado usa solo texto. Si tienes un logo institucional, puedo ayudarte a integrarlo.
- **Dominio propio:** si más adelante quieres un dominio personalizado en vez de `github.io`, se configura agregando un archivo `CNAME` y actualizando la URL canónica.

## Rendimiento

- Sin frameworks ni dependencias de build; un único archivo HTML.
- Fuentes (Google Fonts) cargadas de forma asíncrona para no bloquear el render.
- No hay imágenes propias que optimizar (solo el mapa embebido, que ya usa `loading="lazy"`).
- JavaScript mínimo y vanilla (accesibilidad, animación de aparición, orientador).
