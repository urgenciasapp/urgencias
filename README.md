# Urgencia — Hospital de Frutillar

Sitio informativo (estático, HTML/CSS, sin dependencias) sobre el funcionamiento del Servicio de Urgencia del Hospital de Frutillar: horarios, categorización de pacientes, tiempos de espera, cuándo consultar Urgencia vs. SAPU/CESFAM, preguntas frecuentes, y ubicación/contacto.

## Archivos

- `index.html` — página completa (HTML + CSS + sin JavaScript). Es el único archivo necesario.

## Pasos para publicar

1. **Sube `index.html` a la raíz del repositorio `urgencias`**, reemplazando o junto al `README.md` que ya tienes (en la vista que mostraste, usa "Add file → Upload files" o crea el archivo nuevo con ese nombre exacto: `index.html`).
2. Haz **commit** de los cambios en `main`.
3. Ve a **Settings → Pages**.
4. En "Build and deployment", selecciona **Source: Deploy from a branch**, branch **main**, carpeta **/ (root)**. Guarda.
5. GitHub te entregará una URL del tipo `https://urgenciasapp.github.io/urgencias/` (puede tardar 1–2 minutos en activarse tras el primer deploy).

No necesitas configurar nada más: no hay build step, ni dependencias, ni Actions.

## Qué debes revisar/editar antes de publicar

El borrador usa información pública verificada (dirección, teléfono, atención 24 h) y la categorización estándar MINSAL (C1–C5), pero hay contenidos marcados con **✏️** dentro del HTML que debes confirmar con la unidad antes de publicar:

- Horarios reales del SAPU/CESFAM de referencia (sección "Horarios").
- Si los tiempos de espera por categoría o los ejemplos clínicos difieren del protocolo de categorización vigente en tu hospital (AOC 1.2), ajústalos en la sección "Categorización".
- Política de acompañantes y de atención pediátrica (sección "Preguntas frecuentes").
- Si cuentas con estadísticas propias de tiempo de espera, puedes agregarlas en "Tiempos de espera".

Para editar, simplemente abre `index.html` en el editor web de GitHub (clic en el archivo → ícono de lápiz), busca el texto a cambiar y haz commit. No requiere instalar nada.

## Cómo seguir personalizando

- **Colores/tipografía:** están definidos como variables CSS al inicio del `<style>` (`--primary`, `--accent`, etc.), así que puedes cambiar la paleta completa editando pocas líneas.
- **Secciones:** cada bloque de contenido es una `<section>` con su propio `id` (usado por los enlaces del menú superior). Puedes reordenarlas, quitarlas o agregar nuevas siguiendo el mismo patrón.
- **Logo:** actualmente el encabezado usa solo texto. Si tienes un logo institucional, puedo ayudarte a integrarlo.
- **Dominio propio:** si más adelante quieres un dominio personalizado en vez de `github.io`, se configura agregando un archivo `CNAME`; aviso si lo necesitas.

## Notas

- El sitio es 100% responsive (mobile-first) y funciona sin JavaScript, lo que lo hace simple de mantener y muy liviano.
- Incluye un aviso permanente de que la página es informativa y no sustituye la atención médica presencial, con indicación de llamar al 131 (SAMU) ante una emergencia vital.
