# Cinema Ticketing Platform

Welcome to the Cinema Ticketing Platform! This application provides a convenient way to purchase cinema tickets for any movie in one centralized location.

Demo: https://test.pogledaj.rs/
Production: https://www.pogledaj.rs/

## Features

- **TMDB Integration**: The platform utilizes The Movie Database (TMDB) to automatically import the 20 most popular movies every week, ensuring you always have access to the latest blockbusters.
  
- **Manual Import**: In addition to automated imports, movies can also be added manually through the backoffice, giving you flexibility in managing your movie catalog.

- **Projections Management**: Projections are created within the backoffice and are easily accessible on individual movie pages in the customer application, allowing users to see all available showtimes at a glance.

- **Powerful Filtering**: Our advanced filtering system enables users to perform in-depth searches for movie projections, helping you find exactly what you're looking for quickly and efficiently.

## Tech stack
- React Typescript for customer app and backoffice (with MUI for styling)
- NestJS on backend
- Postgres DB
- Redis for queueing and caching
- Github action for CI/CD
- React app hosted on Netlify
- Backend and databases hosted on VPS on Hetzner (letsencrypt used for SSL)
