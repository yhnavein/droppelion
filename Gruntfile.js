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

    ngtemplates: {
      app: {
        cwd: './',
        src: 'templates/**.html',
        dest: 'dist/droppelion.tpls.js',
        options: {
          module: 'droppelion'
        }
      }
    },

    watch: {
      files: "less/*",
      tasks: ["less:dev"]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['less:dev', 'ngtemplates', 'uglify']);
};
