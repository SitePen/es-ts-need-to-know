require('ts-node')
	.register({
		'compilerOptions': {
			module: 'commonjs',
			target: 'es2017',
			types: [
				'grunt',
				'intern'
			]
		}
	});

module.exports = function (grunt) {
	require('./support/grunt').initConfig(grunt);
};
