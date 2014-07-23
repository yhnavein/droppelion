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

    watch: {
      files: "less/*",
      tasks: ["less:dev"]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less:dev']);
};