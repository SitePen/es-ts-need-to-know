# ES6+ and TypeScript: What You Need to Know

This is the example repository used during the live coding section of the Enterprise JavaScript Summit talk

_ES6+ and TypeScript: What You Need to Know_.

## Getting Started

In this exercise we will convert this ES5/AMD application to TypeScript and utilize new syntax and features available in ES6+ to simplify and modernize the code. To get started, simply install the dev dependencies.

```Shell
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

## Licensing Information

© 2018 [JS Foundation](https://js.foundation/) & contributors. [New BSD](https://opensource.org/licenses/BSD-3-Clause) license.
