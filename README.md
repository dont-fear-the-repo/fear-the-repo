# Rezable.io #

---

Table of Contents
-----------------
1. [Requirements](#requirements)
2. [About](#about)
3. [Demo](#demo)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Structure](#structure)
7. [Webpack](#webpack)
8. [Styles](#styles)
9. [Troubleshooting](#troubleshooting)

Requirements
------------

Node `^4.0.0` or `^5.0.0` ([npm3](https://www.npmjs.com/package/npm3) recommended).

About
--------

Rezable.io is a simple, intuitive, drag-and-drop resume builder to easily create and export documents. Users can save their resume for later, and quickly export to PDF.

Some technologies we used:
  * [React](https://facebook.github.io/react/) for unidirectional data flow and performant UI
  * [Redux](https://github.com/rackt/redux) architecture for predictable app state, with [react-redux](https://github.com/rackt/react-redux) bindings
  * [react-router](https://github.com/rackt/react-router) and [redux-router](https://github.com/rackt/redux-router) for routing
  * [redux-devtools](https://github.com/gaearon/redux-devtools) for time travel debugging
  * [react-dnd](https://github.com/gaearon/react-dnd) for stateful drag-and-drop UI
  * [Babel](https://babeljs.io/) to transpile ES6/7 syntax
  * [Immutable](https://facebook.github.io/immutable-js/) for immutable persistent data structures
  * [PhantomJS](http://phantomjs.org/) for PDF export
  * [Webpack](https://webpack.github.io/) for builds/automation, with [eslint](http://eslint.org/) linting and [karma](http://karma-runner.github.io/)/[mocha](https://mochajs.org/)/[chai](http://chaijs.com/) testing
  * [react-medium-editor](https://github.com/wangzuo/react-medium-editor) for WYSIWYG text editing
  * [Material-UI](http://www.material-ui.com/#/) React components implementing Google's Material Design
  * [PostgreSQL](https://github.com/brianc/node-postgres) database with [Sequelize](http://docs.sequelizejs.com/en/latest/) ORM
  * [bcrypt](https://www.npmjs.com/package/bcrypt-nodejs) for user authentication
  * [Node](https://nodejs.org/en/)/[Express](http://expressjs.com/en/index.html) server with [redux-thunk](https://github.com/gaearon/redux-thunk) middleware

We built our app off the wonderful [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit) by [David Zukowski](https://github.com/davezuko). Many of the explanatory docs below are directly from his starter kit. Special thanks to [Dan Abramov](https://github.com/gaearon) for his creating Redux, and his extensive contributions to the community. Also thanks to [Erik Rasmussen](https://github.com/erikras/react-redux-universal-hot-example) for the kitten!

Demo
----

Check out [Rezable.io](http://www.rezable.io/). Look for the kitten!
Also check out [our quick demo video](http://bit.ly/rezable).


Getting Started
---------------

Clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/dont-fear-the-repo/fear-the-repo.git
$ cd fear-the-repo
$ npm install                   # Install Node modules listed in ./package.json (go get a beer, this will be a while)
```

Usage
-----

#### `npm start` (alias for `npm run dev`)
Runs the webpack build system with webpack-dev-server (by default found at `localhost:3000`).

#### `npm run dev:nw`
Same as `npm run start` but opens the debug tools in a new window.

**Note:** you'll need to allow popups in Chrome, or you'll see an error: [issue 110](https://github.com/davezuko/react-redux-starter-kit/issues/110)

#### `npm run dev:no-debug`
Same as `npm run start` but disables devtools.

#### `npm run compile`
Runs the webpack build system with your current NODE_ENV and compiles the application to disk (`~/dist`).

#### `npm run test`
Runs unit tests with Karma and generates coverage reports.

#### `npm run test:dev`
Similar to `npm run test`, but will watch for changes and re-run tests; does not generate coverage reports.

#### `npm run lint`
Runs ESLint against all `.js` files in `~/src`. This used to be a webpack preloader, but the browser console output could get fairly ugly. If you want development-time linting, consider using an `eslint` plugin for your text editor.

#### `npm run lint:tests`
Lints all `.spec.js` files in of `~/tests`.

#### `npm run deploy`
Helper script to run linter, tests, and then, on success, compile your application to disk.


### Configuration

Basic project configuration can be found in `~/config/index.js`.

Structure
---------


```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── src                      # Application source code
│   ├── actions              # Redux action creators
│   ├── components           # Generic React Components
│   ├── containers           # Components that provide context
│   ├── layouts              # Components that dictate major page structure
│   ├── reducers             # Redux reducers
│   ├── routes               # Application route definitions
│   ├── store                # Redux store configuration
│   ├── utils                # Generic utilities
│   ├── views                # Components that live at a route
│   └── app.js               # Application bootstrap and rendering
└── tests                    # Unit tests
```


Using Redux DevTools
--------------------

In development, Redux Devtools are enabled by default. You can toggle visibility and move the dock around using the following keyboard shortcuts:

- <kbd>Ctrl+H</kbd> Toggle DevTools Dock
- <kbd>Ctrl+Q</kbd> Move Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detail information.

Webpack
-------

The webpack compiler configuration is located in `~/build/webpack`. Here you'll find configurations for each environment; `development`, `production`, and `development_hot`. These configurations are selected based on your current `NODE_ENV`, with the exception of `development_hot` which will _always_ be used by webpack dev server.

**Note**: There has been a conscious decision to keep development-specific configuration (such as hot-reloading) out of `.babelrc`. By doing this, it's possible to create cleaner development builds (such as for teams that have a `dev` -> `stage` -> `production` workflow) that don't, for example, constantly poll for HMR updates.

So why not just disable HMR? Well, as a further explanation, enabling `react-transform-hmr` in `.babelrc` but building the project without HMR enabled (think of running tests with `NODE_ENV=development` but without a dev server) causes errors to be thrown, so this decision also alleviates that issue.


Styles
------

We used inline styling for our JSX files, which lives in `src/styling`. Our color palette and typeface library live in `src/styling/MasterTheme.js`.



Troubleshooting
---------------

Having an issue? Please let us know! Report it and we'll get to it as soon as possible.


Contributing
------------

If you would like to submit a pull request, please make an effort to follow the guide in [CONTRIBUTING.md](CONTRIBUTING.md).


Thanks for checking this out.

– Don't Fear the Repo / Carly Rae JSON (Andrew, Melody, Michael, Ryan, Sujay)
