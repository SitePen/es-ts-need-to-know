export = function(grunt: IGrunt) {
	grunt.loadNpmTasks('grunt-tslint');

	return {
		options: {
			configuration: grunt.file.readJSON('tslint.json')
		},

		dev: {
			src: [
				'src/**/*.ts',
				'tests/**/*.ts'
			]
		},

		dist: {
			src: [
				'src/**/*.ts'
			]
		}
	};
};
