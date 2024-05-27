# `<APP-NAME>`

<!-- TOC -->

- [<APP-NAME>](#app-name)
  - [About](#about)
  - [Demo app specifications](#demo-app-specifications)
  - [Development](#development)
  - [Requirements](#requirements)
  - [Development with Docker](#development-with-docker)
  - [Customize configuration](#customize-configuration)
  - [:warning: IMPORTANT NOTES :warning:](#warning-important-notes-warning)

<!-- /TOC -->

## About

Template project. In order to create a new project, copy this project and replace the `app-name-nospaces-lowercase` and `<APP-NAME>` with the name of your project and `<APP-NAME-DESCRIPTION>` with project description.

## Demo app specifications

[Vue3](https://v3.vuejs.org/) template with (_inspired from Vue.js creator recommendations at conference in Toronto (<https://www.youtube.com/watch?v=2KBHvaAWJOA>)_):

- [Vite](https://vitejs.dev/)
- [Pinia (de facto Vuex 5)](https://pinia.vuejs.org/)
- [Vue Router 4](https://next.router.vuejs.org/guide/)
- [Vitest](https://vitest.dev/)
- [Vue I18n](https://kazupon.github.io/vue-i18n/)

Extras:

- Relative paths
- [ESLint](https://eslint.org/)
- [PNPM](https://pnpm.io/)
- [Docker dev configuration](https://docker.com/)

Recommended IDE:

- [VSCode](https://code.visualstudio.com/)

## Development

1. Build dev server:

    ```bash
    pnpm i
    ```

2. Run dev server (_also possible with vs code debug functionality (F5)_) :

    ```bash
    pnpm dev
    ```

## Requirements

- [Node.js](https://nodejs.org/en/) (at least v18.0.0)
- [PNPM](https://pnpm.io/) (at least v7.0.0 )
- [Docker](https://docker.com/) (optional - in order to use docker-compose for development or for testing purposes)
- [ni](https://github.com/antfu/ni) (optional - in order to use `ni` command instead of `pnpm`)

## Development with Docker

1. Run container:

    ```bash
    docker compose -f ./docker-compose.dev.yml up -d
    ```

2. Run shell in container:

    ```bash
    docker exec -it app-name-nospaces-lowercase sh
    ```

3. Build & Run dev server:

    ```bash
    corepack enable && pnpm i && pnpm dev
    ```

- Stop docker container:

    ```bash
    docker compose -f ./docker-compose.dev.yml down
    ```

## Customize configuration

Environment variables are loaded from `.env` files in the root directory. See [Vite Environment Variables and Modes](https://vitejs.dev/guide/env-and-mode.html) for more information.

| Variable | Description | Default on serve (locally) | Default on build |
| --- | --- | --- | --- |
| `SERVICE_URL` | URL of the API service that your application will use | Use mocks in [mock/api.mock.js](./mock/api.mock.js) | /api |
| `AUTH_URL` | URL of the authentication service that your application will use | Use mocks in [mock/api-auth.mock.js](./mock/api-auth.mock.js) | /auth |
| `ENVIRONMENT` | Environment name | development | production |
| `PUBLIC_URL` | Public URL of the application | <https://localhost:44341/> |  |
| `BASE_PATH` | Base path of the application | / | / |
| `CLIENT_ID` | VPM client ID | demo | demo |
| `PKIP_CLIENT_ID` | PKIP client ID | demo-pkip | demo-pkip |

example .env file:

```sh
# SERVICE_URL=https://localhost:43345/api/1.0/
# AUTH_URL=https://localhost:43345/idauth/
SERVICE_URL=https://lx-dev.zzdats.lv/api/1.0/
AUTH_URL=https://lx-dev.zzdats.lv/idauth/
ENVIRONMENT=development
PUBLIC_URL=https://localhost:44342/
E_SIGN_URL=https://sign-api.zzdats.lv/simple-sign/
```

## :warning: IMPORTANT NOTES :warning:

It's **very important** that the webapp (this portal) can be built and run locally as described below, with no extra steps:

- Clone this repo;
- Add `.env` file to my local project (see above);
- Run `pnpm i`;
- Press **F5** ("Run and Debug" in VSCode);
- Webapp starts in my local browser and can call published Dev API (without any CORS, HTTPS, Authentication redirect and/or other problems);

Other ways to run this webapp (e.g., connecting to locally run API, or connecting to test env, etc) are permitted, of course, but should be considered **additional** methods.
