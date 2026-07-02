# Auditoría de repositorio — heated.cityv2

**Fecha:** 2026-07-02
**Alcance:** todo el repo (`main`, commit `48d9607`)
**Método:** lectura completa del código (6 HTML, 6 JS, 1 CSS, historial git) bajo seis lentes: interacción IA, arquitectura frontend, APIs/herramientas, comunicación/documentación, tecnología emergente, y meta-análisis de skills.

---

## Hallazgo previo que reordena todo

**Este proyecto no tiene IA.** No hay llamadas a APIs (Anthropic, OpenAI ni otras), no hay prompts, no hay streaming, no hay MCP, no hay `fetch()` a ningún backend. Es un sitio 100% estático: HTML + CSS + JS vanilla + Leaflet para mapas.

Eso no es un defecto — es coherente con lo que el proyecto es: un atlas de design fiction sobre infraestructura de cuidado urbano. Pero significa que los lentes 1 y 3 (interacción IA, MCP/APIs) auditan una ausencia, y el lente 5 gana peso: la única "IA" plausible en este proyecto está en cómo se produjo el contenido, no en cómo funciona.

---

## 1. Diagrama arquitectónico

```
                    ┌─────────────────────────────────────────┐
                    │              NAVEGADOR                   │
                    │         (no hay build, no hay server)    │
                    └─────────────────────────────────────────┘
                                      │
      ┌───────────────┬───────────────┼────────────────┬──────────────┐
      ▼               ▼               ▼                ▼              ▼
 index.html      about.html    contributors.html  cities/         cities/
 (home, grid     (texto        (mapa mundial +    buenos-aires    kyoto.html
  de distritos)   estático)     lista curadores)   .html           san-telmo.html
      │                               │                │              │
      │  js/main.js                   │  js/           │  js/buenos-  │  js/kyoto.js
      │  (tabs, filtros,              │  contributors  │  aires-map   │  js/san-telmo.js
      │   parallax, nav)              │  .js           │  .js         │  (datos de proyectos
      │                               │                │              │   hardcodeados en JS)
      │  js/search.js ◄──────── compartido por todas las páginas ─────┤
      │  (searchDatabase                                              │
      │   hardcodeada, 2 entradas)                                    │
      ▼                               ▼                ▼              ▼
 ┌──────────────┐              ┌──────────────────────────────────────┐
 │ css/styles   │              │ DEPENDENCIAS EXTERNAS (runtime)      │
 │ .css (1537   │              │ · Leaflet 1.9.4 vía unpkg (sin SRI)  │
 │ líneas, todo │              │ · Tiles de OpenStreetMap             │
 │ el sitio)    │              │ · TODAS las imágenes hotlinkeadas:   │
 └──────────────┘              │   Unsplash, Wikimedia, turismo.      │
                               │   buenosaires.gob.ar, cf.bstatic,    │
 img/ (54 MB, 31 archivos)     │   holasantelmo.ar, arcpublishing…    │
 ── 0% referenciado ──         └──────────────────────────────────────┘

 IA: ausente en todo el flujo. React: ausente. MCP: ausente. APIs: solo tiles OSM.
```

**Patrón de datos:** el contenido de cada distrito vive duplicado — una vez en el HTML (cards de proyectos) y otra vez en el JS (objetos `projectsData`/`projects` con descripciones completas). No hay fuente única de verdad.

---

## 2. Tabla de auditoría

| Eje | Score | Fortalezas | Riesgos | Prioridad |
|-----|-------|-----------|---------|-----------|
| Claridad de intención (IA) | N/A | El disclaimer de ficción en footer y About es explícito y honesto | Si el contenido se generó con LLM, no se declara (ver Lente 5) | Baja |
| Feedback & control | 2/5 | Modales cierran con ESC y click afuera; smooth scroll | Tabs del home que no hacen nada; cards que navegan a 404; búsqueda con doble comportamiento (modal + alert) | **Alta** |
| Frontend: arquitectura | 2.5/5 | JS vanilla legible, sin frameworks innecesarios; separación por página | Datos duplicados HTML/JS; handlers duplicados (onclick inline + addEventListener); 3 archivos JS que son casi el mismo código | Alta |
| Frontend: visual | 3.5/5 | Sistema de color coherente (amarillo/navy), variables CSS, split-screen mapa+contenido funciona bien | `styles.css` monolítico de 1537 líneas con capas de parches (10+ commits "Update styles.css" seguidos) | Media |
| Accesibilidad | 1.5/5 | `alt` presente en imágenes; breakpoints responsive en 4 tamaños | Cards clickeables son `<article onclick>` sin `tabindex`/rol/teclado; un solo `:focus` en todo el CSS; `lang="es"` con contenido en inglés | **Alta** |
| Robustez de dependencias | 1.5/5 | Leaflet con versión pineada | 54 MB de imágenes locales sin usar mientras el sitio entero depende de hotlinks a 8 dominios ajenos que pueden romperse mañana | **Alta** |
| Documentación | 1/5 | El texto del sitio (About) es claro y sin marketing | README de una línea; historial git de mensajes repetidos; cero instrucciones de cómo agregar una ciudad | Media |
| Rol de la tecnología (crítica) | 4/5 | La tecnología está al servicio de la narrativa, no al revés; ficción declarada | La "búsqueda" simula una base de datos que son 2 entradas hardcodeadas — promesa de escala que el sistema no tiene | Baja |

---

## 3. Top 3 fortalezas

1. **La ficción está declarada, no disfrazada.** El footer y la página About dicen sin rodeos que todo es especulativo y con fines educativos. En un género (design fiction climático) donde es fácil caer en ambigüedad manipuladora, este proyecto elige la honestidad. El texto de About es directo, sin adjetivos de venta.

2. **La elección técnica es proporcional al problema.** HTML estático + Leaflet + OpenStreetMap para un atlas de barrios ficticios es exactamente la herramienta correcta. No hay React donde no hace falta, no hay build pipeline, no hay IA decorativa. El sitio podría hostearse en GitHub Pages sin tocar nada (con una salvedad de rutas, ver riesgos).

3. **El patrón mapa-numerado + modal funciona.** La correspondencia visual entre marcadores numerados en el mapa y cards numeradas en la grilla (kyoto, san-telmo) es un patrón de interacción claro: el usuario entiende sin explicación que el mapa y la lista son dos vistas de lo mismo. El click en marcador abre el modal del proyecto y centra el mapa — buen feedback bidireccional.

---

## 4. Top 3 riesgos + remedios

### Riesgo 1: El sitio entero depende de imágenes ajenas, mientras 54 MB propios duermen en el repo
Ninguna página usa `img/` (31 archivos, 0 referencias). Todo se hotlinkea de Unsplash, Wikimedia, `turismo.buenosaires.gob.ar`, `cf.bstatic.com` (Booking), `holasantelmo.ar`, `mountainsoftravelphotos.com`, `arcpublishing` (Infobae). Cualquiera de esos dominios puede cambiar la URL, bloquear hotlinking o desaparecer — y la card queda rota sin que nadie lo note. `cf.bstatic.com` y `arcpublishing` son CDNs de terceros que ya suelen bloquear referers externos. Además: hotlinkear fotos de Booking/Infobae tiene un problema de derechos que Unsplash no tiene.

→ **Remedio:** descargar las imágenes que se usan (con licencia verificada), optimizarlas a WebP ~200 KB, servirlas desde `img/`, y borrar los 54 MB no usados (o moverlos a una rama de assets). Una tarde de trabajo.
→ **Prioridad: Alta** — es el punto de falla más probable del sitio.

### Riesgo 2: Navegación rota y promesas de UI que no se cumplen
Verificado en el código:
- `cities/kyoto.html:38` — el logo linkea a `index.html`, que desde `cities/` resuelve a `cities/index.html` → **404**. (San Telmo lo tiene bien: `../index.html`.)
- `js/search.js:16` — el resultado "San Telmo" linkea a `/cities/buenos-aires.html`: página equivocada **y** ruta absoluta que rompe en GitHub Pages de proyecto (donde el sitio vive bajo `/heated.cityv2/`).
- `index.html` — las cards de Madrid, Melbourne, Nairobi y New Delhi tienen `data-city`, y `js/main.js:73-92` navega a `cities/madrid.html` etc. → **404**. (La página de Buenos Aires sí maneja "coming soon"; el home no.)
- `js/main.js:97-102` — agrega un listener con `alert('Search functionality coming soon!')` al mismo botón que ya tiene `onclick="openSearch()"`: el usuario ve el modal de búsqueda **y** un alert contradictorio a la vez.
- `index.html:45-48` — los tabs "Recently Updated / By Climate Challenge / By Coordinator" solo hacen `console.log`. UI que promete y no entrega.

→ **Remedio concreto** (los tres arreglos de una línea):
```html
<!-- cities/kyoto.html:38 -->
<a href="../index.html" class="logo">Heated City</a>
```
```js
// js/search.js:16 — ruta relativa y página correcta
url: 'cities/san-telmo.html',  // y en páginas de ciudad, resolver con prefijo ../
```
```js
// js/main.js — eliminar líneas 94-102 (el alert) por completo
```
Para las cards sin página: sacarles `data-city` y agregarles la clase/badge "coming soon" que ya existe en `buenos-aires.html`. Para los tabs muertos: ocultarlos hasta que filtren de verdad.
→ **Prioridad: Alta** — son los errores que un visitante encuentra en los primeros 30 segundos.

### Riesgo 3: Cada ciudad nueva se agrega copiando y pegando 400 líneas
El contenido de un distrito vive en dos lugares (cards HTML + objeto JS con descripciones), la `searchDatabase` es un tercer lugar manual ("Agrega más ciudades aquí"), y `kyoto.js` / `san-telmo.js` son el mismo código con distinto estilo (uno usa `initMap()`, otro top-level; uno `getAttribute`, otro `dataset`). Con 4 ciudades "coming soon" anunciadas, este patrón multiplica errores: ya hay inconsistencias (keywords de San Telmo dicen "balvanera abasto", que es otro barrio).

→ **Remedio:** un solo `js/city-page.js` genérico que reciba los datos, y un archivo de datos por ciudad:
```js
// js/data/kyoto.js
const CITY = {
  name: 'Kyoto', center: [34.9985, 135.7780], zoom: 14,
  projects: [ { id: 'hikari-machiya', title: '…', coords: […], … } ]
};
```
```js
// js/city-page.js — genera marcadores Y cards desde CITY.projects,
// una sola fuente de verdad; search.js importa los mismos datos.
```
Las cards de proyectos se generan desde el mismo objeto que los marcadores, y la búsqueda se alimenta sola. Agregar una ciudad pasa de "editar 4 archivos sin equivocarse" a "escribir un archivo de datos".
→ **Prioridad: Media** — no rompe nada hoy, pero define si el proyecto puede crecer.

---

## 5. Recomendaciones por lente

### Anti-slop (comunicación)
- **README:** hoy es `# heated.cityv2`. Reescribirlo en ~15 líneas: qué es el proyecto (una frase), que es ficción, cómo verlo localmente (`abrir index.html`, no requiere build), cómo agregar una ciudad, licencia de contenido e imágenes. Sin adjetivos, sin visión de futuro — el About del sitio ya tiene el tono correcto, copiarlo.
- **Commits:** 10 commits seguidos que dicen "Update styles.css" no dejan rastro de qué se decidió. No hace falta ceremonia: "fix: header overlap en mobile" alcanza.
- **Lo que está bien:** el texto del sitio no tiene slop. "All content is fictional and intended for research and imagination" es exactamente la frase que este género necesita.

### Frontend (diseño + componentes)
- **Refactor prioritario:** unificar `kyoto.js` + `san-telmo.js` + `buenos-aires-map.js` en un motor común (ver Riesgo 3). Son ~470 líneas que deberían ser ~150 + datos.
- **Eliminar handlers duplicados:** las cards tienen `onclick` inline **y** `addEventListener` en `main.js` haciendo lo mismo. Quedarse con el listener JS y borrar los `onclick` del HTML.
- **Accesibilidad mínima viable** (medio día): cards clickeables → envolver el contenido en `<a href>` real (gratis: teclado, middle-click, SEO); agregar `:focus-visible` global; corregir `lang="es"` → `lang="en"` (el contenido está en inglés); `aria-label` en botones que solo tienen SVG (búsqueda, cerrar modal).
- **CSS:** 1537 líneas en un archivo con secciones parchadas. No urge dividirlo, pero sí una pasada de limpieza: hay reglas que se pisan (resultado visible del historial de "Update styles.css").
- **Higiene:** sacar los `console.log` de producción; agregar `integrity`/SRI al script de Leaflet o servirlo local.

### MCP / APIs
- No aplica hoy. La única integración externa es OSM tiles, correctamente atribuida.
- Si el proyecto suma búsqueda real o contenido dinámico, **no** necesita un backend ni IA: un `cities.json` estático generado desde los archivos de datos cubre la búsqueda para docenas de ciudades.

### Producto / self-knowledge
- No usa APIs de Anthropic ni de nadie. Correcto para el alcance. La tentación futura de "agregarle un chatbot al atlas" debería resistirse salvo que haya una pregunta de diseño real que lo justifique (ver Lente 5).

### Tecnología emergente / crítica
- **¿La IA es necesaria aquí?** No, y el proyecto está mejor así: la especulación vive en el contenido, no en la tecnología. Un atlas estático es más durable, archivable y citable que una experiencia generativa.
- **Asunción tácita a explicitar:** las descripciones de proyectos tienen la textura característica de texto asistido por LLM (métricas precisas inventadas: "18,000 litros", "23 distritos", "15°C menos"). Si hubo IA en la producción del contenido, declararlo en About sería coherente con la honestidad que el proyecto ya practica — y es una oportunidad conceptual: un proyecto sobre futuros especulativos que transparenta su método de especulación.
- **La búsqueda como ficción involuntaria:** el modal promete "Search Cities and Neighborhoods" sobre una base de 2 entradas. A diferencia de la ficción declarada del contenido, esta es ficción de interfaz no declarada. O se completa la base, o se reemplaza el placeholder por algo honesto ("Search the 2 documented districts").
- **Privacidad:** sin analytics, sin cookies, sin tracking. Punto a favor poco común.

---

## 6. Bonus: meta-skill para este proyecto

**Skill propuesta: `add-district`**

> Genera todo lo necesario para publicar un distrito nuevo en Heated City a partir de un brief: crea `js/data/<ciudad>.js` con proyectos georreferenciados, la página `cities/<ciudad>.html` desde template, registra la entrada en `searchDatabase`, agrega la card al home y al mapa de contributors, y verifica que todas las rutas relativas resuelvan (el bug del logo de Kyoto no habría pasado).

- **Trigger keywords:** "agregar ciudad", "nuevo distrito", "add district", "coming soon → activo"
- **Por qué esta y no otra:** el 90% del trabajo futuro del proyecto es exactamente esta operación, y hoy requiere tocar 4-5 archivos a mano con 3 fuentes de verdad. La skill codificaría el checklist que hoy vive (incompleto) en la cabeza del autor.
- **Segunda candidata:** `verify-links` — un chequeo de que ninguna imagen hotlinkeada devuelva 404/403 y ninguna ruta interna esté rota. Correría antes de cada push.

---

## 7. Checklist post-audit

**Esta semana (bugs visibles al usuario):**
- [ ] Arreglar logo de `cities/kyoto.html` → `../index.html`
- [ ] Corregir URL de San Telmo en `search.js` (página equivocada + ruta absoluta)
- [ ] Borrar el listener con `alert()` en `main.js:94-102`
- [ ] Cards sin página (Madrid, Melbourne, Nairobi, Delhi): badge "coming soon" en vez de navegar a 404
- [ ] Ocultar los tabs del home que no filtran nada

**Este mes (deuda estructural):**
- [ ] Localizar imágenes en uso (descarga + WebP + licencias verificadas) y eliminar los 54 MB huérfanos de `img/`
- [ ] Unificar los 3 JS de ciudad en un motor + archivos de datos por ciudad
- [ ] Generar cards de proyectos y `searchDatabase` desde esos mismos datos
- [ ] Pasada de accesibilidad: links reales en cards, `:focus-visible`, `lang` correcto, `aria-label` en botones de ícono
- [ ] README de verdad (15 líneas alcanzan)

**Cuando toque crecer:**
- [ ] Activar la primera ciudad "coming soon" usando el motor nuevo (prueba de que el refactor sirvió)
- [ ] Decidir y declarar en About el rol de la IA en la producción del contenido
- [ ] Considerar la skill `add-district` para automatizar el alta de distritos
