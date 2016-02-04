module.exports = function(grunt) {
  // Load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/*.js',
        dest: 'scripts/*.js'
      }
    },
    jshint: {
      options: {
        eqeqeq: true,
        trailing: true
      },
      files: ['scripts/*.js']
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      all: {
        options: {
          open: true,
          base: ['./']
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['**.html', '**.css', '**.js']
      }
    }
  });

  // Creates the 'serve' task
  grunt.registerTask('serve', ['connect:all', 'jshint', 'watch']);
  grunt.registerTask('default', ['jshint', 'uglify', 'sass']);
  grunt.registerTask('sass', ['sass']);
};
