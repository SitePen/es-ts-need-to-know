export * from './intern';

/**
 * Utilise the SeleniumTunnel for local in browser testing
 */
export const tunnel = 'SeleniumTunnel';

/**
 * Indicate the hostname and port used for local in browser testing
 */
export const tunnelOptions = {
	hostname: 'localhost',
	port: '4444'
};

/**
 * The environments to run
 */
export const environments = [
	{ browserName: 'chrome' }
];
