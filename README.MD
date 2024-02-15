<h2 align="center">
  User Management
</h2>

<p align="center">
  <a href="#overview">Overview</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#commands">Commands</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#screenshots">Screenshots</a>
</p>

## Overview

![Main](https://github.com/Romychan/react-user-table/assets/60140867/2f73c968-929d-41d5-bc4e-7afe4621da71)

This is a web application for user management. This application provides the ability to view users in a table with the functions of searching, sorting, resizing columns and pagination. The application also implements emulation of CRUD operations to work with users.

The main goal of the project is the study and practical application of architectural methodology [Feature-Sliced Design (FSD)](https://feature-sliced.design/). An additional goal is to study and put into practice new technologies.

## Features

- Table component with column resizing and custom cell contents
- Search, sort and paginate users
- [Feature-Sliced Design (FSD)](https://feature-sliced.design/) architectural methodology
- Emulation of CRUD operations with users using [Mock Service Worker (MSW)](https://mswjs.io/) and [@mswjs/data](https://www.npmjs.com/package/@mswjs/data)
- [React-Query](https://tanstack.com/query/latest/) and [Axios](https://axios-http.com/) for fetching data
- [Zod](https://zod.dev/) to validate API, forms and `.env` file
- Unit and snapshot testing with [Vitest](https://vitest.dev/)
- [Storybook](https://storybook.js.org/) with project components
- [Husky](https://typicode.github.io/husky/) for Pre-Commit Hooks
- Workflow to ensure project quality using GitHub Actions

## Technologies

### Frontend

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [React-Query](https://tanstack.com/query/latest/)
- [React-Hook-Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)
- [Zod](https://zod.dev/)

### Testing

- [Vitest](https://vitest.dev/)
- [Storybook](https://storybook.js.org/)
- [Mock Service Worker](https://mswjs.io/)

### Code Quality

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [Lint-Staged](https://www.npmjs.com/package/lint-staged/)

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository and go to the project folder:

   ```sh
   # Clone this repository
   git clone https://github.com/Romychan/react-user-table.git
   # Go into the repository
   cd react-user-table
   ```

2. Create a .env.local file and include the following variables:

   ```sh
   VITE_API_URL=<YOUR_API_URL>
   ```

3. Install project dependencies:

   ```sh
   npm install
   ```

4. Run the project in development mode:

   ```sh
   npm run dev
   ```

   The application will be available at <http://localhost:3000>

## Commands

The project contains the following commands to run scripts:

| Command&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`                                                                                                                                                             | Runs application in development mode. The application will be available at <http://localhost:3000>                                         |
| `npm run build`                                                                                                                                                           | Builds a project for production. The built project will be located in the `dist` folder                                                    |
| `npm run preview`                                                                                                                                                         | Runs the local server to preview the production build from the `dist` folder. The application will be available at <http://localhost:4173> |
| `npm run test:unit`                                                                                                                                                       | Runs unit and snapshot tests                                                                                                               |
| `npm run lint:eslint`                                                                                                                                                     | Runs ESLint to check and display code problems                                                                                             |
| `npm run lint:eslint:fix`                                                                                                                                                 | Runs ESLint to fix found problems with the code                                                                                            |
| `npm run lint:prettier`                                                                                                                                                   | Runs Prettier to fix code formatting problems                                                                                              |
| `npm run lint:types`                                                                                                                                                      | Runs the type-checking for the project                                                                                                     |
| `npm run lint`                                                                                                                                                            | Runs all code quality checks sequentially                                                                                                  |
| `npm run storybook`                                                                                                                                                       | Runs the storybook in development mode. The storybook will be available at <http://localhost:6006>                                         |
| `npm run storybook:build`                                                                                                                                                 | Builds a Storybook. The built Storybook will be located in the `storybook-static` folder                                                   |
| `npm run prepare`                                                                                                                                                         | Runs Husky initialization for pre-commit hooks to work                                                                                     |

## Screenshots

Main page

![Main page](https://github.com/Romychan/react-user-table/assets/60140867/2f73c968-929d-41d5-bc4e-7afe4621da71)

Add a new user

![Add a new user](https://github.com/Romychan/react-user-table/assets/60140867/24aba3b1-9aa1-4d0a-89e1-0fec880271e2)

Edit a user

![Edit a user](https://github.com/Romychan/react-user-table/assets/60140867/92039756-7edc-4c86-b1de-7c605db2b62f)
