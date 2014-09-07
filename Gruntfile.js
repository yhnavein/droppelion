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
    html2js: {
      options: {
        base: './',
        module: 'droppelion'
      },
      main: {
        src: ['templates/*.html'],
        dest: 'droppelion.tpls.js'
      },
    },
    watch: {
      files: "less/*",
      tasks: ["less:dev"]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default', ['less:dev', 'html2js']);
};
