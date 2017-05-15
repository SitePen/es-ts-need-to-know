export = function(grunt: IGrunt) {
	grunt.loadNpmTasks('intern');

	return {
		options: {
			runType: 'runner',
			config: '<%= devDirectory %>/tests/intern',
			reporters: [
				{ id: 'support/intern/Reporter', file: 'coverage-unmapped.json' }
			]
		},

		local: {
			options: {
				config: '<%= devDirectory %>/tests/intern-local'
			}
		},

		node: {
			options: {
				runType: 'client'
			}
		},

		remote: {}
	};
};
