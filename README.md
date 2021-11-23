# Webpack 5 micro-frontends with React and Redux

This example shows a basic host application wrapped in Redux Provider loading remote components. It uses Webpack 5 Module Federation feature.

Actions are dispatched from the micro-frontend. Both the host app and microfrontend are aware of Redux store.

Thanks to `singleton: true` setting in Webpack configurations modules like react, react-redux, redux, etc. are shared between the host and microfrontends.

- `app1` micro-app
- `app2` host app

## Running Demo

Run `npm install` and `npm start` inside each repo. This will build and serve your apps on ports `3001`, `3002`.

For more information, visit the article explaining this workflow

Reference: https://webpack.js.org/concepts/module-federation/

Forked from: https://github.com/adrielerodr/module-federation
