module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      dev: {
        files: {
          "css/droppelion.css": "less/droppelion.less"
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less:dev']);
};