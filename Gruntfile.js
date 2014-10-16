module.exports = function(grunt) {
  // Do grunt-related things in here

  grunt.initConfig({

  // Watch
    watch: {
      css: {
        files: 'assets/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },

      scripts: {
        files: ['assets/jsbin/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },

    },
    // Jekyll


    // CSS
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/screen.css': 'assets/sass/screen.scss',
        }
      },
    },

    // JS
    uglify: {
      my_target: {
        files: {
          'assets/js/site.min.js': ['assets/jsbin/site.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  // Registered Tasks
  grunt.registerTask('default',['watch']);
};