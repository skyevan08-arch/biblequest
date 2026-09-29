# Adding More Stories

BibleQuest is still built around one reusable `story.html` page. To add Story #7, add one new story object to `js/stories-data.js`, then add art and a game.

## 1. Add the story data

Copy an existing object in `js/stories-data.js` and update:

- id
- title
- category (`old`, `new`, or `parable`)
- passage
- description / theme
- introduction
- four story scenes
- three quiz questions + explanations
- expanded Catholic meaning
- reflection
- official source links
- `gameType`

## 2. Add the art

Open `js/illustrations.js`.

- Add the story thumbnail to `cardScene(id)`.
- Add four illustrated scene cases to `scene(id, index)`.

The artwork is inline SVG, so it is editable without external image files.

## 3. Add a game

Open `js/games.js`.

- Create a new game function.
- Add it to the `map` inside `renderGame()`.
- Set your story's `gameType` to the same name.

This lets future stories have entirely different game mechanics instead of repeating one template.

## 4. Catholic-content checklist

Before publishing a new lesson:

1. Read the full biblical passage.
2. Keep story scenes as a faithful paraphrase; avoid inventing doctrinal details.
3. Identify a lesson that actually comes from the text.
4. Check the Catechism for the connected teaching.
5. Read Old Testament passages in their own context first, then use Catholic typology carefully when appropriate.
6. Add official source links.
7. If the site will be used as a formal class or parish resource, have the content reviewed by a qualified catechist, theology teacher, priest/deacon, or faith-formation leader.
