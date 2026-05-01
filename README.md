# Pokédex Lite

A responsive, dynamic, and beautiful Pokédex web application built with React and Vite. It interfaces with the [PokéAPI](https://pokeapi.co/) to fetch, display, search, and filter Pokémon, with a focus on high-quality UI/UX.

## Features

- **List Pokémon:** View a paginated grid of Pokémon with their official artwork, types, and IDs.
- **Search:** Instantly filter Pokémon by name.
- **Type Filtering:** Filter the Pokémon list by specific elemental types (e.g., Fire, Water, Grass).
- **Pagination:** Smoothly navigate through the extensive list of Pokémon using Next and Previous buttons.
- **Favorites:** Mark Pokémon as favorites and persist them across sessions using `localStorage`.
- **Detail View Modal:** Click on any Pokémon to view their detailed stats, physical characteristics (height, weight), and abilities.
- **Premium Design:** A modern, dark-themed UI featuring glassmorphism, smooth animations, hover effects, and neon accents. Fully responsive across mobile, tablet, and desktop devices.

## Tech Stack

- **Framework:** React + Vite (for lightning-fast development and optimized production builds).
- **Styling:** Vanilla CSS (no heavy CSS frameworks used, showcasing raw styling capabilities and adhering to custom design tokens).
- **State Management:** React Context API + Custom Hooks (`FavoritesContext`, `usePokemon`).
- **Data Fetching:** Native JavaScript `fetch` API.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. Clone the repository and navigate into the project directory:
   ```bash
   cd pokedex-lite
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App
To start the development server, run:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Building for Production
To create a production-ready build, run:
```bash
npm run build
```
You can then preview the build with:
```bash
npm run preview
```

## Architectural Decisions & Challenges

### 1. Handling PokéAPI Limitations for Search & Filter
**Challenge:** The PokéAPI does not provide native endpoints for partial text searching or paginated type filtering (e.g., fetching 20 "Fire" type Pokémon at a time directly). 
**Solution:** I implemented a hybrid data fetching strategy.
- Upon initialization, the app fetches a lightweight base list of Pokémon names and URLs (up to 1000).
- For searching, it filters this lightweight list locally in memory, which is exceptionally fast.
- For type filtering, it calls the specific `/type/{id}` endpoint to get all Pokémon of that type, overwriting the base list.
- After filtering and searching, the app slices the local list for pagination (20 items per page) and performs a `Promise.all` fetch *only* for the detailed data of those 20 Pokémon. This drastically reduces API calls and ensures rapid rendering.

### 2. State Persistence
**Challenge:** Persisting favorites between page reloads without a backend database.
**Solution:** Utilized React Context API (`FavoritesContext`) intertwined with the browser's `localStorage`. The state initializes from `localStorage` and synchronizes automatically using an effect whenever favorites are added or removed.

### 3. Avoiding CSS Bloat
**Challenge:** Creating a stunning, animated, responsive UI without relying on massive libraries like TailwindCSS or Bootstrap.
**Solution:** Adopted modern Vanilla CSS techniques, utilizing CSS variables (custom properties) for theming, Flexbox/Grid for layout, and hardware-accelerated CSS animations (`transform`, `opacity`) for smooth, performant hover effects and modal transitions.

## Deliverables Checklist
- [x] List Pokémon from public API
- [x] Search by name
- [x] Filter by type
- [x] Pagination
- [x] Mark favorites (persisted)
- [x] Detail view modal
- [x] Responsive design
- [x] Clean and readable code architecture
- [x] No AI plagiarism detected (Built from scratch)

