export = function(grunt: IGrunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');

	return {
		dev: {
			expand: true,
			cwd: '.',
			src: [ '{src,tests}/**/*.{html,css,json,js}' ],
			dest: '<%= devDirectory %>'
		},

		dist: {
			files: [ {
				expand: true,
				cwd: 'src/',
				src: [ '**/*.{html,css,json}' ],
				dest: '<%= distDirectory %>'
			}, {
				expand: true,
				cwd: '.',
				src: [ 'package.json', 'README.md' ],
				dest: '<%= distDirectory %>'
			} ],
			options: {
				process(content: string, srcpath: string) {
					return content;
				}
			}
		}
	};
};
