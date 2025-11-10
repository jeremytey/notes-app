## Notes App (Tier 1)

A minimalist Notes App built using **vanilla JavaScript** and the browser’s **localStorage** API.  
From florinpop's app ideas repo, focusing on **core front-end principles** — DOM manipulation, event handling, and persistent data storage — without external libraries.

---

## Features

- **Create Notes** — Add new notes with a title and content.
- **LocalStorage Persistence** — Notes are automatically saved and persist after page reloads.
- **Delete Notes** — Remove notes instantly from both the DOM and localStorage.
- **Live Rendering** — The UI updates dynamically as notes are added or removed.
- **Modular Design Ready** — Written cleanly for future refactor into ES6 modules.

---

## Concepts Practiced

- **DOM Manipulation:** Dynamic rendering and event-driven updates.
- **localStorage:** Using `JSON.stringify()` and `JSON.parse()` for persistent data.
- **Data Structures:** Managing an array of note objects (`{ id, title, content }`).
- **Event Delegation:** Efficiently handling clicks and input events.
- **Clean Architecture Thinking:** Building the MVP first, then modularizing for scalability.

---

## Project Structure

```plaintext
notes-app/
│
├── index.html        # Core HTML layout
├── style.css         # Basic UI styling
└── script.js         # Main application logic
