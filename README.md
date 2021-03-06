# Jim's Star Wars Project

[![Build Status](https://travis-ci.org/JimTheMan/Jims-Angular-Star-Wars-Project.svg?branch=master)](https://travis-ci.org/JimTheMan/Jims-Angular-Star-Wars-Project)

_Try the live demo [here](https://jimtheman.github.io/Jims-Angular-Star-Wars-Project/)!_

<img src="./jims-star-wars-demo.gif"/>

## About This Project

This project was created as a submission to a coding challenge. It's nice example of an Angular 5 project that uses Ngrx and makes GET requests. 

- Allows user to choose characters loaded from json.
- Upon selection of character, UI updates to show movies that character has appearing in with date in the format 'Thursday, May 19, 2005' (and catches response in redux store so request for data is only made per character).
- Waits until character is clicked to load data (and clears movie list if empty string is entered).
- Scales to fit nicely on various devices and screen sizes.
- Gracefully handles purposely bad url for Obie-wan.
- Is pretty?


## Project Technical Features

This project was scaffolded from the awesome [Angular Webpack Starter](https://github.com/qdouble/angular-webpack-starter) project.

* Angular 2
  * Async loading
  * Treeshaking
  * AOT (Ahead of Time/ Offline) Compilation
  * AOT safe SASS compilation
* Webpack 2
  * Webpack Dlls (Speeds up devServer builds)
  * @ngTools AOT plugin
* HMR (Hot Module Replacement)
* TypeScript 2
  * @types
* Material Design 2
* Universal (Server-side Rendering)
* @ngrx
  * store (RxJS powered state management for Angular2 apps, inspired by Redux)
  * effects (Side effect model for @ngrx/store)
  * router-store (Bindings to connect angular/router to ngrx/store)
  * store-devtools (Developer Tools for @ngrx/store)
  * store-log-monitor (Log Monitor for @ngrx/store-devtools and Angular 2)
  * ngrx-store-logger (Advanced console logging for @ngrx/store applications, ported from redux-logger.)
  * ngrx-store-freeze in dev mode (@ngrx/store meta reducer that prevents state from being mutated.)
* Karma/Jasmine testing
* Protractor for E2E testing

## Usage

Use `yarn start` for dev server. Default dev port is `3000`.

Use `yarn run start:hmr` to run dev server in HMR mode.

Use `yarn run build` for production build.

Use `yarn run server:prod` for production server and production watch. Default production port is `8088`.

Use `yarn run universal` to run production build in Universal. To run and build universal in AOT mode, use
`yarn run universal:aot`. Default universal port is `8000`.

Default ports and option to use proxy backend for dev server can be changed in `constants.js` file.

To create AOT version, run `yarn run build:aot`. This will compile and build script.
Then you can use `yarn run prodserver` to see to serve files.

### Store Log Monitor / Store Logger

In development mode, the store log monitor appears on the right hand of your screen. This allows
you to view your stored state and manipulate your state history. By default, the monitor is NOT imported
when you are in production mode. State history is also not saved in production mode.

There is also an option to use store-logger which outputs to the console instead of your application view.
To set your development mode store logging preference, go to the constant.js file and edit the `STORE_DEV_TOOLS` constant.
Available options are `monitor | logger | both | none`

### HMR (Hot Module Replacement!)

HMR mode allows you to update a particular module without reloading the entire application.
The current state of your app is also stored in @ngrx/store allowing you to make updates to your
code without losing your currently stored state.

### AOT  Don'ts

The following are some things that will make AOT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

### Testing

For unit tests, use `yarn run test` for continuous testing in watch mode and use
`yarn run test:once` for single test. To view code coverage after running test, open `coverage/html/index.html` in your browser.

For e2e tests, use `yarn run e2e`. To run unit test and e2e test at the same time, use `yarn run ci`.

### Special Thanks

Thanks to the talented and friendly dev team at [American Express](https://jobs.americanexpress.com/tech) for inspiring me to create this project!
