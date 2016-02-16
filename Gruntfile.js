module.exports = function(grunt) {
  // Load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      },
      combine: {
        files: {
          'css/out.min.css': []
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        expand: true,
        cwd: 'src',
        src: ['*.js'],
        dest: 'scrpts',
        ext: '.js'
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
        files: ['**.html', 'sass/*', 'src/'],
        tasks: ['dosass']
      }
    }
  });

  // Creates the 'serve' task
  grunt.registerTask('serve', ['connect:all', 'jshint', 'watch']);
  grunt.registerTask('default', ['jshint', 'uglify', 'sass']);
  grunt.registerTask('dosass', ['sass']);
};
