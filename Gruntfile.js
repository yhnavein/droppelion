module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dev: {
        options: {
          mangle: false
        },
        files: {
          'dist/droppelion.min.js': [
            'droppelion.js'
          ],
        }
      }
    },

    less: {
      dev: {
        files: {
          "dist/droppelion.css": "less/droppelion.less"
        }
      }
    },

    html2js: {
      options: {
        base: './',
        module: 'droppelion',
        singleModule: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['templates/*.html'],
        dest: 'dist/droppelion.tpls.js'
      },
    },

    watch: {
      files: "less/*",
      tasks: ["less:dev"]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default', ['less:dev', 'html2js', 'uglify']);
};
