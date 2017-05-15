export const proxyPort = 9000;
export const proxyUrl = 'http://localhost:9000/';

/**
 * Capabilities for the on demand testing environment
 */
export const capabilities = {
	'browserstack.debug': false,
	project: 'EJSS',
	name: 'es-ts-need-to-know'
};

/**
 * Environments to run tests against when running remotely
 */
export const environments = [
	{ browserName: 'internet explorer', version: '11', platform: 'WINDOWS' },
	{ browserName: 'edge', platform: 'WINDOWS' },
	{ browserName: 'firefox', platform: 'WINDOWS' },
	{ browserName: 'chrome', platform: 'WINDOWS' },
	{ browserName: 'safari', version: '10', platform: 'MAC' },
	{ browserName: 'iPad', version: '9.1' }
];

/**
 * Number of concurrent sessions supported
 */
export const maxConcurrency = 2;

/**
 * Remote tunnel
 */
export const tunnel = 'BrowserStackTunnel';

/**
 * Allow use of a non-Intern proxy when running tests
 */
export const initialBaseUrl: string | null = (function () {
	if (typeof location !== 'undefined' && location.pathname.indexOf('__intern/') > -1) {
		return '/';
	}
	return null;
})();

/**
 * Utilise the @dojo/loader as the AMD loader for Intern
 */
export const loaders = {
	'host-browser': 'node_modules/@dojo/loader/loader.js',
	'host-node': '@dojo/loader'
};

/**
 * Loader options to be passed to the loader
 */
export const loaderOptions = {
	packages: [
		{ name: '@dojo', location: 'node_modules/@dojo' },
		{ name: 'dojo', location: 'node_modules/intern/browser_modules/dojo' },
		{ name: 'moment', location: 'node_modules/moment', main: 'moment' },
		{ name: 'src', location: 'dev/src' },
		{ name: 'tests', location: 'dev/tests' }
	]
};

/**
 * Suites of tests to run
 */
export const suites = [ 'tests/support/loadJsdom', '@dojo/shim/Promise', 'tests/unit/all' ];

/**
 * Functional suites of test to run
 */
export const functionalSuites = [ 'tests/functional/all' ];

/**
 * Modules to exclude from code coverage instrumenation
 */
export const excludeInstrumentation = /(?:node_modules|tests)[\/\\]/;
