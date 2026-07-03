# Cities That Care

A speculative atlas of urban care infrastructure, by [Heated Studio](https://www.heated.studio/). (The repository name, `heated.cityv2`, is the project's legacy name.)

The site speaks from inside its fiction: an atlas compiled by a network of district coordinators, set between 2028 and 2030, documenting neighborhoods where care functions as infrastructure — thermal refuges, community cisterns, shared courtyard gardens. **All content is fictional**; every page carries a design-fiction disclaimer in its footer.

## Running locally

Static site, no build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server
```

## Structure

- `index.html` — home: world map of districts, featured districts, city index
- `cities/` — one page per city or district (scrollytelling: the map follows the reader)
- `protocols.html` — cross-district index of care practices, linking into district pages
- `contribute.html` — how to adopt a district and join the coordinators' network
- `contributors.html` — the coordinators, on a map and in cards
- `js/city-page.js` — shared engine for district pages (map, story sections, filtering)
- `js/data/` — one data file per district, plus `protocols-data.js`; everything renders from these
- `js/search.js` — site-wide search; its `searchDatabase` lists every published page
- `css/styles.css` — single stylesheet; `fonts/` holds self-hosted Fraunces + Inter

Maps use [Leaflet](https://leafletjs.com/) with OpenStreetMap tiles.

## Adding a district

1. Create `js/data/<district>-data.js` defining `CITY_DATA` (copy an existing file as a template).
2. Create `cities/<district>.html` from an existing district page and point its data `<script>` at the new file.
3. Add an entry to `searchDatabase` in `js/search.js`.
4. On `index.html`, turn the district's coming-soon card into a link; update the coordinator on `js/contributors.js`.
5. If the district practices an existing protocol, link it in `js/data/protocols-data.js`; if it invents one, add it.

External contributors go through [contribute.html](contribute.html) — the field template lives in this repo's data files.

## Contact

Ideas or contributions: nicolas.bronzina@gmail.com
