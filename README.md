# Eli Woodard Portfolio

Modern software engineering portfolio for Eli Woodard. The site is intentionally static, fast, dependency-light, and optimized for recruiters reviewing full-stack engineering, HPC, and data-focused experience.

## Highlights

- Semantic single-page portfolio with sections for hero, about, experience, projects, skills, certification, education, and contact.
- Recruiter-first project cards with screenshots, technology badges, links, and concise impact notes.
- No runtime CDN dependencies, jQuery, Three.js, or particle effects.
- Optimized WebP project/profile images served from `Images/optimized`.
- Accessible navigation, visible focus states, reduced-motion support, and responsive layouts for mobile through ultrawide screens.

## Running Locally

```bash
node server.js
```

Then open `http://127.0.0.1:3000/`.

The site can also be opened directly from `index.html` because it has no build-time JavaScript requirement.

## Styles

The authored stylesheet lives in `sass/main.scss`. Compile the production CSS with:

```bash
sass sass/main.scss css/styles.css --style=compressed --no-source-map
```

or:

```bash
npm run build:css
```

## Featured Projects

- [DatabricksGenAI](https://eliwoodard.github.io/DatabricksGenAI/)
- [MapSimulator](https://mapsimulator.onrender.com/)
- [JourneyToMiddleEarth](https://eliwoodard.github.io/JourneyToMiddleEarth/)
- [Tasks](https://eliwoodard.github.io/Tasks/)
- [Database Project](https://github.com/EliWoodard/DatabaseConnection)

## Contact

- [GitHub](https://github.com/EliWoodard)
- [LinkedIn](https://www.linkedin.com/in/elijah-woodard-a9609524a)
- [Email](mailto:eliwoodard136@gmail.com)
