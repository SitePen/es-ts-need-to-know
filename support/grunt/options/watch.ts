export = function(grunt: IGrunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	console.log('loading watch task');

	return {
		dev: {
			files: [
				'**/*.ts',
				'**/*.js',
				'**/*.html'
			],
			tasks: [ 'default' ],
			options: {
				spawn: true,
				cwd: `${__dirname}/../../../src`
			}
		}
	};
};
