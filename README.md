# Secret Vault

## Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Usage](#usage)
-   [Built Using](#built_using)

## About <a name = "about"></a>

Secret Vault is a web application in which application secrets can be managed and exposed through API end points.

## Getting Started <a name = "getting_started"></a>

### Prerequisites

Install [Node.js](https://nodejs.org/en/).

Create a `.env` file in your root folder:

```
PG_CONN_STRING= # for docker compose use postgres://postgres:Pass!2022@secret-vault-postgres:5432/postgres
                # if running the web app locally with containerized postgres instance use postgres://postgres:Pass!2022@localhost:5432/postgres

AES_KEY= # for docker compose use a random string

SECRET_PREFIX= # for docker compose use a random string
APP_PREFIX= # for docker compose use a random string
```

### Installing

Install dependencies:

```
npm install
```

### Available Scripts

```
npm start
```

Starts the server with the built project.

```
npm run dev
```

Runs the app in development mode: [http://localhost:3000](http://localhost:3000). Any changes to the files will be reflected in the browser immediately.

```
npm run build
```

Creates an optimized build for production.

```
npm run test
```

Runs all tests defined in the `__tests__` folder.

```
npm run docker-compose
```

Runs all services defined in the `docker-compose.yml` file.

```
npm run reset-docker
```

Stops and removes all services defined in the `docker-compose.yml` file. This script also removes the volume and images created.

## Usage <a name = "usage"></a>

-   Namespace
-   Application
-   Secret

## Built Using <a name = "built_using"></a>

[React](https://reactjs.org/) - Front-end JS Library\
[Next.js](https://nextjs.org/) - The React Framework for Production\
[Tailwind CSS](https://tailwindcss.com/) - CSS Framework
