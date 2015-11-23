# Fear The Repo #

* [MKS Git workflow (Contributing.md)](https://github.com/dont-fear-the-repo/fear-the-repo/blob/master/CONTRIBUTING.md)
* [MKS Waffle.io board for gitissues](https://waffle.io/dont-fear-the-repo/fear-the-repo)
  * Please add what you're working on
  * Title it in the style of the commits, `<type>(<scope>): <subject>` 
    * for example `[fix](deploy): Edit package.json for heroku deploy`
  * Add labels that apply
* Google docs:
  * [User Experience](https://docs.google.com/document/d/14RDEGpsJsEkOgTtGHLJrjvb10u0nh4CDXpbxbuaVh2M/edit)
  * [Database/architecture](https://docs.google.com/document/d/1iHBleCRqJHEEkgui5CCL8jjCec6oTuwz0xUtFge3WMI/edit)
  * [Project Proposals and Diagrams](https://docs.google.com/document/d/15q0Lt2Fy0VXXR9gEYoBde-bjTDFyMLDdEvdFN5KIZGc/edit)
  * [TechNotes whiteboard](https://docs.google.com/document/d/1Xreu_c-Kg74K1OoVIxiu6yM1Bn9thl4ATuJUw9Ax1NM/edit)
  * [Brainstorming spreadsheet](https://docs.google.com/spreadsheets/d/1EsvvYa5koF6s6rNv4dpVaGud9n5Btmbdy0IsEN_wMh8/edit#gid=0)
  * [Brainstorming doc](https://docs.google.com/document/d/1M-FmnJfM4x67Epuljv-4uOUwvYMqrGwskUop3BWUJ_g)


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
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)

Requirements
------------

Node `^4.0.0` or `^5.0.0` ([npm3](https://www.npmjs.com/package/npm3) recommended).

About
--------

// TODO: update this
This is where we talk about the app.

Demo
----

// TODO: update this
A demonstration of this app can be seen [running on heroku](https://react-redux.herokuapp.com), which is a deployment of the [heroku branch](https://github.com/erikras/react-redux-universal-hot-example/tree/heroku).


Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/dont-fear-the-repo/fear-the-repo.git
$ cd fear-the-repo
$ npm install                   # Install Node modules listed in ./package.json (go get a glass of water, this will be a bit)
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

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

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

All `.scss` imports will be run through the sass-loader and extracted during production builds. Furthermore, the `styles` directory is aliased for sass imports, which further eliminates manual directory traversing; this is especially useful for importing variables/mixins.


Testing
-------

Unit tests can be found in `~/tests`. Karma picks up on these files automatically, and Mocha and Chai are available within tests without the need to import them. Coverage reports will be compiled to `~/coverage` by default.


Troubleshooting
---------------

Having an issue? Please let us know! Report it and we'll get to it as soon as possible.


Contributing
------------

// TODO: we should mention the original project here (with links) and thank the creator!
If you would like to submit a pull request, please make an effort to follow the guide in [CONTRIBUTING.md](CONTRIBUTING.md).


Thanks for checking this out.

– Don't Fear the Repo (Andrew, Melody, Michael, Ryan, Sujay)