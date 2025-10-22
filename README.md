# user-dashboard-nuxt

This is a user management dashboard application built with Vue 2, Nuxt.js 2, and Vuetify. The project is designed to be responsive for both desktop and mobile versions.

The main feature is the `/users` page, which displays a paginated list of 8000 simulated users. It includes functionality for searching by name and phone number with a `debounce` mechanism to optimize performance, as well as filtering by city. The application features a collapsible sidebar, a dark/light theme toggle, and simulates network latency when fetching user data. SCSS is used for styling, following a structured approach. The project is configured to run in Nuxt's Universal (SSR) mode.

---

Это приложение-панель для управления пользователями, созданное с использованием Vue 2, Nuxt.js 2 и Vuetify. Проект разработан с адаптивным дизайном для десктопной и мобильной версий.

Основной функционал сосредоточен на странице `/users`, где отображается список из 8000 симулированных пользователей с пагинацией. Реализован поиск по имени и номеру телефона с использованием механизма `debounce` для оптимизации производительности, а также фильтрация по городу. Приложение включает в себя сворачиваемую боковую панель, переключатель темной/светлой темы и имитирует задержку сети при загрузке данных о пользователях. Для стилизации используется SCSS со структурированным подходом. Проект настроен для работы в режиме Universal (SSR) Nuxt.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).