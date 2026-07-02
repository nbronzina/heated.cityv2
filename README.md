# Heated City

A speculative atlas of urban care infrastructure, by [Heated Studio](https://www.heated.studio/).

The project documents imagined urban districts (set between 2028 and 2030) where care functions as infrastructure: thermal refuges, community cisterns, shared courtyard gardens. **All content is fictional**, created for research and imagination.

## Running locally

Static site, no build step. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server
```

## Structure

- `index.html` — home: featured districts and the city index
- `cities/` — one page per city or district
- `js/city-page.js` — shared engine for district pages (map, project cards, modal, filtering)
- `js/data/` — one data file per district; markers, cards and the modal all read from it
- `js/search.js` — site-wide search; its `searchDatabase` lists every published page
- `css/styles.css` — single stylesheet for the whole site

Maps use [Leaflet](https://leafletjs.com/) with OpenStreetMap tiles.

## Adding a district

1. Create `js/data/<district>-data.js` defining `CITY_DATA` (copy an existing file as a template).
2. Create `cities/<district>.html` from an existing district page and point its data `<script>` at the new file.
3. Add an entry to `searchDatabase` in `js/search.js`.
4. On `index.html`, turn the district's coming-soon card into a link (or add a new card).

## Contact

Ideas or contributions: nicolas.bronzina@gmail.com
