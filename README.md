# Servicio de Urgencia · Hospital de Frutillar

Sitio web informativo multipágina sobre el funcionamiento del Servicio de Urgencia del Hospital de Frutillar. HTML5, CSS3 y JavaScript puro — **sin frameworks** (sin React, Vue, Bootstrap, Tailwind, ni paso de build).

## Estructura

```
/
├── index.html              Portada: 4 tarjetas + ubicación y contacto
├── donde-consultar.html    Horarios, comparativa Urgencia/SAPU/CESFAM, qué traer, contacto
├── tiempos-espera.html     Por qué se espera, categorías C1-C5, y qué ocurre durante la atención
├── triage.html             Categorización de pacientes (C1-C5)
├── embarazo.html           Urgencias Obstétricas: cuándo consultar de inmediato
├── pediatria.html          Urgencias Pediátricas: cuándo consultar de inmediato
├── faq.html                Preguntas frecuentes, agrupadas por tema
├── css/styles.css          Hoja de estilos única
├── js/main.js              JavaScript único (accesibilidad, navegación)
├── img/                    Íconos (favicon PNG, apple-touch-icon)
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
├── README.md
└── LICENSE
```

## Menú de navegación

Las 7 páginas comparten el mismo menú: Inicio · ¿Dónde consultar? · Tiempos de espera · Triage · Urgencias Obstétricas · Urgencias Pediátricas · Preguntas frecuentes. El resaltado de la página activa es automático (lo calcula `js/main.js`).

Nota: la página de urgencias pediátricas usa el nombre de archivo `pediatria.html` (el título visible es "Urgencias Pediátricas").

## Decisión técnica: header/footer duplicados

Sin un framework o paso de build, el header/nav/footer se duplican en cada página en lugar de cargarse con `fetch()`. Esto funciona en cualquier entorno (incluido abrir el archivo con doble clic), mientras que `fetch()` falla con `file://` por seguridad (CORS). El costo es que un cambio en el header o el footer hay que repetirlo en las 7 páginas (todas tienen exactamente el mismo bloque, así que es un buscar-y-reemplazar sencillo).

## Accesibilidad

- Botones de tamaño de texto (A+ / A−) y modo de alto contraste, persistentes entre páginas (`localStorage`).
- Navegación completa con teclado: menú hamburguesa operable con teclado y cerrable con `Escape`, foco visible, `aria-current="page"` en el enlace activo.
- Animaciones discretas que respetan `prefers-reduced-motion`.
- HTML semántico: `header`, `nav`, `main`, `section`, `article`, `footer`.

## Pasos para publicar en GitHub Pages

1. Reemplaza el contenido del repositorio `urgencias` con estos archivos (manteniendo las carpetas `css/`, `js/`, `img/`).
2. Haz **commit** en `main`.
3. Ve a **Settings -> Pages** -> Source: "Deploy from a branch", branch `main`, carpeta `/(root)` -> Save.
4. Tu sitio queda en `https://urgenciasapp.github.io/urgencias/`.

## Licencia

Código bajo licencia MIT (ver `LICENSE`). El contenido informativo de salud debe mantenerse actualizado por el Servicio de Urgencia del Hospital de Frutillar.
