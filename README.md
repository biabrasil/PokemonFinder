<<<<<<< HEAD
# PokemonFinder
**PokemonFinder** is a Pokémon list and finder app that allows users to browse, search, and view details about their favorite Pokémon. The app features infinite scrolling, detailed Pokémon information, and a clean, responsive design.

## Features
- Browse Pokémon with infinite scroll
- Search Pokémon by name
- View detailed information including:
  - Types
  - Abilities
  - Weight
  - Height
- Responsive layout for mobile and desktop

## Data Source
This app uses data from the [PokéAPI](https://pokeapi.co/), which provides information about Pokémon, including their types, abilities, weight, height, and more.

## Technologies Used

- [React](https://reactjs.org/) – Frontend library
- [TypeScript](https://www.typescriptlang.org/) – Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [PokéAPI](https://pokeapi.co/) – Pokémon data

## Installation

1. Clone the repository:
git clone https://github.com/yourusername/PokemonFinder.git
cd PokemonFinder

2. Install dependencies:
npm install

3. Run the app locally
npm run dev

## Usage

Use the search bar to find a specific Pokémon by name.
Scroll down to load more Pokémon automatically.
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> 4856946 (Initial commit - add PokemonFinder project)
