# Cities That Care

A speculative atlas of urban care infrastructure, by [Heated Studio](https://www.heated.studio/). (The repository name, `heated.cityv2`, is the project's legacy name.)

The site speaks from inside its fiction: an atlas compiled by a network of district coordinators, set between 2028 and 2030, documenting neighborhoods where care functions as infrastructure — thermal refuges, community cisterns, shared courtyard gardens. **All content is fictional**; every page links a design-fiction disclaimer to the [colophon](about.html).

## Running locally

Static site, no build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server
```

## Repository map

```
index.html              Home: world map of districts, featured districts, city index
cities/                 One page per city or district (scrollytelling: the map follows the reader)
protocols.html          Cross-district index of care practices, deep-linking into districts
contribute.html         How to adopt a district and join the coordinators' network
contributors.html       The coordinators, on a map and in cards
about.html              Colophon: what is real, what is fiction, how it is made

js/
  main.js               Home page (hero world map, region filter)
  city-page.js          Shared engine for district pages (map, story sections, filtering)
  contributors.js       Contributors map + cards (single source of truth for coordinators)
  protocols.js          Renders the protocols index
  search.js             Site-wide search; its searchDatabase lists every published page
  buenos-aires-map.js   Buenos Aires city page (neighborhoods map)
  data/                 One data file per district + protocols-data.js — everything renders from these

css/styles.css          Single stylesheet
fonts/                  Self-hosted Fraunces + Inter (woff2)
img/                    District renders and cards (WebP); img/people/ holds coordinator portraits
favicon.svg

docs/
  DISTRICT-TEMPLATE.md  The field template for new districts (brief, projects, image kit, integration steps)
  AUDITORIA.md          The 2026 repo audit that kicked off the redesign (historical)
CONTRIBUTING.md         How to propose a district or submit changes
```

Maps use [Leaflet](https://leafletjs.com/) with OpenStreetMap tiles.

## Adding a district

Follow [docs/DISTRICT-TEMPLATE.md](docs/DISTRICT-TEMPLATE.md) — it covers the content brief, the image kit, and the six integration steps. External contributors start at [contribute.html](contribute.html).

## Contact

Ideas or contributions: nicolas.bronzina@gmail.com
