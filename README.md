# BibleQuest — Interactive Edition

A static, framework-free Bible learning website designed for younger learners and easy GitHub Pages deployment.

## What's included

- Vibrant illustrated home page
- Eight complete Bible stories
- Cartoon-style SVG artwork made from editable HTML/SVG code
- Animated four-scene story sequence for every lesson
- Eight different games:
  - David & Goliath: top-down exploration using Arrow Keys/WASD
  - Noah's Ark: animal memory matching
  - Good Samaritan: care-bag item challenge
  - Moses & the Red Sea: keyboard/click path crossing
  - Nativity: follow-the-star sequence
  - Jesus Calms the Storm: timed boat-steering game using Arrow Keys/A-D
  - The Prodigal Son: branching road-home choices
  - Feeding the Five Thousand: fast serving / crowd-reaction game
- Quizzes that mark correct/incorrect answers and explain each answer
- Expanded Catholic meaning sections
- Reflection prompts
- Browser-only completion tracking
- Story filters
- Official Scripture / Catholic reference page
- Responsive layout for laptop, tablet, and phone

## Run locally

1. Open this entire folder in VS Code.
2. Right-click `index.html`.
3. Choose **Open with Live Server**.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload all files from this folder.
3. Go to repository **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

## Important editable files

- `js/stories-data.js` — story text, quizzes, Catholic meaning, source links
- `js/illustrations.js` — all cartoon artwork / animated story scenes
- `js/games.js` — the eight mini games
- `js/story.js` — lesson flow, scene transitions, quiz behavior
- `css/style.css` — visual design and animation

No framework or build step is required.
