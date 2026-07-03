# District field template

This is the template every district in Cities That Care follows. It is the "field template" mentioned on [contribute.html](../contribute.html). Copy it, fill it in, and send it — or open a pull request following the integration steps at the end.

## 1. The district brief

- **District, city, country** — a real neighborhood (e.g. San Telmo, Buenos Aires, Argentina)
- **Coordinator** — the fictional local who documents it: name, one-line background
- **Center coordinates and zoom** — where the district map opens (e.g. `[-34.6215, -58.3724]`, zoom 16)
- **District description** — 3–4 sentences in the atlas voice: what this neighborhood turned into between 2028 and 2030, anchored in its real streets and real climate pressures
- **Categories** — 4–5 filter categories for the projects (e.g. heat, water, green, heritage, community)

## 2. Six care projects

Each project needs:

| Field | What it is |
|-------|------------|
| `id` | kebab-case slug (`refugios-termicos`) |
| `title` | Project name as it appears on the page |
| `location` | Real street address or area within the district |
| `coords` | `[lat, lng]` for its map marker |
| `categories` | 2 of the district's categories, space-separated |
| `image` | A wide render (3:2), see the image kit below |
| `description` | 4–8 sentences, written from the coordinator's perspective |
| `website` | Real URL if the project extends something that exists; otherwise omit |

Writing guidance — what makes district descriptions work:

- **Real places, fictional projects.** Anchor every project to an address a reader could walk to today.
- **Care first, technology second.** The sensor matters because of the grandmother whose joints it helps.
- **Specifics create belief.** One named person, one concrete number, one date per project — no more.
- **Present tense from 2030.** The projects already exist; the coordinator is showing you around.

## 3. Image kit

All imagery is AI-generated and curated. Shared style suffix so new districts match the atlas:

> *"Photorealistic editorial photograph, warm golden-hour light, documentary tone, no text or watermarks, 3:2 aspect ratio."*

- Six project images (one per project, showing the practice, not a landmark postcard)
- One district card image for the home page (aerial or street-level identity shot)
- One coordinator portrait: *"Portrait of [name, age, background], a neighborhood climate coordinator standing in [district landmark] at golden hour, wearing practical field clothes, holding a tablet showing environmental data, looking at the camera with calm confidence. [style suffix, square 1:1]"*

Deliver as WebP: cards 1200px wide, project images 900px, portraits 400×400.

## 4. Integration steps (for pull requests)

1. `js/data/<district>-data.js` — define `CITY_DATA` (copy `js/data/san-telmo-data.js`).
2. `cities/<district>.html` — copy an existing district page; point its data `<script>` at the new file; update title, meta and Open Graph tags.
3. `js/search.js` — add the district to `searchDatabase`.
4. `index.html` — turn the district's coming-soon card into a link (or add a new card), and add its pill to `HERO_DISTRICTS` in `js/main.js`.
5. `js/contributors.js` — add the coordinator (portrait in `img/people/`, 400×400 WebP).
6. `js/data/protocols-data.js` — link the projects that practice an existing protocol; add a new protocol if the district invented one.
