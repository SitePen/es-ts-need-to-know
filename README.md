# ES6+ and TypeScript: What You Need to Know

This is the example repository used during the live coding section of the Enterprise JavaScript Summit talk

_ES6+ and TypeScript: What You Need to Know_.

## Example Overview

In this exercise, we start out with a very simple, working, vanilla JavaScript/ES5 application that is using the Aynchronous Module Definition (AMD) module system. This application renders a button that when pressed, fetches a list of articles from <https://newsapi.org> and then renders them, along with an image and the publish date relative to the user. Specifically, we start out with the following files:

- `index` - The main entry point into the application. First, this instantiates a new ArticlesService class that will be used to fetch the articles data from the Internet and then sets up an event listener for the "Load Articles" button that will create a new ArticlesComponent and render the articles to the page after the content is fetched.
- `util` - This file contains a simple utility to convert an ISO Date string into a relative date string.
- `ArticlesService` - This module contains a very simple class that accepts a NewsAPI API key and provides a method, `getArticles`, which accepts a news source and success and error callbacks. This module also exports a `newsSource` object, which serves as a sort of enum providing predefined constants for the types of news sources.
- `ArticlesComponent` - This is a very simple _Component_ class that provides a `render` method that will take a provided list of articles and render them to the page.

The goal of the exercise is to convert this project over to TypeScript and to utilize ES2015+ features along the way.

## Getting Started

In this exercise we will convert this ES5/AMD application to TypeScript and utilize new syntax and features available in ES6+ to simplify and modernize the code. To get started, simply install the dev dependencies.

```shell
npm install
```

This application is completely standalone and has no production dependencies. The build tools included will compile the AMD application into a Webpack bundle and generate the HTML output. The `package.json` file defines a number of scripts which will simplify the tools needed to run this application in its ES5/AMD form and along the transformation to TypeScript.

### Scripts

- `npm run start` - As this main script for development, this script will run the _clean_ script and then run the _watch_ and _serve_ scripts in parallel.
- `npm run build` - This is simply an alias to run `webpack`, which will build the application bundles and place them in the _dist/_ directory.
- `npm run clean` - This script removes the _dist/_ directory.
- `npm run test` - This script will start a test server which can be accessed at <http://localhost:9000/__intern/> to view the output from the test suite.
- `npm run watch` - This script executes Webpack in watch mode, which will automatically update the built bundles when files are saved.
- `npm run serve` - This script will start a simple HTTP server and serve up the _dist/_ directory at <http://localhost:8080/>.

## Features Covered

The follwing ES2015+ and TypeScript features are covered and discussed as part of the conversion exercise.

- [ES Modules](http://2ality.com/2014/09/es6-modules-final.html) - We will convert the AMD modules to ES Modules.
- [`let` and `const`](http://wesbos.com/let-vs-const/) - We'll convert `var` statements to these block-scoped declaration statements.
- [Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) - We'll utilize strict TypeScript typings, adding type annotations to our code where the type cannot be inferred.
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) - We'll see how union types can help us better describe our code.
- [Enums](https://www.typescriptlang.org/docs/handbook/enums.html) - Utilizing this TypeScript data structure, we'll define a set of named constants for our news sources.
- [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) - We'll define an interface to describe the data coming back from NewsAPI in a typesafe way.
- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) - JavaScript's class syntax makes working with classes much simpler. This will clean up our code a lot.
- [TypeScript Classes](https://www.typescriptlang.org/docs/handbook/classes.html) - We'll go beyond ES classes and utilize wonderful TypeScript class features including  modifiers and non-method properties.
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) - We will utilize template literals to remove ugly concatenation and utilize it for generating multi-line templates.
- [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) - We'll simplify inline functions with this smaller syntax.
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) - Using Promises will allow us to encapsulate asynchronous actions and work with them in a much simpler way.
- [Asynchronous Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - This syntactic sugar further simplifies asynchronous code by making it look synchronous.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - We'll ditch the XMLHttpRequest (XHR) object and really simplify our request code using the superior `fetch` method.
- [Definite Assignment Assertions](https://www.stevefenton.co.uk/2018/01/typescript-definite-assignment-assertions/) - We'll see how the TypeScript complier helps us to avoid unused/unnecessary code by alerting us to unused and unassigned class properties.
- [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) - We'll introduce a `deprecated` decorator when we add a new method to the service that utilized Promises over XHR and callbacks.

## Licensing Information

© 2018 [JS Foundation](https://js.foundation/) & contributors. [New BSD](https://opensource.org/licenses/BSD-3-Clause) license.
